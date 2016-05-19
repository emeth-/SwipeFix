from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render
from simple_salesforce import Salesforce
import datetime
import json

def json_custom_parser(obj):
    if isinstance(obj, datetime.datetime) or isinstance(obj, datetime.date):
        return obj.isoformat()[:19]
    else:
        raise TypeError

@csrf_exempt
def index(request):

    #authentication
    if 'oauth_token' in request.GET:
        request.session['oauth_token'] = request.GET['oauth_token']
        request.session['instance_url'] = "https://"+request.GET['instance_url_soap'].split('.')[1]+".salesforce.com"
        request.session['user_id'] = request.GET['user_id']
        request.session['org_id'] = request.GET['org_id']
    
    return render(request, 'index.html', {
        "hello": "world"
    })

@csrf_exempt
def update_opp_contacts(request, opportunity_id):
    """
        post_data = {
            "json_data": '["003o000000BTSnN", ...]'
        }
    """
    sf = Salesforce(instance_url=request.session['instance_url'], session_id=request.session['oauth_token'])

    contacts = json.loads(request.POST['json_data'])
    for c in contacts:
        salesforce_task = sf.OpportunityContactRole.create({
            "IsPrimary": False,
            "OpportunityId": opportunity_id,
            "ContactId": c
        })

    return HttpResponse(json.dumps({
        "status": "success",
        "salesforce_task": salesforce_task
    }, default=json_custom_parser), content_type="application/json")

@csrf_exempt
def update_opp_stage(request, opportunity_id):
    """
        post_data = {
            "stage": "stage_name_goes_here"
        }
    """
    sf = Salesforce(instance_url=request.session['instance_url'], session_id=request.session['oauth_token'])

    response = sf.Opportunity.update(opportunity_id, {
        "StageName": request.POST['stage'] 
    })

    return HttpResponse(json.dumps({
        "status": "success",
        "sf_response": response
    }, default=json_custom_parser), content_type="application/json")

@csrf_exempt
def update_expected_close_date(request, opportunity_id):
    """
        post_data = {
            "expected_close_date": "2014-10-13"
        }
    """
    sf = Salesforce(instance_url=request.session['instance_url'], session_id=request.session['oauth_token'])

    response = sf.Opportunity.update(opportunity_id, {
        "CloseDate": request.POST['expected_close_date'] ##expected_close_date.strftime('%Y-%m-%d')
    })

    return HttpResponse(json.dumps({
        "status": "success",
        "sf_response": response
    }, default=json_custom_parser), content_type="application/json")

@csrf_exempt
def update_task(request, task_id):
    """
        post_data = {
            "status": "some_status",
            "due_date": "2014-10-13"
        }
    """
    sf = Salesforce(instance_url=request.session['instance_url'], session_id=request.session['oauth_token'])

    updates = {
        "Status": request.POST['status']
    }
    if "due_date" in request.POST:
        updates["ActivityDate"] = request.POST['due_date']

    response = sf.Task.update(task_id, updates)

    return HttpResponse(json.dumps({
        "status": "success",
        "sf_response": response
    }, default=json_custom_parser), content_type="application/json")

@csrf_exempt
def get_data(request):

    sf = Salesforce(instance_url=request.session['instance_url'], session_id=request.session['oauth_token'])

    ref = datetime.datetime.now()
    if ref.month < 4:
        end_of_current_quarter = datetime.date(ref.year, 3, 31)
    elif ref.month < 7:
        end_of_current_quarter = datetime.date(ref.year, 6, 30)
    elif ref.month < 10:
        end_of_current_quarter = datetime.date(ref.year, 9, 30)
    else:
        end_of_current_quarter = datetime.date(ref.year, 12, 31)

    task_open_statuses = []
    choices_data = {
        "stages": [ ],
        "task_status": [ ],
        "account_contacts": { },
        "closed_task_label": ""
    }
    stub_data = {
        "no_contacts_assigned": [ ],
        "expected_close_date_past": [ ],
        "open_task_due_in_past": [ ],
        "assigned_to_invalid_stage": [ ],
        "close_date_not_realistic_based_off_current_stage": [ ],
    }

    upcoming_data = [ ]

    last_update_data = [ ]
    default_probs = []
    prob_to_stage = {}
    avg_days_in_stage = {}

    for s in sf.query("SELECT MasterLabel,DefaultProbability FROM OpportunityStage WHERE IsActive = True ORDER BY SortOrder ASC")['records']:
        choices_data['stages'].append(s['MasterLabel'])
        default_probs.append(s['DefaultProbability'])
        prob_to_stage[s['DefaultProbability']] = s['MasterLabel']
        avg_days_in_stage[s['MasterLabel']] = []

    for task in sf.query_all("SELECT MasterLabel,IsClosed FROM TaskStatus ORDER BY SortOrder ASC")['records']:
        if task['IsClosed'] == True:
            choices_data['closed_task_label'] = task['MasterLabel']
        else:
            task_open_statuses.append(task['MasterLabel'])
        choices_data['task_status'].append(task['MasterLabel'])

    #TODO check if LastModifiedDate is the most appropriate last update timestamp to use (I suspect not)
    query = """ SELECT Id, Name, LastModifiedDate, Amount, Probability, CloseDate, StageName, SystemModstamp, (SELECT ContactId,IsPrimary,OpportunityId,Role,Contact.Name,Contact.Title FROM OpportunityContactRoles), (SELECT OpportunityId,StageName,Amount,Probability,CloseDate,CreatedById,CreatedDate FROM OpportunityHistories ORDER BY CreatedDate ASC), (SELECT Id,AccountId,ActivityDate,Status,Subject,Description FROM Tasks WHERE IsArchived = False AND IsClosed = False AND OwnerId = '"""+request.session['user_id']+"""' AND Status IN ("""+",".join(["'"+k+"'" for k in task_open_statuses])+""")), AccountId, Account.Name FROM Opportunity WHERE IsClosed = False """

    account_ids = {}
    opp_ids = {}
    opps_by_last_update = []
    query_results = sf.query(query)['records']

    #cycle through results first to build up statistical information
    for o in query_results:
        if o['OpportunityHistories']:
            curr_stage = None
            curr_stage_created_date = None
            for h in o['OpportunityHistories']['records']:
                if not curr_stage:
                    curr_stage = h['StageName']
                    curr_stage_created_date = datetime.datetime.strptime(h['CreatedDate'].split('.')[0], '%Y-%m-%dT%H:%M:%S')
                else:
                    if h['StageName'] != curr_stage:
                        delta = datetime.datetime.strptime(h['CreatedDate'].split('.')[0], '%Y-%m-%dT%H:%M:%S') - curr_stage_created_date
                        if h['StageName'] in avg_days_in_stage:
                            avg_days_in_stage[h['StageName']].append(delta.days)

    try:
        for k in avg_days_in_stage:
            avg = sum(avg_days_in_stage[k]) / len(avg_days_in_stage[k])
            avg_days_in_stage[k] = avg
    except ZeroDivisionError:
        #If a zero division error occurs, this means we simply do not have legitimate historical data.
        #This is unfortunate - and is also the case with the dev accounts.
        #If it happens, default the length of each stage to 10 days.
        for k in avg_days_in_stage:
            avg_days_in_stage[k] = 10

    #TODO cache avg_days_in_stage in postgres, pull

    #cycle through opps a second time to test all our bad data triggers
    for o in query_results:
        account_ids[o['AccountId']] = 1
        opp_ids[o['Id']] = 1
        opps_by_last_update.append({
                "id": o['Id'],
                "name": o['Name'],
                "expected_close_date": o['CloseDate'],
                "amount": o['Amount'],
                "account_id": o['AccountId'],
                "stage": o['StageName'],
                "last_update": o['LastModifiedDate']
            })

        if not o['OpportunityContactRoles']:
            stub_data['no_contacts_assigned'].append({
                "opp": {
                    "id": o['Id'],
                    "name": o['Name'],
                    "expected_close_date": o['CloseDate'],
                    "amount": o['Amount'],
                    "account_id": o['AccountId'],
                    "stage": o['StageName'],
                    "last_update": o['LastModifiedDate']
                },
                "default_text": "Apply all account contacts!",
                "text": "No contacts assigned to opportunity",
                "subkey": "No contacts assigned",
                "edit_thing": "Set contacts!"
            })

        datetime_closedate = datetime.datetime.strptime(o['CloseDate'], '%Y-%m-%d')
        if datetime_closedate < datetime.datetime.now():
            stub_data['expected_close_date_past'].append({
                "opp": {
                    "id": o['Id'],
                    "name": o['Name'],
                    "expected_close_date": o['CloseDate'],
                    "amount": o['Amount'],
                    "account_id": o['AccountId'],
                    "stage": o['StageName'],
                    "last_update": o['LastModifiedDate']
                },
                "default_text": "Set expected close to " + end_of_current_quarter.strftime('%Y-%m-%d') + "!",
                "default": end_of_current_quarter.strftime('%Y-%m-%d'),
                "text": "Expected close date past: "+o['CloseDate'],
                "subkey": "Expected close date past",
                "edit_thing": "Edit close date!"
            })
        else:
            #close date is in present or future

            #Check and see if expected close date is realistic based off current stage, and average days spent per stage
            rep_days_left_d = datetime_closedate - datetime.datetime.now()
            rep_days_left = rep_days_left_d.days
            forecast_days_left = 0
            stages_after_current = choices_data['stages'][choices_data['stages'].index("Qualification")+1:]
            for s in stages_after_current:
                forecast_days_left += avg_days_in_stage[s]
            if forecast_days_left > rep_days_left:
                stub_data['close_date_not_realistic_based_off_current_stage'].append({
                    "opp": {
                        "id": o['Id'],
                        "name": o['Name'],
                        "expected_close_date": o['CloseDate'],
                        "amount": o['Amount'],
                        "account_id": o['AccountId'],
                        "stage": o['StageName'],
                        "last_update": o['LastModifiedDate']
                    },
                    "default_text": "Set expected close to " + end_of_current_quarter.strftime('%Y-%m-%d') + "!",
                    "default": end_of_current_quarter.strftime('%Y-%m-%d'),
                    "text": "Close date not realistic based off current stage: "+o['CloseDate']+" and "+o['StageName'],
                    "subkey": "Close date not realistic based off current stage",
                    "edit_thing": "Edit close date!"
                })
            #If expected close date occuring in next 7 days
            if datetime_closedate < (datetime.datetime.now() + datetime.timedelta(days=7)):
                upcoming_data.append({
                    "thing": "opportunity",
                    "time": o['CloseDate'],
                    "data": {
                        "id": o['Id'],
                        "name": o['Name'],
                        "expected_close_date": o['CloseDate'],
                        "amount": o['Amount'],
                        "account_id": o['AccountId'],
                        "stage": o['StageName'],
                        "last_update": o['LastModifiedDate']
                    }
                })

        if o['Tasks']:
            for t in o['Tasks']['records']:
                if datetime.datetime.strptime(t['ActivityDate'], '%Y-%m-%d') < datetime.datetime.now():
                    #due in the past
                    stub_data['open_task_due_in_past'].append({
                        "opp": {
                            "id": o['Id'],
                            "name": o['Name'],
                            "expected_close_date": o['CloseDate'],
                            "amount": o['Amount'],
                            "account_id": o['AccountId'],
                            "stage": o['StageName'],
                            "last_update": o['LastModifiedDate']
                        },
                        "task_data": {
                            "id": t['Id'],
                            "description": t['Description'],
                            "due_date": t['ActivityDate'],
                            "status": t['Status'],
                            "subject": t['Subject'],
                        },
                        "default_text": "Mark task complete!",
                        "default": choices_data['closed_task_label'],
                        "text": "Open task due in past: "+t['ActivityDate']+" for "+t['Subject'],
                        "subkey": "Open task due in past",
                        "edit_thing": "Edit task date and status!"
                    })
                elif datetime.datetime.strptime(t['ActivityDate'], '%Y-%m-%d') < (datetime.datetime.now() + datetime.timedelta(days=7)):
                    #due in the next 7 days
                    upcoming_data.append({
                        "thing": "task",
                        "time": t['ActivityDate'],
                        "data": {
                            "id": t['Id'],
                            "description": t['Description'],
                            "due_date": t['ActivityDate'],
                            "status": t['Status'],
                            "subject": t['Subject'],
                        }
                    })
        if o['StageName'] not in choices_data['stages']:
            matched_stage = prob_to_stage[default_probs[0]]
            for p in default_probs:
                if o['Probability'] < p:
                    matched_stage = prob_to_stage[p]
                    break

            stub_data['assigned_to_invalid_stage'].append({
                "opp": {
                    "id": o['Id'],
                    "name": o['Name'],
                    "expected_close_date": o['CloseDate'],
                    "amount": o['Amount'],
                    "account_id": o['AccountId'],
                    "stage": o['StageName'],
                    "last_update": o['LastModifiedDate']
                },
                "default_text": 'Set stage to "' + matched_stage + '"!',
                "default": matched_stage,
                "text": "Assigned to invalid stage: "+o['StageName'],
                "subkey": "Assigned to invalid stage",
                "edit_thing": "Edit stage!"
            })

    for k in account_ids:
        choices_data['account_contacts'][k] = []

    for s in sf.query("SELECT Id,AccountId,Name,Title FROM Contact WHERE AccountId IN ("+",".join(["'"+k+"'" for k in account_ids.keys()])+")")['records']:
        choices_data['account_contacts'][s['AccountId']].append({
            "name": s['Name'],
            "id": s['Id'],
            "role": s['Title']
        })


    last_update_data = sorted(opps_by_last_update, key=lambda k: datetime.datetime.strptime(k['last_update'].split('.')[0], '%Y-%m-%dT%H:%M:%S'))[:3]


    return HttpResponse(json.dumps({
        "status":"success",
        "fix_me_data": stub_data,
        "choices_data": choices_data,
        "upcoming_data": upcoming_data,
        "last_update_data": last_update_data
    }, default=json_custom_parser), content_type="application/json")
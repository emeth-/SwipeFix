# SwipeFix

Tools for Sales Managers have vastly outpaced tools for Sales Reps.

There are a ton of advanced reporting and analytics packages on the market that give sales managers the ability to peer into their sales reps stats and data.

With this newfound visibility for managers, Sales Reps are getting dressed down in Sales Meetings left and right, dinged for various metrics and embarrassing bad data.

We aim to change that.

Our tool gives the sales reps both visibility into the things likely to catch their manager's eyes, and the ability to rapidly fix things with small gaps of spare time throughout the day - like when standing in line at a grocery store.

Introducing... SwipeFix.

![](http://teachthe.net/topclipbox/2016-05-19_18-37-45BK26XD.png)


##### SETUP
```
- Install heroku toolbelt (https://toolbelt.heroku.com/)
- Install git
- Install python 2.7.6
- Install pip (e.g. sudo easy_install pip)
```

```
<clone our app to a local git repository>
$ sudo pip install -r requirements.txt
$ heroku apps:create hackathon-demo 
$ heroku config:set IS_HEROKU_SERVER=1
$ git push heroku master
```

##### Migrations
Create new migrations
```
$ python manage.py makemigrations
```

Run migrations
```
$ python manage.py migrate
```

##### Run Server
```
$ python manage.py runserver
Visit http://127.0.0.1:8000/static/index.html
```

# Debugging Tools/Info

https://na17.salesforce.com/one/one.app

Salesforce1 Custom Webtab
<apex:page showHeader="false">
    <apex:includeScript value="https://127.0.0.1:8000/static/apex.js"/>
    <apex:iframe src="https://127.0.0.1:8000/?oauth_token={!$Api.Session_ID}&instance_url_soap={!$Api.Partner_Server_URL_290}&user_id={!$User.Id}&org_id={!$Organization.Id}" frameborder="false" height="800px" scrolling="true"/>
</apex:page>

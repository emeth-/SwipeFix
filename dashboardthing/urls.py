from django.conf.urls import patterns, url

urlpatterns = patterns('',
    url(r'^$', "dashboardthing.views.index"),
    url(r'^get_data/$', "dashboardthing.views.get_data"),
    url(r'^update_expected_close_date/(?P<opportunity_id>\w+)/$', "dashboardthing.views.update_expected_close_date"),
    url(r'^update_opp_stage/(?P<opportunity_id>\w+)/$', "dashboardthing.views.update_opp_stage"),
    url(r'^update_task/(?P<task_id>\w+)/$', "dashboardthing.views.update_task"),
    url(r'^update_opp_contacts/(?P<opportunity_id>\w+)/$', "dashboardthing.views.update_opp_contacts"),
)

app.mainView = Backbone.View.extend({

    template: TEMPLATES['tmp/mainView.hbs'],

    initialize: function (options) {
        var _this = this;

        _this.options = options || {};

        if (_this.options.modalView) {
            _this.modalView = _this.options.modalView;
        }

        app.skip_next_click = true;
        _this.on('postRender', _this.postRender);
        _this.listenTo(Backbone, 'defaultSwipe', _this.defaultSwipeAction);
        _this.listenTo(Backbone, 'onPage', _this.setHeights);
    },

    render: function () {
        var _this = this;

        if (_this.model) {
            _this.$el.empty().append(this.template(_this.model.toJSON()));
        }

        _this.trigger('postRender');

        return _this;
    },

    events: {
        'click .opp-container': 'openOppProfile',
        'click .opp-profile-opener': 'openOppProfile'
    },

    postRender: function () {
        var _this = this;

        _this.$el.find('.carousel').css({width: ($(window).width() - 30) + 'px'});
        _this.$el.find('.carousel').each(function () {
            var dataId = $(this).attr('data-id_'),
                carousel = new Carousel('[data-id_="' + dataId + '"]', _this);

            carousel.init();
        });
    },

    defaultSwipeAction: function (e) {
        var _this = this,
            id = e.attr('data-id'),
            dataType = e.attr('data-data_type').toLowerCase();

        app.currently_swiping = true;
        setTimeout(function(){
            app.currently_swiping = false;
        }, 300);

        this.activeListItem = e;

        if (dataType === 'no_contacts_assigned') {
            var opp = _.filter(_this.model.get('fix_me_data')[dataType], function (obj) {
                    return obj.opp.id === id;
                })[0],
                account_id = opp.opp.account_id,
                contacts = _this.model.get('choices_data').account_contacts[account_id],
                ids = [];

            _.each(contacts, function (value, index) {
                ids.push(value.id);
            });

            e.find('li:nth-child(1) .control').html('<span style="margin-right:7px;">Added all account contacts!</span>');
            setTimeout(function () {
                e.slideUp({
                    done: function () {
                        $(this).remove();
                    }
                });
            }, 4000);

            $.ajax({
                type: 'POST',
                url: '/update_opp_contacts/'+e.attr('data-id')+'/',
                data: {
                    json_data: JSON.stringify(ids)
                },
                success: function (data, status, xhr) {
                    if (data) {
                        console.log('saved opp contacts', data);
                    }
                },
                error: function (xhr, type, exception) {
                    console.log('ajax error response type ' + type, arguments);
                }
            });

        } else if (dataType === 'assigned_to_invalid_stage') {
            var opp = _.filter(_this.model.get('fix_me_data')[dataType], function (obj) {
                    return obj.opp.id === id;
                })[0];

            e.find('li:nth-child(1) .control').html('<span style="margin-right:7px;">Stage updated to ' + opp.default + '!</span>');
            setTimeout(function () {
                e.slideUp({
                    done: function () {
                        $(this).remove();
                    }
                });
            }, 4000);

            $.ajax({
                type: 'POST',
                url: '/update_opp_stage/'+e.attr('data-id')+'/',
                data: {
                    stage: opp.default
                },
                success: function (data, status, xhr) {
                    if (data) {
                        console.log('saved opp contacts', data);
                    }
                },
                error: function (xhr, type, exception) {
                    console.log('ajax error response type ' + type, arguments);
                }
            });

        } else if (dataType === 'close_date_not_realistic_based_off_current_stage' ||
            dataType === 'expected_close_date_past') {

            var opp = _.filter(_this.model.get('fix_me_data')[dataType], function (obj) {
                return obj.opp.id === id;
            })[0];

            e.find('li:nth-child(1) .control').html('<span style="margin-right:7px;">Expected close date set to ' + opp.default + '!</span>');
            setTimeout(function () {
                e.slideUp({
                    done: function () {
                        $(this).remove();
                    }
                });
            }, 4000);

            $.ajax({
                type: 'POST',
                url: '/update_expected_close_date/'+e.attr('data-id')+'/',
                data: {
                    expected_close_date: opp.default
                },
                success: function (data, status, xhr) {
                    if (data) {
                        console.log('saved opp contacts', data);
                    }
                },
                error: function (xhr, type, exception) {
                    console.log('ajax error response type ' + type, arguments);
                }
            });
        } else if (dataType === 'open_task_due_in_past') {
            var opp = _.filter(_this.model.get('fix_me_data')[dataType], function (obj) {
                    return obj.opp.id === id;
                })[0];

            e.find('li:nth-child(1) .control').html('<span style="margin-right:7px;">Task marked complete!</span>');
            setTimeout(function () {
                e.slideUp({
                    done: function () {
                        $(this).remove();
                    }
                });
            }, 4000);

            $.ajax({
                type: 'POST',
                url: '/update_task/'+opp.task_data.id+'/',
                data: {
                    status: opp.default
                },
                success: function (data, status, xhr) {
                    if (data) {
                        console.log('saved opp contacts', data);
                    }
                },
                error: function (xhr, type, exception) {
                    console.log('ajax error response type ' + type, arguments);
                }
            });
        }
    },

    openOppProfile: function (e) {
        var _this = this,
            $el = $(e.target).closest('.opp-profile-opener'),
            dataId = $el.attr('data-id');


        setTimeout(function(){
            if (!app.currently_swiping) {
                parent.postMessage({"url":"/"+dataId}, '*');
            }
        }, 200);

    },

    setHeights: function () {
        //parent.postMessage({"resize":jQuery('.modal-holder').offset().top}, '*');
        
        this.$el.find('.carousel').each(function (index, el) {
            var h = $(this).find('li:nth-child(2)').outerHeight();
            $(this).find('li:nth-child(1)').css({height: h + 'px'});
            $(this).find('li:nth-child(3)').css({height: h + 'px'});
        })
    }

});
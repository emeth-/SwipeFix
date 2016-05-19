app.modalView = Backbone.View.extend({

    className: 'modal-holder',

    template: TEMPLATES['tmp/modalView.hbs'],

    initialize: function (options) {
        var _this = this;

        _this.options = options || {};

        _this.on('postRender', _this.postRender);
        _this.listenTo(Backbone, 'editSwipe', _this.editSwipeAction);
    },

    render: function () {
        var _this = this;
        _this.$el.append(_this.template(_this.model.toJSON()));

        _this.trigger('postRender');
        return this;
    },

    postRender: function () {
        var _this = this;

        _this.$el.find('.modal').modal({
            show: false
        });
    },

    editSwipeAction: function (e) {
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
                $modal = _this.$el.find('.assign-contact'),
                $select = $modal.find('.list-group'),
                contacts = _this.model.get('choices_data').account_contacts[opp.opp.account_id],
                html = '';

            _.each(contacts, function (value, index) {
                html += '<li class="list-group-item" data-id="' + value.id + '">' + value.name + '<span class="small" style="display: block;color: #999;">' + value.role + '</span></li>';
            });

            $select.html(html);
            $modal.attr('data-opp-id', id);
            $modal.modal('show');
            $modal.css('margin-top', jQuery(e).offset().top+'px');

            _this.delegateEvents();

        } else if (dataType === 'assigned_to_invalid_stage') {
            var opp = _.filter(_this.model.get('fix_me_data')[dataType], function (obj) {
                    return obj.opp.id === id;
                })[0],
                $modal = _this.$el.find('.fix-stage'),
                $select = $modal.find('select'),
                stages = _this.model.get('choices_data').stages,
                html = '';

            _.each(stages, function (value, index) {
                html += '<option value="' + value + '">' + value + '</option>';
            });

            $select.html(html);
            $modal.attr('data-opp-id', id);
            $modal.modal('show');
            $modal.css('margin-top', jQuery(e).offset().top+'px');

            _this.delegateEvents();

        } else if (dataType === 'close_date_not_realistic_based_off_current_stage' ||
            dataType === 'expected_close_date_past') {

            var opp = _.filter(_this.model.get('fix_me_data')[dataType], function (obj) {
                    return obj.opp.id === id;
                })[0],
                $modal = _this.$el.find('.fix-close-date');


            var today = new Date(),
                day = today.getDate(),
                month = today.getMonth() + 1,
                year = today.getFullYear();

            if (day < 10) {
                day = '0' + day
            }

            if (month < 10) {
                month = '0' + month
            }
            today = year + '-' + month + '-' + day;

            $modal.find('input').val(opp.opp.expected_close_date);

            $modal.attr('data-opp-id', id);
            $modal.modal('show');
            $modal.css('margin-top', jQuery(e).offset().top+'px');

        } else if (dataType === 'open_task_due_in_past') {
            var opp = _.filter(_this.model.get('fix_me_data')[dataType], function (obj) {
                    return obj.opp.id === id;
                })[0],
                $modal = _this.$el.find('.fix-task'),
                $select = $modal.find('select'),
                stages = _this.model.get('choices_data').task_status,
                html = '';

            _.each(stages, function (value, index) {
                html += '<option value="' + value + '">' + value + '</option>';
            });

            var today = new Date(),
                day = today.getDate(),
                month = today.getMonth() + 1,
                year = today.getFullYear();

            if (day < 10) {
                day = '0' + day
            }

            if (month < 10) {
                month = '0' + month
            }
            today = year + '-' + month + '-' + day;

            $modal.find('input').val(today);

            $select.html(html);
            $modal.attr('data-opp-id', opp.task_data.id);
            $modal.modal('show');
            $modal.css('margin-top', jQuery(e).offset().top+'px');
        }

        app.skip_next_click = true;
    },

    events: {
        'click .list-group-item': 'activateListItem',
        'click [data-action="submitFixStage"]': 'submitFixStage',
        'click [data-action="submitContactModal"]': 'submitContactModal',
        'click [data-action="submitEditTask"]': 'submitEditTask',
        'click [data-action="submitNewCloseDate"]': 'submitNewCloseDate'
    },

    activateListItem: function (e) {
        var _this = this,
            $this = $(e.target);

        if ($this.hasClass('single')) {
            $this.siblings().removeClass('active')
            $this.addClass('active');
        } else {
            $this.toggleClass('active');
        }

    },

    submitContactModal: function (e) {
        var _this = this,
            $this = $(e.target),
            $modal = $this.closest('.modal'),
            ids = [];

        $modal.find('.list-group-item.active').each(function (index, el) {
            ids.push($(this).attr('data-id'));
        });
        $modal.modal('hide');

        jQuery(_this.activeListItem).find('li:nth-child(3) .control').html('<span style="margin-right:7px;">Opportunity contacts updated!</span>');
        setTimeout(function () {
            jQuery(_this.activeListItem).slideUp({
                done: function () {
                    $(this).remove();
                }
            });
        }, 4000);
        $.ajax({
            type: 'POST',
            url: '/update_opp_contacts/'+$modal.attr('data-opp-id')+'/',
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
    },

    submitFixStage: function (e) {
        var _this = this,
            $this = $(e.target),
            $modal = $this.closest('.modal'),
            id = $modal.find('select').val();

        $modal.modal('hide');
        jQuery(_this.activeListItem).slideUp();
        $.ajax({
            type: 'POST',
            url: '/update_opp_stage/'+$modal.attr('data-opp-id')+'/',
            data: {
                stage: id
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

    },

    submitNewCloseDate: function (e) {
        var _this = this,
            $this = $(e.target),
            $modal = $this.closest('.modal'),
            value = $modal.find('input').val();

        $modal.modal('hide');
        jQuery(_this.activeListItem).find('li:nth-child(3) .control').html('<span style="margin-right:7px;">Close date set to ' + value + '!</span>');
        setTimeout(function () {
            jQuery(_this.activeListItem).slideUp({
                done: function () {
                    $(this).remove();
                }
            });
        }, 4000);
        $.ajax({
            type: 'POST',
            url: '/update_expected_close_date/'+$modal.attr('data-opp-id')+'/',
            data: {
                expected_close_date: value
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

    },

    submitEditTask: function (e) {
        var _this = this,
            $this = $(e.target),
            $modal = $this.closest('.modal'),
            date = $modal.find('input').val(),
            state = $modal.find('select').val();


        $modal.modal('hide');

        jQuery(_this.activeListItem).find('li:nth-child(3) .control')
            .html('<span style="margin-right:7px;">Task due date set to ' + date + ' and status set to ' + state + '!</span>');
        setTimeout(function () {
            jQuery(_this.activeListItem).slideUp({
                done: function () {
                    $(this).remove();
                }
            });
        }, 4000);

        $.ajax({
            type: 'POST',
            url: '/update_task/'+$modal.attr('data-opp-id')+'/',
            data: {
                status: state,
                due_date: date
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

});
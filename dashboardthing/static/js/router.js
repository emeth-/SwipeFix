
app.AppRouter = Backbone.Router.extend({

    routes: {
        '': 'fix',
        'fix': 'fix_'
    },

    initialize: function () {
        //app.slider = new PageSlider($('#page_slider'));

        this.$appTarget = $('.app-target');
        this.previousView = undefined;
        this.currentView = undefined;

        var _this = this;
        _this.listenTo(Backbone, 'pageDone', function () {
            if (_this.previousView instanceof Backbone.View) {

                if (_this.previousView.subViews) {
                    _this.killSubViews(_this.previousView);
                }
                _this.killView(_this.previousView);
                _this.previousView = undefined;
            }
        });

    },

    killView: function (_view) {

        _view.stopListening();
        _view.undelegateEvents();
        _view.remove();

    },

    killSubViews: function (_view) {
        var _this = this;
        _.each(_view.subViews, function (view, index) {
            if (view.subViews) {
                _this.killSubViews(view);
            }
            _this.killView(view);
        });
    },

    fix_: function () {

        if (app.ALLTHEDATA) {

        }
        var data = new Backbone.Model(app.ALLTHEDATA),
            _modalView = new app.modalView({
                model: data
            }).render(),

            _view = new app.mainView({
                model: data,
                modalView: _modalView
            }).render();

        _view.$el.append(_modalView.$el);

        this.currentView = _view;
        this.$appTarget
            .empty()
            .append(_view.$el);
        Backbone.trigger('onPage');
    }
});
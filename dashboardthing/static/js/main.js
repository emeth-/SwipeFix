$(document).on("ready", function () {

    app._router = new app.AppRouter({});

    $.ajax({
        type: 'POST',
        url: '/get_data/',
        data: {},
        success: function (data, status, xhr) {
            if (data) {
                console.log('all things cache', data);
                app.ALLTHEDATA = data;
                Backbone.history.start();
            }
        },
        error: function (xhr, type, exception) {
            // if ajax fails display error alert
            console.log('ajax error response type ' + type, arguments);
        }
    })

});

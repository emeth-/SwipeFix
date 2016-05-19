window.addEventListener( "message",
        function (data) {
            if (data && data.data && data.data.url) {
                sforce.one.navigateToURL(data.data.url);
            }
            if (data && data.data && data.data.resize) {
                var els = document.getElementsByTagName('iframe');
                //els[0].height = data.data.resize;
            }
        },
        false
);

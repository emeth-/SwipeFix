function Carousel(element, context) {
    var self = this;
    element = context.$el.find(element);

    var container = element.find('>ul'),
        panes = element.find('>ul>li'),
        pane_width = 0,
        pane_count = panes.length,
        current_pane = 1;

    this.init = function() {
        setPaneDimensions();

        $(window).on('load resize orientationchange', function() {
            setPaneDimensions();
        })
    };


    /*
        set the pane dimensions and scale the container
    */
    function setPaneDimensions () {
        pane_width = element.width();
        panes.each(function() {
            $(this).width(pane_width);
        });
        container.width(pane_width * pane_count);
    }


    /*
        show pane by index
    */
    this.showPane = function (index, animate) {
        // between the bounds
        index = Math.max(0, Math.min(index, pane_count - 1));
        current_pane = index;

        var offset = -((100 / pane_count) * current_pane);
        setContainerOffset(offset, animate);
    };


    function setContainerOffset (percent, animate) {
        container.removeClass('animate');

        if (animate) {
            container.addClass('animate');
        }

        if (Modernizr.csstransforms3d) {
            container.css('transform', 'translate3d(' + percent + '%, 0, 0) scale3d(1, 1, 1)');
        } else if (Modernizr.csstransforms) {
            container.css('transform', 'translate(' + percent + '%, 0)');
        } else {
            var px = ((pane_width*pane_count) / 100) * percent;
            container.css('left', px + 'px');
        }
    }

    this.next = function () { return this.showPane(current_pane + 1, true); };
    this.prev = function () { return this.showPane(current_pane - 1, true); };


    function handleHammer (ev) {


        switch (ev.type) {
            case 'dragright':
            case 'dragleft':

                // disable browser scrolling
                ev.gesture.preventDefault();

                // stick to the finger
                var pane_offset = -(100 / pane_count) * current_pane;
                var drag_offset = ((100 / pane_width) * ev.gesture.deltaX) / pane_count;

                // slow down at the first and last pane
                if ((current_pane == 0 && ev.gesture.direction == 'right') ||
                    (current_pane == pane_count - 1 && ev.gesture.direction == 'left')) {
                    drag_offset *= .4;
                }

                setContainerOffset(drag_offset + pane_offset);
                break;

            case 'swipeleft':
                // disable browser scrolling
                ev.gesture.preventDefault();

                self.next();
                ev.gesture.stopDetect();
                break;

            case 'swiperight':
                // disable browser scrolling
                ev.gesture.preventDefault();

                self.prev();
                ev.gesture.stopDetect();
                break;

            case 'release':

                ev.gesture.preventDefault();
                ev.gesture.stopPropagation();
                ev.gesture.stopDetect();

                // more then 50% moved, navigate
                if (Math.abs(ev.gesture.deltaX) > (pane_width - 100) / 2) {

                    var $el;
                    if (ev.gesture.direction == 'right') {
                        $el = $(ev.target).closest('.opp-container');
                        Backbone.trigger('defaultSwipe', $el);
                        self.prev();
                    } else {
                        $el = $(ev.target).closest('.opp-container');
                        Backbone.trigger('editSwipe', $el);
                        self.next();
                    }
                } else {
                    self.showPane(current_pane, true);
                }

                break;
        }
    }

    new Hammer(element[0],
        { drag_lock_to_axis: true }
    ).on('release dragleft dragright swipeleft swiperight',
        handleHammer
    );

    self.showPane(current_pane, true);

}

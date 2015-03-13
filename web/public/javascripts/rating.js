var Rating = React.createClass({displayName: "Rating",
    componentDidMount: function() {
        $(this.getDOMNode()).rating({
            showClear: false,
            showCaption: false,
            size: "xs"
        }).on('rating.change', this.onRatingChangeInternal.bind(this));
    },

    onRatingChangeInternal: function(evt, val, caption) {
        var cb = this.props.onRatingChange;
        cb.call(null, this.props.session, val);
    },

    render: function () {
        return React.createElement("input", React.__spread({},  this.props, {className: (this.props.className || '') + ' rating'}));
    }
});


//# sourceMappingURL=../../public/javascripts/rating.js.map
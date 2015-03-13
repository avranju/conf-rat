var Rating = React.createClass({
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
        return <input {...this.props} className={(this.props.className || '') + ' rating'} />;
    }
});


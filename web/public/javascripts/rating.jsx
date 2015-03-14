var Rating = React.createClass({
    componentDidMount: function() {
        var ratingNode = $(this.getDOMNode());
        ratingNode.rating({
            showClear: false,
            showCaption: false,
            size: "xs"
        }).on('rating.change', this.onRatingChangeInternal.bind(this));

        // append spinner gif
        var progressImgId = 'rating-progress-' + this.props.session.id;
        $('<br/><img style="display:none" id="' + progressImgId + '" src="/images/ajax-loader.gif" />').insertAfter(ratingNode);
    },

    onRatingChangeInternal: function(evt, val, caption) {
        var cb = this.props.onRatingChange;
        cb.call(null, this.props.session, val);
    },

    render: function () {
        return (<input {...this.props} className={(this.props.className || '') + ' rating'} />);
    }
});


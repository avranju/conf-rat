var Rating = React.createClass({
    componentDidMount: function() {
        $(this.getDOMNode()).rating({
            showClear: false,
            showCaption: false,
            size: "xs"
        });
    },

    render: function () {
        return <input {...this.props} className={(this.props.className || '') + ' rating'} />;
    }
});


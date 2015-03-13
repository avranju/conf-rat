var Rating = React.createClass({displayName: "Rating",
    componentDidMount: function() {
        $(this.getDOMNode()).rating({
            showClear: false,
            showCaption: false,
            size: "xs"
        });
    },

    render: function () {
        return React.createElement("input", React.__spread({},  this.props, {className: (this.props.className || '') + ' rating'}));
    }
});


//# sourceMappingURL=../../public/javascripts/rating.js.map
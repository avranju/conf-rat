var Table = ReactBootstrap.Table;
var Button = ReactBootstrap.Button;
var Glyphicon = ReactBootstrap.Glyphicon;

var SessionsTable = React.createClass({displayName: "SessionsTable",
    getInitialState: function() {
        return {
            sessions: []
        };
    },
    
    componentDidMount: function () {
        $.get("/sessions", function(result) {
            if(this.isMounted()) {
                this.setState({
                    sessions: JSON.parse(result)
                });
            }
        }.bind(this));
    },

    render: function() {
        var rows = this.state.sessions.map(function(session) {
            var lis = session.speakers.map(function(speaker) {
                return (
                    React.createElement("li", null, 
                        React.createElement("img", {src: speaker.pic}), 
                        React.createElement("p", null, speaker.name)
                    )
                );
            });

            return (
                React.createElement("tr", null, 
                    React.createElement("td", null, session.id), 
                    React.createElement("td", null, session.title), 
                    React.createElement("td", null, session.time), 
                    React.createElement("td", null, 
                        React.createElement("ul", {style: { listStyleType: 'none', paddingLeft: '0px'}}, 
                            lis
                        )
                    ), 
                    React.createElement("td", null, 
                        React.createElement(Rating, {type: "number", value: session.rating || 0})
                    ), 
                    React.createElement("td", null, 
                        React.createElement(Button, {bsStyle: "primary", bsSize: "small"}, 
                            React.createElement(Glyphicon, {glyph: "option-horizontal"})
                        )
                    )
                )
            );
        });

        return (
            React.createElement(Table, {striped: true}, 
                React.createElement("thead", null, 
                    React.createElement("tr", null, 
                        React.createElement("th", null, React.createElement("h4", null, "ID")), 
                        React.createElement("th", null, React.createElement("h4", null, "Title")), 
                        React.createElement("th", null, React.createElement("h4", null, "Time")), 
                        React.createElement("th", null, React.createElement("h4", null, "Speakers")), 
                        React.createElement("th", null, React.createElement("h4", null, "Rating")), 
                        React.createElement("th", null, React.createElement("h4", null, "Comments"))
                    )
                ), 
                React.createElement("tbody", null, 
                rows
                )
            )
        );
    }
});

React.render(React.createElement(SessionsTable, null), document.querySelector("#table-container"));

//# sourceMappingURL=../../public/javascripts/index.js.map
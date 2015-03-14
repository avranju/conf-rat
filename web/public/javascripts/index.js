var Table = ReactBootstrap.Table;
var Button = ReactBootstrap.Button;
var Glyphicon = ReactBootstrap.Glyphicon;
var Popover = ReactBootstrap.Popover;

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

    onRatingChange: function (session) {
        var rating = $("#rating" + session.id).val();
        var ratingProgress = $("#rating-progress-" + session.id);
        ratingProgress.show();

        $.post("/session-rating", {
            id: session.id,
            rating: rating
        }).fail(function () {
            alert("Rating failed.");
        }).always(function() {
            ratingProgress.hide();
        });
    },

    render: function() {
        var rows = this.state.sessions.map(function(session) {
            var speakerIndex = 0;
            var lis = session.speakers.map(function(speaker) {
                return (
                    React.createElement("li", {key: session.id.toString() + '-' + (speakerIndex++)}, 
                        React.createElement("img", {src: speaker.pic}), 
                        React.createElement("p", null, speaker.name)
                    )
                );
            });

            var rating = 0;
            if(session.ratings) {
                rating = session.ratings.map(function(val) {
                    return parseFloat(val);
                }).reduce(function(prev, curr) {
                    return prev + curr;
                }, 0);
                rating /= session.ratings.length;
            }

            return (
                React.createElement("tr", {key: session.id}, 
                    /*<td>{session.id}</td>*/
                    React.createElement("td", null, 
                        React.createElement("h3", null, session.title), 
                        React.createElement("p", null, session.abstract)
                    ), 
                    React.createElement("td", null, session.time), 
                    React.createElement("td", null, 
                        React.createElement("ul", {style: { listStyleType: 'none', paddingLeft: '0px'}}, 
                            lis
                        )
                    ), 
                    React.createElement("td", null, 
                        React.createElement(Rating, {id: 'rating' + session.id, session: session, type: "number", onRatingChange: this.onRatingChange, value: rating})
                    )
                    /*<td>
                        <Button bsStyle="primary" bsSize="small">
                            <Glyphicon glyph="option-horizontal" />
                        </Button>
                    </td>*/
                )
            );
        }.bind(this));

        return (
            React.createElement(Table, {striped: true}, 
                React.createElement("thead", null, 
                    React.createElement("tr", null, 
                        /*<th><h4>ID</h4></th>*/
                        React.createElement("th", {className: "col-md-6"}, React.createElement("h3", null, "Title")), 
                        React.createElement("th", {className: "col-md-2"}, React.createElement("h3", null, "Time")), 
                        React.createElement("th", {className: "col-md-2"}, React.createElement("h3", null, "Speakers")), 
                        React.createElement("th", {className: "col-md-2"}, React.createElement("h3", null, "Rating"))
                        
                        //<th><h4>Comments</h4></th>
                        
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
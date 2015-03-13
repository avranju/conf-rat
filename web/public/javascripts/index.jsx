var Table = ReactBootstrap.Table;
var Button = ReactBootstrap.Button;
var Glyphicon = ReactBootstrap.Glyphicon;

var SessionsTable = React.createClass({
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
        $.post("/session-rating", {
            id: session.id,
            rating: rating
        }).fail(function () {
            alert("Rating failed.");
        });
    },

    render: function() {
        var rows = this.state.sessions.map(function(session) {
            var speakerIndex = 0;
            var lis = session.speakers.map(function(speaker) {
                return (
                    <li key={session.id.toString() + '-' + (speakerIndex++)}>
                        <img src={speaker.pic} />
                        <p>{speaker.name}</p>
                    </li>
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
                <tr key={session.id}>
                    {/*<td>{session.id}</td>*/}
                    <td>
                        <h3>{session.title}</h3>
                        <p>{session.abstract}</p>
                    </td>
                    <td>{session.time}</td>
                    <td>
                        <ul style={{ listStyleType: 'none', paddingLeft: '0px' }}>
                            {lis}
                        </ul>
                    </td>
                    <td>
                        <Rating id={'rating' + session.id} session={session} type="number" onRatingChange={this.onRatingChange} value={rating} />
                    </td>
                    {/*<td>
                        <Button bsStyle="primary" bsSize="small">
                            <Glyphicon glyph="option-horizontal" />
                        </Button>
                    </td>*/}
                </tr>
            );
        }.bind(this));

        return (
            <Table striped>
                <thead>
                    <tr>
                        {/*<th><h4>ID</h4></th>*/}
                        <th className="col-md-6"><h3>Title</h3></th>
                        <th className="col-md-2"><h3>Time</h3></th>
                        <th className="col-md-2"><h3>Speakers</h3></th>
                        <th className="col-md-2"><h3>Rating</h3></th>
                        {
                        //<th><h4>Comments</h4></th>
                        }
                    </tr>
                </thead>
                <tbody>
                {rows}
                </tbody>
            </Table>
        );
    }
});

React.render(<SessionsTable />, document.querySelector("#table-container"));

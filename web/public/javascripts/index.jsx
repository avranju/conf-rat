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

    render: function() {
        var rows = this.state.sessions.map(function(session) {
            var lis = session.speakers.map(function(speaker) {
                return (
                    <li>
                        <img src={speaker.pic} />
                        <p>{speaker.name}</p>
                    </li>
                );
            });

            return (
                <tr>
                    <td>{session.id}</td>
                    <td>{session.title}</td>
                    <td>{session.time}</td>
                    <td>
                        <ul style={{ listStyleType: 'none', paddingLeft: '0px' }}>
                            {lis}
                        </ul>
                    </td>
                    <td>
                        <Rating type="number" value={session.rating || 0} />
                    </td>
                    <td>
                        <Button bsStyle="primary" bsSize="small">
                            <Glyphicon glyph="option-horizontal" />
                        </Button>
                    </td>
                </tr>
            );
        });

        return (
            <Table striped>
                <thead>
                    <tr>
                        <th><h4>ID</h4></th>
                        <th><h4>Title</h4></th>
                        <th><h4>Time</h4></th>
                        <th><h4>Speakers</h4></th>
                        <th><h4>Rating</h4></th>
                        <th><h4>Comments</h4></th>
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

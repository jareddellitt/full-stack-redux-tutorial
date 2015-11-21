import React from 'react';

export default React.createClass({
    getPair: function () {
        return this.props.pair || [];
    },

    isDisabled: function () {
        return !!this.props.hasVoted;
    },

    hasVotedFor: function (e) {
        return this.props.hasVoted === e;
    },

    render: function () {
        return <div className="voting">
            {this.getPair().map(e =>
                <button key={e}
                        onClick={() => this.props.vote(e)}
                        disabled={this.isDisabled()}>
                    <h1>{e}</h1>
                    {this.hasVotedFor(e) ? <div className="label">Voted</div> : null}
                </button>
            )}
        </div>;
    }
});

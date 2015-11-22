import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Winner from './Winner';
import {connect} from 'react-redux';

export const Results = React.createClass({
    mixins: [PureRenderMixin],

    getPair: function () {
        return this.props.pair || [];
    },

    getVotes: function (entry) {
        if (this.props.tally && this.props.tally.has(entry)) {
            return this.props.tally.get(entry);
        }

        return 0;
    },

    render: function () {
        return this.props.winner ?
        <Winner ref="winner" winner={this.props.winner} /> :
        <div className="results">
            <div className="tally">
                {this.getPair().map(e =>
                    <div key={e} className="entry">
                        <h1>{e}</h1>
                        <div className="voteCount">
                            {this.getVotes(e)}
                        </div>
                    </div>
                )}
            </div>
            <div className="management">
                <button ref="next" className="next" onClick={this.props.next}>Next</button>
            </div>
        </div>;
    }
});

function mapStateToProps(state) {
    return {
        pair: state.getIn(['vote', 'pair']),
        tally: state.getIn(['vote', 'tally']),
        winner: state.get('winner')
    };
}

export const ResultsContainer = connect(mapStateToProps)(Results);
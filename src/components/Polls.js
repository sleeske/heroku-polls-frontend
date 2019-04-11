import React, { Component, Fragment } from 'react';
import { getPolls, registerVote } from '../requests';
import Poll from './Poll';

class Polls extends Component {
  constructor(props) {
    super(props);

    this.state = {
      polls: [],
    };
  }

  componentDidMount() {
    getPolls().then(res => {
      this.setState({
        polls: res.data,
      });
    });
  }

  submitVote = (pollId, choiceId) => {
    registerVote(pollId, choiceId).then(res => {
      this.updatePoll(res.data);
    });
  };

  updatePoll = poll => {
    let polls = this.state.polls;
    polls = polls.map(p => (p.id === poll.id ? poll : p));
    this.setState({ polls });
  };

  render() {
    const { polls } = this.state;

    return (
      <Fragment>
        {polls.map(poll => (
          <Poll poll={poll} key={poll.id} submitVote={this.submitVote} />
        ))}
      </Fragment>
    );
  }
}

export default Polls;

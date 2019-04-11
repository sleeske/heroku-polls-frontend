import axios from 'axios';

const getPolls = () => {
  return axios.get('polls/');
};

const registerVote = (pollId, choiceId) => {
  return axios.post(`polls/${pollId}/vote/`, { choice: choiceId });
};

export { getPolls, registerVote };

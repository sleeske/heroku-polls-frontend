import React, { Component } from 'react';
import {
  Card,
  CardHeader,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  withStyles,
  Divider,
  Button,
} from '@material-ui/core';
import { format } from 'date-fns';
import PieChart from 'react-minimal-pie-chart';

const styles = {
  questionContainer: {
    display: 'flex',
    maxWidth: '900px',
    margin: '50px auto',
  },
  questionDetails: {
    margin: '10px 20px',
    display: 'flex',
    flexDirection: 'column',
    width: '50%',
  },
  questionForm: {
    display: 'flex',
    flexDirection: 'column',
    padding: '16px',
  },
  formButton: {
    alignSelf: 'center',
    width: '50%',
  },
  questionAnswers: {
    marginBottom: '16px',
  },
  chartDetails: {
    display: 'flex',
    justifyContent: 'center',
    width: '50%',
    backgroundColor: '#eee',
  },
  chart: {
    margin: '20px 20px',
    height: 'calc(100% - 40px)',
  },
  chartNoVotes: {
    alignSelf: 'center',
  },
};

const pieColors = ['#003f5c', '#2f4b7c', '#665191', '#a05195', '#d45087', '#f95d6a', '#ff7c43', '#ffa600'];

const getColor = index => {
  return pieColors[index % (pieColors.length + 1)];
};

class Poll extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: null,
    };
  }

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  handleSubmit = event => {
    this.props.submitVote(this.props.poll.id, this.state.value);
    event.preventDefault();
  };

  render() {
    const { classes, poll } = this.props;
    const pubDate = format(new Date(poll.pub_date), 'YYYY/MM/DD HH:mm:ss');
    const displayChart = poll.total_votes > 0;
    const chartData = poll.choices
      .filter(choice => choice.votes > 0)
      .map((choice, index) => ({
        title: choice.choice_text,
        value: choice.votes,
        color: getColor(index),
      }));

    return (
      <Card className={classes.questionContainer}>
        <div className={classes.questionDetails}>
          <CardHeader title={poll.question_text} subheader={`Published on ${pubDate}`} />
          <Divider className={classes.divider} />
          <form className={classes.questionForm} onSubmit={this.handleSubmit}>
            <FormControl component="fieldset" className={classes.questionAnswers}>
              <RadioGroup name={`poll${poll.id}`} value={this.state.value} onChange={this.handleChange}>
                {poll.choices.map(choice => (
                  <FormControlLabel
                    key={choice.id}
                    value={`${choice.id}`}
                    control={<Radio />}
                    label={choice.choice_text}
                  />
                ))}
              </RadioGroup>
            </FormControl>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              className={classes.formButton}
              disabled={!this.state.value}
            >
              Submit
            </Button>
          </form>
        </div>
        <div className={classes.chartDetails}>
          {displayChart && (
            <PieChart
              data={chartData}
              className={classes.chart}
              animate
              label={({ data, dataIndex }) => data[dataIndex].title}
              labelStyle={{
                fontSize: '5px',
                fontFamily: 'Roboto',
                fontWeight: '500',
                fill: '#ffffff',
              }}
            />
          )}
          {!displayChart && <div className={classes.chartNoVotes}>No votes registered!</div>}
        </div>
      </Card>
    );
  }
}

export default withStyles(styles)(Poll);

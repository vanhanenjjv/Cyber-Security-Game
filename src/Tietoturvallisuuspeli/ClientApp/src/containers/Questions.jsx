import { Grid, Paper, Typography, withStyles } from '@material-ui/core';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Choice from '../components/Choice.jsx';
import Action from '../components/Action';
import * as quiz from '../actions/quiz';

const styles = theme => ({
  card: {
    padding: theme.spacing.unit * 1.5,
  },
  question: {
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing.unit * 3,
    margin: theme.spacing.unit * 0.06
  },
  questionText: {
    color: theme.palette.primary.contrastText
  },
  playAgain: {
    height: 80
  },
});

class Questions extends Component {

  createChoices = (choices, twoRemoved) => {
    // Disables two choices if the user has used the 'remove two' action.
    if (twoRemoved) {
      const correctChoice = choices.filter(c => c.isCorrect)[0];
      const range = 1 / choices.length;
      let removed = 0;

      do {
        const rng = Math.floor(Math.random() / range);
        const choice = choices[rng];

        if ((choice !== correctChoice) && (choice.removed !== true)) {
          choice.removed = true;
          ++removed;
        }
      } while (removed < 2);
    } 

    return choices.map((c, i) => (
      <Grid item key={i}>
        <Choice content={c.content} isCorrect={c.isCorrect} removed={c.removed} />
      </Grid>
    ));
  }

  render = () => {
    const { classes, question, skip, removeTwo, canRemoveTwo, canSkip, twoRemoved } = this.props;
    const choices = this.createChoices(question.answers, twoRemoved);

    return (
      <Paper className={classes.card}>
        <Grid item container
          direction='column'
          spacing={8}>
          {/* Question */}
          <Grid item>
            <Paper elevation={5}
              className={classes.question}>
              <Typography variant='h6' align='center'
                className={classes.questionText}>
                {question.content}
              </Typography>
            </Paper>
          </Grid>

          {/* Choices */}
          <Grid item container
            direction='column'
            spacing={8}>
            {choices}
          </Grid>

          {/* Actions */}
          <Grid item container
            spacing={8}>
            <Grid item xs>
              <Action content='Poista kaksi' action={removeTwo} usable={canRemoveTwo} />
            </Grid>
            <Grid item xs>
              <Action content='Ohita kysymys' action={skip} usable={canSkip} />
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

const mapStateToProps = state => ({
  question: state.quiz.questions[state.quiz.currentQuestionIndex],
  canSkip: state.quiz.canSkipQuestion,
  canRemoveTwo: state.quiz.canRemoveTwoChoices,
  twoRemoved: state.quiz.twoChoicesRemoved,
});

const mapDispatchToProps = dispatch => ({
  skip: () => dispatch(quiz.skipQuestion()),
  removeTwo: () => dispatch(quiz.removeTwoChoices()),
  reset: () => dispatch(quiz.reset())
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Questions));

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Questions from './Questions';
import Results from './Results';
import * as quiz from '../actions/quiz';
import { withStyles, Typography } from '@material-ui/core';

class Quiz extends Component {

  componentDidMount = () => {
    const { fetch } = this.props;

    fetch(5);
  }

  render = () => {
    const { ready, answeringQuestions } = this.props;

    if (!ready) {
      return (
        <Typography variant='subtitle2'>
          Loading...
        </Typography>
      );
    }

    return answeringQuestions ? <Questions /> : <Results />
  }
}

const styles = theme => ({

});

const mapStateToProps = state => ({
  ready: state.quiz.ready,
  answeringQuestions: state.quiz.currentQuestionIndex < state.quiz.questions.length
});

const mapDispatchToProps = dispatch => ({
  fetch: amount => dispatch(quiz.fetchQuestions(amount))
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Quiz));
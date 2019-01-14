import React from 'react';
import { Button, withStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import * as quiz from '../actions/quiz';

const Choice = ({ content, isCorrect, removed, next, classes }) => (
  <Button variant='contained' color='primary' disabled={removed} onClick={() => next(isCorrect)} fullWidth className={classes.button}>
    {content}
  </Button>
);

const styles = theme => ({
  button: {
    height: 100
  }
});

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
  next: isCorrect => dispatch(quiz.nextQuestion(isCorrect))
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Choice));

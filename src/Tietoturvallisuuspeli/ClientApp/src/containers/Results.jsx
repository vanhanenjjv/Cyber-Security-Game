import React, { Component } from 'react';
import { MobileStepper, Button, Grid, withStyles, Portal, Typography, Paper } from '@material-ui/core';
import { KeyboardArrowLeft, KeyboardArrowRight, Refresh } from '@material-ui/icons';
import Summary from '../components/Summary';
import { connect } from 'react-redux';
import * as quiz from '../actions/quiz';

class Results extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentView: 0
    };
  }

  handleBack = () => {
    this.setState({
      ...this.state,
      currentView: this.state.currentView - 1 
    });
  }

  handleNext = () => {
    const { currentView } = this.state;
    const { reset, fetch } = this.props;

    if (currentView < 2) {
      this.setState({
        ...this.state,
        currentView: this.state.currentView + 1
      });
    } else {
      reset();
      fetch(5);
    }
  }

  views = () => {
    const { score, answers, classes } = this.props;

    return [
      (
        <Grid item>
          <Paper className={classes.card}>
            <Typography variant='h4' align='center' gutterBottom>
              Vastasit {score}/{answers.length} kysymyksistä oikein
            </Typography>
            <Typography variant='subtitle2' align='center'>
              Paina 'seuraava' nähdäksesi oikeat vastaukset kysymyksiin.
            </Typography>
          </Paper>
        </Grid>
        
      ),
      (
        answers.map((a, i) => (
          <Grid item key={i}>
            <Summary question={a.question} answer={a.rightChoice} 
              answeredCorrectly={a.answeredCorrectly} skipped={a.skippedQuestion}
              twoRemoved={a.twoChoicesRemoved} key={i} />
          </Grid>
        ))
      ),
      (
        <Grid item>
          <Paper className={classes.card}>
            <Grid item container
              direction='column'
              alignItems='center'
              spacing={16}>
              <Grid item xs>
                <Typography variant='h6' align='center' gutterBottom>
                  Kiitos, kun pelasit Tietoturvallisuuspeliä. 
                </Typography>
              </Grid>
              <Grid item xs>
                <img 
                  src={`${process.env.PUBLIC_URL}/onniboy.png`}
                  alt='Onni-poika' />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        
        
      )
    ];
  }

  render = () => {
    const { currentView } = this.state;
    const { classes } = this.props;

    return (
      <>
        <Grid container
          direction='column'
          spacing={16}
          className={classes.content}>
          {this.views()[currentView]}
        </Grid>
      
        <Portal container={this.action}>
          <MobileStepper className={classes.stepper}
            variant='dots'
            steps={3}
            position='static'
            activeStep={currentView}
            nextButton={
              <Button size='small' onClick={this.handleNext}>
                {currentView < 2 ? 'Seuraava' : 'Uudelleen'}
                {currentView < 2 ? <KeyboardArrowRight /> : <Refresh />}
              </Button>
            }
            backButton={
              <Button size='small' onClick={this.handleBack} disabled={currentView === 0}>
                <KeyboardArrowLeft />
                Takaisin
              </Button>
            } />
        </Portal>
      </>
    );
  }
}

const styles = theme => ({
  onni: {
    // minHeight: 300
  },
  card: {
    padding: theme.spacing.unit * 1.5
  },
  content: {
    marginBottom: 50
  },
  stepper: {
    width: '100%',
    position: 'fixed',
    bottom: 0
  }
});

const mapStateToProps = state => ({
  answers: state.quiz.answers,
  score: state.quiz.score
});

const mapDispatchToProps = dispatch => ({
  reset: () => dispatch(quiz.reset()),
  fetch: amount => dispatch(quiz.fetchQuestions(amount))
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Results));

import React from 'react';
import { Typography, CardActions, withStyles, Chip, Card, CardContent } from '@material-ui/core';
import { Done, Redo, Clear, Filter2 } from '@material-ui/icons';

const styles = theme => ({
  correctAnswer: {
    backgroundColor: '#00E676',
    color: '#fff'
  },
  wrongAnswer: {
    backgroundColor: theme.palette.error.main,
    color: '#fff'
  },
  action: {
    backgroundColor: '#ff8f00',
    color: '#fff'
  },
  card: {
    padding: theme.spacing.unit
  },
  chip: {
    padding: '4px 8px'
  }
});

const Summary = ({ question, answer, answeredCorrectly, skipped, twoRemoved, classes }) => {
  const actions = [];

  if (skipped) {
    actions.push(
      <Chip label='Ohitettu'
        
        icon={<Redo />}
        classes={{
          root: classes.chip,
          colorPrimary: classes.action,
          iconColorPrimary: classes.action
        }}
        color='primary'
        key='skip' />
    );
  }
  if (twoRemoved) {
    actions.push(
      <Chip label='kaksi poistettu'
        icon={<Filter2 />}
        classes={{
          root: classes.chip,
          colorPrimary: classes.action,
          iconColorPrimary: classes.action
        }}
        color='primary'
        key='removeTwo' />
    );
  }

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant='h6' gutterBottom>
          {question}
        </Typography>
        <Typography variant='body2'>
          {answer}
        </Typography>
      </CardContent>
      <CardActions>
        <Chip label={answeredCorrectly ? 'Oikein' : 'Väärin'}
          icon={answeredCorrectly ? <Done /> : <Clear />}
          classes={{
            root: classes.chip,
            colorPrimary: answeredCorrectly ? classes.correctAnswer : classes.wrongAnswer,
            iconColorPrimary: answeredCorrectly ? classes.correctAnswer : classes.wrongAnswer
          }}
        color='primary' />
        {actions}
      </CardActions>
    </Card>
  );
}

export default withStyles(styles)(Summary);

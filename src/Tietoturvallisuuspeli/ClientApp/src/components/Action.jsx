import React from 'react';
import { Button, withStyles } from '@material-ui/core';

const styles = theme => ({
  button: {
    height: 100
  }
});

const Action = ({ content, action, usable, classes }) => (
  <Button variant='contained' color='secondary' onClick={action} disabled={!usable} className={classes.button} fullWidth>
    {content}
  </Button>
);

export default withStyles(styles)(Action);

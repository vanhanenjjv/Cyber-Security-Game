import React from 'react';
import { withWidth, withStyles } from '@material-ui/core';
import NavBar from './NavBar';

const styles = theme => ({
  main: {
    padding: theme.spacing.unit * 2
  },
  content: {
    maxWidth: 640,
    margin: 'auto'
  }
});

const Layout = ({ children, classes }) => (
  <>
    <NavBar />
    <main className={classes.main}>
      <div className={classes.content}>
        {children}
      </div>
    </main>
    <div ref={ref => {
      const actions = ref;
    }} />
  </>
);

export default withWidth()(withStyles(styles)(Layout));

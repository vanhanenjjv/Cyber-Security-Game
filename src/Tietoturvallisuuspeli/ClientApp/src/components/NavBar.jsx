import React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';

const NavBar = () => (
  <AppBar position='sticky'>
    <Toolbar variant='dense'>
      <Typography variant="h6" color="inherit">
        Tietoturvallisuuspeli
      </Typography>
    </Toolbar>
  </AppBar>
);

export default NavBar;

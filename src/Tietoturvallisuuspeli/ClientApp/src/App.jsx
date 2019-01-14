import React from 'react';
import Layout from './components/Layout';
import Quiz from './containers/Quiz';
import { CssBaseline, createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import { blue } from '@material-ui/core/colors';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  },
  palette: {
    primary: blue,
    secondary: {
      main: '#ff5722'
    }
  }
});

const App = () => (
  <>
    <CssBaseline />
    <MuiThemeProvider theme={theme}>
      <Layout>
        <Quiz />
      </Layout>
    </MuiThemeProvider>
  </>
);

export default App;

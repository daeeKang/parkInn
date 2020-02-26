import React, { Component } from 'react';
import Sidebar from './Components/Sidebar/Sidebar';
import Main from './Components/Main';

class App extends Component {
  render() {
    return (
      <div>
        <Sidebar />
        <Main id='page-wrap' />
      </div>
    );
  }
}

export default App;

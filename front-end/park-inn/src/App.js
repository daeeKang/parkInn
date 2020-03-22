import React, { Component } from 'react';
import './App.css'
import Header from './Components/Header/Header';
import Sidebar from './Components/Sidebar/Sidebar';
import Main from './Components/Main';
import Footer from './Components/Footer/Footer';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Sidebar />
        <Main id='page-wrap' />
        <Footer />
      </div>
    );
  }
}

export default App;

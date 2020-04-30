import React, { Component } from 'react';
import './App.css';
import Header from './Components/Header/Header';
// import Sidebar from './Components/Sidebar/Sidebar';
import Main from './Components/Main';
import Footer from './Components/Footer/Footer';
import Loading from './Components/LoadingPage/Loading';
import { useAuth0 } from './react-auth0-spa'

const App = () => {
  const { loading } = useAuth0();
  //This can definitely be changed to something else later lol
  if (loading) {
    return <Loading />;
  }

  return (
    <div class="app">
    {/* <Header /> */}
    {/* <Sidebar /> */}
    <Main id="page-wrap" />
    {/* <Footer /> */}
  </div>
  );
};

/* Couldn't Use Hooks inside of Class ): */

// class App extends Component {
//   render() {
//     return this.loading ? <div>Loading...</div> : (
//       <div class="app">
//         <Header />
//         {/* <Sidebar /> */}
//         <Main id="page-wrap" />
//         <Footer />
//       </div>
//     );
//   }
// }

export default App;

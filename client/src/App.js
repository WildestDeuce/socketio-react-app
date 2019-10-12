import React from 'react';
import subscribeToTimer from "./utils/API";
import Chatbox from "./components/Chatbox/Chatbox";
import ChannelPage from "./components/ChannelPage/ChannelPage";
import './App.css';

class App extends React.Component {

  constructor(props) {
    super(props);

    subscribeToTimer(1000, (err, timestamp) => this.setState({
      timestamp
    }));
  }

  state = {
    timestamp: "no timestamp yet"
  };



  render() {
    return (

      <div className="App">
        <p className="App-intro">
          This is the timer value: {this.state.timestamp}
        </p>
        <Chatbox />
        <ChannelPage />
      </div>

    );
  }
}

export default App;

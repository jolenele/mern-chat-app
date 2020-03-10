import React from 'react';
// import config from './config';
//import io from 'socket.io-client';
import socketIOClient from 'socket.io-client';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import './App.css';
import ChatInput from './ChatInput';

let socket;
const sendMessage = msg => {
  socket.emit('new_message', msg);
};

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      chat: [],
      content: '',
      username: '',
      server: 'http://localhost:5000',
      // endpoint: 'http://localhost:4000/',
    };
    // this.socket = socketIOClient();
  }

  componentDidMount() {
    // this.socket = io(config[process.env.NODE_ENV].endpoint);
    // const { endpoint } = this.state.endpoint;
    socket = socketIOClient.connect('http://localhost:5000/');
    // socket.on('new_message', msg => {
    //   console.log(msg);
    //   this.setState(
    //     state => ({
    //       chat: [...state.chat, ...msg.reverse()],
    //     }),
    //     this.scrollToBottom
    //   );
    // });
  }

  // addChat(msg) {
  //   const { message } = msg;
  //   this.setState(
  //     state => ({
  //       chat: [...state.chat, ...message.reverse()],
  //     }),
  //     this.scrollToBottom
  //   );
  // }
  componentDidUpdate() {
    // socket.on('new_message', message => {
    //   console.log('this is msg ', message.content);
    //   const { msg } = message;
    //   this.addChat(msg);
    // });
  }

  handleContent(event) {
    this.setState({
      content: event.target.value,
    });
  }

  handleName(event) {
    this.setState({
      username: event.target.value,
    });
  }

  // Always scoll to the bottom
  scrollToBottom() {
    const chat = document.getElementById('chat');
    chat.scrollTop = chat.scrollHeight;
  }

  handleSubmit(event) {
    console.log(event);

    // Prevent the form to reload the current page.
    event.preventDefault();

    this.setState(state => {
      console.log(state);
      console.log('this is socket ', socket);
      // Emit event to backend
      const message = {
        username: this.state.username,
        content: this.state.content,
      };
      console.log('submit message ', message);
      sendMessage(message);
      // this.addChat(message);

      return {
        chat: [
          ...state.chat,
          {
            username: state.username,
            content: state.content,
          },
        ],
        content: '',
      };
    }, this.scrollToBottom);
  }

  render() {
    return (
      <div className='App'>
        <Paper id='chat' elevation={3}>
          {this.state.chat.map((msg, index) => {
            return (
              <div key={index}>
                <Typography variant='subtitle2' align='left'>
                  {msg.username}
                </Typography>
                <Typography variant='body1' align='left'>
                  {msg.content}
                </Typography>
              </div>
            );
          })}
        </Paper>
        <ChatInput
          content={this.state.content}
          handleContent={this.handleContent.bind(this)}
          handleName={this.handleName.bind(this)}
          handleSubmit={this.handleSubmit.bind(this)}
          username={this.state.username}
        />
      </div>
    );
  }
}

export default App;

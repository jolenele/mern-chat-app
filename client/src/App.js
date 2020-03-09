import React from 'react';
import config from './config';
import io from 'socket.io-client';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

// import BottomBar from './BottomBar';
import ChatInput from './ChatInput';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      chat: [],
      message: '',
      name: '',
    };
  }

  componentDidMount() {
    this.socket = io(config[process.env.NODE_ENV].endpoint);

    // Load the last 10 messages in the window.
    this.socket.on('show_message', msg => {
      this.setState(
        state => ({
          chat: [...state.chat, ...msg.reverse()],
        }),
        this.scrollToBottom
      );
    });

    // Update the chat if a new message is broadcasted.
    this.socket.on('noti_msg', msg => {
      this.setState(
        state => ({
          chat: [...state.chat, msg],
        }),
        this.scrollToBottom
      );
    });
  }

  // Save the message the user is typing in the input field.
  handleMessage(event) {
    this.setState({
      message: event.target.value,
    });
  }

  //
  handleName(event) {
    this.setState({
      name: event.target.value,
    });
  }

  // When the user is posting a new message.
  handleSubmit(event) {
    console.log(event);

    // Prevent the form to reload the current page.
    event.preventDefault();

    this.setState(state => {
      console.log(state);
      console.log('this', this.socket);
      // Send the new message to the server.
      this.socket.emit('new_message', {
        name: state.name,
        message: state.message,
      });

      // Update the chat with the user's message and remove the current message.
      return {
        chat: [
          ...state.chat,
          {
            name: state.name,
            message: state.message,
          },
        ],
        message: '',
      };
    }, this.scrollToBottom);
  }

  // Always make sure the window is scrolled down to the last message.
  scrollToBottom() {
    const chat = document.getElementById('chat');
    chat.scrollTop = chat.scrollHeight;
  }

  render() {
    return (
      <div className='App'>
        <Paper id='chat' elevation={3}>
          {this.state.chat.map((el, index) => {
            return (
              <div key={index}>
                <Typography variant='caption' className='name'>
                  {el.name}
                </Typography>
                <Typography variant='body1' className='message'>
                  {el.message}
                </Typography>
              </div>
            );
          })}
        </Paper>
        <ChatInput
          message={this.state.message}
          handleMessage={this.handleMessage.bind(this)}
          handleName={this.handleName.bind(this)}
          handleSubmit={this.handleSubmit.bind(this)}
          name={this.state.name}
        />
      </div>
    );
  }
}

export default App;

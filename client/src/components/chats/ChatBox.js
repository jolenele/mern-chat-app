import React, { useState, useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';

import Paper from '@material-ui/core/Paper';
import { Context } from '../../state/globalState';
import ChatBar from './ChatBar';

export const ChatBox = () => {
  const {
    chats,
    activeRoom,
    sendChatAction,
    sendUserLeft,
    getChats,
    user,
    token,
    users,
    getUsers,
  } = useContext(Context);
  const [message, setMessage] = useState([]);
  const [navigate, setNavigate] = useState(false);

  useEffect(() => {
    getChats(token);
    getUsers(token);
  }, []);

  const handleLogout = () => {
    sendUserLeft(user);
    setNavigate(true);
  };

  const handleSubmit = () => {
    sendChatAction({
      author: user,
      message: message,
      room: activeRoom || 'General',
    });
    setMessage('');
  };

  const handleContent = log => {
    if (log.keyCode === 13) {
      handleSubmit();
    }
    log.preventDefault();
  };

  if (navigate) {
    return <Redirect to='/' push={true} />;
  }

  return (
    <div id='chatBox'>
      <Paper id='chat' elevation={3}>
        {this.state.chats.map((msg, index) => {
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

      <ChatBar
        content={this.state.content}
        handleContent={this.handleContent.bind(this)}
        handleSubmit={this.handleSubmit.bind(this)}
        username={this.state.username}
      />
    </div>
  );
};

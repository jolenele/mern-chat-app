import React, { useState, useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import moment from 'moment';
import PersonIcon from '@material-ui/icons/Person';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
import Input from '@material-ui/core/Input';
import { Context } from '../state/globalState';
import ChatBar from './ChatBar';

const ChatBox = () => {
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
      <div className='message-list'>
        {chats
          .filter(chat => chat.room === activeRoom)
          .map(chat => (
            <div key={chat._id} className='message-list-container'>
              <Chip
                icon={<FaceIcon />}
                key='icon'
                label={chat.author}
                variant='outlined'
              />
              <Typography className='inline' key='message' variant='body1'>
                {chat.message}
              </Typography>
            </div>
          ))}
      </div>
      <ChatBar
        content={this.state.content}
        handleContent={this.handleContent.bind(this)}
        handleSubmit={this.handleSubmit.bind(this)}
        username={this.state.username}
      />
    </div>
  );
};

export default ChatBox;

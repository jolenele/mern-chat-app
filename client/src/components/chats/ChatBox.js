import React, { useState, useEffect, useContext, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { Context } from '../../state/globalState';
// import ChatBar from './ChatBar';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import { getChats, getUser } from '../../actions/chats';

const ChatBox = () => {
  const { chats, rooms, user, newChat } = useContext(Context);
  const [message, setMessage] = useState([]);
  const [navigate] = useState(false);
  const [token] = useState('');

  useEffect(() => {
    console.log('chats ', chats);
    getChats(token);
    getUser(token);
  }, []);

  const handleSubmit = () => {
    newChat({
      author: user,
      chats: chats,
      rooms: rooms || 'Public',
    });
    setMessage('');
  };

  const handleContent = (log) => {
    if (log.keyCode === 13) {
      handleSubmit();
    }
    log.preventDefault();
  };

  if (navigate) {
    return <Redirect to='/' push={true} />;
  }

  return (
    <Fragment>
      <div className='chat-box'>
        {chats
          .filter((chat) => chat.rooms === rooms)
          .map((chat) => (
            <div key={chat._id}>
              <Typography className='inline' key='message' variant='body1'>
                {chat.message}
              </Typography>
            </div>
          ))}
        <div>
          <Input
            type='text'
            id='inputMessage'
            name='message'
            value={message}
            onKeyUp={(e) => handleContent(e)}
            onChange={(e) => setMessage(e.target.value)}
            placeholder='Type a message'
          ></Input>
          <div>
            <Button
              variant='contained'
              id='sendButton'
              color='primary'
              onClick={() => {
                handleSubmit();
              }}
            >
              Send
            </Button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ChatBox;

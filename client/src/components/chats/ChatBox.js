import React, { useState, useEffect, useContext, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { Context } from '../../state/globalState';
// import ChatBar from './ChatBar';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';

const ChatBox = () => {
  const {
    chats,
    room,
    sendChatAction,
    getChats,
    user,
    token,
    getUsers,
  } = useContext(Context);
  const [message, setMessage] = useState([]);
  const [navigate] = useState(false);

  useEffect(() => {
    console.log('chats ', chats);
    getChats(token);
    getUsers(token);
  }, []);

  const handleSubmit = () => {
    sendChatAction({
      author: user,
      chats: chats,
      room: room || 'Public',
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
          .filter((chat) => chat.room === room)
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

// <div id='chatBox'>
//       <Paper id='chat' elevation={3}>
//         {chats.map((msg, index) => {
//           return (
//             <div key={index}>
//               <Typography variant='subtitle2' align='left'>
//                 {msg.username}
//               </Typography>
//               <Typography variant='body1' align='left'>
//                 {msg.content}
//               </Typography>
//             </div>
//           );
//         })}
//       </Paper>

//       <ChatBar
//         content={this.state.content}
//         handleContent={this.handleContent.bind(this)}
//         handleSubmit={this.handleSubmit.bind(this)}
//         username={this.state.username}
//       />
//     </div>

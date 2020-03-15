import React from 'react';

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
  } = useContext(GlobalContext);
  const [message, setMessage] = useState([]);
  const [navigate, setNavigate] = useState(false);

  useEffect(() => {
    getChats(token);
    getUsers(token);
  }, []);

  handleLogout = () => {
    sendUserLeft(user);
    setNavigate(true);
  };

  handleSubmit = () => {
    sendChatAction({
      author: user,
      message: message,
      room: activeRoom || 'General',
    });
    setMessage('');
  };

  handleContent = log => {
    if (log.keyCode === 13) {
      handleSubmit();
    }
    log.preventDefault();
  };

  if (navigate) {
    return <Redirect to='/' push={true} />;
  }

  return (
    <div>
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
};

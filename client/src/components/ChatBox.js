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
    <div id='chatBox'>
      <Toolbar
        title={activeRoom}
        key='toolbar'
        rightItems={[
          <div>
            <Typography key='user' variant='body1'>
              Hello, {user}
            </Typography>
            <Button
              key='buttonLogout'
              color='secondary'
              variant='outlined'
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>,
        ]}
        leftItems={[
          <div>
            <Typography key='user_counts' variant='body1'>
              <PersonIcon key='Icon'></PersonIcon>
              {users.length}
            </Typography>
          </div>,
        ]}
      />

      <div>
        {chats
          .filter(chat => chat.room === activeRoom)
          .map(chat => (
            <div key={chat.id}>
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
      <ChatInput
        content={this.state.content}
        handleContent={this.handleContent.bind(this)}
        handleSubmit={this.handleSubmit.bind(this)}
        username={this.state.username}
      />
    </div>
  );
};

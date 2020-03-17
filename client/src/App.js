import React, { Fragment, useEffect } from 'react';
import NavBar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import ChatBox from './components/chats/ChatBox';

// Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './actions/setAuthToken';

// let socket;
// const sendMessage = msg => {
//   socket.emit('new_message', msg);
// };

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
      store.dispatch(loadUser());
    }
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <NavBar />
          <Route exact path='/' component={Landing} />
          <section className='container'>
            <Switch>
              <Route exact path='/chats' component={ChatBox} />
              <Route exact path='/register' component={Register} />
              <Route exact path='/login' component={Login} />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;

// constructor(props) {
//   super(props);

//   this.state = {
//     chat: [],
//     content: '',
//     username: '',
//     server: 'http://localhost:5000',
//   };
// }

// componentDidMount() {
//   socket = socketIOClient.connect('http://localhost:5000/');

//   // Load the 10 latest messages from the database
//   socket.on('show_message', msg => {
//     console.log(msg);
//     this.setState(
//       state => ({
//         chat: [...state.chat, ...msg.reverse()],
//       }),
//       this.scrollToBottom
//     );
//   });

//   // Update with new broadcasted message
//   socket.on('push_message', msg => {
//     console.log(msg);
//     this.setState(
//       state => ({
//         chat: [...state.chat, msg],
//       }),
//       this.scrollToBottom
//     );
//   });
// }

// componentDidUpdate() {}

// handleContent(event) {
//   this.setState({
//     content: event.target.value,
//   });
// }

// handleName(event) {
//   this.setState({
//     username: event.target.value,
//   });
// }

// // Always scoll to the bottom
// scrollToBottom() {
//   const chat = document.getElementById('chat');
//   chat.scrollTop = chat.scrollHeight;
// }

// handleSubmit(event) {
//   console.log(event);

//   // Prevent the form to reload the current page.
//   event.preventDefault();

//   this.setState(state => {
//     console.log(state);
//     console.log('this is socket ', socket);
//     // Emit event to backend
//     const message = {
//       username: this.state.username,
//       content: this.state.content,
//     };
//     console.log('submit message ', message);
//     sendMessage(message);
//     // this.addChat(message);

//     return {
//       chat: [
//         ...state.chat,
//         {
//           username: state.username,
//           content: state.content,
//         },
//       ],
//       content: '',
//     };
//   }, this.scrollToBottom);
// }

// render() {
//   return (
//     <div className='App'>
//       <Paper id='chat' elevation={3}>
//         {this.state.chat.map((msg, index) => {
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
//         handleName={this.handleName.bind(this)}
//         handleSubmit={this.handleSubmit.bind(this)}
//         username={this.state.username}
//       />
//     </div>
//   );
// }

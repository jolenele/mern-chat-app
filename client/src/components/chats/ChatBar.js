import React from 'react';

import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Input from '@material-ui/core/Input';
import Toolbar from '@material-ui/core/Toolbar';
import ChatIcon from '@material-ui/icons/Chat';
import FaceIcon from '@material-ui/icons/Face';

const useStyles = makeStyles((theme) => ({
  appBar: {
    bottom: 0,
    top: 'auto',
  },
  inputContainer: {
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    borderRadius: theme.shape.borderRadius,
    marginLeft: theme.spacing(1),
    position: 'relative',
    width: '100%',
  },
  icon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
}));

export default function ChatBar(props) {
  const classes = useStyles();

  return (
    <AppBar position='fixed' className={classes.appBar}>
      <Toolbar>
        <div className={classes.inputContainer} style={{ maxWidth: '200px' }}>
          <div className={classes.icon}>
            <FaceIcon />
          </div>
        </div>
        <div className={classes.inputContainer}>
            <div className={classes.icon}>
              <ChatIcon />
            </div>
            <Input
              onChange={props.handleContent}
              type="text"
              value={props.content}
              placeholder='Type your message...'
              classes = {{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
            >
            </Input>
        </div>
      </Toolbar>
    </AppBar>
  );
}

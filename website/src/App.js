import React, { useState } from 'react';
import './App.css';

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

import * as firebase from 'firebase/app'
import 'firebase/auth'
import { Dialog, DialogTitle, TextField, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';

function LoginDialog(props) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)

  const handleSubmit = (event) => {
    event.preventDefault()

    firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
      props.onClose()
    }).catch(error => {
      setError(error.message)
    })
  }

  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <DialogTitle>Login</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Enter your credentials to login.
        </DialogContentText>
        <form id='login-form' style={{display: 'flex', flexDirection: 'column'}} onSubmit={handleSubmit}>
          <TextField label="Email" type="email" onChange={e => setEmail(e.target.value)}/>
          <TextField label="Password" type="password" onChange={e => setPassword(e.target.value)}/>
        </form>
        {error && <DialogContentText>{error}</DialogContentText>}
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose}>Cancel</Button>
        <Button form='login-form' type='submit'>Submit</Button>
      </DialogActions>
    </Dialog>
  )
}

function LoginButton(props) {
  const [open, setOpen] = useState(false)

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <Button onClick={() => setOpen(true)} {...props}>Login</Button>
      <LoginDialog open={open} onClose={handleClose} />
    </>
  )
}

class RestTest extends React.Component {
  state = {
    message: ""
  }

  componentDidMount() {
    fetch("https://test-web-app-255809.web.app/api/helloWorld")
      .then(res => res.text())
      .then(data => this.setState({message: data}))
      .catch(console.log)
  }

  render() {
    return (
      <Typography>{this.state.message}</Typography>
    )
  }
}

export default class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      user: null
    }


    firebase.auth().onAuthStateChanged(user =>{
      if (user) {
        this.setState({user: user})
      } else {
        this.setState({user: null})
      }
    })
  }

  render() {
    return (
      <>
        <AppBar position='static'>
          <Toolbar>
            <Typography variant='h6' style={{flexGrow: 1}}>Test Web App</Typography>
            {this.state.user
              ? <Button color='inherit' onClick={() => firebase.auth().signOut()}>Logout</Button>
              : <LoginButton color='inherit' />
            }
          </Toolbar>
        </AppBar>
        <RestTest />
      </>
    )
  }
}

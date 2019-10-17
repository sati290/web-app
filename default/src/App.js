import React from 'react';
import './App.css';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import * as firebase from 'firebase/app'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_ID
};

class LoginForm extends React.Component {
  state = {
    email: "",
    password: ""
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).catch(error => {
      alert("Sign in failed: " + error.message)
    })
  }

  render() {
    return (
      <Form onSubmit={(e) => this.handleSubmit(e)}>
        <Form.Group>
          <Form.Label>Email address</Form.Label>
          <Form.Control name="email" type="email" onChange={e => this.handleChange(e)}/>
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control name="password" type="password" onChange={e => this.handleChange(e)}/>
        </Form.Group>
        <Button type="submit">Submit</Button>
      </Form>
    )
  }
}

export default class App extends React.Component {
  state = {
    user: null
  }

  componentDidMount() {
    firebase.initializeApp(firebaseConfig)

    firebase.auth().onAuthStateChanged(user =>{
      if (user) {
        this.setState({user: user})
      } else {
        this.setState({user: null})
      }
    })
  }

  doLogout() {
    firebase.auth().signOut()
  }

  render() {
    const user = this.state.user

    return (
      <div>
        {user
          ? <div>Logged in as {user.email}. <Button onClick={() => this.doLogout()}>Logout</Button></div>
          : <LoginForm />
        }
      </div>
    )
  }
}

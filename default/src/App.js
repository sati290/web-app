import React from 'react';
import './App.css';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

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

  handleSubmit() {

  }

  render() {
    return (
      <Form onSubmit={() => this.handleSubmit()}>
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
    user: {}
  }

  handleLogin(event) {
  }

  render() {
    const { name } = this.state.user

    return (
      <div>
        {name
          ? "Logged in as " + name
          : <LoginForm onSubmit={e => this.handleLogin(e)} />
        }
      </div>
    )
  }
}

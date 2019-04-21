import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'


const axios = require('axios');

class CreateQuestion extends Component 
{

  constructor(props)
  {
      super(props);
        this.state = {

            show:true,
            };
            this.handleShow = this.handleShow.bind(this);
            this.handleClose = this.handleClose.bind(this);
            this.handleSave = this.handleSave.bind(this);
            this.handleChange = this.handleChange.bind(this);
  }

  handleShow() {
    this.setState({ show: true });
  }
  handleClose() {
    this.setState({ show: false });
  }
  handleChange(event)
  {
    const {name, value} = event.target;
    this.setState({ [name]: value });
  }
  handleSave(event) {
    event.preventDefault();
      this.props.close();
  }
  render() {
    let redirectVar = null;
    return (
    <div>
       <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Question</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <form method="post" onSubmit={this.handleSave}>
              <div className="form-group">
              <input type="text" name="question" className="form-control" placeholder="Questiob" required  onChange={this.handleChange} />
              </div>
              <div className="form-group">
              <input type="text" name="topic" className="form-control" placeholder="Topic" required onChange={this.handleChange} />
              </div>
            <div className="clearfix">
            </div>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>&nbsp;&nbsp;&nbsp;
            <Button variant="primary" onClick={this.handleSave}>
              Add Question
            </Button>
        </form>
          </Modal.Body>
        </Modal>
    </div>
    )
  }
}

export default CreateQuestion;

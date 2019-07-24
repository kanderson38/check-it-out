import React, { Component } from 'react';

import './AddNote.css';

class AddNote extends Component {

  constructor (props) {
    super(props);

    this.state = {
      noteText: ""
    }
  }

  changeNoteText = (event) => {
    this.setState({
      noteText: event.target.value,
    })
  }

  render () {
  return (
    <div className="add-note-full-page">
      <div className="add-note-container">
        <span className="add-note-header">Add a note (optional):</span>
        <textarea className="add-note-textarea" value={this.state.noteText} 
        placeholder="What do you like about this book?" 
        onChange={this.changeNoteText}></textarea>
        <div className="buttons-container">
          <span className="button note-button submit-button" onClick={() => this.props.addNoteCallback(this.state.noteText)}>Add Note</span>
          <span className="button note-button skip-button" onClick={this.props.skipNoteCallback}>Skip</span>
        </div>
      </div>
    </div>
  )}
}

export default AddNote;
import React from 'react';

import './AddNote.css';

const AddNote = (props) => {

  return (
    <div className="add-note-full-page">
      <div className="add-note-container">
        <span className="add-note-header">Add a note (optional):</span>
        <textarea className="add-note-textarea"></textarea>
      </div>
    </div>
  )
}

export default AddNote;
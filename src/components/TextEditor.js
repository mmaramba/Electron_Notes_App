import React from 'react';
import ReactQuill from 'react-quill';
import TypingToolbar from './TypingToolbar.js';

class TextEditor extends React.Component {
    constructor(props) {
      super(props)
      this.state = { text: '<p>Begin typing here!</p>' } // You can also pass a Quill Delta here
      this.handleChange = this.handleChange.bind(this)
    }
  
    handleChange(value) {
      this.setState({ text: value })
    }
  
    render() {
      return (
        <div>
            <TypingToolbar />
            <ReactQuill value={this.state.text}
                        onChange={this.handleChange} />
        </div>
      )
    }
  }

  export default TextEditor;
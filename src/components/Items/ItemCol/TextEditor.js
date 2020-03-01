import React from 'react';
import ReactQuill from 'react-quill';
import { Icon } from 'antd';
import './TextEditor.css';
import styled from 'styled-components';

// Register Quill font sizes
const Font = ReactQuill.Quill.import('formats/font');
Font.whitelist = ['large', 'medium', "small", "regular", "bold", "pullquote"] ;
ReactQuill.Quill.register(Font, true);

// From QuillJS Custom Toolbar Example
const CustomToolbar = () => (
  <div id="toolbar">
    <span className="ql-formats">
        <select className="ql-header" defaultValue={"3"} onChange={e => e.persist()}>
        <option value="3">Small</option>
        <option value="2">Medium</option>
        <option value="1">Large</option>
        </select>
    </span>
    <span className="ql-formats">
        <button className="ql-bold"></button>
        <button className="ql-italic">
        </button>
        <select className="ql-color" defaultValue={"black"}>
            <option value="red"></option>
            <option value="green"></option>
            <option value="blue"></option>
            <option value="orange"></option>
            <option value="violet"></option>
            <option value="#d0d1d2"></option>
            <option value="black"></option>
        </select>
        <select className="ql-background" defaultValue={"white"}>
            <option value="#a6b8bf"></option>
            <option value="green"></option>
            <option value="blue"></option>
            <option value="orange"></option>
            <option value="violet"></option>
            <option value="#d0d1d2"></option>
            <option value="white"></option>
        </select>
    </span>
    <span className="ql-formats">
        <button className="ql-list" value="ordered"></button>
        <button className="ql-list" value="bullet"></button>
    </span>
    <span className="ql-formats">
        <button className="ql-link"></button>
        <button className="ql-blockquote"></button>
        <button className="ql-code-block"></button>
    </span>
  </div>
)

const CategoryLabel = styled.h4`
  text-align: left;
  margin-left: 16px;
  color: rgba(0, 0, 0, 0.65);
  cursor: pointer;
  user-select: none;
`

const ItemTitle = styled.h2`
  text-align: left;
  margin-top: 8px;
  margin-left: 16px;
  cursor: pointer;
  user-select: none;
`

const StyledReactQuill = styled(ReactQuill)`
  height: 300px;
  width: 100%;
`

class TextEditor extends React.Component {
  constructor (props) {
    super(props)
    //console.log(this.props.content);
    //this.state = { editorHtml: this.props.content }
    //this.handleChange = this.handleChange.bind(this)
  }

  /*
  handleChange (html) {
    console.log("here...");
  	this.setState({ editorHtml: html });
  }

  
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.content !== prevProps.content) {
      this.setState({
        editorHtml: this.props.content
      });
    }
  }
  */

  render() {
    //console.log(this.state.editorHtml);
    return (
      <div>
        <CategoryLabel>
          <span><Icon type="folder" /> {this.props.cat}</span>
        </CategoryLabel>
        <CustomToolbar />
        <ItemTitle>{this.props.title}</ItemTitle>
        <StyledReactQuill
          onChange={this.props.handleContentChange}
          placeholder={this.props.placeholder}
          modules={TextEditor.modules}
          value={this.props.content}
        />
      </div>
    )
  }
}

// Attach Quill toolbar to module
TextEditor.modules = {
  toolbar: {
    container: "#toolbar",
    handlers: {
    }
  }
}

// Quill editor formats
TextEditor.formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'color',
]

export default TextEditor;
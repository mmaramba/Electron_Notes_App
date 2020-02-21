import React from 'react';
import ReactQuill from 'react-quill';
import { Icon } from 'antd';
import './TextEditor.css'

/*
 * Custom "star" icon for the toolbar using an Octicon
 * https://octicons.github.io
 */
const CustomButton = () => <Icon type="star" theme="filled"/>

const Font = ReactQuill.Quill.import('formats/font');
Font.whitelist = ['large', 'medium', "small", "regular", "bold", "pullquote"] ;
ReactQuill.Quill.register(Font, true);


/*
 * Event handler to be attached using Quill toolbar module
 * http://quilljs.com/docs/modules/toolbar/
 */
function insertStar () {
  const cursorPosition = this.quill.getSelection().index
  this.quill.insertText(cursorPosition, "★")
  this.quill.setSelection(cursorPosition + 1)
}

/*
 * Custom toolbar component including insertStar button and dropdowns
 */
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

/*
 * Editor component with custom toolbar and content containers
 */
class TextEditor extends React.Component {
  constructor (props) {
    super(props)
    //console.log(this.props.content);
    this.state = { editorHtml: this.props.content }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (html) {
  	this.setState({ editorHtml: html });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.content !== prevProps.content) {
      this.setState({
        editorHtml: this.props.content
      });
    }
  }

  render() {
    console.log(this.state.editorHtml);
    return (
      <div className="text-editor">
        <CustomToolbar />
        <ReactQuill
          onChange={this.handleChange}
          placeholder={this.props.placeholder}
          modules={TextEditor.modules}
          value={this.state.editorHtml}
          style={{height: "300px", width: "100%"}}
        />
      </div>
    )
  }
}

/*
 * Quill modules to attach to editor
 * See http://quilljs.com/docs/modules/ for complete options
 */
TextEditor.modules = {
  toolbar: {
    container: "#toolbar",
    handlers: {
      "insertStar": insertStar,
    }
  }
}

/*
 * Quill editor formats
 * See http://quilljs.com/docs/formats/
 */
TextEditor.formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'color',
]

export default TextEditor;
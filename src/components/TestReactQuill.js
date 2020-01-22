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
    <span class="ql-formats">
        <select className="ql-header" defaultValue={""} onChange={e => e.persist()}>
        <option selected></option>
        <option value="2"></option>
        <option value="1"></option>
        </select>
    </span>
    <span class="ql-formats">
        <button className="ql-bold"></button>
        <button className="ql-italic">
        </button>
        <select className="ql-color">
            <option value="red"></option>
            <option value="green"></option>
            <option value="blue"></option>
            <option value="orange"></option>
            <option value="violet"></option>
            <option value="#d0d1d2"></option>
            <option selected></option>
        </select>
        <select className="ql-background">
            <option value="#a6b8bf"></option>
            <option value="green"></option>
            <option value="blue"></option>
            <option value="orange"></option>
            <option value="violet"></option>
            <option value="#d0d1d2"></option>
            <option selected></option>
        </select>
    </span>
    <span class="ql-formats">
        <button class="ql-list" value="ordered"></button>
        <button class="ql-list" value="bullet"></button>
    </span>
    <span class="ql-formats">
        <button class="ql-link"></button>
        <button class="ql-blockquote"></button>
        <button class="ql-code-block"></button>
    </span>
  </div>
)

/*
 * Editor component with custom toolbar and content containers
 */
class TestReactQuill extends React.Component {
  constructor (props) {
    super(props)
    this.state = { editorHtml: '' }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (html) {
  	this.setState({ editorHtml: html });
  }

  render() {
    return (
      <div className="text-editor">
        <CustomToolbar />
        <ReactQuill
          onChange={this.handleChange}
          placeholder={this.props.placeholder}
          modules={TestReactQuill.modules}
        />
      </div>
    )
  }
}

/*
 * Quill modules to attach to editor
 * See http://quilljs.com/docs/modules/ for complete options
 */
TestReactQuill.modules = {
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
TestReactQuill.formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'color',
]

export default TestReactQuill;
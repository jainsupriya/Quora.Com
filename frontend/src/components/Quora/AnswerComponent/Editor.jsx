/* 
 * Simple editor component that takes placeholder text as a prop 
 */

import React from "react";
// import "../styles/home.css";
import { withStyles } from '@material-ui/core/styles';
//import "../../../styles/questionCard.css";
import ReactQuill from 'react-quill'; // ES6
// import IconButton from "@material-ui/core/IconButton";
// import MenuIcon from "@material-ui/icons/Menu";
import PropTypes from 'prop-types';
import 'react-quill/dist/quill.snow.css'; // ES6
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";

import {
  getUserDetails,
} from "../../../redux/actions/homeAction";
const axios = require('axios');
const styles = theme => ({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    content:{
      marginLeft: 10,
    }
  });

class Editor extends React.Component {
    constructor (props) {
      super(props)
      this.state =
       { 
        editorHtml: '',
        theme: 'snow' 
      }

      this.handleChange = this.handleChange.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this)
      this.handleClose= this.handleClose.bind(this)
    }

    handleChange (html) {
        this.setState({ editorHtml: html });
    }

    handleClose(){
      this.props.toggle();
    }

    handleThemeChange (newTheme) {
      if (newTheme === "core") newTheme = null;
      this.setState({ theme: newTheme })
    }
    handleSubmit(event)
    {

      event.preventDefault();
  
      if(this.props.editQuestion)
      {
        const answer =
        {
          question: this.state.editorHtml,
          topicList: "Change, TopicList1"
        }
       
        axios.put(`/question`+ this.props.qid).
        then(res=>{
        
          if(res.status === 200)
          {
          
            this.setState( 
              {  
                editorHtml: ''
              });
            this.props.toggle();
          }
        })
        .catch(err =>{
          console.log(err);
        });      
      }
      else
      {
        const answer =
        {
          answer: this.state.editorHtml,
          answerOwner: this.props.auth.user._id,
          isAnonymous: "false",
          questionId: this.props.qid
        }
        axios.post(`/answer`, answer).
            then(res=>{     
              if(res.status === 200)
              {
                this.setState( 
                  {  
                    editorHtml: ''
                  });
                this.props.toggle();
              }
            })
            .catch(err =>{
              console.log(err);
            });
        }
    }
    render () {
      return (
        <div>
          <ReactQuill 
            theme={this.state.theme}
            onChange={this.handleChange}
            value={this.state.editorHtml}
            modules={Editor.modules}
            formats={Editor.formats}
            bounds={'.app'}
            style={{height:150}}
            placeholder={this.props.placeholder}
           />
          <Button variant="contained" className="btn-margin" style={{marginLeft: 10}} onClick={this.handleSubmit}> 
            Add Comment
          </Button>
          <Button variant="secondary" className="btn-margin" style={{marginLeft: 10}} onClick={this.handleClose}> 
            Cancel
          </Button>
         </div>
       )
    }
  }

  /* 
   * Quill modules to attach to editor
   * See https://quilljs.com/docs/modules/ for complete options
   */
  Editor.modules = {
    toolbar: [
      [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
      [{size: []}],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, 
       {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image', 'video'],
      ['clean']
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    }
  }
  /* 
   * Quill editor formats
   * See https://quilljs.com/docs/formats/
   */
  Editor.formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video'
  ]

  /* 
   * PropType validation
   */
  Editor.propTypes = {
    placeholder: PropTypes.string,
  }

  const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
    userDetails: state.homeState.userDetails,

  });
  
  export default connect(
    mapStateToProps,
    {  getUserDetails}
  )(withStyles(styles)(Editor));
  
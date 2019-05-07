import React from "react";
import "../../../styles/home.css";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from 'prop-types';
import AppBar from "@material-ui/core/AppBar";
// import Toolbar from "@material-ui/core/Toolbar";
// import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
// import IconButton from "@material-ui/core/IconButton";
// import MenuIcon from "@material-ui/icons/Menu";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Paper from "@material-ui/core/Paper";
import { connect } from "react-redux";
import Typography from '@material-ui/core/Typography';
import axios from "axios";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import {
  addQuestion,
  getUserDetails,
  getTopicQuestions,
  getQuestions,
  getAnswersForQuestion,
} from "../../../redux/actions/homeAction";

import Feed from "../layout/feed";
import QuestionCard from "../layout/QuestionCard";
import { AskQuestionCard } from "../layout/AskQuestionCard";
import AddQuestion from "../homeComponents/AddQuestion";
import NavHeader from "../header/navHeader";
import AnswerCardForAnswerPage from "../AnswerComponent/AnswerCardForAnswerPage";
import QuestionCardForAnswerPage from "../AnswerComponent/QuestionCardForAnswerPage";
const styles = theme => ({
  dropdown : {
    border: '1px solid #b92b27',
    background: '#b92b27',
    width: 160,
    textAlign: 'left',
    '&:hover':{
      border: '1px solid #fff',
      background: '#b92b27',
    },
    '&:active':{
      border: '1px solid #fff',
      background: '#b92b27',
    }
  },
  listElement : {
    padding: '1% 5% 5%',
    borderBottom: '1px solid #e2e2e2'
  }
});

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topic: "Change",
      userDetails: {},
      openAddQuestion: false,
      visible :2,
      data:{},
      searchValue: "",
      topics:{},
      people:{},
      questions:{},
      dropdownOpen: false,
      searchItem :''
    
    };
    this.handleAddQuestion = this.handleAddQuestion.bind(this);
    this.loadMore = this.loadMore.bind(this);
    this.searchForTopicOrPeople = this.searchForTopicOrPeople.bind(this);
    this.toggle = this.toggle.bind(this);
    this.handleClick = this.handleClick.bind(this);
    
  }

  loadMore() {
    this.setState((prev) => {
      return {visible: prev.visible + 2};
    });
  }
  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  handleClick(item){
    console.log("hi")
   this.setState({searchItem:item});
   this.toggle() ;
  }
  
  handleAddQuestion = (question, topic) => {
    var questionData = {
      question: question,
      questionOwner: this.props.auth.user._id,
      topicList: topic
    };

    this.props.addQuestion(questionData);
    this.setState({ openAddQuestion: false });
  };

  handleClickOpen = () => {
    this.setState({
      openAddQuestion: true
    });
  };

  handleClose = () => {
    this.setState({ openAddQuestion: false });
  };



  searchForTopicOrPeople(event) {
    const { name, value } = event.target;
    this.setState({
        searchValue: value
      });
      
    if(this.state.searchItem==="Topic")
    {
        if(value=== "")
        this.setState({
          topics :''        
         });  
         else
         {
          axios.get(`/topics/`).then(response => {
              if (response.status === 200) {
                  var searchResult = (response.data).filter((topic)=>{
                      return topic.indexOf(value) > -1; });
                  this.setState({
                    topics :searchResult        
                  });         
                  console.log(searchResult)
              }
          });
          }
    }
    if(this.state.searchItem==="People")
    {
        if(value=== "")
        this.setState({
          people :''        
         });  
         else
         {
          axios.get(`/users/`).then(response => {
              if (response.status === 200) {
                  var mongodata = response.data.mongo;
                  var searchResult = mongodata.filter((user)=>{
                      return user.fname.indexOf(value) > -1; });
                  this.setState({
                      people :searchResult        
                  });        
              }
          });
          }
    }   
    if(this.state.searchItem==="Question")
    {
        if(value=== "")
        this.setState({
          questions:''        
         });  
         else
         {
          axios.get(`/questions/`).then(response => {
              if (response.status === 200) {
                  var searchResult = (response.data).filter((question)=>{
                      return (question.question).indexOf(value) > -1; });
                  this.setState({
                    questions :searchResult        
                  });         
                  console.log(searchResult)
              }
          });
          }
    }     
  }

  /*async componentDidMount() {
    await this.props.getUserDetails(this.props.auth.user._id);

    if (
      this.props.userDetails.interestedTopicList &&
      this.props.userDetails.interestedTopicList.length > 0
    ) {
      this.props.getTopicQuestions(
        this.props.userDetails.interestedTopicList[0]
      );
    } else {
      this.props.getQuestions();
    }
  }*/

  componentDidMount()
  { 
    this.props.getAnswersForQuestion(this.props.match.params.id);
  }

  handleTopicClick = newTopic => {
    this.props.getTopicQuestions(newTopic);
  };

  render() {
   const {classes} = this.props;
    

 
    var topics;
    var questions;
    var users;

    if (this.state.topics && this.state.topics.length > 0) {
        topics = this.state.topics
        .map(topic => {
          return (
            <div>
             <Divider />
            <div style={{ padding: "2% 0" }}>
                <div className="questionNav">
                <a >
                    {topic}
                </a>
                </div>
            </div>
            <Divider />
            </div>
          );
        });
    } 
    if (this.state.questions && this.state.questions.length > 0) {
        questions = this.state.questions
        .map(question => {
          return (
            <div>
             <Divider />
            <div style={{ padding: "2% 0" }}>
                <div className="questionNav">
                <Link to={"/" + question._id} >
                    {question.question}
               </Link>
                </div>
            </div>
            <Divider />
            </div>
          );
        });
    } 
    if (this.state.people && this.state.people.length > 0) {
        users = this.state.people
        .map(user => {
          return (
            <div>
             <Divider />
            <div style={{ padding: "2% 0" }}>
                <div className="questionNav">
                <Link to={"/profile/" + user._id} >
                    {user.fname} {user.lname}
               </Link>
                </div>
            </div>
            <Divider />
            </div>
          );
        });
    } 
    var addQuestion = "";

    if (this.state.openAddQuestion === true)
      addQuestion = (
        <AddQuestion
          openAddQuestion={this.state.openAddQuestion}
          handleClose={() => this.handleClose()}
          handleAddQuestion={this.handleAddQuestion}
        />
      );

    return (
      <div>
        <AppBar className="m-bg-color" position="sticky">
          <NavHeader/>
        </AppBar>
        {addQuestion}
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="flex-start"
        >
          <Grid item xs={2} />
          <Grid item xs={8}>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="flex-start"
            >
            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                <DropdownToggle className={classes.dropdown} caret>
                Select Filter
                </DropdownToggle>
                <DropdownMenu dtyle={{padding: 0}}>
                <div onClick={() =>this.handleClick("Topic")} className={classes.listElement}>Search by Topic</div>
                <div onClick= {() =>this.handleClick("Question")} className={classes.listElement}>Search by Question</div>
                <div onClick={() =>this.handleClick("People")} className={classes.listElement} style={{border: 'none'}}>Search byPeople</div>
                </DropdownMenu>
            </Dropdown>
              <Grid item xs={8} className="m-padding-left-right-15">
              <input
                id="search"
                className="header-search"
                placeholder="Search Quora"
                autoFocus={true}
                type="text"
                value={this.searchValue}
                onChange={this.searchForTopicOrPeople}
                style={{width:800, height:40}}
              />
                {this.state.searchItem==="Topic" &&  topics}
                {this.state.searchItem==="Question" &&  questions}
                {this.state.searchItem==="People" &&  users}
                
              </Grid>

              <Grid item xs={2} className="fix-pos">
                <Paper className="m-paper" elevation={1}>
                  Improve Your Feed
                  <Divider />
                  {/* {for (let index = 0; index < 10; index++) {

                                        
                                    }} */}
                  <Grid
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                  >
                    <Grid item>
                      <div className="check" />
                    </Grid>
                    <Grid item xs={11}>
                      {"Improve Your Feed"}
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                  >
                    <Grid item>
                      <div className="check" />
                    </Grid>
                    <Grid item xs={11}>
                      {"Improve Your Feed"}
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={2} />
        </Grid>
      </div>
    );
  }
}

Search.propTypes = {
  classes: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  userDetails: state.homeState.userDetails,
  questions: state.homeState.questions,
  answerforquestions: state.homeState.answerforquestions,

});

export default connect(
  mapStateToProps,
  { addQuestion, getUserDetails, getTopicQuestions, getQuestions, getAnswersForQuestion }
)(withStyles(styles)(Search));

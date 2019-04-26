import React, { Component } from "react";
import { Route, BrowserRouter, Switch, Link, withRouter } from "react-router-dom";
import { Provider, connect } from "react-redux";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import NavHeader from "./header/navHeader"
import AppBar from "@material-ui/core/AppBar";
import Home from './homeComponents/Home';
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";

const styles = theme => ({

})

//Create a Main Component
class Content extends Component {
  constructor() {
    super();
    this.state = {
      header : 'Your Content'
    };
  }

  handleTypeChange = (type) => {
    console.log("Hello", type);
    var header = '';
    switch(type){
        case "All Types" : header = "Your Content";
                         break;
            
        case "Questions Asked" : header = "Your Questions";
                            break;

        case "Questions Followed" : header = "Your Followed Questions";
                            break;

        case "Answers" : header = "Your Answers";
                            break;

        case "Posts" : header = "Your Posts";
                            break;

    }
    this.setState({
        header : header
    })
  }

  render() {

    const { classes } = this.props;
    const questionsList = [
        {
            question : "How much it is difficult to get admitted in Texas A&M for MS in MIS? I am from EnTC background (72%), GRE-316, TOEFL-99, working in IT company as developer (24 months).",
            date : "Oct 9, 2017"
        }
    ]

    return (
      <div>
          <AppBar className="m-bg-color" position="sticky">
            <NavHeader/>
          </AppBar>

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
              <Grid item xs={2} className="fix-pos">
                <div style={{ position: "relative", width: "90%" }}>
                    <div style={{padding: '0 0 8%'}}>
                        By Content Type
                    </div>
                    <Divider />
                    <div style={{padding: '8% 0'}}>
                    {["All Types", "Questions Asked", "Questions Followed", "Answers", "Posts"].map(type => {
                        return(
                            <div style={{padding: '1% 0'}}>
                                <a onClick={() => this.handleTypeChange(type)}>{type}</a>
                            </div>
                        )
                    })}
                    </div>
                

                    {/* By Topic */}
                    <div style={{padding: '20% 0 8%'}}>
                        By Topic
                    </div>
                    <Divider />
                    <div style={{padding: '5% 0'}}>
                        All Topics
                    </div>
                    <input
                        className="regular-search secondaryText"
                        placeholder="Search for a topic"
                        autoFocus="True"
                        type="text"
                    />

                    <div style={{padding: '20% 0 8%'}}>
                        By Content Type
                    </div>
                    <Divider />
                    <div style={{padding: '8% 0'}}>
                    {["All Time", "2019", "2018", "2017"].map(type => {
                        return(
                            <div  style={{padding: '1% 0'}}>
                                {type}
                            </div>
                        )
                    })}
                    </div>

                    <div style={{padding: '20% 0 8%'}}>
                        Sort Order
                    </div>
                    <Divider />
                    <div style={{padding: '8% 0'}}>
                    {["Newest First", "Oldest First"].map(type => {
                        return(
                            <div  style={{padding: '1% 0'}}>
                                {type}
                            </div>
                        )
                    })}
                    </div>

                </div>

              </Grid>
              <Grid item xs={8} className="m-padding-left-right-15">
                <div>
                    <div style={{padding: '0 0 2%'}}>
                        {this.state.header}
                    </div>
                </div>
                <Divider />
                <div>
                    {Object.keys(questionsList).map(index => {
                        return(
                            <div style={{padding: '2% 0'}}>
                                <div className="questionNav">
                                    <a>{questionsList[index].question}</a>
                                </div>
                                <div className="secondaryText" style={{padding: '1% 0 0'}}>
                                    Asked {questionsList[index].date}
                                </div>
                            </div>
                        )
                    })}
                </div>
                <Divider />
              </Grid>

              <Grid item xs={2} className="fix-pos">
                
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={2} />
        </Grid>
      </div>
    );
  }
}


Content.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({

});

export default connect(
  mapStateToProps,
  {}
)(withStyles(styles)(withRouter(Content)));
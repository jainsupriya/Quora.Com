import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Provider, connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Grid from "@material-ui/core/Grid";
// import { mainListItems, secondaryListItems } from './listItems';
// import SimpleTable from './SimpleTable';
import { PieChart } from "./charts/PieChart";
import NavHeader from "./header/navHeader";
import Paper from "@material-ui/core/Paper";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PeopleIcon from "@material-ui/icons/People";
import BarChartIcon from "@material-ui/icons/BarChart";
import LayersIcon from "@material-ui/icons/Layers";
import HomeIcon from "@material-ui/icons/Home";
import Parser from "html-react-parser";
import _ from "lodash";
import LineChart from './charts/LineChart';
import Moment from "moment";

import {
  getAnswersByViews,
  getAnswersByUpvotes,
  getAnswersByDownvotes,
  getAnswersByBookmarks
} from "../../redux/actions/dashboardActions";


const drawerWidth = 240;
Date.prototype.addDays = function(days) {
  var dat = new Date(this.valueOf())
  dat.setDate(dat.getDate() + days);
  return dat;
}

const styles = theme => ({
  root: {
    display: "flex"
  },
  toolbar: {
    paddingRight: 24 // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36
  },
  menuButtonHidden: {
    display: "none"
  },
  title: {
    flexGrow: 1
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing.unit * 9
    }
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: "100vh",
    overflow: "auto"
  },
  chartContainer: {
    marginLeft: -22
  },
  tableContainer: {
    height: 320
  },
  h5: {
    marginBottom: theme.spacing.unit * 2
  },
  chartHeader: {
    textAlign: 'center',
    paddingTop: 20
  }
});

class Dashboard extends React.Component {
  state = {
    open: true,
    showChart: "byAnswerViews",
    profileViewsData: [],
    msgForViews : '',
    msgForUpvotes : '',
    msgForDownvotes : '',
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  handleMenuChange = name => {
    this.setState({
      showChart: name
    });
  };

  componentDidMount = () => {
    let userId = this.props.auth.user._id;
    this.props.getAnswersByViews(userId);
    this.props.getAnswersByUpvotes(userId);
    this.props.getAnswersByDownvotes(userId);
    this.props.getAnswersByBookmarks(userId);

    console.log(this.props.userDetails.profileViews);
    this.getDateArray();
  };

  getDateArray = () => {
    let stopDate = new Date();
    stopDate = stopDate.addDays(1);
    let startDate = stopDate.addDays(-30)
    let dateMap = this.getDates1(startDate, stopDate);
    const profileViews = this.props.userDetails.profileViews;
    for (let i = 0; i < profileViews.length; i++) {
      if(dateMap[profileViews[i].substring(0, 10)] != "undefined")
      {
        dateMap.set(profileViews[i].substring(0, 10), dateMap.get(profileViews[i].substring(0, 10)) + 1)
      }
    }
    let myArr = [];
    for (var [key, value] of dateMap.entries()) {
      myArr.push({ date: key, count: value })
    }
    myArr.forEach(function(element) {
      console.log(element);
    });
    this.setState({
      profileViewsData : myArr
    })
  }

  getDates1= (startDate, stopDate) => {
    let myMap = new Map();
    let currentDate = startDate;
    while (currentDate <= stopDate) {
      myMap.set(Moment(currentDate).format("YYYY-MM-DD"), 0);
      currentDate = currentDate.addDays(1);
    }
    return myMap;
  }

  render() {
    const { classes } = this.props;
    let msgForViews = ''
    let msgForUpvotes = ''
    let msgForDownvotes = ''
    let msgForBookmarks = ''

    let answerViews = this.props.answerByViewDetails.answersByViews;

    if(answerViews.length != 0)
    {
      answerViews = _.reverse(_.sortBy(answerViews, item => item.views));
      answerViews = _.take(answerViews, 10);
      if(answerViews[0].views == 0)
      {
        msgForViews = "Nobody viewed your answers :(";
      }
    }
    else
    {
      msgForViews = "You haven't posted any answer yet!!!!";
    }    

    console.log(this.props.answerByViewDetails.answersByUpvotes);
    let answerUpvotes = this.props.answerByViewDetails.answersByUpvotes;
    if(answerUpvotes.length != 0)
    {
      answerUpvotes = _.reverse(_.sortBy(answerUpvotes, item => item.upVotes.length));
      answerUpvotes = _.take(answerUpvotes, 10);
      if(answerUpvotes[0].upVotes.length == 0)
      {
        msgForUpvotes = "Nobody upvoted your answers :(";
      }
    }
    else
    {
      msgForUpvotes = "You haven't posted any answer yet!!!!";
    }
    // answerUpvotes = _.reverse(
    //   _.sortBy(answerUpvotes, item => item.upVotes.length)
    // );
    // answerUpvotes = _.take(answerUpvotes, 10);
    // console.log(_.maxBy(answerUpvotes, "upVotesCount"))
    // if(_.maxBy(answerUpvotes, "upvotes").upvotes.length == 0)
    // {
    //   answerDownVotes.push({"downVotesCount" : 1, "questionId" : '' })
    // }

    let answerDownVotes = this.props.answerByViewDetails.answerByDownVotes;
    if(answerDownVotes.length != 0)
    {
      answerDownVotes = _.reverse(_.sortBy(answerDownVotes, item => item.downVotesCount));
      answerDownVotes = _.take(answerDownVotes, 5);
      if(answerDownVotes[0].downVotesCount == 0)
      {
        msgForDownvotes = "Nobody downvoted your answers :)";
      }
    }
    else
    {
      msgForDownvotes = "You haven't posted any answer yet!!!!";
    }

    // if(answerDownVotes.length != 0)
    // {
    //   if(_.maxBy(answerDownVotes, "downVotesCount").downVotes.length == 0)
    //   {
    //     answerDownVotes.push({"downVotesCount" : 1, "questionId" : '' })
    //   }
    // }
    // else
    // {

    // }

    console.log(this.props.answerByViewDetails.answerByBookmarks);

    let answerBookmarks = this.props.answerByViewDetails.answerByBookmarks;
    if(answerBookmarks.length != 0)
    {
      answerBookmarks = _.reverse(_.sortBy(answerBookmarks, item => item.bookmarkCount));
      answerBookmarks = _.take(answerBookmarks);
      if(answerBookmarks[0].bookmarkCount == 0)
      {
        msgForBookmarks = "Nobody bookmarked your answers :)";
      }
    }
    else
    {
      msgForBookmarks = "You haven't posted any answer yet!!!!";
    }

    const mainListItems = (
      <List>
        <ListItem button onClick={() => this.handleMenuChange("byAnswerViews")}>
          <ListItemIcon style={{color : '#a94442'}}>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Show By View" />
        </ListItem>
        <ListItem button onClick={() => this.handleMenuChange("byBokkmarked")}>
          <ListItemIcon style={{color : '#a94442'}}>
            <BarChartIcon />
          </ListItemIcon>
          <ListItemText primary="Bookmarked Answers" />
        </ListItem>
        <ListItem
          button
          onClick={() => this.handleMenuChange("byProfileViews")}
        >
          <ListItemIcon style={{color : '#a94442'}}>
            <LayersIcon />
          </ListItemIcon>
          <ListItemText primary="Profile Views" />
        </ListItem>
      </List>
    );

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="absolute"
          className={classNames(
            classes.appBar,
            this.state.open && classes.appBarShift
          )}
          style={{ backgroundColor: "#fff" }}
        >
          <Toolbar
            disableGutters={!this.state.open}
            className={classes.toolbar}
          >
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(
                classes.menuButton,
                this.state.open && classes.menuButtonHidden
              )}
              style={{ color: "#b92b27" }}
            >
              <MenuIcon />
            </IconButton>

            <div className="logo-img" />
            <div style={{ position: "absolute", right: "2.5%" }}>
              <a href="/" style={{ color: "#b92b27" }}>
                <HomeIcon />
              </a>
            </div>
            {/* <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton> */}
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: classNames(
              classes.drawerPaper,
              !this.state.open && classes.drawerPaperClose
            )
          }}
          open={this.state.open}
        >
          <div className={classes.toolbarIcon}>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <div>{mainListItems}</div>
          <Divider />
        </Drawer>

        <main
          className={classes.content}
          style={{
            display: this.state.showChart === "byAnswerViews" ? "block" : "none"
          }}
        >
          <div className={classes.appBarSpacer} />

          <Grid
            container
            direction="row"
            justify="center"
            alignItems="flex-start"
          >
            <Grid item xs={4} style={{ padding: "1%" }}>
              <Paper>
                <Typography variant="h6" gutterBottom component="h4" className={classes.chartHeader}>
                  Top 10 Answers with Views
                </Typography>
                <PieChart data={answerViews} type="views" />
                <Typography variant="h6" gutterBottom component="h4" className={classes.chartHeader}>
                  {msgForViews}
                </Typography>
                <div style={{ padding: "4%" }}>
                  <Paper style={{display : answerViews.length == 0 ? 'none' : 'block'}}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell align="left">Answer</TableCell>
                          <TableCell align="left">Views</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {answerViews.map((n, index) => (
                          <TableRow key={n.id}>
                            <TableCell align="left"><a href={"/"+n.questionId}>{"Answer " + (++index)}</a></TableCell>
                            <TableCell align="left">{n.views}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </Paper>
                </div>
              </Paper>
            </Grid>

            <Grid item xs={4} style={{ padding: "1%" }}>
              <Paper>
                <Typography variant="h6" gutterBottom component="h4" className={classes.chartHeader}>
                  Top 10 Answers with Upvotes
                </Typography>
                <PieChart data={answerUpvotes} type="upvotes" />
                <Typography variant="h6" gutterBottom component="h4" className={classes.chartHeader}>
                  {msgForUpvotes}
                </Typography>
                <div style={{ padding: "4%" }}>
                  <Paper style={{display : answerUpvotes.length == 0 ? 'none' : 'block'}}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell align="left">Answer</TableCell>
                          <TableCell align="left">Upvotes</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {answerUpvotes.map((n, index) => (
                          <TableRow key={index}>
                            <TableCell align="left"><a href={"/"+n.questionId}>{"Answer " + (++index)}</a></TableCell>
                            <TableCell align="left">
                              {n.upVotes.length}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </Paper>
                </div>
              </Paper>
            </Grid>

            <Grid item xs={4} style={{ padding: "1%" }}>
              <Paper>
                <Typography variant="h6" gutterBottom component="h4" className={classes.chartHeader}>
                  Top 5 Answers with Downvotes
                </Typography>
                <PieChart data={answerDownVotes} type="downvotes" />
                <Typography variant="h6" gutterBottom component="h4" className={classes.chartHeader}>
                  {msgForDownvotes}
                </Typography>
                <div style={{ padding: "4%" }}>
                  <Paper style={{display : answerDownVotes.length == 0 ? 'none' : 'block'}}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell align="left">Answer</TableCell>
                          <TableCell align="left">Views</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {answerDownVotes.map((n, index) => (
                          <TableRow key={index}>
                            <TableCell align="left"><a href={"/"+n.questionId}>{"Answer " + (++index)}</a></TableCell>
                            <TableCell align="left">{n.downVotesCount}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </Paper>
                </div>
              </Paper>
            </Grid>

            
          </Grid>

          <Grid
            container
            direction="row"
            justify="center"
            alignItems="flex-start"
          >
            <Grid item xs={4} style={{ padding: "1%" }}>
              <Paper>
                <Typography variant="h6" gutterBottom component="h4" className={classes.chartHeader}>
                  Bookmarked Answers
                </Typography>
                <PieChart data={answerBookmarks} type="bookmarks" />
                <Typography variant="h6" gutterBottom component="h4" className={classes.chartHeader}>
                  {msgForBookmarks}
                </Typography>
                <div style={{ padding: "4%" }}>
                  <Paper style={{display : answerBookmarks.length == 0 ? 'none' : 'block'}}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell align="left">Answer</TableCell>
                          <TableCell align="left">Views</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {answerBookmarks.map((n, index) => (
                          <TableRow key={n.id}>
                            <TableCell align="left"><a href={"/"+n.questionId}>{"Answer " + (++index)}</a></TableCell>
                            <TableCell align="left">{n.bookmarkCount}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </Paper>
                </div>
              </Paper>
            </Grid>
            <Grid item xs={4} style={{ padding: "1%" }}></Grid>
            <Grid item xs={4} style={{ padding: "1%" }}></Grid>
            
          </Grid>
        </main>

        <main
          className={classes.content}
          style={{
            display: this.state.showChart === "byProfileViews" ? "block" : "none"
          }}
        >
          <div className={classes.appBarSpacer} />

          <Grid
            container
            direction="row"
            justify="center"
            alignItems="flex-start"
          >
            <Paper>
              <Typography variant="h6" gutterBottom component="h4" className={classes.chartHeader}>
                Profile Views Per Day
              </Typography>
              <LineChart data={this.state.profileViewsData} />
            </Paper>
          </Grid>
        </main>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  answerByViewDetails: state.dashboard,
  userDetails: state.homeState.userDetails
});

export default connect(
  mapStateToProps,
  { getAnswersByViews, getAnswersByUpvotes, getAnswersByDownvotes, getAnswersByBookmarks }
)(withStyles(styles)(Dashboard));

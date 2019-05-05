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

import { getAnswersByViews } from "../../redux/actions/dashboardActions";

const drawerWidth = 240;

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
  }
});

class Dashboard extends React.Component {
  state = {
    open: true,
    showChart: "byAnswerViews"
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  handleMenuChange = name => {
    console.log("HEllo");
    console.log(name);
    this.setState({
      showChart: name
    });
  };

  componentWillMount = () => {
    this.props.getAnswersByViews();
  };

  render() {
    const { classes } = this.props;
    let data = [
      { answer: "Answer1", views: 8 },
      { answer: "Answer2", views: 8 },
      { answer: "Answer3", views: 8 }
    ];
    console.log(this.props.answerByViewDetails.answersByViews);

    const answers = this.props.answerByViewDetails.answersByViews;
    let temp = _.reverse(_.sortBy(answers, item => item.views));
    temp = _.take(temp, 10);
    console.log(temp);

    const mainListItems = (
      <List>
        <ListItem button onClick={() => this.handleMenuChange("byAnswerViews")}>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Show By View" />
        </ListItem>
        <ListItem button onClick={() => this.handleMenuChange("byUpVotes")}>
          <ListItemIcon>
            <ShoppingCartIcon />
          </ListItemIcon>
          <ListItemText primary="Show By Upvotes" />
        </ListItem>
        <ListItem button onClick={() => this.handleMenuChange("byDownVotes")}>
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Show By Downvotes" />
        </ListItem>
        <ListItem button onClick={() => this.handleMenuChange("byBokkmarked")}>
          <ListItemIcon>
            <BarChartIcon />
          </ListItemIcon>
          <ListItemText primary="Bookmarked Answers" />
        </ListItem>
        <ListItem
          button
          onClick={() => this.handleMenuChange("byProfileViews")}
        >
          <ListItemIcon>
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

            {/* <AppBar className="m-bg-color" position="sticky" style={{paddingLeft : 50}}>
              <NavHeader />
            </AppBar> */}
            {/* <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              className={classes.title}
            >
              Dashboard
            </Typography> */}
            <div className="logo-img" />
            <div style={{ position: 'absolute', right : '2.5%' }}>
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
          {/* <List>{secondaryListItems}</List> */}
        </Drawer>
        <main
          className={classes.content}
          style={{
            display: this.state.showChart === "byAnswerViews" ? "block" : "none"
          }}
        >
          <div className={classes.appBarSpacer} />
          <Typography variant="h5" gutterBottom component="h2">
            10 Answers with Views
          </Typography>
          <Typography component="div" className={classes.chartContainer} />
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="flex-start"
          >
            <Grid item xs={5}>
              <PieChart data={temp} />
            </Grid>
            <Grid item xs={7}>
              <Paper>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell align="left">Question</TableCell>
                      <TableCell align="left">Answers</TableCell>
                      <TableCell align="left">Views</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {temp.map(n => (
                      <TableRow key={n.id}>
                        <TableCell align="left">{n.questionId}</TableCell>
                        <TableCell align="left">{Parser(n.answer)}</TableCell>
                        <TableCell align="left">{n.views}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Paper>
            </Grid>
          </Grid>
          <div className={classes.tableContainer}>{/* <SimpleTable /> */}</div>
        </main>

        <main
          className={classes.content}
          style={{
            display: this.state.showChart === "byUpVotes" ? "block" : "none"
          }}
        >
          <div className={classes.appBarSpacer} />
          <Typography variant="h5" gutterBottom component="h2">
            10 Answers with Views
          </Typography>
          <Typography component="div" className={classes.chartContainer} />
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="flex-start"
          >
            <Grid item xs={5}>
              <PieChart data={data} />
            </Grid>
            <Grid item xs={7}>
              <Paper>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell align="left">Answers</TableCell>
                      <TableCell align="left">Views</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.map(n => (
                      <TableRow key={n.id}>
                        <TableCell align="left">{n.answer}</TableCell>
                        <TableCell align="left">{n.views}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Paper>
            </Grid>
          </Grid>
          <div className={classes.tableContainer}>{/* <SimpleTable /> */}</div>
        </main>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  answerByViewDetails: state.dashboard
});

export default connect(
  mapStateToProps,
  { getAnswersByViews }
)(withStyles(styles)(Dashboard));

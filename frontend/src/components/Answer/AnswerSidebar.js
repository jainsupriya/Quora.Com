import React from 'react'
import Bookmark from "@material-ui/icons/Bookmark";
import { withStyles } from '@material-ui/core/styles';
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import {Link} from 'react-router-dom';
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
    root: {
      ...theme.mixins.gutters(),
      paddingTop: theme.spacing.unit * 1.5,
      paddingBottom: theme.spacing.unit * 1.5,
      
    },
  });
  
class Sidebar extends React.Component {
    constructor(props)
    {
        super(props);
    } 
    render() {
        const { classes } = this.props;
      return (
        <div>


        <List  className={classes.list}  style = {{backgroundColor: 'white'} }>
            <Link to={"/profile"}><ListItem button>
            <ListItemIcon>
            <Bookmark style={{ fill: "grey" }}/>
            </ListItemIcon>
            <ListItemText  inset primary={<Typography style={{ color: 'grey' }}>
            Bookmark</Typography>}/>
            </ListItem></Link>
            <Link to={"/profile"}><ListItem button>
            <ListItemIcon>
            <Bookmark style={{ fill: "grey" }}/>
            </ListItemIcon>
            <ListItemText  inset primary={<Typography style={{ color: 'grey' }}>
            Hollywood</Typography>}/>
            </ListItem></Link>
            <Link to={"/profile"}><ListItem button>
            <ListItemIcon>
            <Bookmark style={{ fill: "grey" }}/>
            </ListItemIcon>
            <ListItemText  inset primary={<Typography style={{ color: 'grey' }}>
            Dance</Typography>}/>
            </ListItem></Link>
        </List>


        </div>
      );
    }
  }
  
  
export default withStyles(styles)(Sidebar);
  
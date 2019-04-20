import React from 'react'
//import './feeds.css'
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withRouter } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
const styles = theme => ({
    root: {
      ...theme.mixins.gutters(),
      paddingTop: theme.spacing.unit * 1.5,
      paddingBottom: theme.spacing.unit * 1.5,
      
    },
  });
  
class Feeds extends React.Component {
    constructor(props)
    {
        super(props);
    } 
    render() {
        const { classes } = this.props;
      return (
        <div>
        <Paper className={classes.root} elevation={1} style={{maxWidth : 1300}}>
            <Typography variant="h5" component="h3">
            What's the best platform to use to hire UI/UX designers?
            </Typography>
            <Typography>
            <h8>Supriya&nbsp; Date</h8>
            </Typography>
            <Typography component="p">
            Answer
            </Typography>
        </Paper>


        </div>
      );
    }
  }
  
  
export default withStyles(styles)(Feeds);
  
import React from 'react'
//import './feeds.css'
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withRouter } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import { TiArrowDownOutline }  from "react-icons/ti";
import { TiArrowUpOutline } from "react-icons/ti";
import { TiArrowForwardOutline } from "react-icons/ti";
import { Container, Row, Col } from 'reactstrap';
import LongMenu from '../Header/LongMenu';
import Grid from '@material-ui/core/Grid';
import ThumbDown from '@material-ui/icons/ThumbDown';
import ThumbUp from '@material-ui/icons/ThumbUp';
import { Button } from 'react-bootstrap';

const styles = theme => ({
    root: {
      ...theme.mixins.gutters(),
      paddingTop: theme.spacing.unit * 1.5,
      paddingBottom: theme.spacing.unit * 1.5,
      
    },
    margin: {
      background: "#fff",
    }
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
        <br/>
        <Paper className={classes.root} elevation={1} style={{maxWidth : 1300}}>
            <Typography variant="title" component="h3"><b>
            What's the best platform to use to hire UI/UX designers?</b>
            </Typography>
            <Typography>
            <h8>Supriya&nbsp; Answered 49m ago</h8>
            </Typography>
            <Typography component="p">
            Victoria Mason, former Digital Marketing Manager — With the increasing competition in the market it is crucial for the companies to showcase themselves in more presentable manner. Therefore, it is quite important for one to...
            </Typography>
            53.7k Views. <a href="">View Upvoters</a>
            <div className={classes.root}>
              <Grid container spacing={12}>
                <Grid item xs={3} style={{}}>
                  
                    Extended
                </Grid>
                <Grid item xs={2}>
                  XS=12
                </Grid>
                <Grid item xs={4}>
                  XS=12
                </Grid>
                <Grid item xs={1}>
                  XS=12
                </Grid>
                <Grid item xs={1}>
                  XS=12
                </Grid>
                <Grid item xs={1}>
                  XS=12
                </Grid>
               
              </Grid>
            </div>
            <Container>
            <Row>
                <Col> <TiArrowUpOutline/>  Upvote 5.5K</Col>
                <Col></Col><Col></Col>
               <TiArrowDownOutline /> &nbsp; &nbsp;<TiArrowForwardOutline/><LongMenu/>
            </Row>
            </Container>  
        </Paper>
        </div>
      );
    }
  }
  
  
export default withStyles(styles)(Feeds);
  
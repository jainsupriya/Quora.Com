import React from "react";
import "../../../styles/home.css";
import { withStyles } from "@material-ui/core/styles";
// import PropTypes from 'prop-types';
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
import {} from "../../../redux/actions/homeAction";

import Feed from '../layout/feed'
import QuestionCard from "../layout/QuestionCard"

const styles = theme => ({});

class Home extends React.Component {
    render() {
        let temp = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
        return (
            <div>
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
                                
                                <div style={{position:"fixed", width:"11%"}}>
                                {temp.map(item => {
                                    // console.log(item);
                                    return (
                                        <Feed/>
                                    );
                                })}
                                </div>

                            </Grid>
                            <Grid
                                item
                                xs={8}
                                className="m-padding-left-right-15"
                            >
                                <QuestionCard />
                                <QuestionCard />
                                <QuestionCard />
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
const mapStateToProps = state => ({
    state: state.homeState,
    userState: state.userState
});

export default connect(
    mapStateToProps,
    {}
)(withStyles(styles)(Home));

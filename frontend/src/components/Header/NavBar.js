import React from "react";
import {Navbar, Nav, Button, Form, NavDropdown, FormControl } from "react-bootstrap";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import blue from '@material-ui/core/colors/blue';
import SvgIcon from '@material-ui/core/SvgIcon';

import EditIcon from '@material-ui/icons/Edit';
import notificatioIcon from '@material-ui/icons/'

const styles = theme => ({
  root: {
    margin: "0px",
    width: '100%',
    backgroundColor: '#f0f0f0',
    border: '0.5px solid black',
},
navbar: {
  margin: "0px",
},
icon: {
  margin: theme.spacing.unit * 2,
},
iconHover: {
  margin: theme.spacing.unit * 2,
  '&:hover': {
    color: red[800],
  },
},
});

function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}


class NavBar extends React.Component {
  constructor() {
    super();
  }

  render() {
    
    const { classes } = this.props;

    return (
      <div className={classes.root}>
      <Navbar bg="light" variant="light" className={classes.navbar}>
        <Navbar.Brand href="#home" >
        <a href="/">Quora</a>
        </Navbar.Brand>
        <Nav className="mr-auto">
          
          <Nav.Link href="#home">
            <font size="3">  
              <HomeIcon className={classes.icon} color="secondary" />
            </font>
            Home
          </Nav.Link>

          <Nav.Link href="#home">
            <font size="3">  
              <EditIcon color="secondary"/>
            </font>
            Answer
          </Nav.Link>

          <Nav.Link href="#home">
            <font size="3">  
              <HomeIcon className={classes.icon} color="secondary" />
            </font>
            Notification
          </Nav.Link>

        </Nav>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-info">Search</Button>
        </Form>
      </Navbar>
      </div>
    );
  }
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavBar);
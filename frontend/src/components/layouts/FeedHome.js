import React from "react";
import { withRouter } from "react-router-dom";
import Navbar from "../Header/NavBar";
import { Row, Container, Col } from "react-bootstrap";
import Feeds from "../feeds/Feeds";
import Sidebar from "../sidebar/Sidebar";


class FeedHome extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Navbar />
        <Container>
          <Row>
            <Col xs={2} ><Sidebar/></Col>
            <Col xs={8}><Feeds/></Col>
            <Col xs={3} ></Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

export default withRouter(FeedHome);

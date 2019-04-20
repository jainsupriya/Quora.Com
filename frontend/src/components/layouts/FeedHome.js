import React from "react";
import { withRouter } from "react-router-dom";
import Navbar from "../Header/NavBar";
import { Row, Container, Col } from "react-bootstrap";

class FeedHome extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Navbar />
        <Container>
          <Row>
            <Col style={{ backgroundColor: "grey" }}>Hello</Col>
            <Col style={{ backgroundColor: "blue" }} />
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

export default withRouter(FeedHome);

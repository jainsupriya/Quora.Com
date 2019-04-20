import React from "react";
import NavBar from "../Header/NavBar";
import { withRouter } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";

const styles = theme => ({
  root: {
    display: "flex"
  }
});

class FeedHome extends React.Component {
  render() {
    const {
      classes,
      match: { url }
    } = this.props;

    return (
      <React.Fragment>
        <Container>
          <Row>
            <Col style={{ backgroundColor: "darkGrey" }}>
              <NavBar />
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

export default withRouter(FeedHome);

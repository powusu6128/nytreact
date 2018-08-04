import React from "react";
import { Col, Row, Container } from "../../components/Grid";
import Jumbotron from "../../components/Jumbotron";
import *  as Headings from '../../components/Heading';

const NoMatch = () =>
  <Container fluid>
    <Row>
      <Col size="sm-10" offset='sm-1'>
        <Jumbotron>
          <Headings.H1 className="text-center">404 OOPS!  You did something wrong</Headings.H1>
          <Headings.H1 className="text-center">
            <span role="img" aria-label="Face With Rolling Eyes Emoji">
              🙄
              <br/>
            </span>
          </Headings.H1>
        </Jumbotron>
      </Col>
    </Row>
  </Container>;

export default NoMatch;
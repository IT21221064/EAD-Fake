import React from "react";
import {
  Container,
  Row,
  Col,
  Stack,
  Image,
  Nav,
  NavLink,
} from "react-bootstrap";
import "./Footer.css";

const Footer = () => {
  return (
    <footer>
      <Container fluid>
        <Row className="bg-primary text-white p-4">
          {/* Company Logo and Tagline */}
          <Col md={3}>
            <Stack>
              <Image
                src="./Logo(3).png"
                alt="Company Logo"
                rounded
                width={250}
                height={200}
              />
              <h4>Phantom Computers Inc. </h4>
              <p>"Fueling Obsessions, One Component at a Time!"</p>
            </Stack>
          </Col>

          {/* Useful Links */}
          <Col md={3}>
            <Nav className="flex-column fs-5">
              <h4>Useful Links</h4>
              <NavLink href="#" className="text-white">
                Home
              </NavLink>
              <NavLink href="#" className="text-white">
                About
              </NavLink>
              <NavLink href="#" className="text-white">
                Products
              </NavLink>
              <NavLink href="#" className="text-white">
                We're on Top!
              </NavLink>
            </Nav>
          </Col>

          {/* Contact Information */}
          <Col md={3}>
            <Nav className="flex-column fs-5">
              <h4>Contact Us!</h4>
              <NavLink href="#" className="text-white">
                email@gmail.com
              </NavLink>
              <NavLink href="#" className="text-white">
                Phone: +(800) 867-9876
              </NavLink>
            </Nav>
          </Col>

          {/* Powered By Section */}
          <Col md={3} className="mt-5">
            <Nav className="flex-column fs-5 text-center">
              <h5>Powered By @BitBusters</h5>
              <p>&copy; 2024 Phantom Computers Inc. All Rights Reserved.</p>
            </Nav>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;

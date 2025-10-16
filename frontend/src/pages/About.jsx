import React from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'
import { LocalShipping, Star, Support, LocalFlorist } from '@mui/icons-material'

const About = () => {
  return (
    <div>
      <section className="hero-section">
        <Container>
          <h1>About FreshBasket</h1>
          <p>Your trusted partner for fresh groceries and quality service</p>
        </Container>
      </section>

      <Container className="mt-5 pt-5">
        <Row className="mb-5">
          <Col lg={8} className="mx-auto text-center">
            <h2 className="mb-4">Our Mission</h2>
            <p className="lead">
              At FreshBasket, we believe that everyone deserves access to fresh, 
              high-quality groceries delivered right to their doorstep. Our mission 
              is to make grocery shopping convenient, reliable, and enjoyable for 
              families across the community.
            </p>
          </Col>
        </Row>

        <Row className="mb-5">
          <Col lg={12}>
            <h2 className="text-center mb-5">Why Choose FreshBasket?</h2>
          </Col>
          <Col md={6} lg={3} className="mb-4">
            <Card className="h-100 text-center border-0 shadow-sm">
              <Card.Body className="p-4">
                <div className="mb-3">
                  <LocalFlorist style={{ fontSize: '3rem', color: '#27ae60' }} />
                </div>
                <h5 className="mb-3">Fresh & Organic</h5>
                <p className="text-muted">
                  We source only the freshest, highest-quality products directly 
                  from local farms and trusted suppliers.
                </p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} lg={3} className="mb-4">
            <Card className="h-100 text-center border-0 shadow-sm">
              <Card.Body className="p-4">
                <div className="mb-3">
                  <LocalShipping style={{ fontSize: '3rem', color: '#3498db' }} />
                </div>
                <h5 className="mb-3">Fast Delivery</h5>
                <p className="text-muted">
                  Same-day delivery available with our efficient logistics network. 
                  Your groceries arrive fresh and on time.
                </p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} lg={3} className="mb-4">
            <Card className="h-100 text-center border-0 shadow-sm">
              <Card.Body className="p-4">
                <div className="mb-3">
                  <Star style={{ fontSize: '3rem', color: '#f39c12' }} />
                </div>
                <h5 className="mb-3">Quality Guarantee</h5>
                <p className="text-muted">
                  100% satisfaction guarantee. If you're not happy with your order, 
                  we'll make it right.
                </p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} lg={3} className="mb-4">
            <Card className="h-100 text-center border-0 shadow-sm">
              <Card.Body className="p-4">
                <div className="mb-3">
                  <Support style={{ fontSize: '3rem', color: '#e74c3c' }} />
                </div>
                <h5 className="mb-3">24/7 Support</h5>
                <p className="text-muted">
                  Our customer support team is always here to help with any questions 
                  or concerns you may have.
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="mb-5">
          <Col lg={6}>
            <h3 className="mb-4">Our Story</h3>
            <p className="mb-3">
              FreshBasket was founded in 2024 with a simple vision: to revolutionize 
              the way people shop for groceries. We noticed that busy families and 
              individuals were struggling to find time for grocery shopping while 
              maintaining a healthy lifestyle.
            </p>
            <p className="mb-3">
              Our founders, passionate about food quality and customer service, 
              decided to create a solution that would bring the grocery store 
              experience directly to your home. Today, we're proud to serve 
              thousands of satisfied customers across the region.
            </p>
            <p>
              We're committed to supporting local farmers and suppliers, ensuring 
              that our community thrives while providing you with the best possible 
              products and service.
            </p>
          </Col>
          <Col lg={6}>
            <div className="bg-light p-4 rounded">
              <h4 className="mb-3">Our Values</h4>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <strong>Quality First:</strong> We never compromise on the quality 
                  of our products.
                </li>
                <li className="mb-2">
                  <strong>Customer Focus:</strong> Your satisfaction is our top priority.
                </li>
                <li className="mb-2">
                  <strong>Sustainability:</strong> We're committed to eco-friendly 
                  practices and packaging.
                </li>
                <li className="mb-2">
                  <strong>Community:</strong> We support local businesses and farmers.
                </li>
                <li className="mb-2">
                  <strong>Innovation:</strong> We continuously improve our service 
                  and technology.
                </li>
              </ul>
            </div>
          </Col>
        </Row>

        <Row className="text-center mb-5">
          <Col md={3} className="mb-4">
            <h3 className="text-primary">10,000+</h3>
            <p className="text-muted">Happy Customers</p>
          </Col>
          <Col md={3} className="mb-4">
            <h3 className="text-primary">500+</h3>
            <p className="text-muted">Products Available</p>
          </Col>
          <Col md={3} className="mb-4">
            <h3 className="text-primary">50+</h3>
            <p className="text-muted">Local Partners</p>
          </Col>
          <Col md={3} className="mb-4">
            <h3 className="text-primary">99%</h3>
            <p className="text-muted">Customer Satisfaction</p>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default About

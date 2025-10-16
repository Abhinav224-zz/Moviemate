import React, { useState } from 'react'
import { Container, Row, Col, Form, Button, Alert, Card } from 'react-bootstrap'
import { Email, Phone, LocationOn, AccessTime, Send } from '@mui/icons-material'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setSubmitted(false)
    setError(false)

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: '0db4cf01-bddb-4fc2-a847-a78684fb0841',
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message
        })
      })

      const result = await response.json()

      if (result.success) {
        setSubmitted(true)
        setFormData({ name: '', email: '', subject: '', message: '' })
      } else {
        setError(true)
      }
    } catch (err) {
      console.error('Error submitting form:', err)
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <section className="hero-section">
        <Container>
          <h1>Contact Us</h1>
          <p>We'd love to hear from you. Get in touch with us!</p>
        </Container>
      </section>

      <Container className="mt-5 pt-5">
        <Row>
          <Col lg={8} className="mb-5">
            <Card className="border-0 shadow-sm">
              <Card.Body className="p-4">
                <h3 className="mb-4">Send us a Message</h3>
                
                {submitted && (
                  <Alert variant="success" className="mb-4">
                    Thank you for your message! We'll get back to you soon.
                  </Alert>
                )}

                {error && (
                  <Alert variant="danger" className="mb-4">
                    Oops! Something went wrong. Please try again later.
                  </Alert>
                )}

                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Full Name *</Form.Label>
                        <Form.Control
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          placeholder="Enter your full name"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Email Address *</Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          placeholder="Enter your email"
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-3">
                    <Form.Label>Subject *</Form.Label>
                    <Form.Control
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      placeholder="What's this about?"
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label>Message *</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={5}
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      placeholder="Tell us how we can help you..."
                    />
                  </Form.Group>

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="btn-add-cart"
                    disabled={loading}
                  >
                    <Send className="me-2" />
                    {loading ? 'Sending...' : 'Send Message'}
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={4}>
            <div className="mb-4">
              <h4 className="mb-4">Get in Touch</h4>
              
              <div className="d-flex align-items-start mb-4">
                <LocationOn className="me-3 text-primary" style={{ fontSize: '1.5rem' }} />
                <div>
                  <h6 className="mb-1">Address</h6>
                  <p className="text-muted mb-0">
                    123 Fresh Street<br />
                    Grocery City, GC 12345<br />
                    United States
                  </p>
                </div>
              </div>

              <div className="d-flex align-items-start mb-4">
                <Phone className="me-3 text-primary" style={{ fontSize: '1.5rem' }} />
                <div>
                  <h6 className="mb-1">Phone</h6>
                  <p className="text-muted mb-0">
                    +91 8113856108
                  </p>
                </div>
              </div>

              <div className="d-flex align-items-start mb-4">
                <Email className="me-3 text-primary" style={{ fontSize: '1.5rem' }} />
                <div>
                  <h6 className="mb-1">Email</h6>
                  <p className="text-muted mb-0">
                    abhinavpurushothaman994@gmail.com
                  </p>
                </div>
              </div>

              <div className="d-flex align-items-start mb-4">
                <AccessTime className="me-3 text-primary" style={{ fontSize: '1.5rem' }} />
                <div>
                  <h6 className="mb-1">Business Hours</h6>
                  <p className="text-muted mb-0">
                    Monday - Friday: 8:00 AM - 8:00 PM<br />
                    Saturday: 9:00 AM - 6:00 PM<br />
                    Sunday: 10:00 AM - 4:00 PM
                  </p>
                </div>
              </div>
            </div>

            <Card className="border-0 shadow-sm">
              <Card.Body className="p-4">
                <h5 className="mb-3">Frequently Asked Questions</h5>
                
                <div className="mb-3">
                  <h6 className="mb-1">How fast is delivery?</h6>
                  <p className="text-muted small mb-0">
                    We offer same-day delivery for orders placed before 2 PM.
                  </p>
                </div>

                <div className="mb-3">
                  <h6 className="mb-1">What if I'm not satisfied?</h6>
                  <p className="text-muted small mb-0">
                    We offer a 100% satisfaction guarantee. Contact us for returns.
                  </p>
                </div>

                <div className="mb-3">
                  <h6 className="mb-1">Do you deliver to my area?</h6>
                  <p className="text-muted small mb-0">
                    We deliver to most areas within 20 miles of our location.
                  </p>
                </div>

                <div>
                  <h6 className="mb-1">How do I track my order?</h6>
                  <p className="text-muted small mb-0">
                    You'll receive SMS and email updates throughout the delivery process.
                  </p>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Contact

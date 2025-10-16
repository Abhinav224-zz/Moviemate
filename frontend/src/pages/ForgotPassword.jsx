import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Container, Form, Button, Alert, Card } from 'react-bootstrap'
import { useAuth } from '../context/AuthContext'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const { resetPassword } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!email) {
      setError('Please enter your email address')
      return
    }

    setLoading(true)
    const result = await resetPassword(email)
    setLoading(false)

    if (result.success) {
      setSuccess(result.message)
      setEmail('')
    } else {
      setError(result.error)
    }
  }

  return (
    <div className="min-vh-100 d-flex align-items-center" style={{ paddingTop: '80px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      <Container>
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <Card className="shadow-lg border-0">
              <Card.Body className="p-5">
                <div className="text-center mb-4">
                  <h2 className="fw-bold">Forgot Password?</h2>
                  <p className="text-muted">
                    Enter your email address and we'll send you a link to reset your password
                  </p>
                </div>

                {error && <Alert variant="danger">{error}</Alert>}
                {success && <Alert variant="success">{success}</Alert>}

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Button
                    variant="primary"
                    type="submit"
                    className="w-100 mb-3"
                    disabled={loading}
                    size="lg"
                  >
                    {loading ? 'Sending...' : 'Send Reset Link'}
                  </Button>
                </Form>

                <div className="text-center">
                  <Link to="/login" className="text-decoration-none">
                    Back to Login
                  </Link>
                </div>
              </Card.Body>
            </Card>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default ForgotPassword

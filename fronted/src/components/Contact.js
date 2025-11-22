import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      let data;
      try {
        data = await response.json();
      } catch (parseError) {
        // If response is not JSON, it might be a network error
        throw new Error('Server did not respond properly. Is the backend server running?');
      }

      if (response.ok) {
        setSubmitMessage('✅ Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        // Show the error message from the server
        const errorMsg = data.message || data.error || 'Failed to send message. Please try again.';
        setSubmitMessage(`❌ ${errorMsg}`);
        console.error('Contact form error:', data);
        
        // Log specific error details for debugging
        if (data.error) {
          console.error('Error details:', data.error);
        }
        if (data.code) {
          console.error('Error code:', data.code);
        }
      }
    } catch (error) {
      console.error('Network error:', error);
      let errorMessage = 'Error sending message. ';
      
      if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
        errorMessage += 'Cannot connect to server. Make sure the backend server is running on port 5000.';
      } else if (error.message.includes('backend server')) {
        errorMessage += error.message;
      } else {
        errorMessage += 'Please check your connection and try again.';
      }
      
      setSubmitMessage(`❌ ${errorMessage}`);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <section id="contact" className="contact">
      <h2>Contact Me</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          required
        ></textarea>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
        {submitMessage && <p className="submit-message">{submitMessage}</p>}
      </form>
    </section>
  );
};

export default Contact;

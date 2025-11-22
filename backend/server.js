require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files (for resume PDF)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Email transporter setup
const transporter = nodemailer.createTransport({
  service: 'gmail', // or your email service
  auth: {
    user: process.env.EMAIL_USER, // Your email
    pass: process.env.EMAIL_PASS  // Your email password or app password
  }
});

// Routes
app.post('/api/contact', async (req, res) => {
  try {
    // Check if environment variables are set
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error('Missing environment variables: EMAIL_USER or EMAIL_PASS');
      return res.status(500).json({ 
        message: 'Server configuration error. Email service not configured.',
        error: 'Missing email credentials. Please set EMAIL_USER and EMAIL_PASS in .env file'
      });
    }

    const { name, email, message } = req.body;

    // Validate input
    if (!name || !email || !message) {
      return res.status(400).json({ 
        message: 'All fields are required',
        error: 'Missing required fields'
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        message: 'Please enter a valid email address',
        error: 'Invalid email format'
      });
    }

    // Send email to yourself
    const info = await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, // Send to yourself
      replyTo: email, // Allow replying directly to the sender
      subject: `New Contact Message from ${name}`,
      html: `
        <h3>New Contact Message</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
      text: `
        New Contact Message
        
        Name: ${name}
        Email: ${email}
        Message: ${message}
      `
    });

    console.log(`Email sent successfully from ${name} (${email}) - Message ID: ${info.messageId}`);
    res.json({ message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    console.error('Error code:', error.code);
    console.error('Error message:', error.message);
    
    // Provide more specific error messages
    let errorMessage = 'Failed to send message. Please try again.';
    
    if (error.code === 'EAUTH' || error.code === 'EENVELOPE') {
      errorMessage = 'Email authentication failed. Please check email credentials.';
    } else if (error.code === 'ECONNECTION' || error.code === 'ETIMEDOUT') {
      errorMessage = 'Connection error. Please check your internet connection.';
    } else if (error.message && error.message.includes('Invalid login')) {
      errorMessage = 'Email authentication failed. Invalid email or password.';
    } else if (error.message) {
      errorMessage = `Error: ${error.message}`;
    }

    res.status(500).json({ 
      message: errorMessage,
      error: error.message || 'Unknown error',
      code: error.code || 'UNKNOWN'
    });
  }
});

app.get('/api/resume', (req, res) => {
  const resumePath = path.join(__dirname, 'uploads', 'resume.pdf');
  const fs = require('fs');
  
  // Check if file exists
  if (!fs.existsSync(resumePath)) {
    return res.status(404).json({ message: 'Resume not found' });
  }
  
  // Set proper headers for PDF download
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename="resume.pdf"');
  
  // Send the file
  res.sendFile(resumePath, (err) => {
    if (err) {
      console.error('Error sending resume:', err);
      if (!res.headersSent) {
        res.status(500).json({ message: 'Error downloading resume' });
      }
    }
  });
});

// Basic route
app.get('/api', (req, res) => {
  res.json({ message: 'Welcome to the Portfolio API' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

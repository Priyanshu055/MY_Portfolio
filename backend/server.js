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
  const { name, email, message } = req.body;

  try {
    // Send email to yourself
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Send to yourself
      subject: `New Contact Message from ${name}`,
      html: `
        <h3>New Contact Message</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
    });

    console.log(`Email sent successfully from ${name} (${email})`);
    res.json({ message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send message. Please try again.' });
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

import React from 'react';
import './Resume.css';

const Resume = () => {
  const handleDownload = async () => {
    try {
      const response = await fetch('/api/resume');
      if (!response.ok) {
        throw new Error('Failed to download resume');
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'resume.pdf';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error downloading resume:', error);
      alert('Failed to download resume. Please try again.');
    }
  };

  return (
    <section id="resume" className="resume">
      <h2>Resume</h2>
      <button onClick={handleDownload}>Download Resume</button>
    </section>
  );
};

export default Resume;

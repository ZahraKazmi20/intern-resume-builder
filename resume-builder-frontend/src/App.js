import React, { useState } from 'react';
import './App.css';
import ResumeForm from './components/ResumeForm';
import ResumePreview from './components/ResumePreview';
import Navigation from './components/Navigation';

function App() {
  const [formData, setFormData] = useState({
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      profilePicture: '',
      summary: ''
    },
    experience: [],
    education: [],
    skills: [],
    certifications: [],
    projects: [],
    template: 'professional',
    theme: 'blue'
  });

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const showMessage = (text, type = 'success') => {
    setMessage(text);
    setMessageType(type);
    setTimeout(() => setMessage(''), 3000);
  };

  const handleFormChange = (data) => {
    setFormData(data);
  };

  const handleSaveResume = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/resume/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        showMessage('✅ Resume saved successfully!', 'success');
        localStorage.setItem('resumeId', data.resumeId);
      } else {
        showMessage(`❌ ${data.error}`, 'error');
      }
    } catch (error) {
      showMessage(`❌ ${error.message}`, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadPDF = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/pdf/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resumeId: localStorage.getItem('resumeId') || null })
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${formData.personalInfo.fullName}-Resume.pdf`;
        document.body.appendChild(link);
        link.click();
        link.remove();
        showMessage('✅ Resume downloaded successfully!', 'success');
      } else {
        showMessage('❌ Failed to generate PDF', 'error');
      }
    } catch (error) {
      showMessage(`❌ ${error.message}`, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
      <Navigation />

      {message && (
        <div className={`message message-${messageType}`}>
          {message}
        </div>
      )}

      <div className="container">
        <div className="main-content">
          <div className="form-section">
            <ResumeForm 
              formData={formData} 
              onChange={handleFormChange}
            />
            <div className="button-group">
              <button 
                className="btn btn-primary" 
                onClick={handleSaveResume}
                disabled={isLoading}
              >
                {isLoading ? '💾 Saving...' : '💾 Save Resume'}
              </button>
              <button 
                className="btn btn-success" 
                onClick={handleDownloadPDF}
                disabled={isLoading}
              >
                {isLoading ? '⏳ Generating...' : '📥 Download PDF'}
              </button>
            </div>
          </div>

          <div className="preview-section">
            <ResumePreview formData={formData} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

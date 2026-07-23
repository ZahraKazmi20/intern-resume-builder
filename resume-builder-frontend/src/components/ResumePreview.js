import React from 'react';
import '../styles/ResumePreview.css';

function ResumePreview({ formData }) {
  return (
    <div className="resume-preview">
      <div className="preview-header">
        <h2>📄 Resume Preview</h2>
      </div>

      <div className="resume-document">
        {/* Personal Info */}
        <div className="resume-section personal-section">
          {formData.personalInfo.profilePicture && (
            <img 
              src={formData.personalInfo.profilePicture} 
              alt="Profile" 
              className="resume-profile-pic"
            />
          )}
          <div className="personal-details">
            <h1>{formData.personalInfo.fullName || 'Your Name'}</h1>
            <div className="contact-info">
              {formData.personalInfo.email && <span>📧 {formData.personalInfo.email}</span>}
              {formData.personalInfo.phone && <span>📱 {formData.personalInfo.phone}</span>}
              {formData.personalInfo.location && <span>📍 {formData.personalInfo.location}</span>}
            </div>
          </div>
        </div>

        {/* Summary */}
        {formData.personalInfo.summary && (
          <div className="resume-section">
            <h2 className="section-title">Professional Summary</h2>
            <p>{formData.personalInfo.summary}</p>
          </div>
        )}

        {/* Experience */}
        {formData.experience && formData.experience.length > 0 && (
          <div className="resume-section">
            <h2 className="section-title">Professional Experience</h2>
            {formData.experience.map((exp, index) => (
              <div key={index} className="resume-item">
                <div className="item-header">
                  <h3>{exp.position}</h3>
                  <span className="company">{exp.company}</span>
                </div>
                <div className="item-date">
                  {exp.startDate && new Date(exp.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                  {' - '}
                  {exp.currentlyWorking ? 'Present' : exp.endDate ? new Date(exp.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : 'N/A'}
                </div>
                {exp.description && <p>{exp.description}</p>}
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {formData.education && formData.education.length > 0 && (
          <div className="resume-section">
            <h2 className="section-title">Education</h2>
            {formData.education.map((edu, index) => (
              <div key={index} className="resume-item">
                <div className="item-header">
                  <h3>{edu.degree} in {edu.field}</h3>
                  <span className="school">{edu.school}</span>
                </div>
                <div className="item-date">
                  {edu.startDate && new Date(edu.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                  {' - '}
                  {edu.endDate ? new Date(edu.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : 'N/A'}
                </div>
                {edu.grade && <p>GPA: {edu.grade}</p>}
              </div>
            ))}
          </div>
        )}

        {/* Skills */}
        {formData.skills && formData.skills.length > 0 && (
          <div className="resume-section">
            <h2 className="section-title">Skills</h2>
            <div className="skills-grid">
              {formData.skills.map((skillGroup, index) => (
                <div key={index} className="skill-group">
                  {skillGroup.category && <h4>{skillGroup.category}</h4>}
                  <div className="skill-items">
                    {skillGroup.items && skillGroup.items.map((skill, i) => (
                      <span key={i} className="skill-badge">{skill}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ResumePreview;

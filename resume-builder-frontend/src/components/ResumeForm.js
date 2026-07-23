import React, { useState } from 'react';
import '../styles/ResumeForm.css';

function ResumeForm({ formData, onChange }) {
  const [activeTab, setActiveTab] = useState('personal');

  const handlePersonalInfoChange = (field, value) => {
    onChange({
      ...formData,
      personalInfo: {
        ...formData.personalInfo,
        [field]: value
      }
    });
  };

  const handleExperienceChange = (index, field, value) => {
    const updatedExperience = [...formData.experience];
    updatedExperience[index] = {
      ...updatedExperience[index],
      [field]: value
    };
    onChange({
      ...formData,
      experience: updatedExperience
    });
  };

  const addExperience = () => {
    onChange({
      ...formData,
      experience: [
        ...formData.experience,
        {
          company: '',
          position: '',
          startDate: '',
          endDate: '',
          currentlyWorking: false,
          description: ''
        }
      ]
    });
  };

  const removeExperience = (index) => {
    const updatedExperience = formData.experience.filter((_, i) => i !== index);
    onChange({
      ...formData,
      experience: updatedExperience
    });
  };

  const handleEducationChange = (index, field, value) => {
    const updatedEducation = [...formData.education];
    updatedEducation[index] = {
      ...updatedEducation[index],
      [field]: value
    };
    onChange({
      ...formData,
      education: updatedEducation
    });
  };

  const addEducation = () => {
    onChange({
      ...formData,
      education: [
        ...formData.education,
        {
          school: '',
          degree: '',
          field: '',
          startDate: '',
          endDate: '',
          grade: ''
        }
      ]
    });
  };

  const removeEducation = (index) => {
    const updatedEducation = formData.education.filter((_, i) => i !== index);
    onChange({
      ...formData,
      education: updatedEducation
    });
  };

  const handleSkillsChange = (index, field, value) => {
    const updatedSkills = [...formData.skills];
    updatedSkills[index] = {
      ...updatedSkills[index],
      [field]: value
    };
    onChange({
      ...formData,
      skills: updatedSkills
    });
  };

  const addSkill = () => {
    onChange({
      ...formData,
      skills: [
        ...formData.skills,
        { category: '', items: [] }
      ]
    });
  };

  const removeSkill = (index) => {
    const updatedSkills = formData.skills.filter((_, i) => i !== index);
    onChange({
      ...formData,
      skills: updatedSkills
    });
  };

  const handleProfilePictureUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formDataToSend = new FormData();
    formDataToSend.append('image', file);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/upload/profile-pic`,
        {
          method: 'POST',
          body: formDataToSend
        }
      );

      const data = await response.json();
      if (response.ok) {
        handlePersonalInfoChange('profilePicture', data.url);
      }
    } catch (error) {
      console.error('Upload error:', error);
    }
  };

  return (
    <div className="resume-form">
      <div className="tabs">
        <button
          className={`tab ${activeTab === 'personal' ? 'active' : ''}`}
          onClick={() => setActiveTab('personal')}
        >
          👤 Personal Info
        </button>
        <button
          className={`tab ${activeTab === 'experience' ? 'active' : ''}`}
          onClick={() => setActiveTab('experience')}
        >
          💼 Experience
        </button>
        <button
          className={`tab ${activeTab === 'education' ? 'active' : ''}`}
          onClick={() => setActiveTab('education')}
        >
          🎓 Education
        </button>
        <button
          className={`tab ${activeTab === 'skills' ? 'active' : ''}`}
          onClick={() => setActiveTab('skills')}
        >
          🎯 Skills
        </button>
      </div>

      <div className="tab-content">
        {/* ===== PERSONAL INFO TAB ===== */}
        {activeTab === 'personal' && (
          <div className="tab-pane">
            <h2>Personal Information</h2>

            <div className="form-group">
              <label>Full Name *</label>
              <input
                type="text"
                placeholder="John Doe"
                value={formData.personalInfo.fullName}
                onChange={(e) => handlePersonalInfoChange('fullName', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Email *</label>
              <input
                type="email"
                placeholder="john@example.com"
                value={formData.personalInfo.email}
                onChange={(e) => handlePersonalInfoChange('email', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Phone</label>
              <input
                type="tel"
                placeholder="+1 (555) 123-4567"
                value={formData.personalInfo.phone}
                onChange={(e) => handlePersonalInfoChange('phone', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Location</label>
              <input
                type="text"
                placeholder="New York, NY"
                value={formData.personalInfo.location}
                onChange={(e) => handlePersonalInfoChange('location', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Professional Summary</label>
              <textarea
                placeholder="Brief overview of your professional background..."
                rows="4"
                value={formData.personalInfo.summary}
                onChange={(e) => handlePersonalInfoChange('summary', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Profile Picture</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleProfilePictureUpload}
              />
              {formData.personalInfo.profilePicture && (
                <img 
                  src={formData.personalInfo.profilePicture} 
                  alt="Profile" 
                  className="profile-preview"
                />
              )}
            </div>
          </div>
        )}

        {/* ===== EXPERIENCE TAB ===== */}
        {activeTab === 'experience' && (
          <div className="tab-pane">
            <h2>Professional Experience</h2>

            {formData.experience.map((exp, index) => (
              <div key={index} className="form-section">
                <div className="section-header">
                  <h3>Position {index + 1}</h3>
                  <button 
                    className="btn-remove"
                    onClick={() => removeExperience(index)}
                  >
                    ✕
                  </button>
                </div>

                <div className="form-group">
                  <label>Company *</label>
                  <input
                    type="text"
                    placeholder="Company Name"
                    value={exp.company}
                    onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Position *</label>
                  <input
                    type="text"
                    placeholder="Job Title"
                    value={exp.position}
                    onChange={(e) => handleExperienceChange(index, 'position', e.target.value)}
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Start Date *</label>
                    <input
                      type="date"
                      value={exp.startDate}
                      onChange={(e) => handleExperienceChange(index, 'startDate', e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label>End Date</label>
                    <input
                      type="date"
                      value={exp.endDate}
                      onChange={(e) => handleExperienceChange(index, 'endDate', e.target.value)}
                      disabled={exp.currentlyWorking}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>
                    <input
                      type="checkbox"
                      checked={exp.currentlyWorking}
                      onChange={(e) => handleExperienceChange(index, 'currentlyWorking', e.target.checked)}
                    />
                    I currently work here
                  </label>
                </div>

                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    placeholder="Describe your responsibilities and achievements..."
                    rows="3"
                    value={exp.description}
                    onChange={(e) => handleExperienceChange(index, 'description', e.target.value)}
                  />
                </div>
              </div>
            ))}

            <button className="btn btn-secondary" onClick={addExperience}>
              + Add Experience
            </button>
          </div>
        )}

        {/* ===== EDUCATION TAB ===== */}
        {activeTab === 'education' && (
          <div className="tab-pane">
            <h2>Education</h2>

            {formData.education.map((edu, index) => (
              <div key={index} className="form-section">
                <div className="section-header">
                  <h3>Education {index + 1}</h3>
                  <button 
                    className="btn-remove"
                    onClick={() => removeEducation(index)}
                  >
                    ✕
                  </button>
                </div>

                <div className="form-group">
                  <label>School *</label>
                  <input
                    type="text"
                    placeholder="University Name"
                    value={edu.school}
                    onChange={(e) => handleEducationChange(index, 'school', e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Degree *</label>
                  <input
                    type="text"
                    placeholder="Bachelor of Science"
                    value={edu.degree}
                    onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Field of Study *</label>
                  <input
                    type="text"
                    placeholder="Computer Science"
                    value={edu.field}
                    onChange={(e) => handleEducationChange(index, 'field', e.target.value)}
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Start Date *</label>
                    <input
                      type="date"
                      value={edu.startDate}
                      onChange={(e) => handleEducationChange(index, 'startDate', e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label>End Date *</label>
                    <input
                      type="date"
                      value={edu.endDate}
                      onChange={(e) => handleEducationChange(index, 'endDate', e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Grade (GPA)</label>
                  <input
                    type="text"
                    placeholder="3.8"
                    value={edu.grade}
                    onChange={(e) => handleEducationChange(index, 'grade', e.target.value)}
                  />
                </div>
              </div>
            ))}

            <button className="btn btn-secondary" onClick={addEducation}>
              + Add Education
            </button>
          </div>
        )}

        {/* ===== SKILLS TAB ===== */}
        {activeTab === 'skills' && (
          <div className="tab-pane">
            <h2>Skills</h2>

            {formData.skills.map((skill, index) => (
              <div key={index} className="form-section">
                <div className="section-header">
                  <h3>Skill Category {index + 1}</h3>
                  <button 
                    className="btn-remove"
                    onClick={() => removeSkill(index)}
                  >
                    ✕
                  </button>
                </div>

                <div className="form-group">
                  <label>Category</label>
                  <input
                    type="text"
                    placeholder="e.g., Programming Languages"
                    value={skill.category}
                    onChange={(e) => handleSkillsChange(index, 'category', e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Skills (comma-separated)</label>
                  <textarea
                    placeholder="JavaScript, React, Node.js"
                    rows="2"
                    value={skill.items ? skill.items.join(', ') : ''}
                    onChange={(e) => handleSkillsChange(index, 'items', e.target.value.split(',').map(s => s.trim()))}
                  />
                </div>
              </div>
            ))}

            <button className="btn btn-secondary" onClick={addSkill}>
              + Add Skill Category
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ResumeForm;

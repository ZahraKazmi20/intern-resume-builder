const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema(
  {
    // Personal Information
    personalInfo: {
      fullName: {
        type: String,
        required: [true, 'Full name is required'],
        trim: true,
        maxlength: [50, 'Name cannot exceed 50 characters']
      },
      email: {
        type: String,
        required: [true, 'Email is required'],
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email']
      },
      phone: {
        type: String,
        trim: true,
        maxlength: [20, 'Phone cannot exceed 20 characters']
      },
      location: {
        type: String,
        trim: true
      },
      profilePicture: {
        type: String,
        default: ''
      },
      summary: {
        type: String,
        maxlength: [500, 'Summary cannot exceed 500 characters']
      }
    },

    // Professional Experience
    experience: [
      {
        company: {
          type: String,
          required: [true, 'Company name is required']
        },
        position: {
          type: String,
          required: [true, 'Position is required']
        },
        startDate: {
          type: Date,
          required: [true, 'Start date is required']
        },
        endDate: {
          type: Date
        },
        currentlyWorking: {
          type: Boolean,
          default: false
        },
        description: String
      }
    ],

    // Education
    education: [
      {
        school: {
          type: String,
          required: [true, 'School name is required']
        },
        degree: {
          type: String,
          required: [true, 'Degree is required']
        },
        field: {
          type: String,
          required: [true, 'Field of study is required']
        },
        startDate: {
          type: Date,
          required: [true, 'Start date is required']
        },
        endDate: {
          type: Date
        },
        grade: String
      }
    ],

    // Skills
    skills: [
      {
        category: String,
        items: [String]
      }
    ],

    // Additional Sections
    certifications: [
      {
        name: String,
        issuer: String,
        issueDate: Date,
        credentialUrl: String
      }
    ],

    projects: [
      {
        name: String,
        description: String,
        technologies: [String],
        url: String,
        date: Date
      }
    ],

    // Metadata
    template: {
      type: String,
      default: 'professional',
      enum: ['professional', 'creative', 'minimal']
    },
    theme: {
      type: String,
      default: 'blue',
      enum: ['blue', 'green', 'red', 'purple', 'dark']
    },
    lastDownloaded: Date,
    viewCount: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

// Index for better queries
resumeSchema.index({ 'personalInfo.email': 1 });
resumeSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Resume', resumeSchema);

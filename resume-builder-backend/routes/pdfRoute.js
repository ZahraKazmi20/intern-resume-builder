const express = require('express');
const router = express.Router();
const PDFDocument = require('pdfkit');
const Resume = require('../models/Resume');

// ✅ Generate and Download PDF
router.post('/generate', async (req, res) => {
  try {
    const { resumeId } = req.body;

    // Get resume from database
    let resume = resumeId ? await Resume.findById(resumeId) : req.body;

    if (!resume) {
      return res.status(404).json({ error: '❌ Resume not found' });
    }

    // Create PDF document
    const doc = new PDFDocument({ margin: 50 });

    // Set response headers
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${resume.personalInfo.fullName}-Resume.pdf"`);

    // Pipe to response
    doc.pipe(res);

    // ===== HEADER - Personal Information =====
    doc.fontSize(24).font('Helvetica-Bold').text(resume.personalInfo.fullName, { align: 'center' });
    doc.fontSize(11).font('Helvetica').fillColor('#666');

    const contactInfo = [
      resume.personalInfo.email,
      resume.personalInfo.phone,
      resume.personalInfo.location
    ].filter(Boolean).join(' • ');

    doc.text(contactInfo, { align: 'center' });
    doc.moveDown(0.3);

    // ===== SUMMARY =====
    if (resume.personalInfo.summary) {
      doc.fontSize(12).font('Helvetica-Bold').fillColor('#000').text('PROFESSIONAL SUMMARY');
      doc.fontSize(10).font('Helvetica').fillColor('#333').text(resume.personalInfo.summary);
      doc.moveDown(0.5);
    }

    // ===== EXPERIENCE =====
    if (resume.experience && resume.experience.length > 0) {
      doc.fontSize(12).font('Helvetica-Bold').fillColor('#000').text('PROFESSIONAL EXPERIENCE');
      
      resume.experience.forEach((exp) => {
        const endDate = exp.currentlyWorking ? 'Present' : new Date(exp.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
        const startDate = new Date(exp.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' });

        doc.fontSize(10).font('Helvetica-Bold').text(exp.position);
        doc.fontSize(10).font('Helvetica').fillColor('#666').text(`${exp.company} | ${startDate} - ${endDate}`);
        
        if (exp.description) {
          doc.fontSize(9).fillColor('#333').text(exp.description);
        }
        doc.moveDown(0.3);
      });
      doc.moveDown(0.3);
    }

    // ===== EDUCATION =====
    if (resume.education && resume.education.length > 0) {
      doc.fontSize(12).font('Helvetica-Bold').fillColor('#000').text('EDUCATION');
      
      resume.education.forEach((edu) => {
        const endDate = new Date(edu.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
        
        doc.fontSize(10).font('Helvetica-Bold').text(edu.degree + ' in ' + edu.field);
        doc.fontSize(10).font('Helvetica').fillColor('#666').text(`${edu.school} | Graduated ${endDate}`);
        
        if (edu.grade) {
          doc.fontSize(9).text(`GPA: ${edu.grade}`);
        }
        doc.moveDown(0.3);
      });
      doc.moveDown(0.3);
    }

    // ===== SKILLS =====
    if (resume.skills && resume.skills.length > 0) {
      doc.fontSize(12).font('Helvetica-Bold').fillColor('#000').text('SKILLS');
      
      resume.skills.forEach((skillGroup) => {
        if (skillGroup.category) {
          doc.fontSize(10).font('Helvetica-Bold').text(skillGroup.category + ':');
          doc.fontSize(9).font('Helvetica').fillColor('#333').text(skillGroup.items.join(', '));
          doc.moveDown(0.2);
        }
      });
      doc.moveDown(0.3);
    }

    // ===== CERTIFICATIONS =====
    if (resume.certifications && resume.certifications.length > 0) {
      doc.fontSize(12).font('Helvetica-Bold').fillColor('#000').text('CERTIFICATIONS');
      
      resume.certifications.forEach((cert) => {
        doc.fontSize(10).font('Helvetica-Bold').text(cert.name);
        doc.fontSize(9).font('Helvetica').fillColor('#666').text(`${cert.issuer} | ${new Date(cert.issueDate).getFullYear()}`);
        doc.moveDown(0.2);
      });
      doc.moveDown(0.3);
    }

    // ===== PROJECTS =====
    if (resume.projects && resume.projects.length > 0) {
      doc.fontSize(12).font('Helvetica-Bold').fillColor('#000').text('PROJECTS');
      
      resume.projects.forEach((proj) => {
        doc.fontSize(10).font('Helvetica-Bold').text(proj.name);
        doc.fontSize(9).font('Helvetica').fillColor('#333').text(proj.description);
        if (proj.technologies) {
          doc.fontSize(8).fillColor('#666').text(`Technologies: ${proj.technologies.join(', ')}`);
        }
        doc.moveDown(0.3);
      });
    }

    // Update last downloaded
    if (resumeId) {
      await Resume.findByIdAndUpdate(resumeId, { lastDownloaded: new Date() });
    }

    doc.end();

  } catch (error) {
    console.error('PDF Generation Error:', error);
    res.status(500).json({
      error: '❌ Error generating PDF',
      message: error.message
    });
  }
});

// ✅ Generate PDF from form data (without saving to DB)
router.post('/preview', (req, res) => {
  try {
    const resume = req.body;

    const doc = new PDFDocument({ margin: 50 });

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="resume-preview.pdf"`);

    doc.pipe(res);

    // Same PDF generation logic as above
    doc.fontSize(24).font('Helvetica-Bold').text(resume.personalInfo.fullName, { align: 'center' });
    doc.fontSize(11).font('Helvetica').fillColor('#666');

    const contactInfo = [
      resume.personalInfo.email,
      resume.personalInfo.phone,
      resume.personalInfo.location
    ].filter(Boolean).join(' • ');

    doc.text(contactInfo, { align: 'center' });
    doc.moveDown(1);

    doc.fontSize(12).font('Helvetica-Bold').fillColor('#000').text('PREVIEW MODE');
    doc.fontSize(10).text('This is a preview. Full resume generation available after saving.');

    doc.end();

  } catch (error) {
    res.status(500).json({
      error: '❌ Error generating preview',
      message: error.message
    });
  }
});

module.exports = router;

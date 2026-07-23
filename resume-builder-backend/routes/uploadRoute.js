const express = require('express');
const router = express.Router();
const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

// ✅ Upload Profile Picture to Cloudinary
router.post('/profile-pic', async (req, res) => {
  try {
    if (!req.files || !req.files.image) {
      return res.status(400).json({ error: '❌ No image provided' });
    }

    const image = req.files.image;

    // Validate file type
    const allowedMimes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedMimes.includes(image.mimetype)) {
      return res.status(400).json({
        error: '❌ Invalid file type. Only JPEG, PNG, and WebP allowed.'
      });
    }

    // Validate file size (max 5MB)
    if (image.size > 5 * 1024 * 1024) {
      return res.status(400).json({
        error: '❌ File size too large. Max 5MB allowed.'
      });
    }

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload_stream(
      {
        folder: 'resume-builder/profiles',
        resource_type: 'auto',
        quality: 'auto',
        fetch_format: 'auto'
      },
      (error, result) => {
        if (error) {
          return res.status(500).json({
            error: '❌ Upload failed',
            message: error.message
          });
        }

        res.json({
          message: '✅ Profile picture uploaded successfully',
          url: result.secure_url,
          publicId: result.public_id
        });
      }
    ).end(image.data);

  } catch (error) {
    res.status(500).json({
      error: '❌ Upload error',
      message: error.message
    });
  }
});

// ✅ Upload Multiple Files (for portfolio/projects)
router.post('/files', async (req, res) => {
  try {
    if (!req.files || !req.files.files) {
      return res.status(400).json({ error: '❌ No files provided' });
    }

    const files = Array.isArray(req.files.files) ? req.files.files : [req.files.files];
    const uploadedUrls = [];

    for (let file of files) {
      // Validate file size
      if (file.size > 10 * 1024 * 1024) {
        continue; // Skip files larger than 10MB
      }

      const result = await cloudinary.uploader.upload(
        file.data,
        {
          folder: 'resume-builder/files',
          resource_type: 'auto'
        }
      );

      uploadedUrls.push({
        name: file.name,
        url: result.secure_url,
        publicId: result.public_id
      });
    }

    res.json({
      message: '✅ Files uploaded successfully',
      data: uploadedUrls
    });

  } catch (error) {
    res.status(500).json({
      error: '❌ File upload error',
      message: error.message
    });
  }
});

// ✅ Delete file from Cloudinary
router.delete('/:publicId', async (req, res) => {
  try {
    const result = await cloudinary.uploader.destroy(req.params.publicId);

    res.json({
      message: '✅ File deleted successfully',
      data: result
    });

  } catch (error) {
    res.status(500).json({
      error: '❌ Deletion failed',
      message: error.message
    });
  }
});

module.exports = router;

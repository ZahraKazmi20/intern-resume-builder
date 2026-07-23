# 🚀 Quick Start Guide - Local Development

Get your Resume Builder running on your computer in 10 minutes!

---

## Prerequisites ✅

Before you begin, make sure you have:

- **Node.js** v18+ - [Download](https://nodejs.org/)
- **MongoDB** - [Download Community](https://www.mongodb.com/try/download/community)
- **Code Editor** - VS Code recommended [Download](https://code.visualstudio.com/)
- **Git** - [Download](https://git-scm.com/)

---

## Step 1: Install MongoDB Locally (5 min)

### On Windows:

1. Download MongoDB Community
2. Run the installer
3. Follow the setup wizard
4. MongoDB will start automatically
5. Default: `mongodb://localhost:27017`

### On Mac:

```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

### On Linux (Ubuntu):

```bash
sudo apt-get install mongodb
sudo systemctl start mongodb
```

---

## Step 2: Setup Backend (3 min)

```bash
# Go to backend folder
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env
```

### Edit `.env` file:

```env
MONGODB_URI=mongodb://localhost:27017/resumeBuilder
CLOUDINARY_CLOUD_NAME=your_test_cloud_name
CLOUDINARY_API_KEY=test_key
CLOUDINARY_API_SECRET=test_secret
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

### Start Backend:

```bash
npm run dev
```

You should see:
```
✅ MongoDB Connected Successfully
🚀 Server running on port 5000
```

---

## Step 3: Setup Frontend (2 min)

Open a **new terminal** window:

```bash
# Go to frontend folder
cd frontend

# Install dependencies
npm install

# Create .env file
cp .env.example .env
```

### Edit `.env` file:

```env
REACT_APP_API_URL=http://localhost:5000
REACT_APP_CLOUDINARY_CLOUD_NAME=test
REACT_APP_CLOUDINARY_UPLOAD_PRESET=test
```

### Start Frontend:

```bash
npm start
```

Browser will automatically open to `http://localhost:3000`

---

## Step 4: Test It! 🧪

### Fill the Form

1. Enter your name and email
2. Add work experience
3. Add education
4. Add skills

### Try Features

- ✅ See live preview on right
- ✅ Add/remove items
- ✅ See changes instantly

### Download PDF

1. Click "💾 Save Resume"
2. Click "📥 Download PDF"
3. Check your Downloads folder

---

## Troubleshooting

### MongoDB not running?

**Windows:**
```bash
mongod
```

**Mac:**
```bash
brew services start mongodb-community
```

### Port 5000 already in use?

Change in `.env`:
```env
PORT=5001
```

And update frontend `.env`:
```env
REACT_APP_API_URL=http://localhost:5001
```

### npm install fails?

Try:
```bash
npm cache clean --force
npm install
```

### React app won't start?

```bash
# Delete node_modules and reinstall
rm -rf node_modules
npm install
npm start
```

---

## Project Structure

```
resume-builder/
├── backend/              ← Node.js API
│   ├── models/          ← Database schemas
│   ├── routes/          ← API endpoints
│   ├── server.js        ← Main server
│   └── .env             ← Config (don't share!)
│
└── frontend/            ← React App
    ├── src/
    │   ├── components/  ← Form, Preview, Navigation
    │   ├── styles/      ← CSS files
    │   └── App.js       ← Main component
    └── .env             ← Config
```

---

## Available Commands

### Backend

```bash
npm run dev     # Start with auto-reload
npm start       # Start normally
```

### Frontend

```bash
npm start       # Start development server
npm build       # Build for production
npm test        # Run tests
```

---

## File Organization

When saving files:

1. **API Keys** → Save in `.env` only
2. **Never commit** → `.env` file
3. **Always commit** → `.env.example`

Your `.gitignore` already handles this! ✅

---

## Database Inspection

### View saved resumes:

```bash
# In a new terminal
mongosh

> use resumeBuilder
> db.resumes.find().pretty()
```

This shows all saved resumes in your database!

---

## Next Steps

### After getting it working locally:

1. **Customize Design**
   - Edit colors in `src/App.css`
   - Add new resume templates

2. **Add Features**
   - More sections (languages, certifications)
   - Multiple templates
   - Dark mode

3. **Deploy**
   - Follow `DEPLOYMENT_GUIDE.md`
   - Make it live on the internet!

---

## Quick Reference

| What | Where | Command |
|------|-------|---------|
| Start Backend | Backend folder | `npm run dev` |
| Start Frontend | Frontend folder | `npm start` |
| Check API | Browser | `http://localhost:5000/api/health` |
| Check App | Browser | `http://localhost:3000` |
| View Database | Terminal | `mongosh` |
| View Logs | Terminal | Look at output |

---

## 💡 Tips

- **Use two terminals** - One for backend, one for frontend
- **Keep browser DevTools open** (F12) - Shows errors
- **Hard refresh** browser (Ctrl+Shift+R) if styles don't update
- **Check console** for error messages
- **Save .env** after editing

---

## 🎉 You're Ready!

Your Resume Builder is running locally! 🚀

Now you can:
- Build your resume
- Download as PDF
- Save to database
- Test all features

When ready, deploy to production with `DEPLOYMENT_GUIDE.md`!

---

Happy building! 📄✨

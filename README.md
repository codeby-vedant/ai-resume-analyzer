# ResumeIQ 🚀

### AI-Powered Resume Analyzer & Job Description Matcher

ResumeIQ is a full-stack AI-powered resume analysis platform that helps users improve their resumes and understand how well they match a job description.

It analyzes uploaded resumes, generates an ATS score, identifies strengths and weaknesses, finds missing keywords, provides AI-powered suggestions, and allows users to compare their resume against a specific job description.

---

## ✨ Features

### 📄 Resume Analysis
- Upload PDF/DOC/DOCX resumes
- Extract resume text automatically
- Generate an AI-powered ATS score
- Identify resume strengths and weaknesses
- Detect missing keywords
- Get personalized improvement suggestions

### 🎯 Job Description Matcher
- Paste a job description
- Upload a resume
- Calculate an alignment score
- Identify matched skills
- Identify missing skills
- Identify missing keywords
- Generate AI-powered suggestions
- Provide an overall match summary

### 👤 User Authentication
- User registration and login
- JWT-based authentication
- HTTP-only cookie-based authentication
- Google OAuth login
- Protected routes
- Logout functionality

### 🔐 Password Management
- Forgot password functionality
- Email-based password reset
- Secure reset tokens
- Token expiration

### 👤 Profile Management
- View user profile
- Update name, phone number, location and role
- Upload profile picture
- Profile data persistence

### 📚 Resume History
- View previously analyzed resumes
- View previous ATS scores
- Access previous analysis results
- Download analysis reports as PDF

### 🤖 AI Features
- AI-powered resume analysis
- AI-generated resume improvement suggestions
- AI-powered job description matching
- AI Tip of the Day

---

## 🛠️ Tech Stack

### Frontend

- React.js
- React Router
- Tailwind CSS
- Fetch API
- React Markdown
- jsPDF
- jsPDF AutoTable

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Passport.js
- Google OAuth
- Nodemailer
- Multer

### AI & File Processing

- Google Gemini API
- PDF/Text extraction
- AI-based resume analysis
- AI-based job description matching

### Cloud & Deployment

- MongoDB Atlas
- Cloudinary
- Render
- Vercel

---
### Environment Variables

- PORT=5000

- MONGO_URI=your_mongodb_connection_string

- JWT_SECRET=your_jwt_secret

- GOOGLE_CLIENT_ID=your_google_client_id
- GOOGLE_CLIENT_SECRET=your_google_client_secret

- GOOGLE_CALLBACK_URL=your_google_callback_url

- GEMINI_API_KEY=your_gemini_api_key

- CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
- CLOUDINARY_API_KEY=your_cloudinary_api_key
- CLOUDINARY_API_SECRET=your_cloudinary_api_secret

- EMAIL_USER=your_email
- EMAIL_PASS=your_email_app_password

For the frontend, configure your API URL according to your environment.

Example:

VITE_API_URL=http://localhost:5000

### 💻 Installation
1. Clone the repository
git clone https://github.com/your-username/resumeiq.git
2. Navigate to the project
cd resumeiq
3. Install frontend dependencies
cd Client
npm install
4. Install backend dependencies
cd ../Server
npm install
5. Configure environment variables

Create the required .env files and add your API keys and configuration.

6. Start the backend
cd Server
npm run dev
7. Start the frontend

Open another terminal:

cd Client
npm run dev

### 🚀 Future Improvements

Some planned improvements include:

📈 Resume score improvement tracking

📊 More detailed ATS analytics

🎯 Job-specific resume recommendations

📝 AI-powered bullet point rewriting

📄 AI resume builder

💼 Job application tracking

🔍 LinkedIn profile analysis

🌐 Multi-language resume analysis

📱 Improved mobile experience

### Author

Vedant Mishra

B.Tech Computer Science Engineering Student

### ⭐ Support

If you find ResumeIQ useful, consider giving the repository a ⭐ on GitHub.

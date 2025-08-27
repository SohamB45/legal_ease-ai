# LegalEase AI - Legal Document Analyzer

## 🏆 Hackathon Project: Empowering Indian Communities with AI-Powered Legal Document Analysis

**LegalEase AI** is a comprehensive web application designed to help Indian communities understand complex legal documents through AI-powered analysis. Built specifically for the hackathon with a focus on accessibility and practical legal guidance.

## 🌟 Key Features

### 📄 Document Upload & Analysis
- **Multiple Format Support**: Upload PDF, DOC, DOCX, and TXT files
- **Drag & Drop Interface**: Easy file upload with visual feedback
- **Real-time Processing**: AI analysis using Cohere API for accurate insights

### 🔍 Comprehensive Analysis
- **Plain English Summaries**: Complex legal jargon translated to everyday language
- **Risk Assessment**: Categorized warnings (High/Medium/Low) with practical recommendations
- **Legal Term Explanations**: Indian law context with simple definitions
- **Document Type Detection**: Automatic classification of agreement types

### 💬 Interactive Q&A System
- **Document-Specific Questions**: Ask anything about your uploaded document
- **Contextual Answers**: AI responses based on actual document content
- **Legal Guidance**: Practical advice tailored to Indian legal framework

### 🎯 Indian Legal Focus
- **Local Law Context**: Analysis specifically tuned for Indian legal system
- **Consumer Protection**: Warnings about unfair clauses and practices
- **Registration Requirements**: Guidance on document registration needs
- **Practical Recommendations**: Actionable advice for document disputes

## 🚀 Live Demo

1. **Try Demo**: Instant analysis with sample rental agreement
2. **Upload Your Document**: Real analysis of any legal document
3. **Ask Questions**: Interactive Q&A about document contents
4. **Get Recommendations**: Practical steps to protect your interests

## 🛠️ Technology Stack

### Frontend
- **React** with TypeScript
- **Tailwind CSS** for responsive design
- **shadcn/ui** component library
- **Vite** for fast development
- **React Query** for state management

### Backend
- **Node.js** with Express
- **TypeScript** for type safety
- **Cohere AI** for document analysis
- **Drizzle ORM** with PostgreSQL
- **File upload** with comprehensive parsing

### AI Integration
- **Cohere Command-R-Plus** for legal document analysis
- **Specialized prompts** for Indian legal context
- **Intelligent parsing** for structured insights
- **Cost-optimized** token usage

## 📋 Setup Instructions

### Prerequisites
- Node.js 18+ installed
- Cohere API key ([Get one here](https://cohere.ai))

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/YOUR-USERNAME/legalease-ai
cd legalease-ai
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
Copy the example environment file and add your API keys:
```bash
cp .env.example .env
```

Then edit `.env` and add your actual API keys:
```env
COHERE_API_KEY=your_actual_cohere_api_key
OPENAI_API_KEY=your_actual_openai_api_key
NODE_ENV=development
```

**Where to get API keys:**
- **Cohere API**: Register at [cohere.ai](https://cohere.ai) (Primary AI service)
- **OpenAI API**: Register at [platform.openai.com](https://platform.openai.com) (Fallback service)

4. **Start the application**
```bash
npm run dev
```

5. **Open in browser**
Navigate to `http://localhost:5000`

## 🎯 Hackathon Impact

### Problem Solved
Many Indians, especially in low-income communities, struggle to understand complex legal documents, leading to unfair agreements and legal disputes.

### Solution Benefits
- **Accessibility**: Makes legal knowledge available to everyone
- **Cost-Effective**: Reduces need for expensive legal consultations
- **Educational**: Helps users learn about their legal rights
- **Preventive**: Identifies risks before signing documents
- **Culturally Relevant**: Tailored specifically for Indian legal context

### Real-World Applications
- **Rental Agreements**: Identify unfair clauses and excessive deposits
- **Employment Contracts**: Understand notice periods and termination terms
- **Loan Documents**: Spot hidden fees and unfavorable conditions
- **Property Sales**: Navigate complex real estate agreements

## 📊 Technical Highlights

- **Fast Analysis**: 15-20 second document processing
- **Scalable Architecture**: Modular design for easy expansion
- **Error Handling**: Robust fallback systems
- **Responsive Design**: Works on mobile and desktop
- **Type Safety**: Full TypeScript implementation

## 🔐 Security & Privacy

- Documents processed securely with AI APIs
- No persistent storage of sensitive content
- Session-based analysis results
- API key protection through environment variables

## 🏗️ Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   React Frontend│    │  Express Backend │    │   Cohere AI     │
│                 │───▶│                  │───▶│                 │
│ - File Upload   │    │ - API Routes     │    │ - Legal Analysis│
│ - Analysis View │    │ - File Processing│    │ - Q&A System    │
│ - Q&A Interface │    │ - AI Integration │    │ - Risk Assessment│
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

## 👨‍💻 Developer

**Soham Bhanage**
- Email: soham.bhanage@gmail.com
- Hackathon Project: Legal Document Analyzer for Indian Communities

## 📄 License

This project is built for the hackathon and is available for educational and demonstration purposes.

---

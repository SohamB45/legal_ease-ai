import type { Express, Request } from "express";
import { createServer, type Server } from "http";
import multer from "multer";
import { storage } from "./storage";
import { analyzeDocument, answerQuestion } from "./services/openai";
import { parseDocument } from "./services/documentParser";
import { insertDocumentSchema, questionOnlySchema } from "@shared/schema";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    const allowedTypes = ['application/pdf', 'text/plain', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only PDF, DOC, DOCX, and text files are allowed'));
    }
  }
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Upload and analyze document
  app.post("/api/documents/analyze", upload.single('document'), async (req: Request, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      // Parse the document
      const parsedDoc = await parseDocument(req.file.buffer, req.file.mimetype);
      
      // Store the document
      const documentData = insertDocumentSchema.parse({
        filename: req.file.originalname,
        contentType: req.file.mimetype,
        content: parsedDoc.content
      });

      const document = await storage.createDocument(documentData);

      // Analyze with AI
      const analysisResult = await analyzeDocument(parsedDoc.content, req.file.originalname);

      // Store the analysis
      const analysis = await storage.createAnalysis({
        documentId: document.id,
        summary: analysisResult.summary,
        risks: analysisResult.risks,
        legalTerms: analysisResult.legalTerms
      });

      res.json({
        document: {
          id: document.id,
          filename: document.filename,
          type: analysisResult.documentType
        },
        analysis: {
          id: analysis.id,
          summary: analysis.summary,
          risks: analysis.risks,
          legalTerms: analysis.legalTerms,
          keyProvisions: analysisResult.keyProvisions
        }
      });
    } catch (error: any) {
      console.error("Document analysis error:", error);
      res.status(500).json({ 
        message: error.message || "Document analysis failed. Please try again." 
      });
    }
  });

  // Get document analysis
  app.get("/api/documents/:id/analysis", async (req, res) => {
    try {
      const document = await storage.getDocument(req.params.id);
      if (!document) {
        return res.status(404).json({ message: "Document not found" });
      }

      const analysis = await storage.getAnalysisByDocumentId(document.id);
      if (!analysis) {
        return res.status(404).json({ message: "Analysis not found" });
      }

      res.json({
        document: {
          id: document.id,
          filename: document.filename
        },
        analysis: {
          id: analysis.id,
          summary: analysis.summary,
          risks: analysis.risks,
          legalTerms: analysis.legalTerms
        }
      });
    } catch (error) {
      console.error("Get analysis error:", error);
      res.status(500).json({ message: "Failed to retrieve analysis" });
    }
  });

  // Ask question about document
  app.post("/api/documents/:id/questions", async (req, res) => {
    try {
      const { question } = req.body;
      
      if (!question || typeof question !== 'string') {
        return res.status(400).json({ message: "Question is required" });
      }

      const document = await storage.getDocument(req.params.id);
      if (!document) {
        return res.status(404).json({ message: "Document not found" });
      }

      const analysis = await storage.getAnalysisByDocumentId(document.id);
      const answer = await answerQuestion(
        document.content, 
        question, 
        analysis?.summary
      );

      const interaction = await storage.createQaInteraction({
        documentId: document.id,
        question,
        answer
      });

      res.json({
        id: interaction.id,
        question: interaction.question,
        answer: interaction.answer,
        createdAt: interaction.createdAt
      });
    } catch (error: any) {
      console.error("Q&A error:", error);
      res.status(500).json({ 
        message: error.message || "Failed to answer question. Please try again." 
      });
    }
  });

  // Get Q&A history for document
  app.get("/api/documents/:id/questions", async (req, res) => {
    try {
      const interactions = await storage.getQaInteractionsByDocumentId(req.params.id);
      res.json(interactions);
    } catch (error) {
      console.error("Get Q&A history error:", error);
      res.status(500).json({ message: "Failed to retrieve Q&A history" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

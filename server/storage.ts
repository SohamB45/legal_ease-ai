import { type Document, type InsertDocument, type Analysis, type InsertAnalysis, type QaInteraction, type InsertQaInteraction } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Document operations
  createDocument(document: InsertDocument): Promise<Document>;
  getDocument(id: string): Promise<Document | undefined>;
  
  // Analysis operations
  createAnalysis(analysis: InsertAnalysis): Promise<Analysis>;
  getAnalysisByDocumentId(documentId: string): Promise<Analysis | undefined>;
  
  // Q&A operations
  createQaInteraction(interaction: InsertQaInteraction): Promise<QaInteraction>;
  getQaInteractionsByDocumentId(documentId: string): Promise<QaInteraction[]>;
}

export class MemStorage implements IStorage {
  private documents: Map<string, Document>;
  private analyses: Map<string, Analysis>;
  private qaInteractions: Map<string, QaInteraction>;

  constructor() {
    this.documents = new Map();
    this.analyses = new Map();
    this.qaInteractions = new Map();
  }

  async createDocument(insertDocument: InsertDocument): Promise<Document> {
    const id = randomUUID();
    const document: Document = {
      ...insertDocument,
      id,
      uploadedAt: new Date(),
    };
    this.documents.set(id, document);
    return document;
  }

  async getDocument(id: string): Promise<Document | undefined> {
    return this.documents.get(id);
  }

  async createAnalysis(insertAnalysis: InsertAnalysis): Promise<Analysis> {
    const id = randomUUID();
    const analysis: Analysis = {
      id,
      documentId: insertAnalysis.documentId,
      summary: insertAnalysis.summary,
      risks: insertAnalysis.risks as Analysis['risks'],
      legalTerms: insertAnalysis.legalTerms as Analysis['legalTerms'],
      createdAt: new Date(),
    };
    this.analyses.set(id, analysis);
    return analysis;
  }

  async getAnalysisByDocumentId(documentId: string): Promise<Analysis | undefined> {
    return Array.from(this.analyses.values()).find(
      (analysis) => analysis.documentId === documentId
    );
  }

  async createQaInteraction(insertQaInteraction: InsertQaInteraction): Promise<QaInteraction> {
    const id = randomUUID();
    const interaction: QaInteraction = {
      ...insertQaInteraction,
      id,
      createdAt: new Date(),
    };
    this.qaInteractions.set(id, interaction);
    return interaction;
  }

  async getQaInteractionsByDocumentId(documentId: string): Promise<QaInteraction[]> {
    return Array.from(this.qaInteractions.values()).filter(
      (interaction) => interaction.documentId === documentId
    );
  }
}

export const storage = new MemStorage();

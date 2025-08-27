import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, jsonb, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const documents = pgTable("documents", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  filename: text("filename").notNull(),
  contentType: text("content_type").notNull(),
  content: text("content").notNull(),
  uploadedAt: timestamp("uploaded_at").defaultNow().notNull(),
});

export const analyses = pgTable("analyses", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  documentId: varchar("document_id").references(() => documents.id).notNull(),
  summary: text("summary").notNull(),
  risks: jsonb("risks").$type<Risk[]>().notNull(),
  legalTerms: jsonb("legal_terms").$type<LegalTerm[]>().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const qaInteractions = pgTable("qa_interactions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  documentId: varchar("document_id").references(() => documents.id).notNull(),
  question: text("question").notNull(),
  answer: text("answer").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertDocumentSchema = createInsertSchema(documents).pick({
  filename: true,
  contentType: true,
  content: true,
});

export const insertAnalysisSchema = createInsertSchema(analyses).pick({
  documentId: true,
  summary: true,
  risks: true,
  legalTerms: true,
});

export const insertQaInteractionSchema = createInsertSchema(qaInteractions).pick({
  documentId: true,
  question: true,
  answer: true,
});

export const questionOnlySchema = insertQaInteractionSchema.pick({
  question: true,
});

export type Document = typeof documents.$inferSelect;
export type InsertDocument = z.infer<typeof insertDocumentSchema>;

export type Analysis = typeof analyses.$inferSelect;
export type InsertAnalysis = z.infer<typeof insertAnalysisSchema>;

export type QaInteraction = typeof qaInteractions.$inferSelect;
export type InsertQaInteraction = z.infer<typeof insertQaInteractionSchema>;

export interface Risk {
  id: string;
  type: "high" | "medium" | "low";
  title: string;
  description: string;
  section?: string;
  recommendation: string;
}

export interface LegalTerm {
  term: string;
  definition: string;
  context: string;
}

export interface DocumentAnalysisResult {
  summary: string;
  risks: Risk[];
  legalTerms: LegalTerm[];
  documentType: string;
  keyProvisions: string[];
}

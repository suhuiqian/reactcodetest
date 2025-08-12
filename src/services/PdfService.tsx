export interface DisclosureAnswers {
  questionId: number;
  question: string;
  answer: boolean;
  followUpAnswer?: boolean;
}

export class PdfService {
  static getImportantMattersPdfUrl(): string {
    return "/pdfs/important-matters.pdf";
  }

  static getTermsPdfUrl(): string {
    return "/pdfs/terms.pdf";
  }
}

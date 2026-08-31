// 題目類型定義
export type QuestionCategory = 'operation' | 'location' | 'route' | 'road-user';

export interface Question {
  id: number;
  category: QuestionCategory;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  // 額外分類標籤（可選，用於依類型篩選）
  type?: string;
}

// 用戶答案類型
export interface UserAnswer {
  questionId: number;
  selected: number;
  correct: number;
  isCorrect: boolean;
}

// 分類統計類型
export interface CategoryStat {
  category: string;
  score: number;
  total: number;
  percentage: number;
}

// 成績等級類型
export interface ScoreGrade {
  grade: string;
  color: string;
  message: string;
}

// 練習選項類型
export interface PracticeOption {
  title: string;
  description: string;
  href: string;
  icon: string;
  questions: number;
  format: string;
  comingSoon?: boolean;
}

// 頁面 Props 類型
export interface PageProps {
  [key: string]: any;
}

// 考試狀態類型
export interface ExamState {
  currentQuestion: number;
  selectedAnswer: number | null;
  userAnswers: UserAnswer[];
  showResult: boolean;
  score: number;
  isCompleted: boolean;
  startTime: number | null;
  timeElapsed: number;
}

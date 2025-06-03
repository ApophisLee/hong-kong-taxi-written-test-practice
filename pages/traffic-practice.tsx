import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { NextPage } from 'next';
import { CSSProperties } from 'react';
import { Question, UserAnswer } from '../types';

// 香港交通規則相關試題
const trafficQuestions: Question[] = [
  {
    id: 1,
    category: "traffic",
    question: "在香港，紅燈時是否可以左轉？",
    options: [
      "A. 可以，在確保安全的情況下",
      "B. 不可以，必須等綠燈",
      "C. 可以，但要讓路給行人",
      "D. 視乎路口情況而定"
    ],
    correct: 1,
    explanation: "在香港，紅燈時絕對不可以轉彎，必須等待綠燈或綠色箭咀"
  },
  {
    id: 2,
    category: "traffic",
    question: "在隧道內，最高車速限制通常是？",
    options: [
      "A. 50公里/小時",
      "B. 70公里/小時", 
      "C. 80公里/小時",
      "D. 視乎個別隧道而定"
    ],
    correct: 3,
    explanation: "不同隧道有不同的速度限制，例如海底隧道是70km/h，青嶼幹線是80km/h"
  },
  {
    id: 3,
    category: "traffic",
    question: "看到黃色實線時，代表什麼意思？",
    options: [
      "A. 可以跨越超車",
      "B. 不可跨越，但可以在線旁行駛",
      "C. 只可在緊急情況下跨越",
      "D. 可以短暫跨越以避開障礙物"
    ],
    correct: 1,
    explanation: "黃色實線表示不可跨越，車輛應在線的自己一側行駛"
  },
  {
    id: 4,
    category: "traffic",
    question: "在學校區域，車速限制通常是？",
    options: [
      "A. 30公里/小時",
      "B. 50公里/小時",
      "C. 40公里/小時", 
      "D. 與一般道路相同"
    ],
    correct: 0,
    explanation: "在學校區域，車速限制通常是30公里/小時以確保學童安全"
  },
  {
    id: 5,
    category: "traffic",
    question: "遇到救護車響號時，應該如何處理？",
    options: [
      "A. 繼續正常行駛",
      "B. 立即停車不動",
      "C. 盡快讓路給救護車",
      "D. 跟隨救護車行駛"
    ],
    correct: 2,
    explanation: "遇到救護車響號時，應該盡快安全地讓路"
  },
  {
    id: 6,
    category: "traffic",
    question: "在單程路上倒車是否合法？",
    options: [
      "A. 完全合法",
      "B. 只可短距離倒車",
      "C. 只可在緊急情況下",
      "D. 完全不合法"
    ],
    correct: 3,
    explanation: "在單程路上倒車是違法的，可能會被罰款"
  },
  {
    id: 7,
    category: "traffic",
    question: "的士司機需要配戴安全帶嗎？",
    options: [
      "A. 不需要",
      "B. 只有在高速公路上才需要",
      "C. 必須配戴",
      "D. 視乎乘客人數而定"
    ],
    correct: 2,
    explanation: "所有駕駛者，包括的士司機，都必須配戴安全帶"
  },
  {
    id: 8,
    category: "traffic",
    question: "在行人過路處，看到有行人等候過路時應如何處理？",
    options: [
      "A. 繼續行駛，行人會等車輛通過",
      "B. 停車讓行人先過",
      "C. 響號提醒行人",
      "D. 減速但繼續行駛"
    ],
    correct: 1,
    explanation: "在行人過路處，車輛必須停車讓行人先通過"
  }
];

const TrafficPractice: NextPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [showReview, setShowReview] = useState<boolean>(false);

  const currentQ = trafficQuestions[currentQuestion];
  const isLastQuestion = currentQuestion === trafficQuestions.length - 1;

  const handleAnswerSelect = (answerIndex: number): void => {
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = (): void => {
    if (selectedAnswer === null) return;

    const isCorrect = selectedAnswer === currentQ.correct;
    const userAnswer: UserAnswer = {
      questionId: currentQ.id,
      selected: selectedAnswer,
      correct: currentQ.correct,
      isCorrect
    };

    setUserAnswers(prev => [...prev, userAnswer]);
    setShowResult(true);
  };

  const handleNextQuestion = (): void => {
    if (isLastQuestion) {
      setIsCompleted(true);
    } else {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  const calculateScore = (): number => {
    const correctAnswers = userAnswers.filter(answer => answer.isCorrect).length;
    return Math.round((correctAnswers / trafficQuestions.length) * 100);
  };

  const getScoreGrade = (score: number): string => {
    if (score >= 80) return "優秀";
    if (score >= 70) return "良好";
    if (score >= 60) return "及格";
    return "需要加強";
  };

  const resetPractice = (): void => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setUserAnswers([]);
    setIsCompleted(false);
    setShowReview(false);
  };

  if (isCompleted && !showReview) {
    const score = calculateScore();
    const grade = getScoreGrade(score);
    
    return (
      <div>
        <Head>
          <title>交通規則練習結果 - 香港的士筆試練習</title>
          <meta name="description" content="香港的士筆試交通規則練習結果" />
        </Head>
        
        <main style={styles.main}>
          <div style={styles.container}>
            <div style={styles.header}>
              <Link href="/practice">
                <button style={styles.backButton}>← 返回練習選擇</button>
              </Link>
            </div>

            <div style={styles.resultCard}>
              <h1 style={styles.title}>🚦 交通規則練習完成！</h1>
              <div style={styles.scoreText}>
                你的得分：{score}% ({grade})
              </div>
              <p style={{ color: score >= 70 ? '#4CAF50' : '#f44336', fontSize: '1.2rem' }}>
                {score >= 70 ? '恭喜！你對香港交通規則有良好的認識' : '建議重溫香港道路使用者守則'}
              </p>
              
              <div style={styles.buttonGroup}>
                <button 
                  style={styles.button}
                  onClick={() => setShowReview(true)}
                >
                  檢視答案
                </button>
                <button 
                  style={styles.button}
                  onClick={resetPractice}
                >
                  重新練習
                </button>
                <Link href="/practice" style={{...styles.button, ...styles.secondaryButton}}>
                  返回練習
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (showReview) {
    return (
      <div>
        <Head>
          <title>答案檢視 - 交通規則練習</title>
          <meta name="description" content="檢視交通規則練習的詳細答案" />
        </Head>
        
        <main style={styles.main}>
          <div style={styles.container}>
            <div style={styles.header}>
              <button 
                style={styles.backButton}
                onClick={() => setShowReview(false)}
              >
                ← 返回結果
              </button>
            </div>

            <div style={styles.reviewSection}>
              <h1 style={styles.reviewTitle}>🚦 答案檢視</h1>
              
              {trafficQuestions.map((question, index) => {
                const userAnswer = userAnswers[index];
                return (
                  <div key={question.id} style={styles.reviewItem}>
                    <div style={styles.reviewQuestion}>
                      {index + 1}. {question.question}
                    </div>
                    <div style={styles.reviewAnswer}>
                      你的答案：{question.options[userAnswer.selected]} 
                      {userAnswer.isCorrect ? 
                        <span style={{ color: '#4CAF50', marginLeft: '10px' }}>✓ 正確</span> : 
                        <span style={{ color: '#f44336', marginLeft: '10px' }}>✗ 錯誤</span>
                      }
                    </div>
                    {!userAnswer.isCorrect && (
                      <div style={styles.reviewAnswer}>
                        正確答案：{question.options[question.correct]}
                      </div>
                    )}
                    <div style={styles.explanation}>
                      {question.explanation}
                    </div>
                  </div>
                );
              })}

              <div style={styles.buttonGroup}>
                <button 
                  style={styles.button}
                  onClick={resetPractice}
                >
                  重新練習
                </button>
                <Link href="/practice" style={{...styles.button, ...styles.secondaryButton}}>
                  返回練習選擇
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div>
      <Head>
        <title>交通規則練習 - 香港的士筆試練習</title>
        <meta name="description" content="練習交通燈號、道路標誌和駕駛規則" />
      </Head>
      
      <main style={styles.main}>
        <div style={styles.container}>
          <div style={styles.header}>
            <Link href="/practice">
              <button style={styles.backButton}>← 返回練習選擇</button>
            </Link>
            <div style={styles.progress}>
              第 {currentQuestion + 1} 題，共 {trafficQuestions.length} 題
            </div>
          </div>

          <div style={styles.disclaimer}>
            <p style={styles.disclaimerText}>
              📋 本題庫資料自 2025 年 2 月 3 日起適用，僅供參考，並不具法律效力。運輸署駕駛事務組得視實際需求調整題庫內容，恕不另行通知。
            </p>
          </div>

          <div style={styles.questionCard}>
            <h2 style={styles.questionText}>{currentQ.question}</h2>
            
            <div style={styles.optionsContainer}>
              {currentQ.options.map((option, index) => (
                <button
                  key={index}
                  style={{
                    ...styles.optionButton,
                    ...(selectedAnswer === index ? styles.selectedOption : {}),
                    ...(showResult ? (
                      index === currentQ.correct ? styles.correctOption :
                      index === selectedAnswer && selectedAnswer !== currentQ.correct ? styles.incorrectOption : {}
                    ) : {})
                  }}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showResult}
                >
                  {option}
                </button>
              ))}
            </div>

            {!showResult ? (
              <button
                style={{
                  ...styles.submitButton,
                  ...(selectedAnswer === null ? styles.disabledButton : {})
                }}
                onClick={handleSubmitAnswer}
                disabled={selectedAnswer === null}
              >
                確認答案
              </button>
            ) : (
              <div style={styles.resultContainer}>
                <div 
                  style={{
                    ...styles.resultText,
                    color: selectedAnswer === currentQ.correct ? '#4CAF50' : '#f44336'
                  }}
                >
                  {selectedAnswer === currentQ.correct ? '✓ 答對了！' : '✗ 答錯了'}
                </div>
                <div style={styles.explanation}>
                  {currentQ.explanation}
                </div>
                <button
                  style={styles.nextButton}
                  onClick={handleNextQuestion}
                >
                  {isLastQuestion ? '查看結果' : '下一題'}
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

const styles = {
  main: {
    minHeight: '100vh',
    padding: '2rem 0',
    background: 'linear-gradient(135deg, #003f7f 0%, #001a3a 100%)',
    fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif',
  } as const,
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '0 2rem',
  } as const,
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
  } as const,
  backButton: {
    padding: '0.5rem 1rem',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1rem',
  } as const,
  progress: {
    color: 'white',
    fontSize: '1rem',
    fontWeight: 'bold',
  } as const,
  title: {
    textAlign: 'center' as const,
    color: '#333',
    fontSize: '2rem',
    marginBottom: '1rem',
  } as const,
  questionCard: {
    background: 'rgba(255, 255, 255, 0.95)',
    borderRadius: '15px',
    padding: '2rem',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  } as const,
  questionText: {
    fontSize: '1.4rem',
    marginBottom: '2rem',
    color: '#333',
    lineHeight: '1.5',
  } as const,
  optionsContainer: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '1rem',
    marginBottom: '2rem',
  } as const,
  optionButton: {
    padding: '1rem',
    fontSize: '1.1rem',
    backgroundColor: '#f8f9fa',
    border: '2px solid transparent',
    borderRadius: '10px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    textAlign: 'left' as const,
  } as const,
  selectedOption: {
    backgroundColor: '#e3f2fd',
    borderColor: '#2196F3',
  } as const,
  correctOption: {
    backgroundColor: '#e8f5e8',
    borderColor: '#4CAF50',
    color: '#2e7d32',
  } as const,
  incorrectOption: {
    backgroundColor: '#ffebee',
    borderColor: '#f44336',
    color: '#c62828',
  } as const,
  submitButton: {
    padding: '1rem 2rem',
    fontSize: '1.1rem',
    backgroundColor: '#2196F3',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  } as const,
  disabledButton: {
    backgroundColor: '#ccc',
    cursor: 'not-allowed',
  } as const,
  resultContainer: {
    marginTop: '1rem',
    padding: '1rem',
    backgroundColor: '#f5f5f5',
    borderRadius: '10px',
  } as const,
  resultText: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
  } as const,
  explanation: {
    fontSize: '1rem',
    color: '#666',
    marginBottom: '1rem',
    lineHeight: '1.5',
  } as const,
  nextButton: {
    padding: '0.8rem 2rem',
    fontSize: '1.1rem',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  } as const,
  resultCard: {
    background: 'rgba(255, 255, 255, 0.95)',
    borderRadius: '15px',
    padding: '2rem',
    textAlign: 'center' as const,
    marginBottom: '2rem',
  } as const,
  scoreText: {
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
  } as const,
  buttonGroup: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
    marginTop: '2rem',
  } as const,
  button: {
    padding: '1rem 2rem',
    fontSize: '1.1rem',
    backgroundColor: '#2196F3',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    textDecoration: 'none',
  } as const,
  secondaryButton: {
    backgroundColor: '#757575',
  } as const,
  reviewSection: {
    background: 'rgba(255, 255, 255, 0.95)',
    borderRadius: '15px',
    padding: '2rem',
  } as const,
  reviewTitle: {
    fontSize: '1.5rem',
    marginBottom: '1.5rem',
    color: '#333',
  } as const,
  reviewItem: {
    borderBottom: '1px solid #eee',
    paddingBottom: '1rem',
    marginBottom: '1rem',
  } as const,
  reviewQuestion: {
    fontWeight: 'bold',
    marginBottom: '0.5rem',
    color: '#333',
  } as const,
  reviewAnswer: {
    marginBottom: '0.5rem',
    fontWeight: '500',
  } as const,
  disclaimer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: '10px',
    padding: '1rem',
    marginBottom: '1.5rem',
    textAlign: 'center' as const,
  } as const,
  disclaimerText: {
    fontSize: '0.85rem',
    color: 'rgba(255, 255, 255, 0.9)',
    margin: '0',
    lineHeight: '1.4',
  } as const,
};

export default TrafficPractice;

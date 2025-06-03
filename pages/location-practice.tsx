import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { NextPage } from 'next';
import { CSSProperties } from 'react';
import { Question, UserAnswer } from '../types';

// 基於香港的士筆試常見地點和路線的試題
const locationQuestions: Question[] = [
  {
    id: 1,
    category: "location",
    question: "香港國際機場位於哪個區域？",
    options: [
      "A. 中西區",
      "B. 大嶼山",
      "C. 新界東",
      "D. 九龍城"
    ],
    correct: 1, // B
    explanation: "香港國際機場位於大嶼山赤鱲角"
  },
  {
    id: 2,
    category: "location",
    question: "從中環去尖沙咀最直接的路線是經過哪條隧道？",
    options: [
      "A. 紅磡海底隧道",
      "B. 東區海底隧道",
      "C. 西區海底隧道",
      "D. 將軍澳隧道"
    ],
    correct: 0, // A
    explanation: "紅磡海底隧道是連接港島中環與九龍尖沙咀最直接的路線"
  },
  {
    id: 3,
    category: "location",
    question: "沙田馬場位於哪個區域？",
    options: [
      "A. 沙田區",
      "B. 大埔區",
      "C. 北區",
      "D. 西貢區"
    ],
    correct: 0, // A
    explanation: "沙田馬場位於新界沙田區"
  },
  {
    id: 4,
    category: "location",
    question: "海洋公園位於香港島哪個區域？",
    options: [
      "A. 中西區",
      "B. 灣仔區",
      "C. 南區",
      "D. 東區"
    ],
    correct: 2, // C
    explanation: "海洋公園位於香港島南區"
  },
  {
    id: 5,
    category: "location",
    question: "黃大仙祠位於哪個區？",
    options: [
      "A. 九龍城區",
      "B. 黃大仙區",
      "C. 觀塘區",
      "D. 深水埗區"
    ],
    correct: 1, // B
    explanation: "黃大仙祠位於九龍黃大仙區"
  },
  {
    id: 6,
    category: "location",
    question: "青馬大橋連接哪兩個地區？",
    options: [
      "A. 青衣和馬鞍山",
      "B. 青衣和馬灣",
      "C. 青山和馬鞍山",
      "D. 青龍頭和馬灣"
    ],
    correct: 1, // B
    explanation: "青馬大橋連接青衣和馬灣"
  },
  {
    id: 7,
    category: "location",
    question: "迪士尼樂園位於哪個島嶼？",
    options: [
      "A. 香港島",
      "B. 大嶼山",
      "C. 南丫島",
      "D. 長洲"
    ],
    correct: 1, // B
    explanation: "香港迪士尼樂園位於大嶼山"
  },
  {
    id: 8,
    category: "location",
    question: "旺角位於哪個區？",
    options: [
      "A. 油尖旺區",
      "B. 深水埗區",
      "C. 九龍城區",
      "D. 黃大仙區"
    ],
    correct: 0, // A
    explanation: "旺角位於九龍油尖旺區"
  },
  {
    id: 9,
    category: "location",
    question: "香港科學園位於哪個區域？",
    options: [
      "A. 沙田區",
      "B. 大埔區",
      "C. 北區",
      "D. 西貢區"
    ],
    correct: 0, // A
    explanation: "香港科學園位於新界沙田區白石角"
  },
  {
    id: 10,
    category: "location",
    question: "太平山頂位於香港島哪個區？",
    options: [
      "A. 中西區",
      "B. 灣仔區",
      "C. 南區",
      "D. 東區"
    ],
    correct: 0, // A
    explanation: "太平山頂位於香港島中西區"
  }
];

const LocationPractice: NextPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [showReview, setShowReview] = useState<boolean>(false);

  const currentQ = locationQuestions[currentQuestion];
  const isLastQuestion = currentQuestion === locationQuestions.length - 1;

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
    return Math.round((correctAnswers / locationQuestions.length) * 100);
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
          <title>地點練習結果 - 香港的士筆試練習</title>
          <meta name="description" content="香港的士筆試地點練習結果" />
        </Head>
        
        <main style={styles.main}>
          <div style={styles.container}>
            <div style={styles.header}>
              <Link href="/practice">
                <button style={styles.backButton}>← 返回練習選擇</button>
              </Link>
            </div>

            <div style={styles.resultCard}>
              <h1 style={styles.title}>🎉 地點練習完成！</h1>
              <div style={styles.scoreText}>
                你的得分：{score}% ({grade})
              </div>
              <p style={{ color: score >= 70 ? '#4CAF50' : '#f44336', fontSize: '1.2rem' }}>
                {score >= 70 ? '恭喜！你對香港地點有良好的認識' : '建議多熟悉香港各區域的地點'}
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
          <title>答案檢視 - 地點練習</title>
          <meta name="description" content="檢視地點練習的詳細答案" />
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
              <h1 style={styles.reviewTitle}>📋 答案檢視</h1>
              
              {locationQuestions.map((question, index) => {
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
        <title>地點試題練習 - 香港的士筆試練習</title>
        <meta name="description" content="練習香港各區地點、建築物和地標相關題目" />
      </Head>
      
      <main style={styles.main}>
        <div style={styles.container}>
          <div style={styles.header}>
            <Link href="/practice">
              <button style={styles.backButton}>← 返回練習選擇</button>
            </Link>
            <div style={styles.progress}>
              第 {currentQuestion + 1} 題，共 {locationQuestions.length} 題
            </div>
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
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
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
};

export default LocationPractice;

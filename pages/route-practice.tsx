import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { NextPage } from 'next';
import { CSSProperties } from 'react';
import { Question, UserAnswer } from '../types';

// 更多香港的士筆試路線試題
const routeQuestions: Question[] = [
  {
    id: 1,
    category: "route",
    question: "從中環IFC去香港機場，最佳路線是？",
    options: [
      "A. 干諾道中 → 西區海底隧道 → 西九龍公路 → 青嶼幹線",
      "B. 機場快綫",
      "C. 干諾道中 → 紅磡海底隧道 → 觀塘繞道 → 青嶼幹線",
      "D. 港島東走廊 → 東區海底隧道 → 觀塘繞道 → 青嶼幹線"
    ],
    correct: 0,
    explanation: "從中環去機場最直接的路線是經西區海底隧道到西九龍公路再上青嶼幹線"
  },
  {
    id: 2,
    category: "route",
    question: "在彌敦道南行，遇到交通燈號顯示綠色箭咀向左，可以如何行駛？",
    options: [
      "A. 只可左轉",
      "B. 可直行或左轉",
      "C. 只可直行",
      "D. 可向任何方向行駛"
    ],
    correct: 0,
    explanation: "綠色箭咀向左表示只准許左轉"
  },
  {
    id: 3,
    category: "route",
    question: "從尖沙咀去香港大學，最短路線經過哪條隧道？",
    options: [
      "A. 紅磡海底隧道",
      "B. 西區海底隧道",
      "C. 東區海底隧道",
      "D. 獅子山隧道"
    ],
    correct: 1,
    explanation: "從尖沙咀去香港大學經西區海底隧道最為直接"
  },
  {
    id: 4,
    category: "route",
    question: "沙田第一城去觀塘商業區，建議路線是？",
    options: [
      "A. 大埔公路 → 獅子山隧道 → 彩虹道 → 觀塘道",
      "B. 城門隧道 → 荃灣路 → 紅磡海底隧道 → 觀塘繞道",
      "C. 大老山隧道 → 觀塘繞道",
      "D. 吐露港公路 → 大埔公路 → 獅子山隧道"
    ],
    correct: 2,
    explanation: "從沙田去觀塘，大老山隧道是最直接的路線"
  },
  {
    id: 5,
    category: "route",
    question: "青嶼幹線連接哪兩個主要地區？",
    options: [
      "A. 青衣和大嶼山",
      "B. 青衣和九龍",
      "C. 大嶼山和香港島",
      "D. 新界和九龍"
    ],
    correct: 0,
    explanation: "青嶼幹線連接青衣和大嶼山，是通往機場的重要幹道"
  },
  {
    id: 6,
    category: "route",
    question: "從銅鑼灣去將軍澳，最快路線是？",
    options: [
      "A. 維多利亞公園道 → 東區海底隧道 → 將軍澳隧道",
      "B. 軒尼詩道 → 紅磡海底隧道 → 將軍澳隧道",
      "C. 告士打道 → 東區海底隧道 → 觀塘繞道 → 將軍澳道",
      "D. 怡和街 → 西區海底隧道 → 將軍澳隧道"
    ],
    correct: 0,
    explanation: "從銅鑼灣去將軍澳，經東區海底隧道再接將軍澳隧道最為快捷"
  },
  {
    id: 7,
    category: "route",
    question: "城門隧道收費廣場位於哪個區域？",
    options: [
      "A. 沙田區",
      "B. 荃灣區",
      "C. 大埔區",
      "D. 元朗區"
    ],
    correct: 1,
    explanation: "城門隧道收費廣場位於荃灣區"
  },
  {
    id: 8,
    category: "route",
    question: "從旺角去深水灣，最短路線是？",
    options: [
      "A. 彌敦道 → 紅磡海底隧道 → 告士打道 → 黃泥涌峽道",
      "B. 彌敦道 → 西區海底隧道 → 薄扶林道 → 深水灣道",
      "C. 彌敦道 → 東區海底隧道 → 港島東走廊",
      "D. 彌敦道 → 紅磡海底隧道 → 港島南區"
    ],
    correct: 0,
    explanation: "從旺角去深水灣，經紅磡海底隧道到港島再走黃泥涌峽道是最直接路線"
  },
  {
    id: 9,
    category: "route",
    question: "大老山隧道連接哪兩個地區？",
    options: [
      "A. 沙田和觀塘",
      "B. 大埔和觀塘",
      "C. 沙田和將軍澳",
      "D. 馬鞍山和觀塘"
    ],
    correct: 0,
    explanation: "大老山隧道連接沙田和觀塘地區"
  },
  {
    id: 10,
    category: "route",
    question: "在香港，的士可以使用快速公路嗎？",
    options: [
      "A. 完全不可以",
      "B. 只有紅色的士可以",
      "C. 只有綠色的士可以",
      "D. 所有的士都可以，但需繳付隧道費"
    ],
    correct: 3,
    explanation: "香港所有的士都可以使用隧道和快速公路，但需要繳付相應的隧道費用"
  },
  {
    id: 11,
    category: "route",
    question: "從元朗去港島中環，最經濟的路線是？",
    options: [
      "A. 元朗公路 → 城門隧道 → 荃灣路 → 西區海底隧道",
      "B. 元朗公路 → 三號幹線 → 青嶼幹線 → 機場",
      "C. 元朗公路 → 大欖隧道 → 汀九橋 → 西區海底隧道",
      "D. 元朗公路 → 城門隧道 → 獅子山隧道 → 紅磡海底隧道"
    ],
    correct: 0,
    explanation: "從元朗去中環，經城門隧道和西區海底隧道的路線較為經濟"
  },
  {
    id: 12,
    category: "route",
    question: "南灣隧道連接哪兩個地區？",
    options: [
      "A. 香港仔和黃竹坑",
      "B. 香港仔和薄扶林",
      "C. 黃竹坑和深水灣",
      "D. 淺水灣和深水灣"
    ],
    correct: 0,
    explanation: "南灣隧道連接香港仔和黃竹坑地區"
  }
];

const RoutePractice: NextPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [showReview, setShowReview] = useState<boolean>(false);

  const currentQ = routeQuestions[currentQuestion];
  const isLastQuestion = currentQuestion === routeQuestions.length - 1;

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
    return Math.round((correctAnswers / routeQuestions.length) * 100);
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
          <title>路線練習結果 - 香港的士筆試練習</title>
          <meta name="description" content="香港的士筆試路線練習結果" />
        </Head>
        
        <main style={styles.main}>
          <div style={styles.container}>
            <div style={styles.header}>
              <Link href="/practice">
                <button style={styles.backButton}>← 返回練習選擇</button>
              </Link>
            </div>

            <div style={styles.resultCard}>
              <h1 style={styles.title}>🛣️ 路線練習完成！</h1>
              <div style={styles.scoreText}>
                你的得分：{score}% ({grade})
              </div>
              <p style={{ color: score >= 70 ? '#4CAF50' : '#f44336', fontSize: '1.2rem' }}>
                {score >= 70 ? '恭喜！你對香港路線有良好的認識' : '建議多熟悉香港的主要道路和隧道'}
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
          <title>答案檢視 - 路線練習</title>
          <meta name="description" content="檢視路線練習的詳細答案" />
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
              <h1 style={styles.reviewTitle}>🛣️ 答案檢視</h1>
              
              {routeQuestions.map((question, index) => {
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
        <title>路線試題練習 - 香港的士筆試練習</title>
        <meta name="description" content="練習香港道路、隧道和行車路線題目" />
      </Head>
      
      <main style={styles.main}>
        <div style={styles.container}>
          <div style={styles.header}>
            <Link href="/practice">
              <button style={styles.backButton}>← 返回練習選擇</button>
            </Link>
            <div style={styles.progress}>
              第 {currentQuestion + 1} 題，共 {routeQuestions.length} 題
            </div>
          </div>

          <div style={styles.disclaimer}>
            <p style={styles.disclaimerText}>
              📋 題庫內容適用於 2025 年 2 月 3 日及以後的考試，此題庫乃用作參考用途，並無任何法律效力，運輸署駕駛事務組可據實際情況或需要，作出修改，而不另行通知。
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
    maxWidth: '800px',
    margin: '0 auto 1.5rem auto',
    padding: '1rem',
    background: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '8px',
    border: '1px solid rgba(255, 255, 255, 0.2)',
  } as const,
  disclaimerText: {
    fontSize: '0.85rem',
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: 1.4,
    margin: 0,
    textAlign: 'center' as const,
  } as const,
};

export default RoutePractice;

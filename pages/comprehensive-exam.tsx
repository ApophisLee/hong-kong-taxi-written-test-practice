import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { NextPage } from 'next';
import { Question, UserAnswer, CategoryStat, ScoreGrade } from '../types';

// 綜合模擬考試 - 結合地點、路線和交通規則題目
const examQuestions: Question[] = [
  // 地點題目
  {
    id: 1,
    category: "地點",
    question: "香港國際機場位於哪個區域？",
    options: [
      "A. 中西區",
      "B. 大嶼山",
      "C. 新界東",
      "D. 九龍城"
    ],
    correct: 1,
    explanation: "香港國際機場位於大嶼山赤鱲角"
  },
  {
    id: 2,
    category: "路線",
    question: "從中環去尖沙咀最直接的路線是經過哪條隧道？",
    options: [
      "A. 紅磡海底隧道",
      "B. 東區海底隧道", 
      "C. 西區海底隧道",
      "D. 將軍澳隧道"
    ],
    correct: 0,
    explanation: "紅磡海底隧道是連接港島中環與九龍尖沙咀最直接的路線"
  },
  {
    id: 3,
    category: "交通規則",
    question: "在香港，的士司機必須持有什麼類型的駕駛執照？",
    options: [
      "A. 私家車駕駛執照",
      "B. 商用車輛駕駛執照",
      "C. 的士駕駛執照",
      "D. 公共服務車輛駕駛執照"
    ],
    correct: 3,
    explanation: "的士司機必須持有公共服務車輛駕駛執照"
  },
  {
    id: 4,
    category: "地點",
    question: "海洋公園位於香港島哪個區域？",
    options: [
      "A. 中西區",
      "B. 灣仔區", 
      "C. 南區",
      "D. 東區"
    ],
    correct: 2,
    explanation: "海洋公園位於香港島南區"
  },
  {
    id: 5,
    category: "路線",
    question: "從旺角去機場最常用的高速公路是？",
    options: [
      "A. 吐露港公路",
      "B. 西九龍公路",
      "C. 青朗公路",
      "D. 粉嶺公路"
    ],
    correct: 1,
    explanation: "從旺角去機場通常經西九龍公路最快捷"
  },
  {
    id: 6,
    category: "交通規則",
    question: "的士在香港可以在什麼地方停車等客？",
    options: [
      "A. 任何地方",
      "B. 指定的士站",
      "C. 所有巴士站",
      "D. 商場門口"
    ],
    correct: 1,
    explanation: "的士只能在指定的士站停車等客"
  },
  {
    id: 7,
    category: "地點",
    question: "廸士尼樂園位於哪裡？",
    options: [
      "A. 大嶼山",
      "B. 港島",
      "C. 九龍",
      "D. 新界"
    ],
    correct: 0,
    explanation: "香港廸士尼樂園位於大嶼山"
  },
  {
    id: 8,
    category: "路線",
    question: "從沙田去機場，需要經過哪座橋？",
    options: [
      "A. 青馬大橋",
      "B. 汀九橋",
      "C. 昂船洲大橋",
      "D. 以上都需要"
    ],
    correct: 3,
    explanation: "從沙田去機場通常需要經過青馬大橋、汀九橋和昂船洲大橋"
  },
  {
    id: 9,
    category: "交通規則",
    question: "的士可以在香港島拒載去新界的乘客嗎？",
    options: [
      "A. 可以",
      "B. 不可以",
      "C. 看情況",
      "D. 司機決定"
    ],
    correct: 1,
    explanation: "根據法例，的士不可以拒載，除非有合理原因"
  },
  {
    id: 10,
    category: "地點",
    question: "中環碼頭主要連接哪些地方？",
    options: [
      "A. 尖沙咀和紅磡",
      "B. 尖沙咀和坑口",
      "C. 尖沙咀和長洲",
      "D. 以上都有"
    ],
    correct: 3,
    explanation: "中環碼頭有多條航線連接不同地方"
  },
  {
    id: 11,
    category: "路線",
    question: "從九龍塘去沙田，最直接的路線是？",
    options: [
      "A. 獅子山隧道",
      "B. 大老山隧道",
      "C. 城門隧道",
      "D. 尖山隧道"
    ],
    correct: 0,
    explanation: "獅子山隧道是從九龍塘去沙田最直接的路線"
  },
  {
    id: 12,
    category: "交通規則",
    question: "的士司機在什麼情況下必須使用咪錶？",
    options: [
      "A. 只在市區",
      "B. 所有載客時間",
      "C. 長途路程",
      "D. 乘客要求時"
    ],
    correct: 1,
    explanation: "的士司機在所有載客時間都必須使用咪錶"
  },
  {
    id: 13,
    category: "地點",
    question: "香港大學位於哪個區域？",
    options: [
      "A. 中西區",
      "B. 南區",
      "C. 灣仔區",
      "D. 東區"
    ],
    correct: 0,
    explanation: "香港大學位於港島中西區"
  },
  {
    id: 14,
    category: "路線",
    question: "從尖沙咀去機場，除了隧道外還可以走？",
    options: [
      "A. 青荃橋",
      "B. 葵涌道",
      "C. 青衣北橋",
      "D. 以上都可以"
    ],
    correct: 3,
    explanation: "從尖沙咀去機場有多條路線選擇"
  },
  {
    id: 15,
    category: "交通規則",
    question: "的士司機拒載的最高罰款是多少？",
    options: [
      "A. $1,000",
      "B. $3,000",
      "C. $5,000", 
      "D. $10,000"
    ],
    correct: 2,
    explanation: "的士司機拒載的最高罰款是$5,000"
  }
];

const ComprehensiveExam: NextPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [timeElapsed, setTimeElapsed] = useState<number>(0);

  useEffect(() => {
    setStartTime(Date.now());
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (startTime && !isCompleted) {
        setTimeElapsed(Math.floor((Date.now() - startTime) / 1000));
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [startTime, isCompleted]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (answerIndex: number): void => {
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = (): void => {
    if (selectedAnswer === null) return;
    
    const newAnswer: UserAnswer = {
      questionId: examQuestions[currentQuestion].id,
      selected: selectedAnswer,
      correct: examQuestions[currentQuestion].correct,
      isCorrect: selectedAnswer === examQuestions[currentQuestion].correct
    };

    const newUserAnswers = [...userAnswers, newAnswer];
    setUserAnswers(newUserAnswers);

    if (newAnswer.isCorrect) {
      setScore(score + 1);
    }

    setShowResult(true);
  };

  const handleNextQuestion = (): void => {
    if (currentQuestion < examQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setIsCompleted(true);
    }
  };

  const handleRestart = (): void => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setUserAnswers([]);
    setShowResult(false);
    setScore(0);
    setIsCompleted(false);
    setStartTime(Date.now());
    setTimeElapsed(0);
  };

  const getScoreGrade = (): ScoreGrade => {
    const percentage = (score / examQuestions.length) * 100;
    if (percentage >= 80) return { grade: 'A', color: 'text-green-600', message: '優秀！' };
    if (percentage >= 70) return { grade: 'B', color: 'text-blue-600', message: '良好！' };
    if (percentage >= 60) return { grade: 'C', color: 'text-yellow-600', message: '合格！' };
    return { grade: 'F', color: 'text-red-600', message: '需要加強！' };
  };

  if (isCompleted) {
    const { grade, color, message } = getScoreGrade();
    const categories: string[] = ['地點', '路線', '交通規則'];
    const categoryStats: CategoryStat[] = categories.map(cat => {
      const categoryQuestions = examQuestions.filter(q => q.category === cat);
      const categoryAnswers = userAnswers.filter(a => 
        categoryQuestions.some(q => q.id === a.questionId)
      );
      const categoryScore = categoryAnswers.filter(a => a.isCorrect).length;
      return {
        category: cat,
        score: categoryScore,
        total: categoryQuestions.length,
        percentage: Math.round((categoryScore / categoryQuestions.length) * 100)
      };
    });

    return (
      <div style={styles.main}>
        <Head>
          <title>綜合模擬考試結果 - 香港的士筆試練習</title>
          <meta name="description" content="香港的士筆試綜合模擬考試結果" />
        </Head>

        <div style={styles.container}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={styles.card}>
              <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#003f7f', marginBottom: '1rem' }}>考試完成！</h1>
                <div style={{ fontSize: '4rem', fontWeight: 'bold', color: grade === 'A' ? '#4CAF50' : grade === 'B' ? '#003f7f' : grade === 'C' ? '#FF9800' : '#d12029', marginBottom: '1rem' }}>{grade}</div>
                <div style={{ fontSize: '1.5rem', color: '#666', marginBottom: '0.5rem' }}>{message}</div>
                <div style={{ fontSize: '1.1rem', color: '#666' }}>
                  總分：{score}/{examQuestions.length} ({Math.round((score/examQuestions.length)*100)}%)
                </div>
                <div style={{ fontSize: '0.9rem', color: '#999', marginTop: '0.5rem' }}>
                  用時：{formatTime(timeElapsed)}
                </div>
              </div>

              {/* 分類統計 */}
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#003f7f', marginBottom: '1rem' }}>分類表現</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                  {categoryStats.map((stat, index) => (
                    <div key={index} style={{ backgroundColor: '#f8f9fa', padding: '1rem', borderRadius: '8px', border: '2px solid #d12029' }}>
                      <h4 style={{ fontWeight: 'bold', color: '#003f7f', marginBottom: '0.5rem' }}>{stat.category}</h4>
                      <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#003f7f' }}>
                        {stat.score}/{stat.total}
                      </div>
                      <div style={{ fontSize: '0.9rem', color: '#666' }}>{stat.percentage}%</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 答題詳情 */}
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#003f7f', marginBottom: '1rem' }}>答題詳情</h3>
                <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                  {examQuestions.map((question, index) => {
                    const userAnswer = userAnswers[index];
                    const isCorrect = userAnswer && userAnswer.isCorrect;
                    
                    return (
                      <div key={question.id} style={{
                        padding: '1rem',
                        borderRadius: '8px',
                        borderLeft: `4px solid ${isCorrect ? '#4CAF50' : '#d12029'}`,
                        backgroundColor: isCorrect ? '#e8f5e8' : '#ffeaea',
                        marginBottom: '1rem'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: '0.25rem' }}>
                              第{index + 1}題 ({question.category})
                            </div>
                            <div style={{ fontWeight: 'bold', color: '#003f7f', marginBottom: '0.5rem' }}>
                              {question.question}
                            </div>
                            <div style={{ fontSize: '0.9rem', color: '#666' }}>
                              您的答案：{question.options[userAnswer?.selected]}
                            </div>
                            {!isCorrect && (
                              <div style={{ fontSize: '0.9rem', color: '#4CAF50' }}>
                                正確答案：{question.options[question.correct]}
                              </div>
                            )}
                          </div>
                          <div style={{
                            marginLeft: '1rem',
                            padding: '0.25rem 0.5rem',
                            borderRadius: '4px',
                            fontSize: '0.9rem',
                            fontWeight: 'bold',
                            backgroundColor: isCorrect ? '#c8e6c9' : '#ffcdd2',
                            color: isCorrect ? '#2e7d32' : '#c62828'
                          }}>
                            {isCorrect ? '✓' : '✗'}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
                <button
                  onClick={handleRestart}
                  style={{
                    ...styles.button,
                    minWidth: '200px'
                  }}
                >
                  重新考試
                </button>
                <Link href="/practice">
                  <a style={{
                    ...styles.button,
                    ...styles.secondaryButton,
                    minWidth: '200px'
                  }}>
                    返回練習選單
                  </a>
                </Link>
                <Link href="/">
                  <a style={{
                    ...styles.button,
                    ...styles.successButton,
                    minWidth: '200px'
                  }}>
                    返回首頁
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const question = examQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / examQuestions.length) * 100;

  return (
    <div style={styles.main}>
      <Head>
        <title>綜合模擬考試 - 香港的士筆試練習</title>
        <meta name="description" content="香港的士筆試綜合模擬考試，包含地點、路線和交通規則題目" />
      </Head>

      <div style={styles.container}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          {/* 標題和進度 */}
          <div style={styles.card}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#003f7f' }}>綜合模擬考試</h1>
              <div style={{ fontSize: '0.9rem', color: '#666' }}>
                用時：{formatTime(timeElapsed)}
              </div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <span style={{ fontSize: '0.9rem', color: '#666' }}>
                第 {currentQuestion + 1} 題，共 {examQuestions.length} 題
              </span>
              <span style={{ fontSize: '0.9rem', color: '#666' }}>
                目前得分：{score}/{currentQuestion + (showResult ? 1 : 0)}
              </span>
            </div>
            
            <div style={styles.progress}>
              <div 
                style={{
                  ...styles.progressBar,
                  width: `${progress}%`
                }}
              ></div>
            </div>
          </div>

          <div style={styles.disclaimer}>
            <p style={styles.disclaimerText}>
              📋 本題庫資料自 2025 年 2 月 3 日起適用，僅供參考，並不具法律效力。運輸署駕駛事務組得視實際需求調整題庫內容，恕不另行通知。
            </p>
          </div>

          {/* 題目卡片 */}
          <div style={styles.card}>
            <div style={{ marginBottom: '1rem' }}>
              <span style={{
                display: 'inline-block',
                backgroundColor: '#e3f2fd',
                color: '#003f7f',
                fontSize: '0.8rem',
                padding: '0.25rem 0.5rem',
                borderRadius: '1rem',
                marginBottom: '0.5rem',
                border: '1px solid #d12029'
              }}>
                {question.category}
              </span>
              <h2 style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#003f7f' }}>
                {question.question}
              </h2>
            </div>

            {!showResult ? (
              <div>
                {question.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      padding: '1rem',
                      marginBottom: '0.75rem',
                      borderRadius: '8px',
                      border: selectedAnswer === index ? '2px solid #003f7f' : '2px solid #e0e0e0',
                      backgroundColor: selectedAnswer === index ? '#e3f2fd' : '#fff',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                      if (selectedAnswer !== index) {
                        e.currentTarget.style.borderColor = '#d12029';
                        e.currentTarget.style.backgroundColor = '#f5f5f5';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (selectedAnswer !== index) {
                        e.currentTarget.style.borderColor = '#e0e0e0';
                        e.currentTarget.style.backgroundColor = '#fff';
                      }
                    }}
                  >
                    <span style={{ fontWeight: '500', color: '#003f7f' }}>{option}</span>
                  </button>
                ))}

                <div style={{ paddingTop: '1rem' }}>
                  <button
                    onClick={handleSubmitAnswer}
                    disabled={selectedAnswer === null}
                    style={{
                      ...styles.button,
                      width: '100%',
                      opacity: selectedAnswer !== null ? 1 : 0.5,
                      cursor: selectedAnswer !== null ? 'pointer' : 'not-allowed'
                    }}
                  >
                    提交答案
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div>
                  {question.options.map((option, index) => {
                    let bgColor = '#f5f5f5';
                    let borderColor = '#e0e0e0';
                    let textColor = '#333';
                    
                    if (index === question.correct) {
                      bgColor = '#e8f5e8';
                      borderColor = '#4CAF50';
                      textColor = '#2e7d32';
                    } else if (index === selectedAnswer && selectedAnswer !== question.correct) {
                      bgColor = '#ffeaea';
                      borderColor = '#d12029';
                      textColor = '#c62828';
                    }

                    return (
                      <div
                        key={index}
                        style={{
                          padding: '1rem',
                          marginBottom: '0.75rem',
                          borderRadius: '8px',
                          border: `2px solid ${borderColor}`,
                          backgroundColor: bgColor
                        }}
                      >
                        <span style={{ fontWeight: '500', color: textColor }}>
                          {option}
                          {index === question.correct && ' ✓'}
                          {index === selectedAnswer && selectedAnswer !== question.correct && ' ✗'}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <div style={{
                  padding: '1rem',
                  borderRadius: '8px',
                  border: `1px solid ${selectedAnswer === question.correct ? '#4CAF50' : '#d12029'}`,
                  backgroundColor: selectedAnswer === question.correct ? '#e8f5e8' : '#ffeaea',
                  marginBottom: '1rem'
                }}>
                  <h3 style={{ fontWeight: 'bold', marginBottom: '0.5rem', color: '#003f7f' }}>
                    {selectedAnswer === question.correct ? '答對了！' : '答錯了！'}
                  </h3>
                  <p style={{ color: '#333' }}>{question.explanation}</p>
                </div>

                <button
                  onClick={handleNextQuestion}
                  style={{
                    ...styles.button,
                    ...styles.successButton,
                    width: '100%'
                  }}
                >
                  {currentQuestion < examQuestions.length - 1 ? '下一題' : '查看結果'}
                </button>
              </div>
            )}
          </div>

          {/* 導航 */}
          <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
            <Link href="/practice">
              <a style={{ color: '#003f7f', textDecoration: 'none', fontSize: '1rem' }}>
                ← 返回練習選單
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  main: {
    minHeight: '100vh',
    padding: '2rem 0',
    background: 'linear-gradient(135deg, #003f7f 0%, #001a3a 100%)',
    fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif',
  } as const,
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1rem',
  } as const,
  card: {
    background: 'rgba(255, 255, 255, 0.95)',
    borderRadius: '15px',
    padding: '2rem',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    marginBottom: '1.5rem',
  } as const,
  title: {
    textAlign: 'center' as const,
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#003f7f',
    marginBottom: '1rem',
  } as const,
  progress: {
    width: '100%',
    height: '8px',
    backgroundColor: '#e0e0e0',
    borderRadius: '4px',
    overflow: 'hidden' as const,
  } as const,
  progressBar: {
    height: '100%',
    backgroundColor: '#003f7f',
    borderRadius: '4px',
    transition: 'width 0.3s ease',
  } as const,
  button: {
    padding: '0.75rem 1.5rem',
    fontSize: '1rem',
    backgroundColor: '#003f7f',
    color: 'white',
    border: '2px solid #d12029',
    borderRadius: '8px',
    cursor: 'pointer',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
    display: 'inline-block',
    textAlign: 'center' as const,
  } as const,
  secondaryButton: {
    backgroundColor: '#757575',
    borderColor: '#757575',
  } as const,
  successButton: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
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

export default ComprehensiveExam;

import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

// 香港交通規則相關試題
const trafficQuestions = [
  {
    id: 1,
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
    question: "在學校區域，車速限制通常是？",
    options: [
      "A. 30公里/小時",
      "B. 50公里/小時",
      "C. 40公里/小時", 
      "D. 與一般道路相同"
    ],
    correct: 0,
    explanation: "學校區域的車速限制通常是30公里/小時，以確保學童安全"
  },
  {
    id: 5,
    question: "遇到救護車響號時，正確做法是？",
    options: [
      "A. 繼續原速前進",
      "B. 立即停車",
      "C. 安全地讓路給救護車",
      "D. 跟隨救護車後面"
    ],
    correct: 2,
    explanation: "遇到緊急車輛響號時，應安全地讓路，但不要突然停車或做危險動作"
  },
  {
    id: 6,
    question: "在行人過路處，看到行人正在過馬路時應該？",
    options: [
      "A. 響號提醒行人",
      "B. 慢速通過",
      "C. 完全停車等待行人通過",
      "D. 從行人後方通過"
    ],
    correct: 2,
    explanation: "在行人過路處，當行人正在過馬路時，車輛必須完全停車等待"
  },
  {
    id: 7,
    question: "雙黃線的意思是？",
    options: [
      "A. 可以跨越超車",
      "B. 兩個方向都不可跨越",
      "C. 只有左側不可跨越",
      "D. 只有右側不可跨越"
    ],
    correct: 1,
    explanation: "雙黃線表示兩個方向的車輛都不可跨越"
  },
  {
    id: 8,
    question: "的士載客時，可以在禁止停車的地方短暫停留嗎？",
    options: [
      "A. 可以，只要不超過5分鐘",
      "B. 可以，只要有乘客上落",
      "C. 不可以，必須遵守停車規則",
      "D. 可以，但要開啟危險警告燈"
    ],
    correct: 2,
    explanation: "的士也必須遵守所有停車規則，不可在禁止停車的地方停留"
  }
];

export default function TrafficPractice() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNext = () => {
    if (selectedAnswer === null) return;

    const isCorrect = selectedAnswer === trafficQuestions[currentQuestion].correct;
    const newUserAnswers = [...userAnswers];
    newUserAnswers[currentQuestion] = {
      selected: selectedAnswer,
      correct: trafficQuestions[currentQuestion].correct,
      isCorrect: isCorrect
    };
    setUserAnswers(newUserAnswers);

    if (isCorrect) {
      setScore(score + 1);
    }

    setShowResult(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < trafficQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setIsCompleted(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setUserAnswers([]);
    setIsCompleted(false);
  };

  const question = trafficQuestions[currentQuestion];

  if (isCompleted) {
    const percentage = Math.round((score / trafficQuestions.length) * 100);
    const passed = percentage >= 70;

    return (
      <div>
        <Head>
          <title>交通規則練習結果 - 香港的士筆試練習</title>
        </Head>
        
        <main style={styles.main}>
          <div style={styles.container}>
            <h1 style={styles.title}>練習完成！ 🎉</h1>
            
            <div style={styles.resultCard}>
              <h2 style={{...styles.scoreText, color: passed ? '#4CAF50' : '#f44336'}}>
                得分：{score} / {trafficQuestions.length} ({percentage}%)
              </h2>
              <p style={styles.resultText}>
                {passed ? '恭喜！您已達到合格標準 (70%)' : '需要更多練習才能達到合格標準 (70%)'}
              </p>
              
              <div style={styles.buttonGroup}>
                <button onClick={resetQuiz} style={styles.button}>
                  重新練習
                </button>
                <Link href="/practice">
                  <button style={{...styles.button, ...styles.secondaryButton}}>
                    選擇其他練習
                  </button>
                </Link>
                <Link href="/">
                  <button style={{...styles.button, ...styles.secondaryButton}}>
                    回到首頁
                  </button>
                </Link>
              </div>
            </div>

            <div style={styles.reviewSection}>
              <h3 style={styles.reviewTitle}>答題回顧</h3>
              {trafficQuestions.map((q, index) => {
                const userAnswer = userAnswers[index];
                return (
                  <div key={q.id} style={styles.reviewItem}>
                    <p style={styles.reviewQuestion}>
                      {index + 1}. {q.question}
                    </p>
                    <p style={{...styles.reviewAnswer, color: userAnswer.isCorrect ? '#4CAF50' : '#f44336'}}>
                      您的答案：{q.options[userAnswer.selected]}
                      {!userAnswer.isCorrect && (
                        <>
                          <br />
                          <span style={{color: '#4CAF50'}}>
                            正確答案：{q.options[userAnswer.correct]}
                          </span>
                        </>
                      )}
                    </p>
                    <p style={styles.explanation}>{q.explanation}</p>
                  </div>
                );
              })}
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
      </Head>
      
      <main style={styles.main}>
        <div style={styles.container}>
          <div style={styles.header}>
            <Link href="/practice">
              <button style={styles.backButton}>← 返回練習選擇</button>
            </Link>
            <div style={styles.progress}>
              問題 {currentQuestion + 1} / {trafficQuestions.length}
            </div>
          </div>

          <div style={styles.questionCard}>
            <div style={styles.questionHeader}>
              <span style={styles.categoryBadge}>🚦 交通規則</span>
            </div>
            
            <h2 style={styles.questionText}>{question.question}</h2>
            
            <div style={styles.optionsContainer}>
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showResult}
                  style={{
                    ...styles.optionButton,
                    ...(selectedAnswer === index ? styles.selectedOption : {}),
                    ...(showResult && index === question.correct ? styles.correctOption : {}),
                    ...(showResult && selectedAnswer === index && index !== question.correct ? styles.incorrectOption : {})
                  }}
                >
                  {option}
                </button>
              ))}
            </div>

            {showResult && (
              <div style={styles.resultContainer}>
                <p style={{...styles.resultText, color: selectedAnswer === question.correct ? '#4CAF50' : '#f44336'}}>
                  {selectedAnswer === question.correct ? '✅ 正確！' : '❌ 錯誤'}
                </p>
                <p style={styles.explanation}>{question.explanation}</p>
                <button onClick={handleNextQuestion} style={styles.nextButton}>
                  {currentQuestion < trafficQuestions.length - 1 ? '下一題' : '查看結果'}
                </button>
              </div>
            )}

            {!showResult && (
              <button 
                onClick={handleNext} 
                disabled={selectedAnswer === null}
                style={{
                  ...styles.submitButton,
                  ...(selectedAnswer === null ? styles.disabledButton : {})
                }}
              >
                提交答案
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

const styles = {
  main: {
    minHeight: '100vh',
    padding: '2rem 0',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif',
  },
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '0 2rem',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
  },
  backButton: {
    padding: '0.5rem 1rem',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1rem',
  },
  progress: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: '1.1rem',
    fontWeight: 'bold',
  },
  title: {
    textAlign: 'center',
    color: 'white',
    fontSize: '3rem',
    marginBottom: '2rem',
  },
  questionCard: {
    background: 'rgba(255, 255, 255, 0.95)',
    borderRadius: '15px',
    padding: '2rem',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  },
  questionHeader: {
    marginBottom: '1.5rem',
  },
  categoryBadge: {
    backgroundColor: '#FF9800',
    color: 'white',
    padding: '0.5rem 1rem',
    borderRadius: '15px',
    fontSize: '0.9rem',
    fontWeight: 'bold',
  },
  questionText: {
    fontSize: '1.5rem',
    marginBottom: '2rem',
    color: '#333',
    lineHeight: '1.6',
  },
  optionsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    marginBottom: '2rem',
  },
  optionButton: {
    padding: '1rem',
    fontSize: '1.1rem',
    textAlign: 'left',
    border: '2px solid #e0e0e0',
    borderRadius: '10px',
    backgroundColor: 'white',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  selectedOption: {
    borderColor: '#2196F3',
    backgroundColor: '#e3f2fd',
  },
  correctOption: {
    borderColor: '#4CAF50',
    backgroundColor: '#e8f5e8',
    color: '#2e7d32',
  },
  incorrectOption: {
    borderColor: '#f44336',
    backgroundColor: '#ffebee',
    color: '#c62828',
  },
  submitButton: {
    width: '100%',
    padding: '1rem',
    fontSize: '1.2rem',
    backgroundColor: '#2196F3',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  disabledButton: {
    backgroundColor: '#ccc',
    cursor: 'not-allowed',
  },
  resultContainer: {
    marginTop: '1rem',
    padding: '1rem',
    backgroundColor: '#f5f5f5',
    borderRadius: '10px',
  },
  resultText: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
  },
  explanation: {
    fontSize: '1rem',
    color: '#666',
    marginBottom: '1rem',
    lineHeight: '1.5',
  },
  nextButton: {
    padding: '0.8rem 2rem',
    fontSize: '1.1rem',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  resultCard: {
    background: 'rgba(255, 255, 255, 0.95)',
    borderRadius: '15px',
    padding: '2rem',
    textAlign: 'center',
    marginBottom: '2rem',
  },
  scoreText: {
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
  },
  buttonGroup: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
    marginTop: '2rem',
    flexWrap: 'wrap',
  },
  button: {
    padding: '1rem 2rem',
    fontSize: '1.1rem',
    backgroundColor: '#2196F3',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    textDecoration: 'none',
  },
  secondaryButton: {
    backgroundColor: '#757575',
  },
  reviewSection: {
    background: 'rgba(255, 255, 255, 0.95)',
    borderRadius: '15px',
    padding: '2rem',
  },
  reviewTitle: {
    fontSize: '1.5rem',
    marginBottom: '1.5rem',
    color: '#333',
  },
  reviewItem: {
    borderBottom: '1px solid #eee',
    paddingBottom: '1rem',
    marginBottom: '1rem',
  },
  reviewQuestion: {
    fontWeight: 'bold',
    marginBottom: '0.5rem',
    color: '#333',
  },
  reviewAnswer: {
    marginBottom: '0.5rem',
    fontWeight: '500',
  },
};

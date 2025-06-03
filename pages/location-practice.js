import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';

// 基於香港的士筆試常見地點和路線的試題
const locationQuestions = [
  {
    id: 1,
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
    question: "海洋公園位於香港島哪個區域？",
    options: [
      "A. 中西區",
      "B. 灣仔區",
      "C. 南區",
      "D. 東區"
    ],
    correct: 2, // C
    explanation: "海洋公園位於香港島南區黃竹坑"
  },
  {
    id: 5,
    question: "從九龍去香港島，除了海底隧道外，還可以經過哪條隧道？",
    options: [
      "A. 獅子山隧道",
      "B. 東區海底隧道",
      "C. 大老山隧道",
      "D. 城門隧道"
    ],
    correct: 1, // B
    explanation: "東區海底隧道和西區海底隧道都可以從九龍前往香港島"
  },
  {
    id: 6,
    question: "香港迪士尼樂園位於哪個區域？",
    options: [
      "A. 荃灣區",
      "B. 離島區",
      "C. 元朗區",
      "D. 北區"
    ],
    correct: 1, // B
    explanation: "香港迪士尼樂園位於大嶼山，屬於離島區"
  },
  {
    id: 7,
    question: "旺角位於九龍哪個區域？",
    options: [
      "A. 油尖旺區",
      "B. 九龍城區",
      "C. 深水埗區",
      "D. 黃大仙區"
    ],
    correct: 0, // A
    explanation: "旺角位於九龍油尖旺區"
  },
  {
    id: 8,
    question: "中文大學位於新界哪個區域？",
    options: [
      "A. 大埔區",
      "B. 沙田區",
      "C. 北區",
      "D. 西貢區"
    ],
    correct: 1, // B
    explanation: "香港中文大學位於新界沙田區"
  },
  {
    id: 9,
    question: "機場快綫的香港站位於哪個區域？",
    options: [
      "A. 中西區",
      "B. 灣仔區",
      "C. 南區",
      "D. 東區"
    ],
    correct: 0, // A
    explanation: "機場快綫香港站位於中西區"
  },
  {
    id: 10,
    question: "從新界去香港島最常用的隧道是？",
    options: [
      "A. 紅磡海底隧道",
      "B. 東區海底隧道",
      "C. 西區海底隧道",
      "D. 以上皆可"
    ],
    correct: 3, // D
    explanation: "從新界可以經過任何一條海底隧道前往香港島，視乎起點和終點而定"
  }
];

export default function LocationPractice() {
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

    const isCorrect = selectedAnswer === locationQuestions[currentQuestion].correct;
    const newUserAnswers = [...userAnswers];
    newUserAnswers[currentQuestion] = {
      selected: selectedAnswer,
      correct: locationQuestions[currentQuestion].correct,
      isCorrect: isCorrect
    };
    setUserAnswers(newUserAnswers);

    if (isCorrect) {
      setScore(score + 1);
    }

    setShowResult(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < locationQuestions.length - 1) {
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

  const question = locationQuestions[currentQuestion];

  if (isCompleted) {
    const percentage = Math.round((score / locationQuestions.length) * 100);
    const passed = percentage >= 70;

    return (
      <div>
        <Head>
          <title>地點試題練習結果 - 香港的士筆試練習</title>
        </Head>
        
        <main style={styles.main}>
          <div style={styles.container}>
            <h1 style={styles.title}>練習完成！ 🎉</h1>
            
            <div style={styles.resultCard}>
              <h2 style={{...styles.scoreText, color: passed ? '#4CAF50' : '#f44336'}}>
                得分：{score} / {locationQuestions.length} ({percentage}%)
              </h2>
              <p style={styles.resultText}>
                {passed ? '恭喜！您已達到合格標準 (70%)' : '需要更多練習才能達到合格標準 (70%)'}
              </p>
              
              <div style={styles.buttonGroup}>
                <button onClick={resetQuiz} style={styles.button}>
                  重新練習
                </button>
                <Link href="/">
                  <button style={{...styles.button, ...styles.secondaryButton}}>
                    回到首頁
                  </button>
                </Link>
              </div>
            </div>

            <div style={styles.reviewSection}>
              <h3 style={styles.reviewTitle}>答題回顧</h3>
              {locationQuestions.map((q, index) => {
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
        <title>地點試題練習 - 香港的士筆試練習</title>
      </Head>
      
      <main style={styles.main}>
        <div style={styles.container}>
          <div style={styles.header}>
            <Link href="/">
              <button style={styles.backButton}>← 返回首頁</button>
            </Link>
            <div style={styles.progress}>
              問題 {currentQuestion + 1} / {locationQuestions.length}
            </div>
          </div>

          <div style={styles.questionCard}>
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
                  {currentQuestion < locationQuestions.length - 1 ? '下一題' : '查看結果'}
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

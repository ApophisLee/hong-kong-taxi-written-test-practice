import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

// 更多香港的士筆試路線試題
const routeQuestions = [
  {
    id: 1,
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
    question: "沙田第一城去觀塘商業區，建議路線是？",
    options: [
      "A. 大埔公路 → 獅子山隧道 → 彩虹道 → 觀塘道",
      "B. 城門隧道 → 荃灣路 → 紅磡海底隧道 → 觀塘繞道",
      "C. 大老山隧道 → 觀塘繞道",
      "D. 吐露港公路 → 大埔公路 → 獅子山隧道"
    ],
    correct: 2,
    explanation: "從沙田去觀塘最直接是經大老山隧道到觀塘繞道"
  },
  {
    id: 5,
    question: "在香港仔隧道內，車速限制是？",
    options: [
      "A. 50公里/小時",
      "B. 70公里/小時",
      "C. 80公里/小時",
      "D. 60公里/小時"
    ],
    correct: 1,
    explanation: "香港仔隧道內的車速限制是70公里/小時"
  },
  {
    id: 6,
    question: "從銅鑼灣去深水埗，經過哪條隧道最方便？",
    options: [
      "A. 紅磡海底隧道",
      "B. 西區海底隧道",
      "C. 東區海底隧道",
      "D. 香港仔隧道"
    ],
    correct: 0,
    explanation: "從銅鑼灣去深水埗經紅磡海底隧道最直接"
  },
  {
    id: 7,
    question: "青嶼幹線的車速限制是？",
    options: [
      "A. 80公里/小時",
      "B. 100公里/小時",
      "C. 110公里/小時",
      "D. 90公里/小時"
    ],
    correct: 0,
    explanation: "青嶼幹線的車速限制是80公里/小時"
  },
  {
    id: 8,
    question: "從荃灣去沙田，最直接的路線是？",
    options: [
      "A. 荃灣路 → 獅子山隧道 → 獅子山隧道公路",
      "B. 城門隧道 → 城門隧道公路",
      "C. 屯門公路 → 大埔公路",
      "D. 青山公路 → 大帽山路"
    ],
    correct: 1,
    explanation: "從荃灣去沙田最直接是經城門隧道"
  },
  {
    id: 9,
    question: "在跑馬地去山頂，應該行經哪條道路？",
    options: [
      "A. 黃泥涌道 → 司徒拔道 → 山頂道",
      "B. 堅拿道西 → 堅拿道東 → 山頂道",
      "C. 告士打道 → 夏愨道 → 山頂道",
      "D. 軒尼詩道 → 金鐘道 → 山頂道"
    ],
    correct: 0,
    explanation: "從跑馬地去山頂最直接的路線是黃泥涌道轉司徒拔道再上山頂道"
  },
  {
    id: 10,
    question: "大欖隧道的收費廣場位於哪個區域？",
    options: [
      "A. 荃灣區和元朗區",
      "B. 屯門區和元朗區",
      "C. 荃灣區和屯門區",
      "D. 深井和元朗區"
    ],
    correct: 0,
    explanation: "大欖隧道連接荃灣區和元朗區"
  },
  {
    id: 11,
    question: "從旺角去香港仔，最短路線是？",
    options: [
      "A. 紅磡海底隧道 → 告士打道 → 黃泥涌道 → 香港仔隧道",
      "B. 西區海底隧道 → 干諾道西 → 薄扶林道 → 香港仔海傍道",
      "C. 紅磡海底隧道 → 軒尼詩道 → 謝斐道 → 香港仔隧道",
      "D. 東區海底隧道 → 東區走廊 → 香港仔隧道"
    ],
    correct: 0,
    explanation: "從旺角去香港仔最直接是經紅磡海底隧道到告士打道再經香港仔隧道"
  },
  {
    id: 12,
    question: "將軍澳隧道連接哪兩個地區？",
    options: [
      "A. 觀塘和將軍澳",
      "B. 九龍灣和將軍澳",
      "C. 藍田和將軍澳",
      "D. 牛頭角和將軍澳"
    ],
    correct: 2,
    explanation: "將軍澳隧道連接藍田和將軍澳"
  }
];

export default function RoutePractice() {
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

    const isCorrect = selectedAnswer === routeQuestions[currentQuestion].correct;
    const newUserAnswers = [...userAnswers];
    newUserAnswers[currentQuestion] = {
      selected: selectedAnswer,
      correct: routeQuestions[currentQuestion].correct,
      isCorrect: isCorrect
    };
    setUserAnswers(newUserAnswers);

    if (isCorrect) {
      setScore(score + 1);
    }

    setShowResult(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < routeQuestions.length - 1) {
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

  const question = routeQuestions[currentQuestion];

  if (isCompleted) {
    const percentage = Math.round((score / routeQuestions.length) * 100);
    const passed = percentage >= 70;

    return (
      <div>
        <Head>
          <title>路線試題練習結果 - 香港的士筆試練習</title>
        </Head>
        
        <main style={styles.main}>
          <div style={styles.container}>
            <h1 style={styles.title}>練習完成！ 🎉</h1>
            
            <div style={styles.resultCard}>
              <h2 style={{...styles.scoreText, color: passed ? '#4CAF50' : '#f44336'}}>
                得分：{score} / {routeQuestions.length} ({percentage}%)
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
          </div>
        </main>
      </div>
    );
  }

  return (
    <div>
      <Head>
        <title>路線試題練習 - 香港的士筆試練習</title>
      </Head>
      
      <main style={styles.main}>
        <div style={styles.container}>
          <div style={styles.header}>
            <Link href="/">
              <button style={styles.backButton}>← 返回首頁</button>
            </Link>
            <div style={styles.progress}>
              問題 {currentQuestion + 1} / {routeQuestions.length}
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
                  {currentQuestion < routeQuestions.length - 1 ? '下一題' : '查看結果'}
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
};

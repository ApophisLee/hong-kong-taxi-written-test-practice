import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { NextPage } from 'next';
import { Question, UserAnswer } from '../types';
import locationQuestions from '../data/location-questions.json';

// 進度暫存相關類型
interface SavedProgress {
  currentQuestion: number;
  userAnswers: UserAnswer[];
  shuffledQuestions: Question[];
  practiceParams: {
    type?: string;
    random?: string;
  };
  timestamp: number;
}

// 暫存鍵名常數
const STORAGE_KEY = 'location-practice-progress';

// 載入題目資料
const locationQuestionsData: Question[] = Array.isArray(locationQuestions) 
  ? locationQuestions as Question[]
  : [];;

// 基於香港的士筆試地方題庫的真實地點試題（319個地點）

const shuffleArray = <T,>(array: T[]): T[] => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

// 洗題目同時洗 options 並調整 correct index
const prepareQuestions = (questions: Question[]): Question[] => {
  return shuffleArray(questions).map(q => {
    const optionPairs = q.options.map((opt, idx) => ({ opt, idx }));
    const shuffledPairs = shuffleArray(optionPairs);
    const newOptions = shuffledPairs.map(pair => pair.opt);
    const newCorrect = shuffledPairs.findIndex(pair => pair.idx === q.correct);
    return {
      ...q,
      options: newOptions,
      correct: newCorrect
    };
  });
};

// 僅打亂選項，保留題目順序
const prepareOptionsOnly = (questions: Question[]): Question[] => {
  return questions.map(q => {
    const optionPairs = q.options.map((opt, idx) => ({ opt, idx }));
    const shuffledPairs = shuffleArray(optionPairs);
    return {
      ...q,
      options: shuffledPairs.map(p => p.opt),
      correct: shuffledPairs.findIndex(p => p.idx === q.correct)
    };
  });
};

const LocationPractice: NextPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [showReview, setShowReview] = useState<boolean>(false);
  const [showAnswerHint, setShowAnswerHint] = useState<boolean>(false);
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([]);
  const [hasSavedProgress, setHasSavedProgress] = useState<boolean>(false);
  const [showProgressDialog, setShowProgressDialog] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const router = useRouter();
  
  // 載入題目（根據 type 篩選和 random 參數）
  const loadQuestions = useCallback(() => {
    try {
      if (!locationQuestionsData || !Array.isArray(locationQuestionsData) || locationQuestionsData.length === 0) {
        console.error('找不到題目資料');
        setIsLoading(false);
        return;
      }
      
      // Get current query parameters
      const type = router.query.type as string | undefined;
      const random = router.query.random as string | undefined;
      
      let data = [...locationQuestionsData]; // 創建副本避免修改原資料
      
      if (type && type !== '') {
        data = data.filter(q => q.type === type);
      }
      
      if (data.length === 0) {
        console.error('沒有找到符合條件的題目');
        setIsLoading(false);
        return;
      }
      
      const useRandom = random === 'true';
      const prepared = useRandom ? prepareQuestions(data) : prepareOptionsOnly(data);
      
      setShuffledQuestions(prepared);
      setIsLoading(false);
    } catch (error) {
      console.error('載入題目失敗:', error);
      setIsLoading(false);
    }
  }, [router.query]);

  // 從 localStorage 載入進度
  const loadProgress = useCallback((): SavedProgress | null => {
    if (typeof window === 'undefined') return null;
    
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) return null;
      
      const progressData: SavedProgress = JSON.parse(saved);
      
      // 檢查是否超過 24 小時
      const dayInMs = 24 * 60 * 60 * 1000;
      if (Date.now() - progressData.timestamp > dayInMs) {
        localStorage.removeItem(STORAGE_KEY);
        return null;
      }
      
      return progressData;
    } catch (error) {
      console.error('無法載入進度:', error);
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }
  }, []);

  // 清除暫存進度
  const clearProgress = useCallback(() => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  // 檢查並載入暫存進度
  const checkSavedProgress = useCallback(() => {
    if (typeof window === 'undefined') return false;
    
    const saved = loadProgress();
    if (saved) {
      const type = router.query.type as string | undefined;
      const random = router.query.random as string | undefined;
      const currentParams = { type: type || '', random: random || '' };
      
      // 檢查練習參數是否相同
      const paramsMatch = 
        saved.practiceParams.type === currentParams.type &&
        saved.practiceParams.random === currentParams.random;
      
      if (paramsMatch) {
        setHasSavedProgress(true);
        setShowProgressDialog(true);
        setIsLoading(false);
        return true;
      } else {
        clearProgress(); // 參數不同，清除舊進度
      }
    }
    return false;
  }, [router.query, loadProgress, clearProgress]);

  // 恢復暫存進度
  const restoreProgress = () => {
    const saved = loadProgress();
    if (saved) {
      setCurrentQuestion(saved.currentQuestion);
      setUserAnswers(saved.userAnswers);
      setShuffledQuestions(saved.shuffledQuestions);
      setShowProgressDialog(false);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    
    // Ensure client-side execution
    if (typeof window !== 'undefined') {
      if (!checkSavedProgress()) {
        loadQuestions();
      }
    } else {
      loadQuestions();
    }
  }, [router.isReady, router.query, checkSavedProgress, loadQuestions]);

  // 暫存進度到 localStorage
  const saveProgress = (
    currentQ: number, 
    answers: UserAnswer[], 
    questions: Question[], 
    params: { type?: string; random?: string }
  ) => {
    if (typeof window === 'undefined') return;
    
    const progressData: SavedProgress = {
      currentQuestion: currentQ,
      userAnswers: answers,
      shuffledQuestions: questions,
      practiceParams: params,
      timestamp: Date.now()
    };
    
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progressData));
    } catch (error) {
      console.error('無法暫存進度:', error);
    }
  };

  const currentQ = shuffledQuestions[currentQuestion];
  const isLastQuestion = currentQuestion === shuffledQuestions.length - 1;

  const handleAnswerSelect = (answerIndex: number): void => {
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = (): void => {
    if (selectedAnswer === null) return;
    if (!currentQ) return;

    const isCorrect = selectedAnswer === currentQ.correct;
    const userAnswer: UserAnswer = {
      questionId: currentQ.id,
      selected: selectedAnswer,
      correct: currentQ.correct,
      isCorrect
    };

    const newUserAnswers = [...userAnswers, userAnswer];
    setUserAnswers(newUserAnswers);
    setShowResult(true);
    
    // 自動暫存進度
    const { type, random } = router.query;
    saveProgress(currentQuestion, newUserAnswers, shuffledQuestions, { 
      type: type as string, 
      random: random as string 
    });
  };

  const handleNextQuestion = (): void => {
    if (isLastQuestion) {
      setIsCompleted(true);
      clearProgress(); // 完成練習時清除暫存
    } else {
      const nextQuestion = currentQuestion + 1;
      setCurrentQuestion(nextQuestion);
      setSelectedAnswer(null);
      setShowResult(false);
      setShowAnswerHint(false);
      
      // 自動暫存進度
      const { type, random } = router.query;
      saveProgress(nextQuestion, userAnswers, shuffledQuestions, { 
        type: type as string, 
        random: random as string 
      });
    }
  };

  const handleSkipQuestion = (): void => {
    if (!currentQ) return;

    const userAnswer: UserAnswer = {
      questionId: currentQ.id,
      selected: -1, // -1 表示跳過
      correct: currentQ.correct,
      isCorrect: false
    };

    const newUserAnswers = [...userAnswers, userAnswer];
    setUserAnswers(newUserAnswers);
    
    if (isLastQuestion) {
      setIsCompleted(true);
      clearProgress(); // 完成練習時清除暫存
    } else {
      const nextQuestion = currentQuestion + 1;
      setCurrentQuestion(nextQuestion);
      setSelectedAnswer(null);
      setShowResult(false);
      setShowAnswerHint(false);
      
      // 自動暫存進度
      const { type, random } = router.query;
      saveProgress(nextQuestion, newUserAnswers, shuffledQuestions, { 
        type: type as string, 
        random: random as string 
      });
    }
  };

  const handleShowAnswer = (): void => {
    setShowAnswerHint(true);
  };

  const calculateScore = (): number => {
    const correctAnswers = userAnswers.filter(answer => answer.isCorrect).length;
    return shuffledQuestions.length === 0 ? 0 : Math.round((correctAnswers / shuffledQuestions.length) * 100);
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
    setShowAnswerHint(false);
    setHasSavedProgress(false);
    setShowProgressDialog(false);
    setIsLoading(true);
    clearProgress();
    loadQuestions();
  };

  // 提前結束練習
  const handleQuickFinish = (): void => {
    // 將剩餘題目標記為跳過
    const remainingQuestions = shuffledQuestions.slice(currentQuestion);
    const skippedAnswers: UserAnswer[] = remainingQuestions.map(q => ({
      questionId: q.id,
      selected: -1,
      correct: q.correct,
      isCorrect: false
    }));
    
    setUserAnswers(prev => [...prev, ...skippedAnswers]);
    setIsCompleted(true);
    clearProgress();
  };

  // Show progress dialog if saved progress is found
  if (showProgressDialog) {
    return (
      <div>
        <Head>
          <title>恢復練習進度 - 香港的士筆試練習</title>
          <meta name="description" content="發現之前的練習進度" />
        </Head>
        
        <main style={styles.main}>
          <div style={styles.container}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.95)',
              borderRadius: '15px',
              padding: '2rem',
              textAlign: 'center' as const,
              maxWidth: '500px',
              margin: '0 auto'
            }}>
              <h2>📚 發現之前的練習進度</h2>
              <p style={{ margin: '1.5rem 0', fontSize: '1.1rem', color: '#666' }}>
                您有一個未完成的地點練習，是否要繼續？
              </p>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                <button
                  onClick={restoreProgress}
                  style={{
                    padding: '1rem 2rem',
                    fontSize: '1.1rem',
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer'
                  }}
                >
                  繼續練習
                </button>
                <button
                  onClick={() => {
                    clearProgress();
                    setShowProgressDialog(false);
                    loadQuestions();
                  }}
                  style={{
                    padding: '1rem 2rem',
                    fontSize: '1.1rem',
                    backgroundColor: '#757575',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer'
                  }}
                >
                  重新開始
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (isLoading || shuffledQuestions.length === 0) {
    return (
      <div>
        <Head>
          <title>載入中 - 香港的士筆試練習</title>
          <meta name="description" content="正在載入地點練習題目" />
        </Head>
        
        <main style={styles.main}>
          <div style={styles.container}>
            <div style={styles.loadingContainer}>
              <h2 style={styles.loadingTitle}>📚 正在載入題目...</h2>
              <div style={styles.loadingSpinner}></div>
            </div>
          </div>
        </main>
      </div>
    );
  }

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
              
              {shuffledQuestions.map((question, index) => {
                const userAnswer = userAnswers[index];
                return (
                  <div key={question.id} style={styles.reviewItem}>
                    <div style={styles.reviewQuestion}>
                      {index + 1}. {question.question}
                    </div>
                    <div style={styles.reviewAnswer}>
                      你的答案：{userAnswer.selected === -1 ? '暫時跳過' : question.options[userAnswer.selected]} 
                      {userAnswer.selected === -1 ? 
                        <span style={{ color: '#ff9800', marginLeft: '10px' }}>⏭ 跳過</span> :
                        userAnswer.isCorrect ? 
                          <span style={{ color: '#4CAF50', marginLeft: '10px' }}>✓ 正確</span> : 
                          <span style={{ color: '#f44336', marginLeft: '10px' }}>✗ 錯誤</span>
                      }
                    </div>
                    {(!userAnswer.isCorrect || userAnswer.selected === -1) && (
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

  // 進度恢復對話框
  if (showProgressDialog) {
    return (
      <div>
        <Head>
          <title>恢復練習進度 - 香港的士筆試練習</title>
          <meta name="description" content="發現之前的練習進度，選擇是否繼續" />
        </Head>
        
        <main style={styles.main}>
          <div style={styles.container}>
            <div style={styles.progressDialog}>
              <h2 style={styles.dialogTitle}>🔄 發現暫存進度</h2>
              <p style={styles.dialogText}>
                我們發現你之前有未完成的練習進度，是否要繼續之前的練習？
              </p>
              <div style={styles.dialogButtons}>
                <button 
                  style={styles.primaryButton}
                  onClick={restoreProgress}
                >
                  繼續練習
                </button>
                <button 
                  style={styles.secondaryButton}
                  onClick={() => {
                    clearProgress();
                    setShowProgressDialog(false);
                    setIsLoading(true);
                    loadQuestions();
                  }}
                >
                  重新開始
                </button>
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
              第 {currentQuestion + 1} 題，共 {shuffledQuestions.length} 題
            </div>
            <button 
              style={styles.finishButton}
              onClick={handleQuickFinish}
              title="提前結束練習並查看結果"
            >
              提前結束
            </button>
          </div>

          {!currentQ ? (
            <div style={styles.loadingContainer}>
              <h2 style={styles.loadingTitle}>⚠️ 題目載入中...</h2>
              <p style={{ color: 'white' }}>請稍候，正在準備題目</p>
            </div>
          ) : (
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
                <div>
                  {showAnswerHint && (
                    <div style={styles.hintContainer}>
                      <div style={styles.hintText}>💡 提示：正確答案是 {currentQ.options[currentQ.correct]}</div>
                      <div style={styles.explanation}>{currentQ.explanation}</div>
                    </div>
                  )}
                  
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '1rem' }}>
                    <button
                      style={styles.skipButton}
                      onClick={handleSkipQuestion}
                    >
                      暫時跳過
                    </button>
                    
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
                    
                    <button
                      style={styles.showAnswerButton}
                      onClick={handleShowAnswer}
                      disabled={showAnswerHint}
                    >
                      顯示答案
                    </button>
                  </div>
                </div>
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
          )}
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
  // 進度對話框樣式
  progressDialog: {
    background: 'rgba(255, 255, 255, 0.95)',
    borderRadius: '15px',
    padding: '2rem',
    textAlign: 'center' as const,
    marginTop: '5rem',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  } as const,
  dialogTitle: {
    fontSize: '1.8rem',
    color: '#333',
    marginBottom: '1rem',
  } as const,
  dialogText: {
    fontSize: '1.1rem',
    color: '#666',
    marginBottom: '2rem',
    lineHeight: '1.5',
  } as const,
  dialogButtons: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
  } as const,
  primaryButton: {
    padding: '1rem 2rem',
    fontSize: '1.1rem',
    backgroundColor: '#2196F3',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  } as const,
  // Loading 樣式
  loadingContainer: {
    textAlign: 'center' as const,
    marginTop: '5rem',
    color: 'white',
  } as const,
  loadingTitle: {
    fontSize: '1.5rem',
    marginBottom: '2rem',
  } as const,
  loadingSpinner: {
    width: '40px',
    height: '40px',
    border: '4px solid rgba(255, 255, 255, 0.3)',
    borderTop: '4px solid white',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    margin: '0 auto',
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
  finishButton: {
    padding: '0.5rem 1rem',
    backgroundColor: '#ff9800',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    transition: 'all 0.3s ease',
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
    color: '#333',
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
    backgroundColor: '#003f7f',
    color: 'white',
    border: '2px solid #d12029',
    borderRadius: '10px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
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
  skipButton: {
    padding: '0.8rem 1.5rem',
    fontSize: '1rem',
    backgroundColor: '#ff9800',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    marginRight: '1rem',
  } as const,
  showAnswerButton: {
    padding: '0.8rem 1.5rem',
    fontSize: '1rem',
    backgroundColor: '#9c27b0',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    marginLeft: '1rem',
  } as const,
  hintContainer: {
    marginTop: '1rem',
    padding: '1rem',
    backgroundColor: '#e8f5e8',
    borderRadius: '8px',
    border: '2px solid #4CAF50',
  } as const,
  hintText: {
    color: '#2e7d32',
    fontSize: '1rem',
    fontWeight: 'bold',
    marginBottom: '0.5rem',
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

export default LocationPractice;

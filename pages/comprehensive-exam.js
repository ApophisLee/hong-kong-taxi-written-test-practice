import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';

// 綜合模擬考試 - 結合地點、路線和交通規則題目
const examQuestions = [
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

export default function ComprehensiveExam() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [timeElapsed, setTimeElapsed] = useState(0);

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

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = () => {
    const newAnswer = {
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

  const handleNextQuestion = () => {
    if (currentQuestion < examQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setIsCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setUserAnswers([]);
    setShowResult(false);
    setScore(0);
    setIsCompleted(false);
    setStartTime(Date.now());
    setTimeElapsed(0);
  };

  const getScoreGrade = () => {
    const percentage = (score / examQuestions.length) * 100;
    if (percentage >= 80) return { grade: 'A', color: 'text-green-600', message: '優秀！' };
    if (percentage >= 70) return { grade: 'B', color: 'text-blue-600', message: '良好！' };
    if (percentage >= 60) return { grade: 'C', color: 'text-yellow-600', message: '合格！' };
    return { grade: 'F', color: 'text-red-600', message: '需要加強！' };
  };

  if (isCompleted) {
    const { grade, color, message } = getScoreGrade();
    const categories = ['地點', '路線', '交通規則'];
    const categoryStats = categories.map(cat => {
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Head>
          <title>綜合模擬考試結果 - 香港的士筆試練習</title>
          <meta name="description" content="香港的士筆試綜合模擬考試結果" />
        </Head>

        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">考試完成！</h1>
                <div className={`text-6xl font-bold ${color} mb-4`}>{grade}</div>
                <div className="text-2xl text-gray-600 mb-2">{message}</div>
                <div className="text-lg text-gray-600">
                  總分：{score}/{examQuestions.length} ({Math.round((score/examQuestions.length)*100)}%)
                </div>
                <div className="text-sm text-gray-500 mt-2">
                  用時：{formatTime(timeElapsed)}
                </div>
              </div>

              {/* 分類統計 */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">分類表現</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  {categoryStats.map((stat, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-700">{stat.category}</h4>
                      <div className="text-2xl font-bold text-blue-600">
                        {stat.score}/{stat.total}
                      </div>
                      <div className="text-sm text-gray-600">{stat.percentage}%</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 答題詳情 */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">答題詳情</h3>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {examQuestions.map((question, index) => {
                    const userAnswer = userAnswers[index];
                    const isCorrect = userAnswer && userAnswer.isCorrect;
                    
                    return (
                      <div key={question.id} className={`p-4 rounded-lg border-l-4 ${
                        isCorrect ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'
                      }`}>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="text-sm text-gray-600 mb-1">
                              第{index + 1}題 ({question.category})
                            </div>
                            <div className="font-medium text-gray-800 mb-2">
                              {question.question}
                            </div>
                            <div className="text-sm text-gray-600">
                              您的答案：{question.options[userAnswer?.selected]}
                            </div>
                            {!isCorrect && (
                              <div className="text-sm text-green-600">
                                正確答案：{question.options[question.correct]}
                              </div>
                            )}
                          </div>
                          <div className={`ml-4 px-2 py-1 rounded text-sm font-medium ${
                            isCorrect ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
                          }`}>
                            {isCorrect ? '✓' : '✗'}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={handleRestart}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  重新考試
                </button>
                <Link href="/practice">
                  <a className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors text-center">
                    返回練習選單
                  </a>
                </Link>
                <Link href="/">
                  <a className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors text-center">
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Head>
        <title>綜合模擬考試 - 香港的士筆試練習</title>
        <meta name="description" content="香港的士筆試綜合模擬考試，包含地點、路線和交通規則題目" />
      </Head>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* 標題和進度 */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold text-gray-800">綜合模擬考試</h1>
              <div className="text-sm text-gray-600">
                用時：{formatTime(timeElapsed)}
              </div>
            </div>
            
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-gray-600">
                第 {currentQuestion + 1} 題，共 {examQuestions.length} 題
              </span>
              <span className="text-sm text-gray-600">
                目前得分：{score}/{currentQuestion + (showResult ? 1 : 0)}
              </span>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {/* 題目卡片 */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="mb-4">
              <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mb-2">
                {question.category}
              </span>
              <h2 className="text-xl font-semibold text-gray-800">
                {question.question}
              </h2>
            </div>

            {!showResult ? (
              <div className="space-y-3">
                {question.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                      selectedAnswer === index
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <span className="font-medium">{option}</span>
                  </button>
                ))}

                <div className="pt-4">
                  <button
                    onClick={handleSubmitAnswer}
                    disabled={selectedAnswer === null}
                    className={`w-full py-3 px-6 rounded-lg font-medium transition-colors ${
                      selectedAnswer !== null
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    提交答案
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-3">
                  {question.options.map((option, index) => {
                    let bgColor = 'bg-gray-50 border-gray-200';
                    let textColor = 'text-gray-700';
                    
                    if (index === question.correct) {
                      bgColor = 'bg-green-100 border-green-500';
                      textColor = 'text-green-800';
                    } else if (index === selectedAnswer && selectedAnswer !== question.correct) {
                      bgColor = 'bg-red-100 border-red-500';
                      textColor = 'text-red-800';
                    }

                    return (
                      <div
                        key={index}
                        className={`p-4 rounded-lg border-2 ${bgColor}`}
                      >
                        <span className={`font-medium ${textColor}`}>
                          {option}
                          {index === question.correct && ' ✓'}
                          {index === selectedAnswer && selectedAnswer !== question.correct && ' ✗'}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <div className={`p-4 rounded-lg ${
                  selectedAnswer === question.correct 
                    ? 'bg-green-50 border border-green-200' 
                    : 'bg-red-50 border border-red-200'
                }`}>
                  <h3 className="font-semibold mb-2">
                    {selectedAnswer === question.correct ? '答對了！' : '答錯了！'}
                  </h3>
                  <p className="text-gray-700">{question.explanation}</p>
                </div>

                <button
                  onClick={handleNextQuestion}
                  className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-green-700 transition-colors"
                >
                  {currentQuestion < examQuestions.length - 1 ? '下一題' : '查看結果'}
                </button>
              </div>
            )}
          </div>

          {/* 導航 */}
          <div className="mt-6 text-center">
            <Link href="/practice">
              <a className="text-blue-600 hover:text-blue-800 transition-colors">
                ← 返回練習選單
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

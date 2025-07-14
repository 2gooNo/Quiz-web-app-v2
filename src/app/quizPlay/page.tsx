"use client";
import { NavBar } from "../_components/navBar";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function QuizPlayPage() {
  const router=useRouter()
  const [quizData, setQuizData] = useState<any>([]);
  const [cats, setCats] = useState<string[]>([]);
  const [where, setWhere] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<{[questionIndex: number]: number}>({});
  const [showResults, setShowResults] = useState<boolean>(false);
  const searchParams = useSearchParams();

  // Fisher-Yates (Knuth) shuffle algorithm
  const shuffleArray = (array: any[]) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Function to shuffle answers within each quiz question
  const shuffleQuizAnswers = (quizzes: any[]) => {
    return quizzes.map((quiz) => {
      // If answers array exists, shuffle it
      if (quiz.answers && Array.isArray(quiz.answers)) {
        const shuffledAnswers = shuffleArray(quiz.answers);
        return { ...quiz, answers: shuffledAnswers };
      }

      // If options array exists, shuffle it
      if (quiz.options && Array.isArray(quiz.options)) {
        const shuffledOptions = shuffleArray(quiz.options);
        return { ...quiz, options: shuffledOptions };
      }

      return quiz;
    });
  };

  async function fetchData() {
    try {
      const response = await axios.post("http://localhost:8000/QuizByCat", {
        cat: cats,
      });

      // First, shuffle the order of questions
      const shuffledQuizzes = shuffleArray(response.data.quiz);

      // Then, shuffle the answers within each question
      const fullyShuffledQuizzes = shuffleQuizAnswers(shuffledQuizzes);

      setQuizData(fullyShuffledQuizzes);
      console.log("Quiz Data (Fully Shuffled):", fullyShuffledQuizzes);
    } catch (error) {
      console.error("Error fetching quiz data:", error);
    }
  }

  const handleAnswerClick = (answerIndex: number) => {
    setUserAnswers(prev => ({
      ...prev,
      [where]: answerIndex
    }));
  };

  const moveToNextQuestion = () => {
    if (where < quizData.length - 1) {
      setWhere(prev => prev + 1);
    }
  };

  const moveToPreviousQuestion = () => {
    if (where > 0) {
      setWhere(prev => prev - 1);
    }
  };

  const getButtonStyle = (answerIndex: number) => {
    const isSelected = userAnswers[where] === answerIndex;
    
    if (isSelected) {
      return "bg-[#FCC822] text-white border-2 border-[#E5B726]"; // Selected answer is yellow
    }
    return "bg-[#D1D1D1] hover:bg-[#FCC822] hover:text-white border-2 border-transparent";
  };

  const calculateResults = () => {
    let correct = 0;
    const results = quizData.map((question: any, questionIndex: number) => {
      const userAnswerIndex = userAnswers[questionIndex];
      const userAnswer = userAnswerIndex !== undefined ? question.answers[userAnswerIndex] : null;
      const correctAnswer = question.answers.find((ans: any) => ans.isCor === true);
      const isCorrect = userAnswer && userAnswer.isCor === true;
      
      if (isCorrect) correct++;
      
      return {
        question: question.question,
        userAnswer: userAnswer ? (userAnswer.ans || userAnswer) : "Not answered",
        correctAnswer: correctAnswer ? (correctAnswer.ans || correctAnswer) : "N/A",
        isCorrect
      };
    });
    
    return { results, score: correct, total: quizData.length };
  };

  const handleSubmit = () => {
    setShowResults(true);
  };

  const closeResults = () => {
    setShowResults(false);
    // Clear localStorage and reset quiz
    localStorage.removeItem('quizAnswers');
    localStorage.removeItem('quizWhere');
    localStorage.removeItem('quizData');
    setWhere(0);
    setUserAnswers({});
    setQuizData([]);
    router.push("/")
  };

  useEffect(() => {
    var rawCats = searchParams.get("catNames");
    setCats(rawCats?.split(",") || []);
    
    // Load saved progress from localStorage
    const savedAnswers = localStorage.getItem('quizAnswers');
    const savedWhere = localStorage.getItem('quizWhere');
    const savedQuizData = localStorage.getItem('quizData');
    
    if (savedAnswers) {
      setUserAnswers(JSON.parse(savedAnswers));
    }
    if (savedWhere) {
      setWhere(parseInt(savedWhere));
    }
    if (savedQuizData) {
      setQuizData(JSON.parse(savedQuizData));
    }
  }, []);

  useEffect(() => {
    if (cats.length > 0 && quizData.length === 0) {
      fetchData();
    }
  }, [cats]);

  // Save progress to localStorage whenever answers or question position changes
  useEffect(() => {
    if (Object.keys(userAnswers).length > 0) {
      localStorage.setItem('quizAnswers', JSON.stringify(userAnswers));
    }
  }, [userAnswers]);

  useEffect(() => {
    localStorage.setItem('quizWhere', where.toString());
  }, [where]);

  useEffect(() => {
    if (quizData.length > 0) {
      localStorage.setItem('quizData', JSON.stringify(quizData));
    }
  }, [quizData]);

  return (
    <div className={`flex flex-col min-h-screen bg-gray-100 ${showResults ? 'pointer-events-none opacity-50' : ''}`}>
      <NavBar />
      
      {/* Question Section */}
      <div className="bg-[#FCC822] w-full px-4 sm:px-8 md:px-16 lg:px-24 py-8 sm:py-12 md:py-16 lg:py-10 text-white flex items-center justify-center">
        <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-thin text-center leading-relaxed max-w-4xl">
          {quizData[where]?.question}
        </p>
      </div>
      
      {/* Answers Section */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-8 md:px-16 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 w-full max-w-4xl">
          {quizData[where]?.answers?.map((answer: any, index: number) => (
            <button
              key={index}
              className={`min-h-16 sm:min-h-20 md:min-h-24 w-full text-base sm:text-lg md:text-xl lg:text-2xl font-bold px-4 sm:px-6 md:px-8 py-4 sm:py-6 transition-colors duration-300 rounded-lg break-words ${getButtonStyle(index)}`}
              onClick={() => handleAnswerClick(index)}
            >
              {answer.ans || answer}
            </button>
          ))}
        </div>
      </div>
      
      {/* Navigation Section */}
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 px-4 sm:px-8 md:px-16 py-6 sm:py-8 justify-between items-center bg-white border-t border-gray-200">
        {/* Previous Button - Only show if not on first question */}
        {where > 0 ? (
          <button
            className="flex flex-row justify-center items-center gap-2 sm:gap-3 bg-[#D1D1D1] h-12 sm:h-14 md:h-16 px-4 sm:px-6 md:px-8 text-white hover:bg-gray-400 transition-colors duration-300 rounded-lg w-full sm:w-auto min-w-32 sm:min-w-36"
            onClick={moveToPreviousQuestion}
          >
            <img className="h-auto w-3 sm:w-4" src="/leftArrow.svg" />
            <p className="text-black font-normal text-sm sm:text-base md:text-lg">Previous</p>
          </button>
        ) : (
          <div className="w-full sm:w-auto min-w-32 sm:min-w-36"></div>
        )}
        
        {/* Question Counter */}
        <div className="flex items-center justify-center">
          <span className="text-sm sm:text-base md:text-lg text-gray-600 font-medium">
            {where + 1} of {quizData.length}
          </span>
        </div>
        
        {/* Next and Submit Buttons */}
        <div className="flex flex-row gap-2 sm:gap-4 w-full sm:w-auto">
          {/* Next Button - Only show if not on last question */}
          {where < quizData.length - 1 ? (
            <button
              className="flex flex-row justify-center items-center gap-2 sm:gap-3 bg-[#FCC822] h-12 sm:h-14 md:h-16 px-4 sm:px-6 md:px-8 text-white hover:bg-[#E5B726] transition-colors duration-300 rounded-lg flex-1 sm:flex-none min-w-24 sm:min-w-28"
              onClick={moveToNextQuestion}
            >
              <p className="font-normal text-sm sm:text-base md:text-lg">Next</p>
              <img className="h-auto w-2 sm:w-3" src="/rightArrow.svg" />
            </button>
          ) : null}
          
          <button className="flex flex-row justify-center items-center gap-2 sm:gap-3 h-12 sm:h-14 md:h-16 px-4 sm:px-6 md:px-8 border-2 border-[#FCC822] hover:bg-[#FCC822] hover:text-white transition-colors duration-300 rounded-lg flex-1 sm:flex-none min-w-24 sm:min-w-28"
            onClick={handleSubmit}
          >
            <p className="text-[#FCC822] hover:text-white font-normal text-sm sm:text-base md:text-lg">Submit</p>
            <img className="h-auto w-3 sm:w-4" src="/skipArrow.svg" />
          </button>
        </div>
      </div>

      {/* Results Modal */}
      {showResults && (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 p-4 pointer-events-auto">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl max-h-[90vh] overflow-hidden pointer-events-auto">
            {/* Modal Header */}
            <div className="bg-[#FCC822] text-white p-6 text-center">
              <h2 className="text-2xl sm:text-3xl font-bold">Quiz Results</h2>
              <p className="text-lg mt-2">
                Score: {calculateResults().score} out of {calculateResults().total} 
                ({Math.round((calculateResults().score / calculateResults().total) * 100)}%)
              </p>
            </div>
            
            {/* Modal Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 p-3 text-left font-semibold text-sm sm:text-base">#</th>
                      <th className="border border-gray-300 p-3 text-left font-semibold text-sm sm:text-base">Question</th>
                      <th className="border border-gray-300 p-3 text-left font-semibold text-sm sm:text-base">Your Answer</th>
                      <th className="border border-gray-300 p-3 text-left font-semibold text-sm sm:text-base">Correct Answer</th>
                      <th className="border border-gray-300 p-3 text-left font-semibold text-sm sm:text-base">Result</th>
                    </tr>
                  </thead>
                  <tbody>
                    {calculateResults().results.map((result: any, index: number) => (
                      <tr key={index} className={result.isCorrect ? 'bg-green-50' : 'bg-red-50'}>
                        <td className="border border-gray-300 p-3 text-sm sm:text-base font-medium">
                          {index + 1}
                        </td>
                        <td className="border border-gray-300 p-3 text-sm sm:text-base max-w-xs">
                          <div className="break-words">{result.question}</div>
                        </td>
                        <td className="border border-gray-300 p-3 text-sm sm:text-base max-w-xs">
                          <div className="break-words">{result.userAnswer}</div>
                        </td>
                        <td className="border border-gray-300 p-3 text-sm sm:text-base max-w-xs">
                          <div className="break-words">{result.correctAnswer}</div>
                        </td>
                        <td className="border border-gray-300 p-3 text-center">
                          <span className={`px-3 py-1 rounded-full text-xs sm:text-sm font-semibold ${
                            result.isCorrect 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {result.isCorrect ? 'Correct' : 'Wrong'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            {/* Modal Footer */}
            <div className="bg-gray-50 p-6 flex flex-col sm:flex-row gap-4 justify-between items-center">
              <div className="text-sm sm:text-base text-gray-600">
                Performance: {calculateResults().score >= calculateResults().total * 0.8 ? 'Excellent!' : 
                            calculateResults().score >= calculateResults().total * 0.6 ? 'Good!' : 
                            calculateResults().score >= calculateResults().total * 0.4 ? 'Fair' : 'Needs Improvement'}
              </div>
              <button
                onClick={closeResults}
                className="bg-[#FCC822] hover:bg-[#E5B726] text-white px-6 py-2 rounded-lg font-semibold transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

import { useState } from "react"
import { checkAnswer, getQuestions } from "../services/api"

export const useTriviaGame = () => {
    const [gameState, setGameState] = useState("menu");
    const [difficulty, setDifficulty] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [corrects, setCorrects] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);
    const [answeredQuestions, setAnsweredQuestions] = useState([]);

    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [timeoutId,setTimeoutId] = useState(null);

    const startGame = async(diff) => {
        try {
            setLoading(true);
            setErrorMessage(null);

            const qs = await getQuestions(diff);
            setDifficulty(diff);
            setQuestions(qs);
            setCurrentIndex(0);
            setCorrects(0);
            setSelectedAnswer(null);
            setIsCorrect(null);
            setAnsweredQuestions([]); 

            setGameState("playing");
        } catch (err) {
            setErrorMessage("We were unable to load the questions. Please try again.");
            setGameState("menu");
        } finally {
            setLoading(false);
        }
    }

    const currentQuestion = questions[currentIndex] || null;

    const answerQuestion = async(option) => {
        if (loading || selectedAnswer !== null) return;
        if (timeoutId) clearTimeout(timeoutId);

        try {
            setLoading(true);
            setErrorMessage(null);
            
            const data = await checkAnswer(currentQuestion.id, option);

            setSelectedAnswer(option);
            setIsCorrect(data.answer);

            if(data.answer) setCorrects((c) => c + 1);
            setAnsweredQuestions(prev => [...prev, data.answer ? "correct" : "incorrect"]);

            handleNextStep();
        } catch (err) {
            setErrorMessage("We were unable to verify your answer. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    const handleNextStep = () => {
        const id = setTimeout(() => {
            setSelectedAnswer(null);
            setIsCorrect(null);

            setCurrentIndex((prev) => {
                const next = prev + 1;

                if (next >= questions.length) {
                    setGameState("results");
                    return prev;
                }
                return next;
            });
        }, 800);

        setTimeoutId(id);
    }

    const playAgain = () => {
        if (timeoutId) clearTimeout(timeoutId);
        setTimeoutId(null);

        startGame(difficulty);
    }

    const returnToMenu = () => {
        if (timeoutId) clearTimeout(timeoutId);
        setTimeoutId(null);
        
        setGameState("menu");
        setDifficulty(null);
        setQuestions([]);
        setCurrentIndex(0);
        setCorrects(0);
        setSelectedAnswer(null);
        setIsCorrect(null);
        setAnsweredQuestions([]); 
    } 

    return {
        gameState,
        difficulty,
        questions,
        currentIndex,
        currentQuestion,
        totalQuestions: questions.length,
        corrects,
        selectedAnswer,
        isCorrect,
        answeredQuestions,
        loading,
        errorMessage,
        setErrorMessage,

        startGame,
        answerQuestion,
        playAgain,
        returnToMenu
    }
}
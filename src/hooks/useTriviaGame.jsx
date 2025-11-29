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
        if (timeoutId) clearTimeout(timeoutId);

        try {
            setLoading(true);
            setErrorMessage(null);

            const data = await checkAnswer(currentQuestion.id, option);

            setSelectedAnswer(option);
            setIsCorrect(data.answer);

            if(data.answer) setCorrects((c) => c + 1);

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

            (currentIndex + 1 >= questions.length) 
                ? setGameState("results")
                : setCurrentIndex((i) =>  i + 1);
        }, 1200);

        setTimeoutId(id);
    }

    const playAgain = () => {
        startGame(difficulty);
    }

    const returnToMenu = () => {
        setGameState("menu");
    } 

    return {
        gameState,
        difficulty,
        questions,
        currentIndex,
        currentQuestion,
        corrects,
        selectedAnswer,
        isCorrect,
        loading,
        errorMessage,
        setErrorMessage,

        startGame,
        answerQuestion,
        playAgain,
        returnToMenu
    }
}
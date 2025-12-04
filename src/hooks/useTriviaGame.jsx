import { useEffect, useState } from "react"
import { checkAnswer, getDifficulties, getQuestions } from "../services/api"
import { useGameTimer } from "./useGameTimer";
import { useGameState } from "./useGameState";

export const useTriviaGame = () => {
    const timer = useGameTimer();
    const gameState = useGameState();

    const [difficulties, setDifficulties] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        getDifficulties()
            .then(setDifficulties)
            .catch((err) => {
                console.error('Error loading difficulties:', err);
                setErrorMessage("We were unable to load difficulties. Please try again.");
            });
    }, []);

    const startGame = async(diff) => {
        try {
            setLoading(true);
            setErrorMessage(null);
            
            const qs = await getQuestions(diff);
            gameState.initializeGame(diff, qs)

        } catch (err) {
            console.error('Error loading questions:', err);
            setErrorMessage("We were unable to load the questions. Please try again.");
            gameState.resetGame();
        } finally {
            setLoading(false);
        }
    }

    const answerQuestion = async(option) => {
        if (loading || gameState.selectedAnswer !== null) return;
        timer.clearTimer();

        try {
            setLoading(true);
            setErrorMessage(null);
            
            const data = await checkAnswer(gameState.currentQuestion.id, option);
            gameState.saveAnswer(option, data.answer);

            timer.setTimer(() => {
                gameState.advanceQuestion();
            }, 800)

        } catch (err) {
            console.error('Error checking answer:', err);
            setErrorMessage("We were unable to verify your answer. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    const playAgain = () => {
        timer.clearTimer();
        startGame(gameState.difficulty);
    }

    const returnToMenu = () => {
        timer.clearTimer();
        gameState.resetGame();
    } 

    return {
        gameState: gameState.phase,
        difficulty: gameState.difficulty,
        questions: gameState.questions,
        currentIndex: gameState.currentIndex,
        currentQuestion: gameState.currentQuestion,
        totalQuestions: gameState.totalQuestions,
        corrects: gameState.corrects,
        selectedAnswer: gameState.selectedAnswer,
        isCorrect: gameState.isCorrect,
        answeredQuestions: gameState.answeredQuestions,

        difficulties,
        loading,
        errorMessage,
        setErrorMessage,

        startGame,
        answerQuestion,
        playAgain,
        returnToMenu
    }
}
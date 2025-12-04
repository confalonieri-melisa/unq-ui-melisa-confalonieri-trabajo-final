import { useState } from "react";

export const useGameState = () => {
    const [phase, setGamePhase] = useState("menu");
    const [difficulty, setDifficulty] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [corrects, setCorrects] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);
    const [answeredQuestions, setAnsweredQuestions] = useState([]);

    const clearGameData = () => {
        setDifficulty(null);
        setQuestions([]);
        setCurrentIndex(0);
        setCorrects(0);
        setSelectedAnswer(null);
        setIsCorrect(null);
        setAnsweredQuestions([]);
    }

    const initializeGame = (diff, qs) => {
        clearGameData();
        setDifficulty(diff);
        setQuestions(qs);
        setGamePhase("playing");
    };

    const resetGame = () => {
        clearGameData();
        setGamePhase("menu");
    };

    const saveAnswer = (option, correct) => {
        setSelectedAnswer(option);
        setIsCorrect(correct);

        if (correct) setCorrects(prev => prev + 1);
        setAnsweredQuestions(prev => [...prev, correct ? "correct" : "incorrect"]);
    }
    
    const advanceQuestion = () => {
        setSelectedAnswer(null);
        setIsCorrect(null);

        setCurrentIndex((prev) => {
            const nextIndex = prev + 1;
            
            if (nextIndex >= questions.length) {
                setGamePhase("results");
                return prev;
            }
            return nextIndex;
        });
    }

    return {
        phase,
        difficulty,
        questions,
        currentIndex,
        corrects,
        selectedAnswer,
        isCorrect,
        answeredQuestions,
        currentQuestion: questions[currentIndex] || null,
        totalQuestions: questions.length,

        initializeGame,
        resetGame,
        saveAnswer,
        advanceQuestion
    }
        
}
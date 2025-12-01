import { useEffect, useState } from "react";
import { RetroWindow } from "../retro-window/RetroWindow";
import { ProgressBar } from "./ProgressBar.jsx"
import "./QuestionWindow.css"

export const QuestionWindow = ({ question, currentIndex, totalQuestions, onAnswer, selectedAnswer, isCorrect, answersStatus }) => {    
    const options = [
        { id: "option1", text: question.option1 },
        { id: "option2", text: question.option2 },
        { id: "option3", text: question.option3 },
        { id: "option4", text: question.option4 },
    ];

     if (!question) return null;

    return (
        <RetroWindow className="window-large" title={`Question ${currentIndex + 1} / ${totalQuestions}`}>
            <div className="question-content">
                <h2 className="question-text"> {question.question} </h2>

                <div className="options-list">
                    {options.map((option) => {
                        const isSelected = selectedAnswer === option.id;
                        const extraClass = isSelected ? (isCorrect ? " correct" : " incorrect") : "";

                        return (
                            <button
                                key={option.id}
                                className={`option-btn${extraClass}`}
                                onClick={() => onAnswer(option.id)}
                                type="button"
                                disabled={selectedAnswer !== null}
                            >
                                <span className="option-icon">
                                    {isSelected ? (isCorrect ? "✓" : "✗") : "○"}
                                </span>
                                <span className="option-text">{option.text}</span>
                            </button>
                        )
                    })}
                </div>
                <div className="progress-divider"></div>
                <ProgressBar totalQuestions={totalQuestions} answers={answersStatus} />
            </div>
        </RetroWindow>
    )
}
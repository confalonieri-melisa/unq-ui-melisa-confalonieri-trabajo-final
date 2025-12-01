import { RetroWindow } from "../retro-window/RetroWindow"
import "./ResultsWindow.css"

export const ResultsWindow = ({ difficulty, score, total, onPlayAgain, onReturnToMenu }) => {
    const percentage = (score / total) * 100;
    const message =
        percentage === 100 ? "Perfect!" :
        percentage >= 70 ? "Great job!" :
        percentage >= 50 ? "Good effort!" :
        "Keep trying!";

    return (
        <RetroWindow className="window-medium" title={`Difficulty: ${difficulty.toUpperCase()}`}>
            <div className="results-content">
                <h2 className="results-title"> Game Over </h2>
                <div className="results-divider" />

                <div className="score-box">
                    <div className="score-label">Your score</div>
                    <div className="score-number">{score}</div>
                    <div className="score-total">out of {total} correct</div>
                    <div className="score-message">{message}</div>
                </div>
                <div className="results-divider" />
                

                <div className="results-buttons">
                    <button className="action-btn play-again" onClick={onPlayAgain}> ⟲ Play again! </button>
                    <button className="action-btn return-menu" onClick={onReturnToMenu}> Return to menu </button>
                </div>
            </div>
        </RetroWindow>
    )
}
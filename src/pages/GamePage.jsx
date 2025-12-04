import { useTriviaGame } from "../hooks/useTriviaGame"
import { DesktopIcons } from "../components/desktop-icons/DesktopIcons"
import { MenuWindow } from "../components/menu-window/MenuWindow";
import { QuestionWindow } from "../components/question-window/QuestionWindow";
import { ResultsWindow } from "../components/results-window/ResultsWindow";
import { ErrorPopup } from "../components/error-popup/ErrorPopup";
import "./GamePage.css"

const GamePage = () => {
    const game = useTriviaGame();
    
    return (
        <div className={`desktop ${game.gameState}`}>
            <DesktopIcons />
            <div className="game-page">
                
                <div className="window-menu">
                    <MenuWindow
                        difficulties={game.difficulties}
                        onSelect={game.startGame}
                    />
                </div>

            {(game.gameState === "playing" || game.gameState === "results") && (
                <div className="window-question">
                    <QuestionWindow
                        question={game.currentQuestion}
                        currentIndex={game.currentIndex}
                        totalQuestions={game.totalQuestions}
                        onAnswer={game.answerQuestion}
                        selectedAnswer={game.selectedAnswer}
                        isCorrect={game.isCorrect}
                        answersStatus={game.answeredQuestions}
                    />
                </div>
            )}
            </div>

            {game.gameState === "results" && (
                <div className="window-results">
                    <ResultsWindow 
                        difficulty={game.difficulty}
                        score={game.corrects}
                        total={game.totalQuestions}
                        onPlayAgain={game.playAgain}
                        onReturnToMenu={game.returnToMenu}
                    />
                </div>
            )}

            {game.errorMessage && (
                <div className="error-overlay">
                    <ErrorPopup 
                        message={game.errorMessage}
                        onClose={() => {
                            game.setErrorMessage(null);
                            game.returnToMenu();
                        }}
                    />
                </div>
            )}
        </div>
    )
}

export default GamePage;
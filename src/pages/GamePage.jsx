import { useEffect, useState } from "react";
import { useTriviaGame } from "../hooks/useTriviaGame"
import { getDifficulties } from "../services/api";
import { DesktopIcons } from "../components/desktop-icons/DesktopIcons"
import { MenuWindow } from "../components/menu-window/MenuWindow";
import "./GamePage.css"

const GamePage = () => {
    const game = useTriviaGame();
    const [difficulties, setDifficulties] = useState([]);

    useEffect(() => {
        getDifficulties().then(setDifficulties);
    }, []);

    return (
        <div className="desktop">
            <DesktopIcons />

            <div className="game-page">

            {game.gameState === "menu" && (
                <div className="window-layer window-menu">
                    <MenuWindow
                        difficulties={difficulties}
                        onSelect={game.startGame}
                    />
                </div>
            )}                
            </div>
        </div>
            
        
    )
}

export default GamePage;
import { useEffect, useState } from "react";
import { useTriviaGame } from "@/hooks/useTriviaGame"
import { getDifficulties } from "@/services/api";
import { DesktopIcons } from "@/components/desktop-icons/DesktopIcons"
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

        </div>
    )
}

export default GamePage;
import { RetroWindow } from "../retro-window/RetroWindow";
import "./MenuWindow.css"

export const MenuWindow = ({ difficulties, onSelect }) => {
    return (
        <RetroWindow className="window-large" title="Menu">
            <div className="menu-window">
                <div className="menu-title">
                    <h1>Choose a difficulty</h1>
                    <hr className="menu-divider divider"/>
                    <h3 className="menu-subtitle">
                        Test your knowledge and have fun!
                    </h3>
                </div>

                <div className="difficulty-buttons">
                    {difficulties.map((diff, index) => (
                        <button key={diff} className="btn difficulty-btn" onClick={() => onSelect(diff)}>
                            <span className="btn-stars">
                                    {"★".repeat(index + 1)}
                            </span>
                            <span className="btn-label">{diff}</span>
                        </button>
                    ))}
                </div>
                <p className="menu-footer">© 1996 Brain Games Studio</p>
            </div>
        </RetroWindow>
    )
}
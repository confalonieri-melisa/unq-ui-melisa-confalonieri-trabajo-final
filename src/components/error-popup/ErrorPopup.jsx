import { RetroWindow } from "../retro-window/RetroWindow";
import "./ErrorPopup.css"

export const ErrorPopup = ({ message, onClose }) => {
    return (
        <RetroWindow className="window-small" title="ERROR">
            <div className="error-popup">
                <p>{message}</p>
                <button onClick={onClose}> OK </button>
            </div>
        </RetroWindow>
    )
}
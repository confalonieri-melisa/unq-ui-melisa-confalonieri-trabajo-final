import { RetroWindow } from "../retro-window/RetroWindow";
import "./ErrorPopup.css"

export const ErrorPopup = ({ message, onClose }) => {
    return (
        <RetroWindow className="window-small" title="ERROR">
            <div className="error-popup">
                <p className="error-message">{message}</p>
                <button className="error-btn" onClick={onClose}> OK </button>
            </div>
        </RetroWindow>
    )
}
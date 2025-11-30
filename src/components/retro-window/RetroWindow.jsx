import { FakeScrollbar } from "../fake-scrollbar/FakeScrollbar"
import "./RetroWindow.css"

export const RetroWindow = ({ title, children, className }) => {
    return (
        <div className={`retro-window ${className || ""}`}>
            <div className="retro-titlebar">
                <div className="titlebar-buttons">
                    <div className="titlebar-button red"></div>
                    <div className="titlebar-button yellow"></div>
                    <div className="titlebar-button green"></div>
                </div>
                <span className="retro-title">
                    <span className="title-left">Brain Teaser</span>
                    <span className="title-right">{title}</span>
                </span>
            </div>

            <div className="retro-content">
                {children}
                <FakeScrollbar />
            </div>
        </div>
    )
}
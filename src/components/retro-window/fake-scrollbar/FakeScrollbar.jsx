import "./FakeScrollbar.css"

export const FakeScrollbar = () => {
    return (
        <div className="fake-scrollbar">
            <div className="scroll-arrow">▲</div>
            <div className="scroll-track">
                <div className="scroll-thumb"/>
            </div>
            <div className="scroll-arrow">▼</div>
        </div>
    )
}
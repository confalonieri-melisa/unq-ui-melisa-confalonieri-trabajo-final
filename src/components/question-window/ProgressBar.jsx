export const ProgressBar = ({ totalQuestions, answers }) => {
    return (
        <div className="progress-bar">
            {Array.from({ length: totalQuestions }).map((_,idx) => (
                <span key={idx} className={`progress-square ${answers[idx] ? answers[idx] : ""}`} />
            ))}
        </div>
    )
}
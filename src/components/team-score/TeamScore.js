import "./TeamScore.scss";

function TeamScore({score = 0, team, color, scoreClicked}) {

    const handleRightClick = (e) => {
        e.preventDefault();
        scoreClicked(team, score - 1);
    }

    return (
        <div className="score-container"
             style={{backgroundColor: color}}
             onClick={() => scoreClicked(team, score + 1)}
             onContextMenu={handleRightClick}
        >
            <h1 className="score no-select">{score}</h1>
        </div>
    )
}

export default TeamScore;

import "./TeamScore.scss";

function TeamScore({score = 0, team, color, scoreClicked}) {

    return (
        <div className="score-container" style={{backgroundColor: color}} onClick={() => scoreClicked(team, score + 1)}>
            <h1 className="score">{score}</h1>
        </div>
    )
}

export default TeamScore;

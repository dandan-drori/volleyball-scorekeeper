import './Summary.scss';

function SummaryTable({setsSummary, matchSummary}) {
    const headers = ['זמן','תוצאה'];

    const { homeTeam, awayTeam, matchStart, matchEnd, matchDuration } = matchSummary;

    if (!matchSummary || !setsSummary) {
        return <div>
            <p>אין סיכום משחק</p>
        </div>
    }

    return (
        <div className="summary-table-container">
            <h3>סיכום משחק</h3>
            <table>
                <thead>
                <tr>
                    {headers.map((header) => <th key={header}>{header}</th>)}
                </tr>
                </thead>
                <tbody>
                {setsSummary.map(({time, score}) =>
                    <tr key={time}>
                        <td>{time}</td>
                        <td>{score}</td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    )
}

export default SummaryTable;

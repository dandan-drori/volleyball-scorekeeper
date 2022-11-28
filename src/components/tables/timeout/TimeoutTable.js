import './TimeoutTable.scss';

function TimeoutTable({timeouts, editEntry}) {
    const headers = ['זמן','תוצאה'];

    if (!timeouts || !timeouts.length) {
        return <div>
            <p>אין פסקי זמן</p>
        </div>
    }

    return (
        <div className="timeout-table-container">
            <h3>פסקי זמן</h3>
            <table>
                <thead>
                <tr>
                    {headers.map((header) => <th key={header}>{header}</th>)}
                </tr>
                </thead>
                <tbody>
                {timeouts.map(({time, score}) =>
                    <tr key={time} onClick={() => editEntry({time, score, eventType: 'timeout'})}>
                        <td>{time}</td>
                        <td>{score}</td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    )
}

export default TimeoutTable;

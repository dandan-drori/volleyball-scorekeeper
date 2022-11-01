import './SubstitutionTable.scss';

function SubstitutionTable({substitutions, editEntry}) {
    const headers = ['זמן','נכנס', 'יצא', 'תוצאה'];

    if (!substitutions || !substitutions.length) {
        return <div>
            <p>אין חילופים</p>
        </div>
    }

    return (
        <div className="timeout-table-container">
            <h3>חילופים</h3>
            <table>
                <thead>
                <tr>
                    {headers.map((header) => <th key={header}>{header}</th>)}
                </tr>
                </thead>
                <tbody>
                {substitutions.map(({time, entering, leaving, score}) =>
                    <tr key={time} onClick={() => editEntry({time, entering, leaving, score, eventType: 'substitution'})}>
                        <td>{time}</td>
                        <td>{entering}</td>
                        <td>{leaving}</td>
                        <td>{score}</td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    )
}

export default SubstitutionTable;

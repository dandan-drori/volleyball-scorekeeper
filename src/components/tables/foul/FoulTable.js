import './FoulTable.scss';
import { FOUL_TYPES } from "../../../config/constants";

function FoulTable({fouls, editEntry}) {

    const headers = ['סוג עבירה', 'זמן', 'שחקן', 'תוצאה'];

    if (!fouls || !fouls.length) {
        return <div>
            <p>אין עבירות</p>
        </div>
    }

    return (
        <div className="foul-table-container">
            <h3>עבירות</h3>
            <table>
                <thead>
                <tr>
                    {headers.map((header) => <th key={header}>{header}</th>)}
                </tr>
                </thead>
                <tbody>
                {fouls.map(({type, time, player, score}) =>
                    <tr key={time} onClick={() => editEntry({time, score, type, player, eventType: 'foul'})}>
                        <td>{FOUL_TYPES[type]}</td>
                        <td>{time}</td>
                        <td>{player}</td>
                        <td>{score}</td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    )
}

export default FoulTable;

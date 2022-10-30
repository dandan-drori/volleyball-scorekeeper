import './NextSetDialog.scss';
import DialogContainer from "../dialog-container";

function NextSetDialog({isOpen, closeDialog, currentSet}) {
    const {winner, homeTeam, awayTeam, timestamps} = currentSet;

    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        const hours = (date.getHours() + '').padStart(2, '0');
        const minutes = (date.getMinutes() + '').padStart(2, '0');
        return `${hours}:${minutes}`;
    }

    const getDuration = ({start, end}) => {
        const diff = end -start;
        const seconds = diff / 1000;
        if (seconds < 60) {
            return `${seconds.toFixed(0)} seconds`;
        }
        const minutes = seconds / 60;
        if (minutes < 60) {
            return `${ minutes.toFixed(0)} minutes`;
        }
        const hours = minutes / 60;
        const remainder = hours % 1;
        const remainderInMinutes = (remainder * 60).toFixed(0);
        return `${hours - remainder} hours and ${remainderInMinutes} minutes`;
    }

    return (
        <DialogContainer isOpen={isOpen} closeDialog={closeDialog}>
            <div className="next-set-dialog-container">
                <h3 className="next-set-dialog-header">Set Results:</h3>
                <p className="next-set-dialog-score">
                    <span style={{color: homeTeam.color}}>{homeTeam.score}</span> : <span style={{color: awayTeam.color}}>{awayTeam.score}</span>
                </p>
                <p className="next-set-dialog-winner">Winner: {winner}</p>
                <p>Duration: {getDuration(timestamps)}</p>
                <p className="next-set-dialog-times">
                    <span>Started at: {formatDate(timestamps.start)}</span>
                    <span>Ended at: {formatDate(timestamps.end)}</span>
                </p>
                <div className="next-set-dialog-action-container">
                    <button onClick={() => {closeDialog({next: true})}}>Next Set</button>
                </div>
            </div>
        </DialogContainer>
    )
}

export default NextSetDialog;

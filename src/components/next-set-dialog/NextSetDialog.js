import './NextSetDialog.scss';
import DialogContainer from "../dialog-container";

function NextSetDialog({isOpen, closeDialog, currentSet}) {
    const {winner, homeTeam, awayTeam, timestamps} = currentSet;

    return (
        <DialogContainer isOpen={isOpen} closeDialog={closeDialog}>
            <div className="next-set-dialog-container">
                <h3 className="next-set-dialog-header">Set Results:</h3>
                <p className="next-set-dialog-score">
                    <span style={{color: homeTeam.color}}>{homeTeam.score}</span> : <span style={{color: awayTeam.color}}>{awayTeam.score}</span>
                </p>
                <p className="next-set-dialog-winner">Winner: {winner}</p>
                <p>Duration: {(timestamps.end - timestamps.start) / 1000 / 60} minutes</p>
                <div className="next-set-dialog-action-container">
                    <button onClick={() => {closeDialog({next: true})}}>Next Set</button>
                </div>
            </div>
        </DialogContainer>
    )
}

export default NextSetDialog;

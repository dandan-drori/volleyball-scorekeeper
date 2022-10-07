import './SubstitutionDialog.css';
import DialogContainer from "../dialogContainer/DialogContainer";

function SubstitutionDialog({isOpen, closeDialog}) {
    return (
        <DialogContainer isOpen={isOpen}>
            <div style={{textAlign: 'left'}}>
                <p>Sub Dialog!</p>
                <p>Get list of available players from backend</p>

                <p>Choose leaving player:</p>
                <select name="leaving" id="leaving">
                    <option value="17">17</option>
                </select>

                <p>Choose entering player:</p>
                <select name="leaving" id="leaving">
                    <option value="3">3</option>
                </select>

                <button onClick={closeDialog}>Close</button>
            </div>
        </DialogContainer>
    )
}

export default SubstitutionDialog;

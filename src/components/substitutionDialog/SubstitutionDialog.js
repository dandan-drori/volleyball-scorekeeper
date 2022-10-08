import './SubstitutionDialog.scss';
import DialogContainer from "../dialogContainer/DialogContainer";
import { useState } from "react";

function SubstitutionDialog({isOpen, closeDialog, teamColor}) {
    const [selections, setSelections] = useState({
        leaving: '',
        entering: '',
    });

    const handleChange = ({target}) => {
        const { value, name } = target;
        if (!value) return;
        setSelections({...selections, [name]: value});
    }

    // todo - Get list of available players from backend

    return (
        <DialogContainer isOpen={isOpen} closeDialog={closeDialog}>
            <div className="substitution-dialog-container">
                <div className="substitution-dialog-header-container">
                    <p className="substitution-dialog-header">Substitution</p>
                    <button onClick={() => closeDialog({})}>X</button>
                </div>

                <span>Choose leaving player:</span>
                <select className="select-leaving" name="leaving" onChange={handleChange}>
                    <option value="">--</option>
                    <option value="17">17</option>
                    <option value="8">8</option>
                    <option value="5">5</option>
                </select>

                <p>
                    <span>Choose entering player:</span>
                    <select className="select-entering" name="entering" onChange={handleChange}>
                        <option value="">--</option>
                        <option value="3">3</option>
                        <option value="9">9</option>
                        <option value="12">2</option>
                    </select>
                </p>

                <div className="action-container">
                    <button onClick={() => closeDialog(selections)} style={{borderColor: teamColor}}>Submit</button>
                </div>
            </div>
        </DialogContainer>
    )
}

export default SubstitutionDialog;

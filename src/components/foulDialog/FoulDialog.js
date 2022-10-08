import './FoulDialog.scss';
import DialogContainer from "../dialogContainer/DialogContainer";
import { useState } from "react";

function FoulDialog({isOpen, closeDialog, teamColor}) {
    const [selections, setSelections] = useState({
        offenseType: '',
        player: '',
    });

    const handleChange = ({target}) => {
        const { value, name } = target;
        if (!value) return;
        setSelections({...selections, [name]: value});
    }

    // todo - Get list of available players from backend

    return (
        <DialogContainer isOpen={isOpen} closeDialog={closeDialog}>
            <div className="foul-dialog-container">
                <div className="foul-dialog-header-container">
                    <p>Foul</p>
                    <button onClick={() => closeDialog({})}>X</button>
                </div>

                <span>Choose offense type: </span>
                <select className="select-foul-type" name="offenseType" onChange={handleChange}>
                    <option value="">--</option>
                    <option value="a">אזהרה</option>
                    <option value="b">נזיפה</option>
                    <option value="c">הרחקה</option>
                </select>

                <p>
                    <span>Choose offender player / coach: </span>
                    <select className="select-player" name="player" onChange={handleChange}>
                        <option value="">--</option>
                        <option value="coach">מאמן</option>
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

export default FoulDialog;

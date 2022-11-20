import './FoulDialog.scss';
import DialogContainer from "../dialog-container";
import { useState } from "react";
import { FOUL_TYPES } from "../../../config/constants";

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
                    <p>עבירה</p>
                    <button onClick={() => closeDialog({})}>X</button>
                </div>

                <select className="select-foul-type" name="offenseType" onChange={handleChange}>
                    <option value="">--</option>
                    <option value="a">{FOUL_TYPES.a}</option>
                    <option value="b">{FOUL_TYPES.b}</option>
                    <option value="c">{FOUL_TYPES.c}</option>
                </select>
                <span>:סוג עבירה</span>

                <p>
                    <select className="select-player" name="player" onChange={handleChange}>
                        <option value="">--</option>
                        <option value="coach">מאמן</option>
                        <option value="3">3</option>
                        <option value="9">9</option>
                        <option value="12">2</option>
                    </select>
                    <span>:מבצע העבירה</span>
                </p>

                <div className="action-container">
                    <button onClick={() => closeDialog(selections)} style={{backgroundColor: teamColor, borderColor: teamColor}}>עדכן</button>
                </div>
            </div>
        </DialogContainer>
    )
}

export default FoulDialog;

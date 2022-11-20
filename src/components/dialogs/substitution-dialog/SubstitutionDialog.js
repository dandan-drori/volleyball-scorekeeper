import './SubstitutionDialog.scss';
import DialogContainer from "../dialog-container";
import { useState } from "react";

function SubstitutionDialog({isOpen, closeDialog, teamColor}) {
    const [selections, setSelections] = useState({
        leaving: '',
        entering: '',
    });
    const [playersOnCourt, setPlayersOnCourt] = useState(['17', '8', '5']);
    const [playersOnBench, setPlayersOnBench] = useState(['3', '9', '12']);

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
                    <p className="substitution-dialog-header">חילוף</p>
                    <button onClick={() => closeDialog({})}>X</button>
                </div>

                <select className="select-leaving" name="leaving" onChange={handleChange}>
                    <option value="">--</option>
                    {playersOnCourt.map((number) => <option key={number} value={number}>{number}</option>)}
                </select>
                <span>:שחקן יוצא</span>

                <p>
                    <select className="select-entering" name="entering" onChange={handleChange}>
                        <option value="">--</option>
                        {playersOnBench.map((number) => <option key={number} value={number}>{number}</option>)}
                    </select>
                    <span>:שחקן נכנס</span>
                </p>

                <div className="action-container">
                    <button onClick={() => closeDialog(selections)} style={{backgroundColor: teamColor, borderColor: teamColor}}>עדכן</button>
                </div>
            </div>
        </DialogContainer>
    )
}

export default SubstitutionDialog;

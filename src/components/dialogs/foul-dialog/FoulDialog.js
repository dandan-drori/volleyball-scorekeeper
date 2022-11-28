import './FoulDialog.scss';
import DialogContainer from "../dialog-container";
import { useState } from "react";
import { FOUL_TYPES } from "../../../config/constants";
import { toast } from "react-toastify";
import ToastMessage from "../../toast-message";
import { useSelector } from "react-redux";

function FoulDialog({isOpen, closeDialog, teamColor, team}) {
    
    const { rotation } = useSelector(({rotation}) => rotation);
    console.log(rotation);
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

    const onEdit = () => {
        closeDialog(selections);
        const message = `A foul has been logged.`;
        const link = `/stats/${team}`;
        toast.success(<ToastMessage message={message} link={link} />, {theme: 'dark', progress: 100});
    }

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
                    <button onClick={onEdit} style={{backgroundColor: teamColor, borderColor: teamColor}}>עדכן</button>
                </div>
            </div>
        </DialogContainer>
    )
}

export default FoulDialog;

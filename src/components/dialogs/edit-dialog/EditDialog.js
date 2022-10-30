import './EditDialog.scss';
import DialogContainer from "../dialog-container";
import { padToTwoDigits } from "../../../services/game.service";

function EditDialog({isOpen, closeDialog, data}) {

    const [hours, minutes] = data.time.split(':');
    const [scoreLeft, scoreRight] = data.score.split(':');
    const hoursOptions = Array.from({length:24},(v,k) => ({value: padToTwoDigits(k), selected: padToTwoDigits(k) === hours}));
    const minutesOptions = Array.from({length:60},(v,k) => ({value: padToTwoDigits(k), selected: padToTwoDigits(k) === minutes}));
    const scoreLeftOptions = Array.from({length:41},(v,k) => ({value: k, selected: (k + '') === scoreLeft}));
    const scoreRightOptions = Array.from({length:41},(v,k) => ({value: k, selected: (k + '') === scoreRight}));


    const getEventFields = (data) => {
        if (data.eventType === 'substitution') {
            const {entering, leaving} = data;
            return <div>
                <p>{entering}</p>
                <p>{leaving}</p>
            </div>
        }
        if (data.eventType === 'foul') {
            const {type, player} = data;
            return <div>
                <p>{type}</p>
                <p>{player}</p>
            </div>
        }
    }


    return (
        <DialogContainer isOpen={isOpen} closeDialog={closeDialog}>
            <div onClick={() => closeDialog({})}>X</div>

            <select>
                {hoursOptions.map(({value, selected}) => {
                    return <option key={value} value={value} selected={selected}>{value}</option>
                })}
            </select>
            <span> : </span>
            <select>
                {minutesOptions.map(({value, selected}) => {
                    return <option key={value} value={value} selected={selected}>{value}</option>
                })}
            </select>

            <select>
                {scoreLeftOptions.map(({value, selected}) => {
                    return <option key={value} value={value} selected={selected}>{value}</option>
                })}
            </select>
            <span> : </span>
            <select>
                {scoreRightOptions.map(({value, selected}) => {
                    return <option key={value} value={value} selected={selected}>{value}</option>
                })}
            </select>

            <div>{JSON.stringify(data)}</div>
        </DialogContainer>
    )
}

export default EditDialog;

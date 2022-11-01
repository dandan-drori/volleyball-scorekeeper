import './EditDialog.scss';
import DialogContainer from "../dialog-container";
import { padToTwoDigits } from "../../../services/game.service";
import { FOUL_TYPES } from "../../../config/constants";
import { useState } from "react";

function EditDialog({isOpen, closeDialog, data}) {

    const [hours, minutes] = data.time.split(':');
    const [scoreLeft, scoreRight] = data.score.split(':');
    const [eventFields, setEventFields] = useState({
        time: {
            hours: hours,
            minutes: minutes,
        },
        score: {
            home: scoreLeft,
            away: scoreRight,
        },
        substitution: {
            entering: data?.entering,
            leaving: data?.leaving,
        },
        foul: {
            type: data?.type,
            player: data?.player,
        }
    });

    const hoursOptions = Array.from({length:24},(v,i) => padToTwoDigits(i));
    const minutesOptions = Array.from({length:60},(v,i) => padToTwoDigits(i));
    const scoreLeftOptions = Array.from({length:41},(v,i) => i);
    const scoreRightOptions = Array.from({length:41},(v,i) => i);
    // todo - get player options from backend
    const playerOptions = ['17', '3', '5', '9'];

    const setEventField = (category, field, value) => {
        setEventFields({...eventFields, [category]: {...eventFields[category], [field]: value}});
    }

    const getDynamicEventFields = () => {
        if (data.eventType === 'substitution') {
            const {entering, leaving} = data;
            return <div>
                <div>
                    <label>
                        שחקן נכנס:
                        <select
                            defaultValue={entering}
                            onChange={(e) => setEventField('substitution', 'entering', e.target.value)}>
                            {playerOptions.map((value) => {
                                return <option key={value} value={value}>{value}</option>
                            })}
                        </select>
                    </label>
                </div>
                <div>
                    <label>
                        שחקן יוצא:
                        <select
                            defaultValue={leaving}
                            onChange={(e) => setEventField('substitution', 'leaving', e.target.value)}>
                            {playerOptions.map((value) => {
                                return <option key={value} value={value}>{value}</option>
                            })}
                        </select>
                    </label>
                </div>
            </div>
        }
        if (data.eventType === 'foul') {
            const {type, player} = data;
            return <div>
                <div>
                    <label>
                        סוג עבירה:
                        <select
                            defaultValue={type}
                            onChange={(e) => setEventField('foul', 'type', e.target.value)}>
                            {Object.entries(FOUL_TYPES).map(([key, value]) => {
                                return <option key={key} value={key}>{value}</option>
                            })}
                        </select>
                    </label>
                </div>
                <div>
                    <label>
                        שחקן:
                        <select
                            defaultValue={player}
                            onChange={(e) => setEventField('foul', 'player', e.target.value)}>
                            {playerOptions.map((value) => {
                                return <option key={value} value={value}>{value}</option>
                            })}
                        </select>
                    </label>
                </div>
            </div>
        }
    }

    const onSubmit = () => {
        const time = [eventFields.time.hours, eventFields.time.minutes].join(':');
        const score = [eventFields.score.home, eventFields.score.away].join(':');
        let newEvent;
        if (!!eventFields.foul.type) {
            const {type, player} = eventFields.foul;
            newEvent = {time, score, type, player};
        } else {
            const {entering, leaving} = eventFields.substitution;
            newEvent = {time, score, entering, leaving};
        }
        closeDialog(newEvent);
    }


    return (
        <DialogContainer isOpen={isOpen} closeDialog={closeDialog}>
            <div className="edit-dialog-container">
                <div>
                    <span onClick={() => closeDialog({})}>X</span>
                </div>

                <div>
                    <label>
                        זמן:
                        <select
                            defaultValue={minutes}
                            onChange={(e) => setEventField('time', 'minutes', e.target.value)}>
                            {minutesOptions.map(value => {
                                return <option key={value} value={value}>{value}</option>
                            })}
                        </select>
                        <span> : </span>
                        <select
                            defaultValue={hours}
                            onChange={(e) => setEventField('time', 'hours', e.target.value)}>
                            {hoursOptions.map(value => {
                                return <option key={value} value={value}>{value}</option>
                            })}
                        </select>
                    </label>
                </div>

                <div>
                    <label>
                        תוצאה:
                        <select
                            defaultValue={scoreRight}
                            onChange={(e) => setEventField('score', 'away', e.target.value)}>
                            {scoreRightOptions.map(value => {
                                return <option key={value} value={value}>{value}</option>
                            })}
                        </select>
                        <span> : </span>
                        <select
                            defaultValue={scoreLeft}
                            onChange={(e) => setEventField('score', 'home', e.target.value)}>
                            {scoreLeftOptions.map(value => {
                                return <option key={value} value={value}>{value}</option>
                            })}
                        </select>
                    </label>
                </div>

                <div>{getDynamicEventFields()}</div>

                <section className="action-container">
                    <button onClick={onSubmit}>Edit</button>
                </section>
            </div>
        </DialogContainer>
    )
}

export default EditDialog;

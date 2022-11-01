import './TeamStats.scss';
import { useParams } from "react-router-dom";
import FoulTable from "../../components/tables/foul";
import TimeoutTable from "../../components/tables/timeout";
import SubstitutionTable from "../../components/tables/substitution";
import { useDispatch, useSelector } from "react-redux";
import { editEvent } from "../../redux/actions";
import { useState } from "react";
import EditDialog from "../../components/dialogs/edit-dialog";

function TeamStats() {
    const { team } = useParams();
    const sets = useSelector((state) => state);
    const dispatch = useDispatch();
    const { fouls, substitutions, timeouts } = sets[sets.length - 1][team];
    const [editDialog, setEditDialog] = useState({isOpen: false, data: null});

    const editEntry = (entry) => {
        setEditDialog({isOpen: true, data: {...entry, team}});
    }

    const closeDialog = (newEvent) => {
        setEditDialog({...editDialog, isOpen: false});
        if (!newEvent || !Object.keys(newEvent).length) {
            return;
        }
        const eventName = newEvent.type ? 'foul' : 'substitution';
        dispatch(editEvent(team, eventName, newEvent));
    }

    return (
        <div className="team-stats-container">
            {editDialog.isOpen && <EditDialog isOpen={editDialog.isOpen} closeDialog={closeDialog} data={editDialog.data}/>}
            <h2>{team}</h2>
            <div className="team-stats-tables-container">
                <FoulTable fouls={fouls} editEntry={editEntry} />
                <SubstitutionTable substitutions={substitutions} editEntry={editEntry} />
                <TimeoutTable timeouts={timeouts} editEntry={editEntry} />
            </div>
        </div>
    )
}

export default TeamStats;

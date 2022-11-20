import './PlayersPosition.scss';
import { useDrop } from "react-dnd";
import { useMemo, useState } from "react";
import { DRAG_TYPES } from "../../config/constants";

function PlayerPosition({position, team, playerNumberPlaced, placedNumber, draggingTeam}) {
    const [droppedNumber, setDroppedNumber] = useState(placedNumber || null);
    const [wrongTeam, setWrongTeam] = useState('');
    const isDragging = useMemo(() => team === draggingTeam, [draggingTeam])

    const [{ isOver }, drop] = useDrop(() => ({
        accept: DRAG_TYPES.POSITION,
        collect: (monitor) => {
            return {
                isOver: monitor.isOver() && monitor.getItem()?.playerTeam === team ? 'hovered' : monitor.isOver() && monitor.getItem()?.playerTeam !== team ? 'hovered-bad' : '',
            }
        },
        drop: ({ number, playerTeam }, monitor) => {
            if (monitor.didDrop()) {
                return;
            }
            if (playerTeam !== team) {
                setWrongTeam('wrong-team');
                setTimeout(() => {
                    setWrongTeam('');
                }, 800);
                return;
            }
            setDroppedNumber(number);
            playerNumberPlaced({team, number, position});
        }
    }));

    return (
        <div className={`position ${droppedNumber ? 'dropped' : ''} ${wrongTeam} ${isOver} ${isDragging ? 'dragging' : ''} `}
             ref={drop}
        >
            {droppedNumber || position}
        </div>
    )
}

export default PlayerPosition;

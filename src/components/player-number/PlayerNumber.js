import './PlayerNumber.scss';
import { useDrag } from "react-dnd";
import { useEffect, useState } from "react";
import DragLayer from "../drag-layer";
import { getEmptyImage } from "react-dnd-html5-backend";
import { DRAG_TYPES } from "../../config/constants";

function PlayerNumber({number, team, onDragStart, onDragEnd}) {
    useEffect(() => {
        dragPreview(getEmptyImage(), { captureDraggingState: true });
    }, []);

    const [{ opacity, isDragging, didDrop }, drag, dragPreview] = useDrag(
        () => ({
            type: DRAG_TYPES.POSITION,
            item: { number, playerTeam: team },
            collect: (monitor) => ({
                opacity: monitor.isDragging() ? 0.5 : 1,
                isDragging: monitor.isDragging(),
                didDrop: monitor.didDrop(),
            }),
        }),
        []
    );
    
    useEffect(() => {
        const func = (isDragging || didDrop) ? onDragStart : onDragEnd;
        func(team)
    }, [isDragging || didDrop])

    return (
        <>
            <DragLayer />
            <div className="player" ref={drag} style={{opacity}}>{number}</div>
        </>
    );
}

export default PlayerNumber;

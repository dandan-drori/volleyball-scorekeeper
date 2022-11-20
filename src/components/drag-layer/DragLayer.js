import { useDragLayer } from "react-dnd";

const layerStyles = {
    position: "fixed",
    pointerEvents: "none",
    zIndex: 100,
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
};

function DragLayer() {
    const {
        item,
        itemType,
        isDragging,
        initialCursorOffset,
        initialFileOffset,
        currentFileOffset,
    } = useDragLayer((monitor) => ({
        item: monitor.getItem(),
        itemType: monitor.getItemType(),
        initialCursorOffset: monitor.getInitialClientOffset(),
        initialFileOffset: monitor.getInitialSourceClientOffset(),
        currentFileOffset: monitor.getSourceClientOffset(),
        isDragging: monitor.isDragging(),
    }));

    if (!isDragging) {
        return null;
    }

    return (
        <div style={layerStyles}>
            <div
                style={getItemStyles(
                    initialCursorOffset,
                    initialFileOffset,
                    currentFileOffset
                )}
            >
                <div>{item.number}</div>
            </div>
        </div>
    );
}

export default DragLayer;

function getItemStyles(initialCursorOffset, initialOffset, currentOffset) {
    if (!initialOffset || !currentOffset || !initialCursorOffset) {
        return {
            display: "none",
        };
    }

    const x = initialCursorOffset?.x + (currentOffset.x - initialOffset.x - 20);
    const y = initialCursorOffset?.y + (currentOffset.y - initialOffset.y - 20);
    const transform = `translate(${x}px, ${y}px)`;

    return {
        transform,
        WebkitTransform: transform,
        width: '30px',
        height: '30px',
        borderRadius: '50%',
        backgroundColor: '#282c34',
        color: '#fefefe',
        margin: "5px",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'move',
        float: 'left',
    };
}

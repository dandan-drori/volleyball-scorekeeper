import './DialogContainer.css';

function DialogContainer({children, isOpen}) {
    return (
        <div className="overlay" style={{display: isOpen ? 'unset' : 'none'}}>
            <div className="dialog-container">
                {children}
            </div>
        </div>
    )
}

export default DialogContainer;

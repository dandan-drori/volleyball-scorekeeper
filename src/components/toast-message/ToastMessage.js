import './ToastMessage.scss';
import { Link } from "react-router-dom";

function ToastMessage({message, link}) {
    return (
        <div className="toast-message-container">
            <p>{message}</p>
            <Link to={link}>Click here to view</Link>
        </div>
    )
}

export default ToastMessage;
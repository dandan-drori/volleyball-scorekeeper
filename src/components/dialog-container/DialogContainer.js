import { useEffect, useRef } from "react";
import './DialogContainer.scss';
import useOutsideClickDetector from "../../hooks/useOutsideClickDetector";

function DialogContainer({children, isOpen, closeDialog}) {
    const wrapperRef = useRef(null);
    const [isComponentVisible] = useOutsideClickDetector(wrapperRef);

    useEffect(() => {
        if (!isComponentVisible) {
            closeDialog({});
        }
    }, [isComponentVisible]);

    if (!isOpen) return;

    return (
        <div className="overlay">
            <div className="dialog-container" ref={wrapperRef}>
                {children}
            </div>
        </div>
    )
}

export default DialogContainer;

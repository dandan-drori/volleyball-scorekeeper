import { useEffect, useState } from "react";

function useOutsideClickDetector(ref) {
    const [isComponentVisible, setIsComponentVisible] = useState(true);

    useEffect(() => {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                setIsComponentVisible(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);

    return [isComponentVisible, setIsComponentVisible];
}

export default useOutsideClickDetector;

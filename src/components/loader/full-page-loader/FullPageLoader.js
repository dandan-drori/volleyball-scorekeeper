import './FullPageLoader.scss';
import { CircularProgress } from "@mui/material";

function FullPageLoader() {
    return (
        <div className="full-page-loader">
            <CircularProgress size={70} />
        </div>
    )
}

export default FullPageLoader;
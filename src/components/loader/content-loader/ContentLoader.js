import './ContentLoader.scss';
import { CircularProgress } from "@mui/material";

function ContentLoader() {
    return (
        <div className="content-loader">
            <CircularProgress size={70} />
        </div>
    )
}

export default ContentLoader;
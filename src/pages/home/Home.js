import './Home.scss';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div className="home">
            <div className="app-name" />
            <div className="actions">
                <Link to="/select-teams">Start Now</Link>
                <Link to="/settings">Settings</Link>
            </div>
        </div>
    )
}

export default Home;

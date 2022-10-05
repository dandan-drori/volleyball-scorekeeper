import './Serve.css';
import { getServingPlayer } from "../../services/game.service";

function Serve({currentSet}) {
    return (
        <p className="serve" style={{[currentSet.homeTeam.isServing ? 'left' : 'right']: '15px'}}>
            Serve:
            <span className="serve-number"> {getServingPlayer(currentSet)}</span>
        </p>
    )
}

export default Serve;

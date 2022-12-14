import './Serve.scss';
import { getServingPlayer } from "../../services/game.service";

function Serve({currentSet}) {
    return (
        <p className="serve" style={{[currentSet.homeTeam.isServing ? 'left' : 'right']: '15px'}}>
            סרב:
            <span className="serve-number"> #{getServingPlayer(currentSet)}</span>
        </p>
    )
}

export default Serve;

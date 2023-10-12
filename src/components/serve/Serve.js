import './Serve.scss';
import { getServingPlayer } from "../../services/game.service";

function Serve({ isHomeTeamServing, currentServingPlayer }) {
    return (
        <p className="serve" style={{[ isHomeTeamServing ? 'left' : 'right' ]: '15px'}}>
            סרב:
            <span className="serve-number"> #{ currentServingPlayer }</span>
        </p>
    )
}

export default Serve;

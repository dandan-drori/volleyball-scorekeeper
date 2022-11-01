import "./Register.scss"
import { useState } from "react"
import PlayerCard from "../../components/player-card/playerCard";
import edenImg from '../../assets/images/eden.jpeg'
import rotemImg from '../../assets/images/rotem.jpeg'
import dandanImg from '../../assets/images/dandan.jpeg'

function Register() {
    // todo - get players list from backend
    const [players, setPlayers] = useState([
        {
            img: rotemImg,
            name: 'רותם ספיבק',
            number: '10',
            isSelected: false
        },
        {
            img: edenImg,
            name: 'עדן אליאל',
            number: '9',
            isSelected: false
        },
        {
            img: dandanImg,
            name: 'דנדן דרורי',
            number: '7',
            isSelected: false
        },
    ]);

    const toggleSelected = (player) => {
        setPlayers(players.map((currPlayer) => {
            if (player.number === currPlayer.number) {
                return {...currPlayer, isSelected: !currPlayer.isSelected}
            }
            return currPlayer
        }))
    }

    return (
        <div className="register-page-container">
            <h2>רישום שחקנים</h2>
            <div className="register-container">
                {players.map((player, idx) => {
                    return <PlayerCard toggleSelected={toggleSelected} key={idx} player={player} />
                })}
            </div>
        </div>)
}

export default Register;

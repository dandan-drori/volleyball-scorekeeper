import { useState } from "react"
import PlayerCard from "../../components/playerCard/playerCard";
import "./Register.scss"
import edenImg from '../../assets/images/eden.jpeg'
import rotemImg from '../../assets/images/rotem.jpeg'
import dandanImg from '../../assets/images/dandan.jpeg'

function Register() {
    const [players, setPlayers] = useState([
        {
            img: rotemImg,
            name: 'Rotem Spivak',
            number: '10',
            isSelected: true
        },
        {
            img: edenImg,
            name: 'Eden Eliel',
            number: '9',
            isSelected: false
        },
        {
            img: dandanImg,
            name: 'Dandan Drori',
            number: '7',
            isSelected: true
        },
        {
            img: dandanImg,
            name: 'Dandan Drori',
            number: '7',
            isSelected: false
        },
        {
            img: dandanImg,
            name: 'Dandan Drori',
            number: '7',
            isSelected: false
        },
        {
            img: dandanImg,
            name: 'Dandan Drori',
            number: '7',
            isSelected: false
        },
    ])
    const toggleSelected = (player) => {
        setPlayers(players.map((currPlayer) => {
            if (player.number === currPlayer.number) {
                return {...currPlayer, isSelected: !currPlayer.isSelected}
            }
            return currPlayer
        }))
        console.log('players', player.isSelected)
    }

    return (
        <div>
            <h1>Register</h1>
            <div className="register-container">
                {players.map((player, idx) => {
                    return <PlayerCard toggleSelected={toggleSelected} key={idx} player={player} />
                })}
            </div>
        </div>)
}

export default Register;

import './playerCard.scss';


function PlayerCard({ player, toggleSelected }) {


    return (
        <div className={player.isSelected ? 'player-container selected' : 'player-container'} onClick={() => toggleSelected(player)}>
            <img className='player-img' src={player.img}></img>
            <div className='name-number-container'>
                <h1 className='player-name'>{player.name}</h1>
                <h1 className='player-number'>{player.number}</h1>
            </div>

        </div>
    )
}

export default PlayerCard;

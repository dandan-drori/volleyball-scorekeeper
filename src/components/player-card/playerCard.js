import './playerCard.scss';


function PlayerCard({ player, toggleSelected }) {
    return (
        <div className={player.isSelected ? 'player-container no-select selected' : 'player-container no-select'} onClick={() => toggleSelected(player)}>
            <div className='name-number-container'>
                <h1 className='player-name'>{player.name}</h1>
                <h1 className='player-number'>#{player.number}</h1>
            </div>
            <img className='player-img' src={player.img} alt="תמונת שחקן" />
        </div>
    )
}

export default PlayerCard;

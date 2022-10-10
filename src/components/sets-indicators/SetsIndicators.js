import './SetsIndicators.scss';

function SetsIndicators({team, sets, homeColor, awayColor}) {
    const maxSets = [1,2,3];
    const isHomeTeam = team === 'homeTeam';
    const styles = {
        transforms: {
            home: 'translateX(calc(-100% - 15px))',
            away: 'translateX(15px)',
        },
        colors: {
            home: homeColor,
            away: awayColor,
        }
    }

    return (
        <div className="sets-indicators-container" style={{transform: isHomeTeam ? styles.transforms.home : styles.transforms.away}}>
            {maxSets.map((set, idx) => {
                return <div key={idx} className="set-circle" style={{backgroundColor: isHomeTeam && set <= sets ? styles.colors.home : !isHomeTeam && set <= sets ? styles.colors.away : ''}} />
            })}
        </div>
    )
}

export default SetsIndicators;

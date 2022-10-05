import "./ActionsMenu.css";
import LeftChevron from "../../assets/images/left-chevron.png";
import TimeLeft from "../../assets/images/time-left.png";
import UpDown from "../../assets/images/up-down.png";
import Cards from "../../assets/images/cards.png";
import { useState } from "react";

function ActionsMenu({team, timeoutClicked, substitutionClicked, foulClicked}) {
    const [isOpen, setIsOpen] = useState(false);
    const isHomeTeam = team === 'homeTeam';
    const stickToSide = isHomeTeam ? 'left' : 'right';
    const transforms = {
        homeTeamAndOpen: 'translateX(350px) rotate(720deg)',
        awayTeamAndOpen: 'translateX(-350px) rotate(-900deg)',
        homeTeamAndNotOpen: 'translateX(0) rotate(-180deg)',
        default: '',
    }

    return (
        <div className="actions-menu-container noSelect" style={{[stickToSide]: '15px'}}>
            <div className={isOpen ? 'actions-menu open' : 'actions-menu'}
                 style={{
                     [!isHomeTeam ? 'right' : '']: '0',
                     flexDirection: isHomeTeam ? 'row-reverse' : 'row'
                 }}>
                <button className="menu-button" onClick={() => foulClicked(team)}>
                    <img src={Cards} alt="עבירה"/>
                </button>
                <button className="menu-button" onClick={() => substitutionClicked(team)}>
                    <img src={UpDown} alt="חילוף"/>
                </button>
                <button className="menu-button" onClick={() => timeoutClicked(team)}>
                    <img src={TimeLeft} alt="פסק זמן"/>
                </button>
            </div>
            <img
                className={isOpen ? 'plus open' : 'plus'}
                style={{
                    [stickToSide]: '0',
                    transform: isHomeTeam && isOpen ? transforms.homeTeamAndOpen :
                    !isHomeTeam && isOpen ? transforms.awayTeamAndOpen :
                    isHomeTeam && !isOpen ? transforms.homeTeamAndNotOpen :
                    transforms.default
                }}
                src={LeftChevron} alt="תפריט"
                onClick={() => setIsOpen(!isOpen)}
            />
        </div>
    )
}

export default ActionsMenu;

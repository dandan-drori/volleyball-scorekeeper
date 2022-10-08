import { useState } from "react";
import "./Board.scss";
import TeamScore from "../../components/teamScore/TeamScore";
import ActionsMenu from "../../components/actionsMenu/ActionsMenu";
import SetsIndicators from "../../components/setsIndicators/SetsIndicators";
import Separator from "../../components/separator/Separator";
import Serve from "../../components/serve/Serve";
import { INITIAL_SET } from "../../config/constants";
import {
    getGameWinner,
    getSetWinner,
    getUpdatedSets,
    getWonSetsByEachTeam,
    rotatePlayers
} from "../../services/game.service";
import SubstitutionDialog from "../../components/substitutionDialog/SubstitutionDialog";
import FoulDialog from "../../components/foulDialog/FoulDialog";

function Board() {
    const [currentSetIdx, setCurrentSetIdx] = useState(0);
    const [sets, setSets] = useState([INITIAL_SET]);
    const [dialogs, setDialogs] = useState({
        substitution: {
            isOpen: false,
            team: '',
        },
        foul: {
            isOpen: false,
            team: '',
        },
    });

    const scoreClicked = (team, score) => {
        if (getGameWinner(sets)) return;
        const currentSet = sets[currentSetIdx];
        const otherTeam = team === 'homeTeam' ? 'awayTeam' : 'homeTeam';
        const newTeam = {...currentSet[team], score, isServing: true};
        const newOtherTeam = {...currentSet[otherTeam], isServing: false};
        const winner = getSetWinner(newTeam, currentSet[otherTeam], currentSetIdx === 4);
        if (winner) {
            if (currentSet.winner) return;
            const newSets = getUpdatedSets(sets, currentSetIdx, team, newTeam, otherTeam, newOtherTeam, winner)
            setSets(newSets);
            moveToNextSet(newSets, winner);
            return;
        }
        if (!currentSet[team].isServing) {
            rotatePlayers(currentSet[team].currentRotation);
        }
        setSets(getUpdatedSets(sets, currentSetIdx, team, newTeam, otherTeam, newOtherTeam, winner));
    }

    const moveToNextSet = (newSets, winner) => {
        if (currentSetIdx === 4) {
            console.log(`The winner is: ${winner}!`);
            return;
        }
        setCurrentSetIdx(currentSetIdx + 1);
        setSets([...newSets, INITIAL_SET]);
    }

    const timeoutClicked = (team) => {
        const otherTeam = team === 'homeTeam' ? 'awayTeam' : 'homeTeam';
        console.log(`Timeout for team ${team}. Current score is: ${sets[currentSetIdx][team].score + ':' + sets[currentSetIdx][otherTeam].score}`);
    }

    const onCloseDialog = (dialogName, data) => {
        const { team } = dialogs[dialogName];
        const otherTeam = team === 'homeTeam' ? 'awayTeam' : 'homeTeam';
        const currentScore = `${sets[currentSetIdx][team].score + ':' + sets[currentSetIdx][otherTeam].score}`
        if (dialogName === 'foul') {
            const {offenseType, player} = data;
            console.log(offenseType, player, team, currentScore);
        }
        if (dialogName === 'substitution') {
            const {entering, leaving} = data;
            console.log(entering, leaving, team, currentScore);
        }
        toggleDialog(dialogName);
    }

    const toggleDialog = (dialogName, team) => {
        if (team) {
            setDialogs({...dialogs, [dialogName]: {isOpen: !dialogs[dialogName].isOpen, team}});
            return;
        }
        setDialogs({...dialogs, [dialogName]: {...dialogs[dialogName], isOpen: !dialogs[dialogName].isOpen}});
    }

    return (
        <div className="board">
            {
                dialogs.substitution.isOpen && <SubstitutionDialog isOpen={dialogs.substitution.isOpen}
                                                                   closeDialog={(data) => onCloseDialog('substitution', data)}
                                                                   teamColor={sets[currentSetIdx][dialogs.substitution.team].color}
                />
            }
            {
                dialogs.foul.isOpen && <FoulDialog isOpen={dialogs.foul.isOpen}
                                                   closeDialog={(data) => onCloseDialog('foul', data)}
                                                   teamColor={sets[currentSetIdx][dialogs.foul.team].color}
                />
            }
            <Serve currentSet={sets[currentSetIdx]}/>
            <SetsIndicators team="homeTeam"
                            sets={getWonSetsByEachTeam(sets).homeTeam}
                            homeColor={sets[currentSetIdx].homeTeam.color}
                            awayColor={sets[currentSetIdx].awayTeam.color}
            />
            <SetsIndicators team="awayTeam"
                            sets={getWonSetsByEachTeam(sets).awayTeam}
                            homeColor={sets[currentSetIdx].homeTeam.color}
                            awayColor={sets[currentSetIdx].awayTeam.color}
            />
            <TeamScore team="homeTeam"
                       score={sets[currentSetIdx].homeTeam.score}
                       color={sets[currentSetIdx].homeTeam.color}
                       scoreClicked={scoreClicked}
            />
            <Separator />
            <TeamScore team="awayTeam"
                       score={sets[currentSetIdx].awayTeam.score}
                       color={sets[currentSetIdx].awayTeam.color}
                       scoreClicked={scoreClicked}
            />
            <ActionsMenu team="homeTeam"
                         timeoutClicked={timeoutClicked}
                         substitutionClicked={(team) => toggleDialog('substitution', team)}
                         foulClicked={(team) => toggleDialog('foul', team)}
            />
            <ActionsMenu team="awayTeam"
                         timeoutClicked={timeoutClicked}
                         substitutionClicked={(team) => toggleDialog('substitution', team)}
                         foulClicked={(team) => toggleDialog('foul', team)}
            />
        </div>
    )
}

export default Board;

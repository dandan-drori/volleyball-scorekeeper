import { useState } from "react";
import "./Board.css";
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

    const substitutionClicked = (team) => {
        const otherTeam = team === 'homeTeam' ? 'awayTeam' : 'homeTeam';
        console.log(`Substitution for team ${team}. Current score is: ${sets[currentSetIdx][team].score + ':' + sets[currentSetIdx][otherTeam].score}`);
        // todo - need to get numbers of leaving player and entering player
        setDialogs({...dialogs, substitution: {isOpen: true, team}});
    }

    const foulClicked = (team) => {
        const otherTeam = team === 'homeTeam' ? 'awayTeam' : 'homeTeam';
        console.log(`Foul called for team ${team}. Current score is: ${sets[currentSetIdx][team].score + ':' + sets[currentSetIdx][otherTeam].score}`);
        // todo - need to get type of foul, and number of player
    }

    return (
        <div className="board">
            <SubstitutionDialog isOpen={dialogs.substitution.isOpen} closeDialog={() => {setDialogs({...dialogs, substitution: {...dialogs.substitution, isOpen: false}})}} />
            <Serve currentSet={sets[currentSetIdx]}/>
            <SetsIndicators team="homeTeam" sets={getWonSetsByEachTeam(sets).homeTeam} homeColor={sets[currentSetIdx].homeTeam.color} awayColor={sets[currentSetIdx].awayTeam.color} />
            <SetsIndicators team="awayTeam" sets={getWonSetsByEachTeam(sets).awayTeam} homeColor={sets[currentSetIdx].homeTeam.color} awayColor={sets[currentSetIdx].awayTeam.color} />
            <TeamScore score={sets[currentSetIdx].homeTeam.score} team="homeTeam" color={sets[currentSetIdx].homeTeam.color} scoreClicked={scoreClicked} />
            <Separator />
            <TeamScore score={sets[currentSetIdx].awayTeam.score} team="awayTeam" color={sets[currentSetIdx].awayTeam.color} scoreClicked={scoreClicked} />
            <ActionsMenu team="homeTeam" timeoutClicked={timeoutClicked} substitutionClicked={substitutionClicked} foulClicked={foulClicked} />
            <ActionsMenu team="awayTeam" timeoutClicked={timeoutClicked} substitutionClicked={substitutionClicked} foulClicked={foulClicked} />
        </div>
    )
}

export default Board;

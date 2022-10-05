import { useState } from "react";
import "./Board.css";
import TeamScore from "../../components/teamScore/TeamScore";
import ActionsMenu from "../../components/actionsMenu/ActionsMenu";
import { getSetWinner, getWonSetsByEachTeam, rotatePlayers } from "../../services/game.service";
import SetsIndicators from "../../components/setsIndicators/SetsIndicators";
import Separator from "../../components/separator/Separator";
import Serve from "../../components/serve/Serve";
import { INITIAL_SET } from "../../config/constants";

function Board() {
    const [currentSetIdx, setCurrentSetIdx] = useState(0);
    const [sets, setSets] = useState([INITIAL_SET]);

    const scoreClicked = (team, score) => {
        console.log(sets);
        const currentSet = sets[currentSetIdx];
        const otherTeam = team === 'homeTeam' ? 'awayTeam' : 'homeTeam';
        const newTeam = {...currentSet[team], score, isServing: true};
        const newOtherTeam = {...currentSet[otherTeam], isServing: false};
        const winner = getSetWinner(newTeam, currentSet[otherTeam], currentSetIdx === 4);
        if (winner) {
            if (currentSet.winner) {
                return;
            }
            setSets(sets.map((set, idx) => {
                if (idx === currentSetIdx) {
                    // fixme - not updating to 25 points after a set ends
                    // fixme - winner is not being set
                    return {[team]: newTeam, [otherTeam]: newOtherTeam, winner: winner};
                }
                return set;
            }));
            if (currentSetIdx === 4) {
                console.log(`The winner is: ${winner}!`);
                return
            }
            moveToNextSet();
            return;
        }
        if (!currentSet[team].isServing) {
            rotatePlayers(currentSet[team].currentRotation);
        }
        setSets(sets.map((set, idx) => {
            if (idx === currentSetIdx) {
                return {...currentSet, [team]: newTeam, [otherTeam]: newOtherTeam};
            }
            return set;
        }));
    }

    const moveToNextSet = () => {
        setCurrentSetIdx(currentSetIdx + 1);
        setSets([...sets, INITIAL_SET]);
    }

    const timeoutClicked = (team) => {
        const otherTeam = team === 'homeTeam' ? 'awayTeam' : 'homeTeam';
        console.log(`Timeout for team ${team}. Current score is: ${sets[currentSetIdx][team].score + ':' + sets[currentSetIdx][otherTeam].score}`);
    }

    const substitutionClicked = (team) => {
        const otherTeam = team === 'homeTeam' ? 'awayTeam' : 'homeTeam';
        console.log(`Substitution for team ${team}. Current score is: ${sets[currentSetIdx][team].score + ':' + sets[currentSetIdx][otherTeam].score}`);
        // todo - need to get numbers of leaving player and entering player
    }

    const foulClicked = (team) => {
        const otherTeam = team === 'homeTeam' ? 'awayTeam' : 'homeTeam';
        console.log(`Foul called for team ${team}. Current score is: ${sets[currentSetIdx][team].score + ':' + sets[currentSetIdx][otherTeam].score}`);
        // todo - need to get type of foul, and number of player
    }

    return (
        <div className="board">
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

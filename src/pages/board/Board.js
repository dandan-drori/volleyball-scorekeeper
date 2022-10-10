import { useEffect, useState } from "react";
import "./Board.scss";
import TeamScore from "../../components/team-score";
import ActionsMenu from "../../components/actions-menu";
import SetsIndicators from "../../components/sets-indicators";
import Separator from "../../components/separator";
import Serve from "../../components/serve";
import SubstitutionDialog from "../../components/substitution-dialog";
import FoulDialog from "../../components/foul-dialog";
import NextSetDialog from "../../components/next-set-dialog";
import { DIALOGS_STATE, SET } from "../../config/constants";
import {
    getGameWinner,
    getSetWinner,
    getUpdatedSets,
    getWonSetsByEachTeam,
    rotatePlayers
} from "../../services/game.service";

function Board() {
    const [currentSetIdx, setCurrentSetIdx] = useState(0);
    const [sets, setSets] = useState([SET]);
    const [dialogs, setDialogs] = useState(DIALOGS_STATE);

    useEffect(() => {
        const newSets = sets.map((set, idx) => {
            if (idx === currentSetIdx) {
                return {...sets[currentSetIdx], timestamps: {...sets[currentSetIdx].timestamps, start: Date.now()}};
            }
            return set;
        });
        setSets(newSets);
    }, []);

    const scoreClicked = (team, score) => {
        const isRightClick = score < sets[currentSetIdx][team].score;
        if (score < 0) return;
        if (getGameWinner(sets)) return;
        const currentSet = sets[currentSetIdx];
        const otherTeam = team === 'homeTeam' ? 'awayTeam' : 'homeTeam';
        const newTeam = isRightClick ? {...currentSet[team], score} : {...currentSet[team], score, isServing: true};
        const newOtherTeam = isRightClick ? {...currentSet[otherTeam]} : {...currentSet[otherTeam], isServing: false};
        const winner = getSetWinner(newTeam, currentSet[otherTeam], currentSetIdx === 4);
        if (winner) {
            if (currentSet.winner) {
                toggleDialog('nextSet');
                return;
            }
            const updatedSets = getUpdatedSets(sets, currentSetIdx, team, newTeam, otherTeam, newOtherTeam, winner);
            const newSets = updatedSets.map((set, idx) => {
                if (idx === currentSetIdx) {
                    return {...set, timestamps: {...sets[currentSetIdx].timestamps, end: Date.now()}};
                }
                return set;
            });
            setSets(newSets);
            toggleDialog('nextSet');
            return;
        }
        if (!currentSet[team].isServing) {
            newTeam.currentRotation = rotatePlayers(currentSet[team].currentRotation);
        }
        const newSets = getUpdatedSets(sets, currentSetIdx, team, newTeam, otherTeam, newOtherTeam, winner);
        setSets(newSets);
    }

    const moveToNextSet = (newSets, winner) => {
        if (currentSetIdx === 4) {
            console.log(`The winner is: ${winner}!`);
            return;
        }
        setCurrentSetIdx(currentSetIdx + 1);
        setSets([...newSets, SET]);
    }

    const timeoutClicked = (team) => {
        const otherTeam = team === 'homeTeam' ? 'awayTeam' : 'homeTeam';
        console.log(`Timeout for team ${team}. Current score is: ${sets[currentSetIdx][team].score + ':' + sets[currentSetIdx][otherTeam].score}`);
    }

    const onCloseDialog = (dialogName, data) => {
        let { team } = dialogs[dialogName];
        team = team || 'homeTeam';
        const otherTeam = team === 'awayTeam' ? 'homeTeam' : 'awayTeam';
        const currentScore = `${sets[currentSetIdx][team].score + ':' + sets[currentSetIdx][otherTeam].score}`;
        switch (dialogName) {
            case 'foul':
                const {offenseType, player} = data;
                if (!offenseType || !player) {
                    toggleDialog(dialogName);
                    return;
                }
                console.log(offenseType, player, team, currentScore);
                break;
            case 'substitution':
                const {entering, leaving} = data;
                if (!entering || !leaving) {
                    toggleDialog(dialogName);
                    return;
                }
                console.log(entering, leaving, team, currentScore);
                break;
            case 'nextSet':
                const { next } = data;
                if (next) {
                    moveToNextSet(sets, sets[currentSetIdx.winner]);
                }
                break;
            default:
                break;
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
            {
                dialogs.nextSet.isOpen && <NextSetDialog isOpen={dialogs.nextSet.isOpen}
                                                         closeDialog={(data) => onCloseDialog('nextSet', data)}
                                                         currentSet={sets[currentSetIdx]}
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

import { useEffect, useState } from "react";
import "./Board.scss";
import TeamScore from "../../components/team-score";
import ActionsMenu from "../../components/actions-menu";
import SetsIndicators from "../../components/sets-indicators";
import Separator from "../../components/separator";
import Serve from "../../components/serve";
import SubstitutionDialog from "../../components/dialogs/substitution-dialog";
import FoulDialog from "../../components/dialogs/foul-dialog";
import NextSetDialog from "../../components/dialogs/next-set-dialog";
import { DIALOGS_STATE, SET } from "../../config/constants";
import {
    getCurrentTime,
    getGameWinner, getMatchSummary, getServingPlayer,
    getSetWinner,
    getWonSetsByEachTeam,
    rotatePlayers
} from "../../services/game.service";
import { useDispatch, useSelector } from "react-redux";
import {
    addEvent,
    addSet,
    changeScore,
    rotatePlayersAction,
    setTimestamp,
    setWinner,
    toggleServing, updateScoreServingPlayers
} from "../../redux/actions";
import { useMutation } from "@apollo/client";
import { GIVE_POINT_BY_TEAM_NAME } from "../../qraphql/mutations/sets";
import { toast } from "react-toastify";
import ToastMessage from "../../components/toast-message";

function Board() {
    const sets = useSelector(({sets}) => sets);
    const [dialogs, setDialogs] = useState(DIALOGS_STATE);
    const [currentServingPlayer, setCurrentServingPlayer] = useState(getServingPlayer(sets[sets.length - 1]));

    const dispatch = useDispatch();

    const [givePointMutation, { data2, loading2, error2 }] = useMutation(GIVE_POINT_BY_TEAM_NAME);

    useEffect(() => {
        dispatch(setTimestamp('start'));
    }, [sets.length]);

    const givePoint = async (gameSetId, teamId) => {
        try {
            const options = { variables: { gameSetId, teamId } };
            const res = await givePointMutation(options);
            console.log(res);
        } catch (err) {
            // console.log(err);
        }
    }

    const scoreClicked = async (team, score) => {
        console.log(sets);
        const isRightClick = score < sets[sets.length - 1][team].score;
        if (score < 0) return;
        if (getGameWinner(sets)) {
            console.log(sets);
            return;
        }
        const currentSet = sets[sets.length - 1];

        // if scoring team is not serving, rotate players
        if (!currentSet[team].isServing) {
            const currentServingPlayer = getServingPlayer(currentSet);
            setCurrentServingPlayer(currentServingPlayer);
        }

        const otherTeam = team === 'homeTeam' ? 'awayTeam' : 'homeTeam';

        const winner = getSetWinner({name: team, score}, currentSet[otherTeam], sets.length === 5);
        const servingPlayer = getServingPlayer(currentSet);
        if (winner) {
            if (currentSet.winner) {
                toggleDialog('nextSet');
                return;
            }
            // before displaying dialog, update score and winner
            const diff = isRightClick ? -1 : 1;
            dispatch(changeScore(team, diff));
            dispatch(updateScoreServingPlayers(team, servingPlayer));
            dispatch(setWinner(winner));
            dispatch(setTimestamp('end'));
            toggleDialog('nextSet');
            return;
        }
        if (!currentSet[team].isServing) {
            const updatedRotation = rotatePlayers(currentSet[team].currentRotation);
            dispatch(rotatePlayersAction(team, updatedRotation));
        }
        dispatch(setWinner(winner));

        const diff = isRightClick ? -1 : 1;
        dispatch(changeScore(team, diff));
        dispatch(updateScoreServingPlayers(team, servingPlayer));

        if (!isRightClick) {
            dispatch(toggleServing(team));
            await givePoint("fa612d3e-249c-4028-9d68-0d173b2cd97a", '1');
        }
    }

    const moveToNextSet = (winner) => {
        if (getGameWinner(sets)) {
            console.log(`The winner is: ${winner}!`);
            const matchSummary = getMatchSummary(sets);
            console.log(matchSummary);
            return;
        }
        dispatch(addSet(SET));
    }

    const timeoutClicked = (team) => {
        const otherTeam = team === 'homeTeam' ? 'awayTeam' : 'homeTeam';
        const score = `${sets[sets.length - 1][team].score + ':' + sets[sets.length - 1][otherTeam].score}`;
        const time = getCurrentTime();
        const timeout = {team, score, time};
        dispatch(addEvent(team, 'timeout', timeout));
    }

    const onCloseDialog = (dialogName, data) => {
        let { team } = dialogs[dialogName];
        team = team || 'homeTeam';
        const otherTeam = team === 'awayTeam' ? 'homeTeam' : 'awayTeam';
        const score = `${sets[sets.length - 1][team].score + ':' + sets[sets.length - 1][otherTeam].score}`;
        const time = getCurrentTime();
        switch (dialogName) {
            case 'foul':
                const {offenseType, player} = data;
                if (!offenseType || !player) {
                    toggleDialog(dialogName);
                    return;
                }
                const foul = {team, type: offenseType, player, score, time};
                dispatch(addEvent(team, 'foul', foul));
                break;
            case 'substitution':
                const {entering, leaving} = data;
                if (!entering || !leaving) {
                    toggleDialog(dialogName);
                    return;
                }
                const substitution = {team, entering, leaving, score, time};
                dispatch(addEvent(team, 'substitution', substitution));
                break;
            case 'nextSet':
                const { next } = data;
                if (next) {
                    moveToNextSet(sets[sets.length - 1].winner);
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
                                                                   teamColor={sets[sets.length - 1][dialogs.substitution.team].color}
                                                                   team={dialogs.substitution.team}
                />
            }
            {
                dialogs.foul.isOpen && <FoulDialog isOpen={dialogs.foul.isOpen}
                                                   closeDialog={(data) => onCloseDialog('foul', data)}
                                                   teamColor={sets[sets.length - 1][dialogs.foul.team].color}
                                                   team={dialogs.foul.team}
                />
            }
            {
                dialogs.nextSet.isOpen && <NextSetDialog isOpen={dialogs.nextSet.isOpen}
                                                         closeDialog={(data) => onCloseDialog('nextSet', data)}
                                                         currentSet={sets[sets.length - 1]}
                />
            }
            <Serve isHomeTeamServing={sets[sets.length - 1].homeTeam.isServing} currentServingPlayer={currentServingPlayer}/>
            {/*<TeamName />*/}
            {/*<TeamName />*/}
            <SetsIndicators team="homeTeam"
                            sets={getWonSetsByEachTeam(sets).homeTeam}
                            homeColor={sets[sets.length - 1].homeTeam.color}
                            awayColor={sets[sets.length - 1].awayTeam.color}
            />
            <SetsIndicators team="awayTeam"
                            sets={getWonSetsByEachTeam(sets).awayTeam}
                            homeColor={sets[sets.length - 1].homeTeam.color}
                            awayColor={sets[sets.length - 1].awayTeam.color}
            />
            <TeamScore team="homeTeam"
                       score={sets[sets.length - 1].homeTeam.score}
                       color={sets[sets.length - 1].homeTeam.color}
                       scoreClicked={scoreClicked}
            />
            <Separator />
            <TeamScore team="awayTeam"
                       score={sets[sets.length - 1].awayTeam.score}
                       color={sets[sets.length - 1].awayTeam.color}
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

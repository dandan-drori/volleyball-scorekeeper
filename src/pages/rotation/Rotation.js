import './Rotation.scss';
import PlayerPosition from "../../components/player-position";
import PlayerNumber from "../../components/player-number";
import { useDispatch, useSelector } from "react-redux";
import { addPlayer, setGameId } from "../../redux/actions";
import { isPositionsFull } from "../../services/rotation.service";
import { useHistory } from "react-router-dom";
import Info from '../../assets/images/info.png';
import { useState } from "react";
import { useMutation, useQuery } from '@apollo/client';
import {
    GET_GAMES,
    GET_TEAMS_SCORE_BY_SET_ID,
    GET_TEAMS,
} from "../../qraphql/queries/rotation";
import { START_GAME } from "../../qraphql/mutations/sets";

function Rotation() {
    const [ draggingTeam, setDraggingTeam ] = useState(undefined);
    const { availablePlayers, rotation } = useSelector(({rotation}) => rotation);
    const teams = useSelector(({team}) => team);

    const [startGameMutation, { startGameResponse, startGameLoading, startGameError }] = useMutation(START_GAME);

    const dispatch = useDispatch();
    const history = useHistory();

    const playerNumberPlaced = ({team, number, position}) => {
        dispatch(addPlayer(team, number, position));
    }
    
    const startGame = async () => {
        const startGameMutationResponse = await startGameMutation({
            variables: {
                homeTeamId: '1',
                guestTeamId: '2', 
            }
        });
        const gameId = startGameMutationResponse?.data?.startGame?.id;
        dispatch(setGameId(gameId));
        history.push('/board');
    }

    return (
        <div className="rotation-container">
            <h2>מיקום שחקנים</h2>
            <div className="teams-names">
                <h4>{teams[0]}</h4>
                <h4>{teams[1]}</h4>
            </div>
            <div className="flex-wrapper">
                <div className="players">
                    <div className="left">
                        {
                            availablePlayers.homeTeam
                                .map((number) => <PlayerNumber key={number}
                                                               number={number}
                                                               team="homeTeam"
                                                               onDragStart={(team) => setDraggingTeam(team)}
                                                               onDragEnd={() => setDraggingTeam(undefined)}
                                />)
                        }
                    </div>
                </div>
                <div className="court">
                    <div className="left">
                        {
                            rotation.homeTeam
                                .map((_, idx) => <PlayerPosition key={idx} 
                                                                 position={idx + 1} 
                                                                 team="homeTeam" 
                                                                 playerNumberPlaced={playerNumberPlaced} 
                                                                 placedNumber={rotation.homeTeam[idx]} 
                                                                 draggingTeam={draggingTeam}
                                />)
                        }
                    </div>
                    <div className="right">
                        {
                            rotation.awayTeam
                                .map((_, idx) => <PlayerPosition key={idx}
                                                                 position={idx + 1} 
                                                                 team="awayTeam" 
                                                                 playerNumberPlaced={playerNumberPlaced} 
                                                                 placedNumber={rotation.awayTeam[idx]} 
                                                                 draggingTeam={draggingTeam}
                                />)
                        }
                    </div>
                </div>
                <div className="players">
                    <div className="right">
                        {availablePlayers.awayTeam
                            .map((number) => <PlayerNumber key={number} 
                                                           number={number} 
                                                           team="awayTeam" 
                                                           onDragStart={(team) => setDraggingTeam(team)} 
                                                           onDragEnd={() => setDraggingTeam(undefined)}
                            />)
                        }
                    </div>
                </div>
            </div>
            <div className="action">
                {
                    isPositionsFull(rotation) ?
                        <button className="submit" onClick={startGame}>התחל מערכה</button> : 
                        <p className="help">מקם את כל השחקנים בעמדות שלהם כדי להתחיל<img className='info' src={Info} alt="info"/></p>
                }
            </div>
        </div>
    )
}

export default Rotation;

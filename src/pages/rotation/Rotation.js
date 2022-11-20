import './Rotation.scss';
import PlayerPosition from "../../components/player-position";
import PlayerNumber from "../../components/player-number";
import { useDispatch, useSelector } from "react-redux";
import { setAvailablePlayers } from "../../redux/actions";
import { isPositionsFull } from "../../services/rotation.service";
import { useHistory } from "react-router-dom";
import Info from '../../assets/images/info.png';
import { useState } from "react";
import { useMutation, useQuery } from '@apollo/client';
import {
    GET_GAMES,
    GET_TEAMS_SCORE_BY_SET_ID,
    GET_SET_ID,
    GET_SETS_BY_GAME_ID,
    GET_TEAMS, GET_TEAMS_NAMES,
} from "../../qraphql/queries/rotation";
import { GIVE_POINT_BY_TEAM_NAME, START_GAME } from "../../qraphql/mutations/sets";

function Rotation() {
    const [ draggingTeam, setDraggingTeam ] = useState(undefined);
    // todo - get from backend
    const { availablePlayers, rotation } = useSelector(({rotation}) => rotation);
    const sets = useSelector(({sets}) => sets);
    const names = sets[sets.length - 1].teams.map(({name}) => name);
    // const { loading, error, data } = useQuery(GET_TEAMS_SCORE_BY_SET_ID, {
    //     variables: { id: 'fce7ae52-e2d5-4c7e-a9b6-ecf1ca4aa674', isHomeTeam: false }
    // });

    const { loading, error, data } = useQuery(GET_TEAMS_NAMES);

    const [startGameMutation, { startGameResponse, startGameLoading, startGameError }] = useMutation(START_GAME);

    // game - 27ef8d49-fd35-4423-9303-2e1c13c501f6
    // set - fce7ae52-e2d5-4c7e-a9b6-ecf1ca4aa674

    const dispatch = useDispatch();
    const history = useHistory();

    const playerNumberPlaced = ({team, number, position}) => {
        dispatch(setAvailablePlayers(team, number, position));
    }
    
    const startGame = async () => {
        const res = await startGameMutation({
            variables: {
                homeTeamId: '1',
                guestTeamId: '2', 
                homeRotation: rotation.homeTeam, 
                guestRotation: rotation.awayTeam
            }
        });
        console.log(res);
        history.push('/board');
    }

    return (
        <div className="rotation-container">
            <h2>מיקום שחקנים</h2>
            <div className="teams-names">
                <h4>{names[0]}</h4>
                <h4>{names[1]}</h4>
            </div>
            <div className="flex-wrapper">
                <div className="players">
                    <div className="left">
                        {
                            availablePlayers.homeTeam.map((number) => <PlayerNumber key={number}
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
                        {availablePlayers.awayTeam.map((number) => <PlayerNumber key={number} 
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

import "./Register.scss"
import { useEffect, useMemo, useState } from "react"
import PlayerCard from "../../components/player-card/playerCard";
import { useDispatch } from "react-redux";
import { countSelectedPlayers } from "../../services/player.service";
import { setAvailablePlayers, setPlayersStatus } from "../../redux/actions";
import { useHistory, useLocation } from "react-router-dom";
import { MINIMUM_REQUIRED_PLAYERS } from "../../config/constants";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ALL_PLAYERS } from "../../qraphql/queries/player";
import ContentLoader from "../../components/loader/content-loader";
import { SET_TEAMS } from "../../qraphql/mutations/player";

function Register() {
    const { search } = useLocation();
    const searchParams = useMemo(() => new URLSearchParams(search), [search]);
    const year = searchParams.get('year');
    const teamId = searchParams.get('teamId');
    const homeTeamId = searchParams.get('homeTeamId');
    const guestTeamId = searchParams.get('guestTeamId');

    const [players, setPlayers] = useState([]);
    const dispatch = useDispatch();
    const history = useHistory();
    
    const {data: allPlayers, loading: allPlayersLoading, error: allPlayersError} = useQuery(GET_ALL_PLAYERS, {
        variables: {
            teamId: teamId,
            year: +year,
        }
    });
    
    const [setTeams, {data: setTeamsResponse, loading: setTeamsLoading, error: setTeamsError}] = useMutation(SET_TEAMS, {
        variables: {
            homeTeamId: '',
            guestTeamId: '',
            homeTeamPlayersIds: [''],
            guestTeamPlayersIds: [''],
        }
    });
    
    useEffect(() => {
        console.log(allPlayers);
        if (!allPlayers?.allPlayers) return;
        setPlayers(allPlayers?.allPlayers?.map(({id, picture, name, number}) => {
            return {
                id,
                img: picture,
                name,
                number,
                isSelected: false
            }
        }))
    }, [allPlayers?.allPlayers]);
    
    if (allPlayersError) {
        console.log(allPlayersError);
    }

    const toggleSelected = (player) => {
        setPlayers(players.map((currPlayer) => {
            if (player.id === currPlayer.id) {
                return {...currPlayer, isSelected: !currPlayer.isSelected}
            }
            return currPlayer
        }))
    }

    const onDone = () => {
        if (countSelectedPlayers(players) < MINIMUM_REQUIRED_PLAYERS) {
            return;
        }
        dispatch(setPlayersStatus(players));
        const temp = [];
        const availablePlayers = players
            .filter(({isSelected}) => isSelected)
            .map(({name, number}) => {
                const [firstName, lastName] = name.split(' ');
                const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`;
                if (temp.includes(initials)) {
                    return `${firstName.charAt(0)}${firstName.charAt(1)}.${lastName.charAt(0)}${lastName.charAt(1)}`;
                }
                if (temp.includes(number)) {
                    temp.push(initials);
                    return initials;
                }
                temp.push(number);
                return number;
            });
        const team = teamId === guestTeamId ? 'awayTeam' : 'homeTeam';
        dispatch(setAvailablePlayers(team, availablePlayers));
        
        if (teamId === guestTeamId) {
            history.push('/rotation');
            return;
        }
        history.push(`/register?teamId=${guestTeamId}&homeTeamId=${homeTeamId}&guestTeamId=${guestTeamId}&year=${year}`);
    }

    return (
        <div className="register-page-container">
            <div className="register-page-flex-container">
                <h2>רישום שחקנים</h2>
                {
                    allPlayersLoading ? 
                        <ContentLoader /> :
                        <div className="register-container">
                            {players.map((player) => {
                                return <PlayerCard toggleSelected={toggleSelected} key={player.id} player={player} />
                            })}
                        </div>
                }
            </div>
            {
                countSelectedPlayers(players) < MINIMUM_REQUIRED_PLAYERS ?
                    <p className="help">בחר לפחות {MINIMUM_REQUIRED_PLAYERS} שחקנים כדי להמשיך</p> :
                    <button onClick={onDone}>הבא</button>
            }
        </div>)
}

export default Register;
import './SelectTeams.scss';
import { CircularProgress, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useLazyQuery } from "@apollo/client";
import { GET_ALL_TEAMS } from "../../qraphql/queries/player";
import { useEffect, useMemo, useState } from "react";
import { getSeasonYear } from "../../services/player.service";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setTeamName } from "../../redux/actions";
import { useDispatch } from "react-redux";

function SelectTeams({ leagueId, selectedTeamIds, setSelectedTeamIds }) {
    const seasonYear = useMemo(getSeasonYear, []);
    const [firstTeamId, setFirstTeamId] = useState('');
    const [secondTeamId, setSecondTeamId] = useState('');
    
    const [getAllTeams, {data: allTeamsResponse, loading: allTeamsLoading, error: allTeamsError}] = useLazyQuery(GET_ALL_TEAMS);
    
    const dispatch = useDispatch();

    useEffect(() => {
        if (leagueId) {
            getAllTeams({
                variables: {
                    leagueId,
                    year: seasonYear,
                }
            });
        }
    }, [leagueId]);
    
    if (!leagueId) {
        return <div>בחר ליגה כדי להמשיך</div>
    }
    
    const handleChange = ({ target }, setTeamId, key) => {
        const { value } = target;
        setTeamId(value);
        setSelectedTeamIds({...selectedTeamIds, [key]: value});
        const team = key === 'firstTeamId' ? 'homeTeam' : 'awayTeam';
        const { name } = allTeamsResponse?.allTeams?.find(({id}) => id === value);
        dispatch(setTeamName(team, name));
    }
    
    if (allTeamsLoading) {
        return <CircularProgress />;
    }
    
    if (allTeamsError) {
        toast.error(allTeamsError.message, {theme: 'dark'});
        return <ToastContainer />
    }

    return (
        <div className="select-teams">
            <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
                <InputLabel id="team-select-label-1">קבוצה מארחת</InputLabel>
                <Select
                    labelId="team-select-label-1"
                    id="team-select-1"
                    value={firstTeamId}
                    label="Team"
                    onChange={(e) => handleChange(e, setFirstTeamId, 'firstTeamId')}
                >
                    {
                        allTeamsResponse?.allTeams
                            .filter(item => item.id !== secondTeamId)
                            .sort((a, b) => a.name > b.name ? 1 : a.name < b.name ? -1 : 0)
                            .map(({id, name}) => <MenuItem key={id} value={id}>{name}</MenuItem>)
                    }
                </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
                <InputLabel id="team-select-label-2">קבוצה אורחת</InputLabel>
                <Select
                    labelId="team-select-label-2"
                    id="team-select-2"
                    value={secondTeamId}
                    label="Team"
                    onChange={(e) => handleChange(e, setSecondTeamId, 'secondTeamId')}
                >
                    {
                        allTeamsResponse?.allTeams
                            .filter(item => item.id !== firstTeamId)
                            .sort((a, b) => a.name > b.name ? 1 : a.name < b.name ? -1 : 0)
                            .map(({id, name}) => <MenuItem key={id} value={id}>{name}</MenuItem>)
                    }
                </Select>
            </FormControl>
        </div>
    )
}

export default SelectTeams;
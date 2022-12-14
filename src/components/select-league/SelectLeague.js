import './SelectLeague.scss';
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useQuery } from "@apollo/client";
import { GET_ALL_LEAGUES } from "../../qraphql/queries/player";
import { useMemo, useState } from "react";
import { getSeasonYear } from "../../services/player.service";
import FullPageLoader from "../loader/full-page-loader";

function SelectLeague({ setLeagueId }) {
    const seasonYear = useMemo(getSeasonYear, []);
    const [selectedLeagueId, setSelectedLeagueId] = useState('');

    const {data: allLeaguesResponse, loading: allLeaguesLoading, error: allLeaguesError} = useQuery(GET_ALL_LEAGUES, {
        variables: {
            year: seasonYear,
        }
    });
    
    const handleChange = ({ target }) => {
        const { value } = target;
        setSelectedLeagueId(value);
        setLeagueId(value + '');
    }

    
    if (allLeaguesLoading) {
        return <FullPageLoader />;
    }
    
    if (allLeaguesError) {
        console.log(allLeaguesError);
    }
    
    return (
        <div className="select-league">
            <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
                <InputLabel id="demo-simple-select-label">ליגה</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectedLeagueId}
                    label="League"
                    onChange={handleChange}
                >
                    {
                        [...allLeaguesResponse?.allLeagues]
                            .sort((a, b) => a.name > b.name ? 1 : a.name < b.name ? -1 : 0)
                            .map(({id, name}) => <MenuItem key={id} value={id}>{name}</MenuItem>)
                    }
                </Select>
            </FormControl>
        </div>
    )
}

export default SelectLeague;
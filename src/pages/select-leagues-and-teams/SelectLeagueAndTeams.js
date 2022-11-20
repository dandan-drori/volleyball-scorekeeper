import './SelectLeagueAndTeams.scss';
import SelectLeague from "../../components/select-league";
import SelectTeams from "../../components/select-teams";
import { useMemo, useState } from "react";
import { useHistory } from "react-router-dom";
import { getSeasonYear } from "../../services/player.service";

function SelectLeagueAndTeams() {
    const history = useHistory();
    const seasonYear = useMemo(getSeasonYear, []);
    const [leagueId, setLeagueId] = useState(null);
    const [selectedTeamIds, setSelectedTeamIds] = useState({
        firstTeamId: '',
        secondTeamId: '',
    });
    
    const isSelectedTeamIdsFull = () => {
        return Object.values(selectedTeamIds).every((teamId) => !!teamId);
    }
    
    const goToRegister = () => {
        const {firstTeamId, secondTeamId} = selectedTeamIds;
        history.push(`/register?teamId=${firstTeamId}&homeTeamId=${firstTeamId}&guestTeamId=${secondTeamId}&year=${seasonYear}`);
    }
    
    return (
        <div>
            <SelectLeague setLeagueId={setLeagueId} />
            <SelectTeams leagueId={leagueId} selectedTeamIds={selectedTeamIds} setSelectedTeamIds={setSelectedTeamIds} />
            {
                leagueId && !isSelectedTeamIdsFull() && <p>בחר קבוצות כדי להמשיך</p>
            }
            {
                leagueId && isSelectedTeamIdsFull() && <button onClick={goToRegister}>הבא</button>
            }
        </div>
    )
}

export default SelectLeagueAndTeams;
import * as React from 'react'
import FilterForm from '../modules/dashboard/components/filter-form'
import TeamsList from '../modules/dashboard/components/teams-list';
import useTeams from '../hooks/useTeams';
import { TeamFilter } from '../modules/dashboard/types/dashboard-types';
import TeamForm from '../modules/dashboard/components/team-form';

const defaultFilter: TeamFilter = {
    teamName: '',
    country: '',
    season: '',
    league: ''
}

export default function Dashboard() {
    const { team, result, setTeam, findTeam, findTeams } = useTeams()
    const [filter, setFilter] = React.useState<TeamFilter>(defaultFilter)

    const filtered = result?.filter((t) => t.team.name.toLowerCase().includes(filter.teamName.toLowerCase())) ?? result

    return (
        <>
            {team === null ? (
                <>
                    <FilterForm onSearch={findTeams} filter={filter} onSetFilter={setFilter} />
                    {filtered?.length > 0 && <TeamsList list={filtered} filter={filter} onFind={findTeam} />}
                </>
            ) : (
                <TeamForm teamS={team} setTeam={setTeam} />
            )}
        </>
    );
}
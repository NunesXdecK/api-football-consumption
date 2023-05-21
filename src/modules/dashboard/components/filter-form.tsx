import * as React from 'react'
import { dashboardLabels as l } from '../labels/dashboard-labels'
import TextField from '@mui/material/TextField'
import Paper from '@mui/material/Paper'
import CountrySelect from './country-select'
import { TeamFilter } from '../types/dashboard-types'
import SeasonSelect from './season-select'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button';
import LeagueSelect from './league-select'

interface Props {
    filter: TeamFilter
    onSetFilter: React.Dispatch<React.SetStateAction<TeamFilter>>
    onSearch: (arg0: TeamFilter) => void
}

export default function FilterForm({ filter, onSetFilter, onSearch }: Props) {
    const canSearch = filter?.country?.length === 0 || filter?.season?.length === 0 || filter?.league?.length === 0
    return (
        <Paper
            sx={{
                p: 2,
                marginBottom: 2
            }}
        >
            <Grid container spacing={2}>
                <Grid item xs={12}
                    sx={{
                        display: 'flex',
                        gap: 2
                    }}>
                    <Grid item xs={4}>
                        <SeasonSelect setFilter={(arg0: any) => onSetFilter((old) => { return { ...old, season: arg0 } })} />
                    </Grid>
                    <Grid item xs={4}>
                        <CountrySelect setFilter={(arg0: any) => onSetFilter((old) => { return { ...old, country: arg0 } })} />
                    </Grid>
                    {filter.country.length > 0 && (
                        <Grid item xs={4}>
                            <LeagueSelect filter={filter} disabled={filter?.country?.length === 0} setFilter={(arg0: any) => onSetFilter((old) => { return { ...old, league: arg0 } })} />
                        </Grid>
                    )}
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        sx={{
                            minWidth: '100%',
                        }}
                        disabled={canSearch}
                        id="team-name-search"
                        label={l.teamName}
                        variant="outlined"
                        onChange={(event) => onSetFilter((old) => { return { ...old, teamName: event?.target?.value } })}
                        value={filter.teamName}
                    />
                </Grid>
                <Grid item xs={12}
                    sx={{
                        display: 'flex',
                        flexDirection: 'row-reverse'
                    }}>
                    <Button variant="contained"
                        onClick={() => onSearch(filter)}
                        disabled={canSearch}>{l.search}</Button>
                </Grid>
            </Grid>
        </Paper>
    )
}

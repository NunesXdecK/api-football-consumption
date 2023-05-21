import * as React from 'react'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import TeamCard from './team-card'
import { TeamFilter } from '../types/dashboard-types'

interface Props {
    filter: TeamFilter
    list: any[]
    onFind: (filter: TeamFilter, team: Team) => Promise<void>
}

export interface Team {
    team: {
        code: string
        country: string
        founded: number
        id: number
        logo: string
        name: string
        national: boolean
    }
    venue: {
        address: string
        capacity: number
        city: string
        id: 244
        image: string
        name: string
        surface: string
    }
}

export default function TeamsList({ filter, list, onFind }: Props) {

    return (
        <Paper
            sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                alignContent: 'center'
            }}
        >
            <Grid
                item
                xs={12}
                sx={{
                    gap: 2,
                    display: 'flex',
                    flexDirection: 'row',
                    flexFlow: 'wrap',
                    placeContent: 'center'
                }}>
                {list.map((team: Team, index: number) => (<TeamCard key={team.team.id} team={team} onSelect={(team) => onFind(filter, team)} />))}
            </Grid>
        </Paper>
    )
}

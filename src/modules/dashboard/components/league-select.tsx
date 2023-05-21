import * as React from 'react';
import { dashboardLabels as l } from '../labels/dashboard-labels'
import AutocompleteInput from '../../../components/ui/layout/autocomplete/autocomplete';
import Box from '@mui/material/Box';
import { Country } from './country-select';
import { TeamFilter } from '../types/dashboard-types';
import useLeagues from '../../../hooks/useLeagues';

interface Props {
    filter: TeamFilter
    disabled?: boolean
    setFilter: (arg0: number) => void
}

interface OptionsProps {
    props: any
    league: League
}

interface League {
    country: Country
    league: {
        id: 4,
        logo: string
        name: string
        type: string
    }
    seasons: {
        coverage: any
        current: boolean
        end: string
        start: string
        year: number
    }
}

const LeagueOptions = ({ props, league }: OptionsProps) => {
    return (
        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
            <img
                loading="lazy"
                width="20"
                src={league?.league?.logo}
                alt=""
            />
            {league?.league?.name}
        </Box>
    )
}

export default function LeagueSelect({ filter, disabled, setFilter }: Props) {
    const { loading, leagues } = useLeagues(filter)
    return (
        <AutocompleteInput
            disabled={disabled || loading}
            label={l.searchLeague}
            id='search-league-autocomplete'
            options={leagues}
            getOptionLabel={(option) => option?.league?.name}
            onChange={(arg0: any, arg1: League) => setFilter(arg1?.league?.id ?? 0)}
            optionComponent={(props, options: League) => <LeagueOptions league={options} props={props} />}
        />
    )
}
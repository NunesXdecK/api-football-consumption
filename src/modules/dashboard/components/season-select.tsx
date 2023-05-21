import * as React from 'react';
import { dashboardLabels as l } from '../labels/dashboard-labels'
import AutocompleteInput from '../../../components/ui/layout/autocomplete/autocomplete'
import Box from '@mui/material/Box'
import useSeasons from '../../../hooks/useSeasons';

interface Props {
    setFilter: (arg0: number) => void
}

interface OptionsProps {
    props: any
    season: number
}

const SeasonOptions = ({ props, season }: OptionsProps) => {
    return (
        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
            {season}
        </Box>
    )
}

export default function SeasonSelect({ setFilter }: Props) {
    const { loading, seasons } = useSeasons()
    return (
        <AutocompleteInput
            disabled={loading}
            label={l.searchSeason}
            options={seasons}
            id='search-season-autocomplete'
            onChange={(arg0: any, arg1: number) => setFilter(arg1 ?? '')}
            getOptionLabel={(option) => option.toString()}
            optionComponent={(props, options: number) => <SeasonOptions season={options} props={props} />}
        />
    )
}
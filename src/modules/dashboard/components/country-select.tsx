import * as React from 'react';
import { dashboardLabels as l } from '../labels/dashboard-labels'
import AutocompleteInput from '../../../components/ui/layout/autocomplete/autocomplete';
import Box from '@mui/material/Box';
import useCountries from '../../../hooks/useCountries';

interface Props {
    setFilter: (arg0: string) => void
}

interface OptionsProps {
    props: any
    country: Country
}

export interface Country {
    code: string
    flag: string
    name: string
}

const CountryOptions = ({ props, country }: OptionsProps) => {
    return (
        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
            <img
                loading="lazy"
                width="20"
                src={country.flag}
                srcSet={country.flag + ' 2x'}
                alt=""
            />
            {country.name} - {country.code}
        </Box>
    )
}

export default function CountrySelect({ setFilter }: Props) {
    const { loading, countries } = useCountries()
    return (
        <AutocompleteInput
            disabled={loading}
            label={l.searchCountry}
            options={countries}
            id='search-coutry-autocomplete'
            onChange={(arg0: any, arg1: Country) => setFilter(arg1?.name ?? '')}
            getOptionLabel={(option) => option.name}
            optionComponent={(props, options: Country) => <CountryOptions country={options} props={props} />}
        />
    )
}
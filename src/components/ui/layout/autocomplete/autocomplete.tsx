import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

interface Props {
    id: string
    label: string
    disabled?: boolean
    options: any[]
    onChange: (arg0: any, arg1: any) => void
    getOptionLabel: (arg0: any) => string
    optionComponent: (arg0: any, arg1: any) => any
}

export default function AutocompleteInput({ id, label, options, disabled, onChange, getOptionLabel, optionComponent }: Props) {
    return (
        <Autocomplete
            id={id}
            sx={{ minWidth: '100%' }}
            options={options}
            autoHighlight
            disabled={disabled}
            onChange={onChange}
            renderOption={optionComponent}
            getOptionLabel={getOptionLabel}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={label}
                    inputProps={{
                        ...params.inputProps,
                        autoComplete: 'new-password', // disable autocomplete and autofill
                    }}
                />
            )}
        />
    );
}
import React from 'react'
import useAPI from './useAPI'
import { ApiHelper } from '../utils/api-helper'

export default function useCountries() {
    const { loading, result } = useAPI(ApiHelper.countries)
    return {
        loading: loading,
        countries: result?.response ?? []
    }
}
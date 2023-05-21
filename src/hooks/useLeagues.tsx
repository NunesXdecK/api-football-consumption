import React from 'react'
import useAPI from './useAPI'
import { ApiHelper } from '../utils/api-helper'
import { TeamFilter } from '../modules/dashboard/types/dashboard-types'

export default function useLeagues(filter: TeamFilter) {
    const { loading, result } = useAPI(ApiHelper.leagues + `?country=${filter.country}`)
    return {
        loading: loading,
        leagues: result?.response ?? []
    }
}
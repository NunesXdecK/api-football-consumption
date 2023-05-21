import React from 'react'
import useAPI from './useAPI'
import { ApiHelper } from '../utils/api-helper'

export default function useSeasons() {
    const { loading, result } = useAPI(ApiHelper.seasons)
    return {
        loading: loading,
        seasons: result?.response ?? []
    }
}
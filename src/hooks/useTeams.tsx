import React from 'react'
import useAPI from './useAPI'
import { TeamFilter } from '../modules/dashboard/types/dashboard-types'
import { useCookies } from 'react-cookie'
import { ApiHelper } from '../utils/api-helper'
import { Team } from '../modules/dashboard/components/teams-list'

export default function useTeams() {
    const [cookies] = useCookies(['API_KEY'])
    const [team, setTeam] = React.useState<any>(null)
    const [result, setResult] = React.useState<Team[]>([])
    const { callAPI } = useAPI(null)

    const findTeams = async (filter: TeamFilter) => {
        const res = await callAPI(ApiHelper.teams +
            `?league=${filter.league}&country=${filter.country}&season=${Number(filter.season)}`
            , cookies.API_KEY.key)
        setResult(res.response)
    }

    const findTeam = async (filter: TeamFilter, team: Team) => {
        const resPlayers = await callAPI(ApiHelper.palyers +
            `?league=${filter.league}&season=${Number(filter.season)}&team=${Number(team.team.id)}`
            , cookies.API_KEY.key)
        const resStatics = await callAPI(ApiHelper.teamsStatics +
            `?league=${filter.league}&season=${Number(filter.season)}&team=${Number(team.team.id)}`
            , cookies.API_KEY.key)
        const res = {
            team: team,
            players: resPlayers.response,
            statics: resStatics.response
        }
        if (res?.players?.length > 0 || res?.statics?.length > 0 ) {
            setTeam(res)
        } else {
            setTeam(null)
        }
    }

    return {
        loading: false,
        team: team,
        result: result,
        setTeam: setTeam,
        findTeam: findTeam,
        findTeams: findTeams
    }
}
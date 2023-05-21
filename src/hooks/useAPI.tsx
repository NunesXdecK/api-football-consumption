import React from 'react';
import { ApiHelper } from '../utils/api-helper';
import { AuthContext } from '../contexts/authContext';

interface Header {
    header: string
    value: string
}

export default function useAPI(status: string | null) {
    const { user } = React.useContext(AuthContext)
    const [result, setResult] = React.useState<any>(null)
    const [loading, setLoading] = React.useState<boolean>(status !== null && status?.length > 0)
    const [reload, setReload] = React.useState<boolean>(false)

    const callAPI = async (status: string, apiKey: string, headers?: Header[]) => {
        const myHeaders = new Headers()
        myHeaders.append('x-rapidapi-key', apiKey)
        myHeaders.append('x-rapidapi-host', 'v3.football.api-sports.io')
        headers?.forEach(h => myHeaders.append(h.header, h.value))
        return fetch(ApiHelper.url + status, {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        }).then(response => response.json())
            .catch(error => error.json())
    }

    React.useEffect(() => {
        if (status !== null && status?.length > 0 && user?.key) {
            callAPI(status, user?.key)
                .then(result => {
                    setResult(result)
                    setLoading(false)
                })
        }
    }, [reload, user?.key, status])

    return {
        loading: loading,
        callAPI: callAPI,
        reload: () => setReload(old => !old),
        result: result
    }
}
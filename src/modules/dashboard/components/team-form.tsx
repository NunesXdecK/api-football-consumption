import * as React from 'react'
import { dashboardLabels as l } from '../labels/dashboard-labels'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import { IconButton, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Toolbar from '@mui/material/Toolbar'
import TeamChart from './team-chart'

interface Props {
    teamS: any
    setTeam: React.Dispatch<any>
}

export default function TeamForm({ teamS, setTeam }: Props) {
    const {
        team,
        players,
        statics
    } = teamS
    const {
        fixtures,
        lineups,
        goals
    } = statics
    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Paper sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignContent: 'center'
                }}>
                    <Typography
                        component="h1" variant="h4"
                        color="primary"
                        sx={{ alignContent: 'center' }}>{team?.team?.name}</Typography>
                    {/*
                    <IconButton onClick={() => setTeam(null)} aria-label="delete">
                        <CloseIcon />
                    </IconButton>
                    */}
                </Paper>
            </Grid>
            <Grid item xs={12} md={4} lg={3}>
                <Paper
                    sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        minHeight: 335,
                        justifyContent: 'center'
                    }}
                >
                    <img
                        loading="lazy"
                        src={team?.team?.logo}
                        alt=""
                    />
                </Paper>
            </Grid>
            <Grid item xs={12} md={8} lg={9}>
                <Paper
                    sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        minHeight: 335,
                        justifyContent: 'center'
                    }}
                >
                    <Typography variant="subtitle2" color="primary">
                        {l.vld + l.vldOf + fixtures?.played?.total + l.vldMatches}
                    </Typography>
                    <Typography variant="h2" gutterBottom>
                        {fixtures?.wins?.total}-{fixtures?.loses?.total}-{fixtures?.draws?.total}
                    </Typography>
                    <Typography variant="subtitle2" color="primary">
                        {l.formationMostUsed + (lineups?.length > 0 && lineups[0] ? lineups[0].formation : '') + l.vldMatches}
                    </Typography>
                    <Typography variant="h2" gutterBottom>
                        {lineups?.length > 0 && lineups[0] ? lineups[0].formation : ''}
                    </Typography>
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <Paper
                    sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        height: 300,
                    }}
                >
                    <TeamChart data={goals?.for?.minute} />
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                    <TableContainer>
                        <Toolbar
                            sx={{
                                pl: { sm: 2 },
                                pr: { xs: 1, sm: 1 },
                            }}
                        >

                            <Typography
                                sx={{ flex: '1 1 100%' }}
                                variant="h6"
                                id="tableTitle"
                                component="div"
                            >
                                {l.players}
                            </Typography>
                        </Toolbar>
                        <Table
                            sx={{ minWidth: 750 }}
                            aria-labelledby="tableTitle"
                        >
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center"></TableCell>
                                    <TableCell align="center">{l.name}</TableCell>
                                    <TableCell align="center">{l.age}</TableCell>
                                    <TableCell align="center">{l.nationality}</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {players?.map((player: any, index: number) => (
                                    <TableRow key={index}>
                                        <TableCell component="th" scope="row" padding="none" align="center">
                                            <img
                                                loading="lazy"
                                                src={player?.player?.photo}
                                                alt=""
                                                width="100"
                                            />
                                        </TableCell>
                                        <TableCell component="th" scope="row" padding="none" align="center">{player?.player?.firstname}</TableCell>
                                        <TableCell component="th" scope="row" padding="none" align="center">{player?.player?.age}</TableCell>
                                        <TableCell component="th" scope="row" padding="none" align="center">{player?.player?.nationality}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Grid>
        </Grid>
    )
}

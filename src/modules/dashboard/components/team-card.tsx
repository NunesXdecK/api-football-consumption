import * as React from 'react'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import { Button } from '@mui/material'
import { Team } from './teams-list'

interface Props {
    team: Team
    onSelect: (team: Team) => void
}

export default function TeamCard({ team, onSelect }: Props) {
    const width = 250
    return (
        <Button variant="text" onClick={() => onSelect(team)}>
            <Card sx={{ minWidth: width, maxWidth: width }}>
                <CardMedia
                    sx={{ height: 140 }}
                    image={team.team.logo}
                    title={team.team.name}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {team.team.name}
                    </Typography>
                </CardContent>
            </Card>
        </Button>
    )
}

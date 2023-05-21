import * as React from 'react'
import { dashboardLabels as l } from '../labels/dashboard-labels'
import { useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts'

interface Props {
    data: any
}

function createData(time: string, amount?: number) {
    return { time, amount };
}


export default function TeamChart({ data }: Props) {
    const theme = useTheme();
    const dataFinal = Object.keys(data)?.length > 0 ? [
        createData('0-15', data['0-15'].total ?? 0),
        createData('16-30', data['16-30'].total ?? 0),
        createData('31-45', data['31-45'].total ?? 0),
        createData('46-60', data['46-60'].total ?? 0),
        createData('61-75', data['61-75'].total ?? 0),
        createData('76-90', data['76-90'].total ?? 0),
        createData('91-105', data['91-105'].total ?? 0),
        createData('106-120', data['106-120'].total ?? 0),
    ] : []
    if (dataFinal.length === 0) {
        return <></>
    }

    return (
        <>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>{l.goalsPerTime}</Typography>
            <ResponsiveContainer>
                <LineChart
                    data={dataFinal}
                    margin={{
                        top: 16,
                        right: 16,
                        bottom: 0,
                        left: 24,
                    }}
                >
                    <XAxis
                        dataKey="time"
                        stroke={theme.palette.text.secondary}
                        style={theme.typography.body2}
                    />
                    <YAxis
                        stroke={theme.palette.text.secondary}
                        style={theme.typography.body2}
                    >
                        <Label
                            angle={270}
                            position="left"
                            style={{
                                textAnchor: 'middle',
                                fill: theme.palette.text.primary,
                                ...theme.typography.body1,
                            }}
                        >
                            {l.goals}
                        </Label>
                    </YAxis>
                    <Line
                        isAnimationActive={false}
                        type="monotone"
                        dataKey="amount"
                        stroke={theme.palette.primary.main}
                        dot={false}
                    />
                </LineChart>
            </ResponsiveContainer>
        </>
    );
}
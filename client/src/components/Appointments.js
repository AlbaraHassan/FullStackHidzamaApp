import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from "@mui/material/CardHeader"
import CardContent from "@mui/material/CardContent"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import ScheduleSendIcon from '@mui/icons-material/ScheduleSend';

import axios from "axios"





function Appointments() {
    const [ appointments, setAppointments ] = useState([])

    const fetchAll = async () => {
        const res = await axios.get("http://localhost:8000/api/")
        setAppointments(res.data)
    }


    useEffect(() => {
        fetchAll()


    }, [])
    return (
        <Grid sx={{ flexGrow: 100, marginBottom:20 }} container spacing={10} columns={{ xs: 2, sm: 6, md: 9, lg: 15 }}>
            {appointments.map((el) => {
                return <Grid item xs={3} >
                    <Grid container justifyContent="center">
                        <Grid key={el.id} item>

                            <Card variant="elevation" sx={{
                                height: 240,
                                width: 300,
                                backgroundColor: (theme) =>
                                    theme.palette.mode === 'dark' ? '#1A2027' : '#f0f8ff',
                            }}>
                                <CardHeader
                                    className={"MuiCardHeader-root"}
                                    title={`Date: ${el.year} / ${el.month} / ${el.day}`}
                                    subheader={`Time: ${el.hour < 10 ? "0" + el.hour : el.hour} : ${el.minute < 10 ? "0" + el.minute : el.minute}`}
                                    classes={{
                                        title: "MuiCardHeader-title",
                                        subheader: "MuiCardHeader-subheader"
                                    }}
                                />
                                <CardContent>
                                    <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                                        {`This Appointment is on ${el.name} ${el.year} / ${el.month} / ${el.day}`}
                                    </Typography>
                                    <Button color='info' sx={{ marginTop: 4, marginLeft: 9 }} variant="outlined" endIcon={<ScheduleSendIcon />}>
                                        Reserve
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>

            })}
        </Grid>
    )
}

export default Appointments
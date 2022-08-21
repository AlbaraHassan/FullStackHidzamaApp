import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from "@mui/material/Button"
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import Typography from '@mui/material/Typography'
import ScheduleSendIcon from '@mui/icons-material/ScheduleSend';



function AppointmentsTable() {

    const [ rows, setRows ] = useState([])
    const [ open, setOpen ] = useState(false)
    const [ obj, setObj ] = useState({})
    const navigate = useNavigate()
    const handleOpen = (el) => {
        setObj(el)
        setOpen(true)

    }
    const handleCloseDisagree = () => setOpen(false)

    const handleCloseAgree = () => {
        navigate(`${obj.id}`)
    }

    const fetchAll = async () => {
        const res = await axios.get("api/")
        setRows(res.data)
    }


    useEffect(() => {
        fetchAll()


    }, [])




    return (
        <>


            <Dialog
                open={open}
                onClose={handleCloseDisagree}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    Do you want to reserve the appointment?
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {`Date: ${obj.year} / ${obj.month} / ${obj.day}`}
                    </DialogContentText>
                    <DialogContentText>
                        {`Time: ${obj.hour < 10 ? "0" + obj.hour : obj.hour} : ${obj.minute < 10 ? "0" + obj.minute : obj.minute}`}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleCloseDisagree}>
                        Disagree
                    </Button>
                    <Button onClick={handleCloseAgree} autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
            <Container >

                <Typography align='center' width={{ xs: "85%", sm: "95%", md: "95%" }} color="initial" sx={{ backgroundColor: "antiquewhite", color: "#0288d1", padding: 3, borderRadius: 6, fontSize: { xs: 20, sm: 40, ms: 50 } }}>The Available Appointments</Typography>

                <TableContainer component={Card}  >
                    <Table sx={{ minWidth: 200, maxWidth: 1200, marginTop: 5 }} aria-label="sticky table">
                        <TableHead>
                            <TableRow sx={{
                                backgroundColor: "#0288d1",
                                "& th": {
                                    fontSize: { xs: 20, sm: 30 },
                                    color: "white"
                                }
                            }}
                            >
                                <TableCell align="center">Day</TableCell>
                                <TableCell align="center" >Date & Time</TableCell>
                                <TableCell align="center"></TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow
                                    hover
                                    role="button"
                                    onClick={() => { handleOpen(row) }}
                                    key={row.id}
                                    sx={{
                                        '&:last-child td, &:last-child th': { border: 0 },
                                        "&:hover": {
                                            boxShadow: 20,
                                            cursor: 'pointer',
                                            background: "#0288d1"

                                        }
                                    }
                                    }
                                >

                                    <TableCell align="center" sx={{ fontSize: { xs: 15, sm: 20, md: 25 } }}>{row.name}</TableCell>
                                    <TableCell component="th" scope="row" align='center' sx={{ fontSize: { xs: 12, sm: 20, md: 25 } }}>
                                        <p>{`${row.year} / ${row.month} / ${row.day}`}</p>
                                        <p>{`${row.hour < 10 ? "0" + row.hour : row.hour} : ${row.minute < 10 ? "0" + row.minute : row.minute}`}</p>
                                    </TableCell>
                                    <TableCell align="center" sx={{ fontSize: { xs: 15, sm: 20, md: 25 }, width: 5 }}>
                                        <Button variant="outlined" color="info" endIcon={<ScheduleSendIcon />} sx={{ height: { xs: 30, md: 100 }, marginRight: { xs: 0, md: 10 }, width: { xs: 100, md: 200 } }}>
                                            Reserve
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </>
    )
}

export default AppointmentsTable
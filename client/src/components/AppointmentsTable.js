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
        const res = await axios.get("http://localhost:8000/api/")
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
                    {"Do you want to reserve the appointment?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <p>{`Date: ${obj.year} / ${obj.month} / ${obj.day}`}</p>
                        <p>{`Time: ${obj.hour < 10 ? "0" + obj.hour : obj.hour} : ${obj.minute < 10 ? "0" + obj.minute : obj.minute}`}</p>
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
            <Container container justifyContent="center">


                <TableContainer component={Card}  >
                    <Table sx={{ minWidth: 200, maxWidth: 1200 }} aria-label="sticky table">
                        <TableHead>
                            <TableRow sx={{
                                backgroundColor: "#0288d1",
                                "& th": {
                                    fontSize: 30,
                                    color: "white"
                                }
                            }}
                            >
                                <TableCell  >Date</TableCell>
                                <TableCell align="center">Day</TableCell>
                                <TableCell align="center">time</TableCell>
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
                                    <TableCell component="th" scope="row" sx={{ fontSize: { xs: 15, sm: 20, md: 25 } }}>
                                        {`${row.year} / ${row.month} / ${row.day}`}
                                    </TableCell>
                                    <TableCell align="center" sx={{ fontSize: { xs: 15, sm: 20, md: 25 } }}>{row.name}</TableCell>
                                    <TableCell align="center" sx={{ fontSize: { xs: 15, sm: 20, md: 25 } }}>{`${row.hour < 10 ? "0" + row.hour : row.hour} : ${row.minute < 10 ? "0" + row.minute : row.minute}`}</TableCell>
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
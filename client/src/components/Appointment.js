import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from "axios"
import Container from '@mui/material/Container'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import FormHelperText from '@mui/material/FormHelperText'
import TextField from '@mui/material/TextField'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import moment from "moment"
import Slider from '@mui/material/Slider'
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import NavigationIcon from '@mui/icons-material/Navigation';
import Fab from '@mui/material/Fab';









function Appointment() {
    const params = useParams();
    const [ appointment, setAppointment ] = useState({})
    const [ fullName, setFullName ] = useState("")
    const [ dob, setDob ] = useState("")
    const [ height, setHeight ] = useState(0)
    const [ weight, setWeight ] = useState(0)
    const [ phone, setPhone ] = useState("")
    const [ anemia, setAnemia ] = useState(false)
    const [ bloodSugar, setBloodSugar ] = useState(false)
    const [ kidneyProb, setKidneyProb ] = useState(false)
    const [ LiverProb, setLiverProb ] = useState(false)
    const [ thyrodProb, setThyrodProb ] = useState(false)
    const [ HeartProb, setHeartProb ] = useState(false)
    const [ otherProb, setOtherProb ] = useState("")

    const [ reason, setReason ] = useState("")


    const handleDob = (date) => {
        const d = moment(date).format("yyyy-MM-DD")
        setDob(d);
    }


    const fetchAppointment = async () => {
        const res = await axios.get(`http://localhost:8000/api/${params.id}/`)
        setAppointment(res.data)
    }

    const reserver = async () => {
        const body = {

            "name": fullName,
            "date_of_birth": dob,
            "height": height,
            "weight": weight,
            "phone_number": phone,
            "reason": reason,
            "anemia": anemia,
            "blood_sugar": bloodSugar,
            "kidney_problems": kidneyProb,
            "liver_problems": LiverProb,
            "thyroid_problems": thyrodProb,
            "heart_problems": HeartProb,
            "other_problems": otherProb

        }
        console.log(body);
        const res = await axios.post(`http://localhost:8000/api/${params.id}/reserve/`, body, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
    }


    useEffect(() => {

        fetchAppointment()

    }, [])



    return (
        <Container maxWidth="lg">
            <FormControl sx={{ width: { xs: 300, sm: 800, md: 1000 } }}>
                <FormLabel sx={{ fontSize: 25 }}>Add Your Information</FormLabel>
                <TextField
                    error={fullName.length < 4 && fullName ? true : false}
                    id="outlined-error-helper-text"
                    label="Full Name"
                    value={fullName}
                    onChange={(e) => { setFullName(e.target.value) }}
                    sx={{ marginTop: 10 }}
                    helperText={fullName.length < 4 && fullName ? "Please enter your real name" : ""}
                />
                <FormHelperText sx={{ marginBottom: 5 }}>Enter You Full Name</FormHelperText>

                <LocalizationProvider dateAdapter={AdapterMoment}>
                    <MobileDatePicker
                        label="Date of Birth"
                        inputFormat="yyyy-MM-dd"
                        value={dob}
                        onChange={handleDob}
                        renderInput={(params) => <TextField {...params} />}

                    />

                </LocalizationProvider>

                <FormHelperText sx={{ marginButtom: 5 }}>Enter You Date Of Birth</FormHelperText>

                <Typography variant="h4" color="initial" sx={{marginTop:5}}>{height} cm</Typography>

                <Slider
                    value={height}
                    onChange={(e) => { setHeight(e.target.value) }}
                    valueLabelDisplay="auto"
                    size="medium"
                    min={50}
                    max={210}
                    sx={{ marginTop: 5, width: { xs: "100%", md: "50%" } }}

                />

                <FormHelperText sx={{ marginButtom: 5 }}>Enter You Height In cm</FormHelperText>

                <Typography variant="h4" color="initial" sx={{marginTop:5}}>{weight} kg</Typography>


                <Slider
                    value={weight}
                    onChange={(e) => { setWeight(e.target.value) }}
                    valueLabelDisplay="auto"
                    size="medium"
                    min={0}
                    max={250}
                    sx={{ marginTop: 5, width: { xs: "100%", md: "59.5%" } }}

                />

                <FormHelperText sx={{ marginButtom: 5 }}>Enter You Weight in kg</FormHelperText>

                <TextField
                    error={phone.length < 9 && phone ? true : false}
                    id="outlined-error-helper-text"
                    label="Phone Number"
                    value={phone}
                    onChange={(e) => { setPhone(e.target.value) }}
                    sx={{ marginTop: 10 }}
                    helperText={phone.length < 9 && phone ? "Phone number is too short" : ""}

                />
                <FormHelperText sx={{ marginBottom: 5 }}>Enter You Full Name</FormHelperText>


                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Reason</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={reason}
                        label="Age"
                        onChange={(e) => { setReason(e.target.value) }}
                    >
                        <MenuItem value="General">General</MenuItem>
                        <MenuItem value="Respiratory System">Respiratory System</MenuItem>
                        <MenuItem value="Bones and Joints">Bones and Joints</MenuItem>
                        <MenuItem value="Heart and Blood Vessels">Heart and Blood Vessels</MenuItem>
                        <MenuItem value="Female Problems">Female Problems</MenuItem>
                        <MenuItem value="Urinary System">Urinary System</MenuItem>
                        <MenuItem value="Nerves and Muscles">Nerves and Muscles</MenuItem>
                        <MenuItem value="Immunity and Blood Booster">Immunity and Blood Booster</MenuItem>
                        <MenuItem value="Hormones">Hormones</MenuItem>
                        <MenuItem value="Other">Other</MenuItem>



                    </Select>
                </FormControl>


                <Typography variant="h5" color="initial" sx={{ marginTop: 5 }}>Check All The Problems You Have</Typography>
                <Typography variant="p" color="GrayText" sx={{ marginBottom: 5 }}>If You Have Any Other Problem Write It In The Others Section</Typography>

                <FormControlLabel control={<Checkbox onChange={(e) => { setAnemia(e.target.checked) }} />} label="Anemia" />
                <FormControlLabel control={<Checkbox onChange={(e) => { setBloodSugar(e.target.checked) }} />} label="Blood Sugar" />
                <FormControlLabel control={<Checkbox onChange={(e) => { setKidneyProb(e.target.checked) }} />} label="Kidney Problems" />
                <FormControlLabel control={<Checkbox onChange={(e) => { setLiverProb(e.target.checked) }} />} label="Liver Problems" />
                <FormControlLabel control={<Checkbox onChange={(e) => { setThyrodProb(e.target.checked) }} />} label="Thyrod Problems" />
                <FormControlLabel control={<Checkbox onChange={(e) => { setHeartProb(e.target.checked) }} />} label="Heart Problems" />

                <TextField
                    id="outlined-multiline-static"
                    sx={{ margin: 5 }}
                    rows={10}
                    multiline
                    label="Other Problems"
                    value={otherProb}
                    onChange={(e) => { setOtherProb(e.target.value) }}

                />

                <Fab variant="extended" color="primary" aria-label="add" onClick={reserver}>
                    <NavigationIcon sx={{ mr: 1 }} />
                    Extended
                </Fab>
            </FormControl>
        </Container>
    )
}

export default Appointment
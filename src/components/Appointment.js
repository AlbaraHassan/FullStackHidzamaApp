import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
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
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from "@mui/material/Alert"
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';
import PhoneInput from 'react-phone-input-2';
import "../styles/input_phone.css"
import { checkIfValidPhoneNumber } from '../validation/regex';




const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});




function Appointment() {
    const params = useParams();
    // eslint-disable-next-line no-unused-vars
    const [ appointment, setAppointment ] = useState({})
    const [ fullName, setFullName ] = useState("")
    const [ dob, setDob ] = useState("")
    const [ height, setHeight ] = useState(false)
    const [ weight, setWeight ] = useState(false)
    const [ phone, setPhone ] = useState("")
    const [ anemia, setAnemia ] = useState(false)
    const [ bloodSugar, setBloodSugar ] = useState(false)
    const [ kidneyProb, setKidneyProb ] = useState(false)
    const [ LiverProb, setLiverProb ] = useState(false)
    const [ thyrodProb, setThyrodProb ] = useState(false)
    const [ HeartProb, setHeartProb ] = useState(false)
    const [ otherProb, setOtherProb ] = useState("")
    const [ error, setError ] = useState("")
    const [ reason, setReason ] = useState("")
    const [ open, setOpen ] = useState(false);
    const [ open2, setOpen2 ] = useState(false);
    const [ loading, setLoading ] = useState(false)
    const [ notValid, setNotValid ] = useState('');
    const navigate = useNavigate()



    const handleValidation = (e) => {
        if (!checkIfValidPhoneNumber(e)) {
            setNotValid('Incorrect phone number format!');
            return
        }

        setNotValid('');
        setPhone(e)

    }



    const handleDob = (date) => {
        const d = moment(date).format("yyyy-MM-DD")
        setDob(d);
    }


    const fetchAppointment = async () => {
        const res = await axios.get(`api/${params.id}/`)
        setAppointment(res.data)
    }

    const reserver = async () => {

        if (fullName === "" || phone === "" || dob === "") {
            setError("Please entered all the required info")
            setOpen(true)
            return
        }


        setLoading(true);
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
        await axios.post(`api/${params.id}/reserve/`, body).then(async (res) => {
            setError("Reservation Compelete!")
            setOpen2(true)
            setLoading(false);
            setTimeout(() => { navigate("/") }, 1000)


        }).catch(async (err) => {
            setError(await err.response.data.msg)
            setOpen(true)
            setLoading(false);

        })



    }


    useEffect(() => {

        fetchAppointment()

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])



    return (
        <Container maxWidth="lg" sx={{backgroundColor:"whitesmoke", padding:5, borderRadius:10}}>

            <FormControl sx={{ width: "100%" }}>
                <FormLabel sx={{ fontSize: 25 }}>Add Your Information</FormLabel>
                <TextField
                    required
                    error={fullName.length < 6 || !fullName ? true : false}
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
                        label="Date of Birth *"
                        inputFormat="yyyy-MM-dd"
                        value={dob}
                        onChange={handleDob}
                        renderInput={(params) => <TextField {...params} />}
                    />

                </LocalizationProvider>

                <FormHelperText sx={{ marginButtom: 5 }}>Enter You Date Of Birth</FormHelperText>

                <Typography variant="h5" color={!height ? "red" : "gray"} sx={{ marginTop: 5 }}>{height ? `${height} cm` : "Height *"}</Typography>

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

                <Typography variant="h5" color={!weight ? "red" : "gray"} sx={{ marginTop: 5}}>{weight ? `${weight} kg` : "Weight *"}</Typography>


                <Slider
                    value={weight}
                    onChange={(e) => { setWeight(e.target.value) }}
                    valueLabelDisplay="auto"
                    size="medium"
                    min={5}
                    max={250}
                    sx={{ marginTop: 5, width: { xs: "100%", md: "59.5%" } }}

                />
                <FormHelperText sx={{ marginButtom: 5 }}>Enter You Weight in kg</FormHelperText>
                <Container sx={{ marginTop: 5 }} width={"80%"}>
                    <PhoneInput
                        inputStyle={{
                            width: '100%',
                            height: 56,
                            borderColor: notValid !== "" || !phone ? "red" : "",
                            backgroundColor:"whitesmoke"
                        }}
                        country={'ba'}
                        value={phone}
                        onChange={(a) => { handleValidation('+' + a) }}
                    />
                </Container>
                {notValid !== '' && <FormHelperText sx={{ marginBottom: 5, color: "red" }}>{notValid}</FormHelperText>}
                <FormHelperText sx={{ marginBottom: 5 }}>Enter You Phone Number</FormHelperText>




                <FormControl fullWidth error={!reason?true:false}>
                    <InputLabel>Reason *</InputLabel>
                    <Select
                        labelId="demo-simple-select-error-label"
                        id="demo-simple-select-error"
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

                <Fab variant="extended" color="primary" aria-label="add" onClick={reserver}
                    disabled={loading ? true : false}>
                    <NavigationIcon sx={{ mr: 1 }} />

                    Submit
                </Fab>
            </FormControl>


            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                open={open}
                onClose={() => { setOpen(false) }}>
                <Alert onClose={() => { setOpen(false) }} severity="error">
                    {error}
                </Alert>
            </Snackbar>


            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                open={open2}
                onClose={() => { setOpen2(false) }}>
                <Alert onClose={() => { setOpen2(false) }} severity="success">
                    {error}
                </Alert>
            </Snackbar>


            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}>
                <CircularProgress color="inherit" />
            </Backdrop>


        </Container >
    )
}

export default Appointment
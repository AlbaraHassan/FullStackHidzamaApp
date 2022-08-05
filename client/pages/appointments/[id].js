import { Box, Button, Divider, FormControl, FormHelperText, FormLabel, Input, Text } from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


export async function getServerSideProps(context) {

    const res = await axios.get(`http://localhost:8000/appointments/get_app/?id=${context.params[ "id" ]}`)
    const data = res.data
    return {
        props: { appointment: data }
    };
}


export default function Appointment({ appointment }) {

    const [ name, setname ] = useState("")
    const [ phone, setphone ] = useState("")
    const [ age, setAge ] = useState()
    const [startDate, setStartDate] = useState(new Date());


    const handleSubmit = async () => {
        const body = {
            "name": name,
            "date_of_birth": startDate.toJSON().split("T")[0],
            "phone_number": phone,
        }
        console.log(body);


        const res = await axios.post(`http://localhost:8000/appointments/reserve/?id=${appointment[ "id" ]}`,
            body, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })

        window.location.replace("http://localhost:3000/appointments")
    }


    return <>
        <Text>DAY : {appointment[ "day" ]} {"->"} {appointment[ "name" ]}</Text>
        <Text>MONTH : {appointment[ "month" ] + 1}</Text>
        <Text>TIME : {appointment[ "hour" ] < 10 ? "0" + appointment[ "hour" ] : appointment[ "hour" ]}:{appointment[ "minute" ] < 10 ? "0" + appointment[ "minute" ] : appointment[ "minute" ]}</Text>
        <Divider m={50} w={"95%"} />
        <Box display={"flex"} justifyContent={"center"} bg={"blackAlpha.200"} p={10} w={"60%"} marginLeft={425} borderRadius={"xl"}>
            <FormControl w={"60%"}>
                <FormLabel>Full Name</FormLabel>
                <Input bg={"white"} onChange={(e) => { setname(e.target.value) }} />
                <FormHelperText marginBlockEnd={50}>Enter Full Name.</FormHelperText>

                <FormLabel>Date of Birth</FormLabel>
                <DatePicker selected={startDate} onSelect={(date) => setStartDate(date)} />
                <FormHelperText marginBlockEnd={50}>Choose Your Date of Birth.</FormHelperText>

                <FormLabel>Phone Number</FormLabel>
                <Input bg={"white"} onChange={(e) => { setphone(e.target.value) }} />
                <FormHelperText marginBlockEnd={50}>Enter Phone Number.</FormHelperText>
                <Button bg={"linkedin.400"} onClick={handleSubmit}>Submit</Button>
                <Divider w={"50%"} m={"50"} />
            </FormControl>
        </Box>


    </>;
}
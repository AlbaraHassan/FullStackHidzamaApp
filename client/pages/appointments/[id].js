import { Alert, AlertTitle, Box, Button, Divider, FormControl, FormHelperText, FormLabel, Input, Select, Tag, Text, useToast } from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


export async function getServerSideProps(context) {

    const res = await axios.get(`http://localhost:8000/appointments/get_app/${context.params[ "id" ]}/`)
    const data = res.data
    return {
        props: { appointment: data }
    };
}


export default function Appointment({ appointment }) {

    const [ name, setname ] = useState("")
    const [ phone, setphone ] = useState("")
    const [ startDate, setStartDate ] = useState(new Date());
    const [ reason, setReason ] = useState("General")
    const toast = useToast();

    const handleSubmit = async () => {
        const body = {
            "name": name,
            "date_of_birth": startDate.toJSON().split("T")[ 0 ],
            "phone_number": phone,
            "reason": reason
        }
        console.log(body);


        const res = await axios.post(`http://localhost:8000/appointments/reserve/${appointment[ "id" ]}/`,
            body, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        if ("msg" in res.data) {
            toast({
                title: res.data[ "msg" ],
                status: "error",
                duration: 9000,
                isClosable: false,
            })
            return
        }

        toast({
            title: "Reserved Succesfully",
            status: "success",
            duration: 3000,
            isClosable: false,
        })

        setTimeout(() => {
            window.location.replace("http://localhost:3000/appointments")
        }, 3000);

    }



    return <>

            <Tag m={10} size={"lg"}>DAY : {appointment[ "day" ]} {"->"} {appointment[ "name" ]}</Tag>
            <Tag m={10} size={"lg"}>MONTH : {appointment[ "month" ] + 1}</Tag>
            <Tag m={10} size={"lg"}>TIME : {appointment[ "hour" ] < 10 ? "0" + appointment[ "hour" ] : appointment[ "hour" ]}:{appointment[ "minute" ] < 10 ? "0" + appointment[ "minute" ] : appointment[ "minute" ]}</Tag>

        <Divider m={50} w={"95%"} />
        <Box display={"flex"} justifyContent={"center"} bg={"blackAlpha.200"} p={10} w={"60%"} marginLeft={425} borderRadius={"xl"}>
            <FormControl w={"60%"}>
                <FormLabel>Full Name</FormLabel>
                <Input bg={"white"} onChange={(e) => { setname(e.target.value) }} />
                <FormHelperText marginBlockEnd={50}>Enter Full Name.</FormHelperText>

                <FormLabel>Date of Birth</FormLabel>
                <DatePicker selected={startDate} onSelect={(date) => setStartDate(date)} />
                <FormHelperText marginBlockEnd={50}>Choose Your Date of Birth.</FormHelperText>

                <FormLabel >Phone Number</FormLabel>
                <Input isRequired bg={"white"} onChange={(e) => { setphone(e.target.value) }} />
                <FormHelperText marginBlockEnd={50}>Enter Phone Number.</FormHelperText>
                <Divider w={"50%"} m={"50"} />

                <FormLabel>Reason For Appointment</FormLabel>
                <Select placeholder="Select Reason" variant={"filled"} bg={"white"} onChange={(e) => { setReason(e.target.value) }}>
                    <option value="General">General</option>
                    <option value="Respiratory System">Respiratory System</option>
                    <option value="Bones and Joints">Bones and Joints</option>
                    <option value="Heart and Blood Vessels">Heart and Blood Vessels</option>
                    <option value="Female Problems">Female Problems</option>
                    <option value="Urinary System">Urinary System</option>
                    <option value="Nerves and Muscles">Nerves and Muscles</option>
                    <option value="Immunity and Blood Booster">Immunity and Blood Booster</option>
                    <option value="Hormones">Hormones</option>
                    <option value="Other">Other</option>
                </Select>
                <FormHelperText marginBlockEnd={50}>Select Reason.</FormHelperText>
                <Button bg={"linkedin.400"} onClick={handleSubmit}>Submit</Button>
                <Divider w={"50%"} m={"50"} />
            </FormControl>
        </Box>


    </>;
}
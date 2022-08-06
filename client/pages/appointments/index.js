import { Box, Button, Grid, GridItem, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react'

import Router from "next/router"


export async function getStaticProps() {
    const req = await fetch("http://localhost:8000/appointments/get_all/",
        {
            method: "GET",
        })
    let data = await req.json()
    return {
        props: {
            appointments: data
        }
    }
}



export default function Appointments({ appointments }) {

    


    return <Grid justifyContent={"center"} templateColumns='repeat(5, 1fr)' gap={10} m={20}>
        {
            appointments.map((a) => {
                const { isOpen, onOpen, onClose } = useDisclosure();
                return <GridItem as={"button"} w={"100%"} onClick={isOpen ? onClose : onOpen}key={a.id}>
                    <Modal isOpen={isOpen} onClose={onClose} motionPreset={"scale"}>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>Appointment</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                Want to make the appointment on {a[ "day" ]}/{a[ "month" ] }/{a[ "year" ]} at {a[ "hour" ] < 10 ? "0" + a[ "hour" ] : a[ "hour" ]}:{a[ "minute" ] < 10 ? "0" + a[ "minute" ] : a[ "minute" ]}
                            </ModalBody>

                            <ModalFooter>
                                <Button colorScheme='orange' mr={3} onClick={onClose}>
                                    Close
                                </Button>
                                <Button variant='outline' colorScheme={"blue"} onClick={() => {
                                    Router.push("/appointments/" + a.id)
                                }}>Reserve</Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                    <Box h={"100%"} fontSize={"150%"} borderRadius={"md"} bg={"tomato"} color={"white"} p={5} justifyContent={"center"} key={a.id} display={"flex"}>
                        <div className="text">
                            <p>DATE: {a[ "day" ]} / {a[ "month" ]} / {a[ "year" ]}</p>
                            <br />
                            <p>DAY: {a["name"]}</p>
                            <br />
                            <p>TIME: {a[ "hour" ] < 10 ? "0" + a[ "hour" ] : a[ "hour" ]} : {a[ "minute" ] < 10 ? "0" + a[ "minute" ] : a[ "minute" ]}</p>
                        </div>
                    </Box>
                </GridItem>
            })
        }
    </Grid >
}
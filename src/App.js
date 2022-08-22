import {
    Route,
    Routes
} from "react-router-dom"
import Appointment from "./components/Appointment";
import AppointmentsTable from "./components/AppointmentsTable"
import { useEffect } from "react"


function App() {

    useEffect(() => {
        document.title = "Hidzama"

    }, [])

    return (
        <Routes>
            <Route path="" element={<AppointmentsTable />} />
            <Route path=":id" element={<Appointment />} />
        </Routes>
    );
}

export default App;

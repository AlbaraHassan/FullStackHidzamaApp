import {
    Route,
    Routes
} from "react-router-dom"
import Appointment from "./components/Appointment";
import Appointments from "./components/Appointments";
import AppointmentsTable from "./components/AppointmentsTable"


function App() {
    return (
        <Routes>
            <Route path="" element={<AppointmentsTable />} />
            <Route path="appointments" element={<Appointments />} />
            <Route path=":id" element={<Appointment/>}/>
        </Routes>
    );
}

export default App;

import {
    Route,
    Routes
} from "react-router-dom"
import Appointment from "./components/Appointment";
import AppointmentsTable from "./components/AppointmentsTable"


function App() {
    return (
        <Routes>
            <Route path="" element={<AppointmentsTable />} />
            <Route path=":id" element={<Appointment/>}/>
        </Routes>
    );
}

export default App;

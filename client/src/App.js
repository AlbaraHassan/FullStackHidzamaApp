import {
    Route,
    Routes
} from "react-router-dom"
import Appointments from "./components/Appointments";
import AppointmentsTable from "./components/AppointmentsTable"


function App() {
    return (
        <Routes>
            <Route path="" element={<AppointmentsTable />} />
            <Route path="appointments" element={<Appointments />} />
        </Routes>
    );
}

export default App;

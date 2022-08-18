import {
    Route,
    Routes
} from "react-router-dom"
import Appointments from "./components/Appointments";


function App() {
    return (
            <Routes>
                <Route path="appointments" element={<Appointments />} />
            </Routes>
    );
}

export default App;

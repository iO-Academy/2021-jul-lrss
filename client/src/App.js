import {Route, Switch, BrowserRouter as Router} from 'react-router-dom'
import './App.css';
import LoginPage from "./Components/LoginPage/LoginPage";
import DoctorDayPlannerPage from "./Components/DoctorDayPlannerPage/DoctorDayPlannerPage";
import PatientBookingPage from "./Components/PatientBookingPage/PatientBookingPage";
import PatientProfilePage from "./Components/PatientProfilePage/PatientProfilePage";
import DoctorAppointmentsPage from "./Components/DoctorAppointmentPage/DoctorAppointmentsPage";
import RegisterPage from "./Components/RegisterPage/RegisterPage";

function App() {
  return (
      <Router>
          <Switch>
              <Route exact path="/" component={LoginPage} />
              <Route path="/day-planner" component={DoctorDayPlannerPage} />
              <Route path="/appointment-notes" component={DoctorAppointmentsPage} />
              <Route path="/profile" component={PatientProfilePage} />
              <Route path="/book-appointment" component={PatientBookingPage} />
              <Route path="/register" component={RegisterPage} />
          </Switch>
      </Router>
  );
}

export default App;

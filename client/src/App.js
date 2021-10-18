import {Route, Switch, BrowserRouter as Router} from 'react-router-dom'
import './App.css';
import LoginPage from "./Components/LoginPage/LoginPage";
import DoctorDayPlannerPage from "./Components/DoctorDayPlannerPage/DoctorDayPlannerPage";
import PatientBookingPage from "./Components/PatientBookingPage/PatientBookingPage";
import DoctorAppointmentsPage from "./Components/DoctorAppointmentPage/DoctorAppointmentsPage";

function App() {
  return (
      <Router>
          <Switch>
              <Route exact path="/" component={LoginPage} />
              <Route path="/day-planner" component={DoctorDayPlannerPage} />
              <Route path="/appointment-notes" component={DoctorAppointmentsPage} />
              <Route path="/appointments" component={PatientBookingPage} />
          </Switch>
      </Router>
  );
}

export default App;

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Appointment from "./Pages/Appointments/Appointment";
import Dashboard from "./Pages/Dashboard/Dashboard";
import AddDoctor from "./Pages/Doctors/AddDoctor/AddDoctor";
import ApproveDoctor from "./Pages/Doctors/ApproveDoctor/ApproveDoctor";
import DeleteDoctor from "./Pages/Doctors/DeleteDoctor/DeleteDoctor";
import PatientViewDoctor from "./Pages/Doctors/Doctors/PatientViewDoctor";
import FindDoctor from "./Pages/Doctors/UpdateDoctor/FindDoctor";
import Home from "./Pages/Home/Home/Home";
import { AddLabAssistant } from "./Pages/LabAssistants/AddLabAssistant.jsx";
import AllLabAssistants from "./Pages/LabAssistants/AllAssistants.jsx";
import Login from "./Pages/Login/Login";
import PLogin from "./Pages/Login/PatientLogin";
import Registration from "./Pages/Login/Registration/Registration";
import PageNotFound from "./Pages/PageNotFound/PageNotFound";
import HDPResult from "./Pages/PatientPortal/HeartDiseasePrediction/Result";
import HDPStep01 from "./Pages/PatientPortal/HeartDiseasePrediction/Step01";
import HDPStep02 from "./Pages/PatientPortal/HeartDiseasePrediction/Step02";
import HDPStep03 from "./Pages/PatientPortal/HeartDiseasePrediction/Step03";
import HDPStep04 from "./Pages/PatientPortal/HeartDiseasePrediction/Step04";
import Landing from "./Pages/PatientPortal/Landing";
import ViewAppointments from "./Pages/PatientPortal/ViewAppointments";
import AddPatient from "./Pages/Patients/AddPatients/AddPatient";
import Patients from "./Pages/Patients/Patients/PatientList";
import PatientDetails from "./Pages/Patients/PatientsDetails/PatientDetails";
import ViewDoctors from "./Pages/Patients/ViewDoctors/ViewDoctors";
import DoctorViewAppointments from "./Pages/DoctorPortal/ViewAppointments";
import ViewAssignments from "./Pages/LabAssistantPortal/ViewAssignments";
import ChannelDoctorStep01 from "./Pages/PatientPortal/ChannelDoctor/Step01";
import ChannelDoctorStep02 from "./Pages/PatientPortal/ChannelDoctor/Step02";

function App() {
  return (
    <div className="App">
      {/* <AuthProvider>

      </AuthProvider> */}
      <Router>
        <Routes>
          {/* <Route path="/login" element={<Login />} /> */}
          <Route path="/login" element={<PLogin />} />
          <Route path="/patient-portal">
            <Route path="landing" index element={<Landing />} />
            <Route
              path="view-appointments"
              index
              element={<ViewAppointments />}
            />
            <Route path="heart-disease-prediction">
              <Route path="step-01" element={<HDPStep01 />} />
              <Route path="step-02" element={<HDPStep02 />} />
              <Route path="step-03" element={<HDPStep03 />} />
              <Route path="step-04" element={<HDPStep04 />} />
              <Route path="result" element={<HDPResult />} />
            </Route>
            <Route path="channel-doctor">
              <Route path="step-01" element={<ChannelDoctorStep01 />} />
              <Route path="step-02" element={<ChannelDoctorStep02 />} />
              {/* <Route path="step-02" element={<HDPStep02 />} />
              <Route path="step-03" element={<HDPStep03 />} />
              <Route path="step-04" element={<HDPStep04 />} />
              <Route path="result" element={<HDPResult />} /> */}
            </Route>
          </Route>
          <Route path="/doctor-portal">
            <Route
              path="view-appointments"
              index
              element={<DoctorViewAppointments />}
            />
          </Route>

          <Route path="/lab-assistant-portal">
            <Route
              path="view-assignments"
              index
              element={<ViewAssignments />}
            />
          </Route>
          {/* NESTED ROUTING APPLIED */}
          <Route path="/" element={<Dashboard />}>
            <Route index element={<Home></Home>} />
            <Route path="doctors" element={<PatientViewDoctor />} />
            <Route path="addDoctor" element={<AddDoctor />} />
            <Route path="approveDoctor" element={<ApproveDoctor />} />
            <Route path="deleteDoctor" element={<DeleteDoctor />} />
            <Route path="updateDoctor" element={<FindDoctor />} />
            <Route path="patients" element={<Patients />} />
            <Route path="addPatient" element={<AddPatient />}>
              <Route path=":email" element={<AddPatient />} />
            </Route>
            <Route path="viewDoctors" element={<ViewDoctors />} />
            <Route path="patientDetails/:id" element={<PatientDetails />} />
            <Route path="appointment" element={<Appointment />}>
              <Route path=":email" element={<Appointment />} />
            </Route>
            <Route path="registration" element={<Registration />} />

            <Route path={"all-lab-assistants"} element={<AllLabAssistants />} />
            <Route path={"add-lab-assistant"} element={<AddLabAssistant />} />

            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
        {/* <Footer></Footer> */}
      </Router>
    </div>
  );
}

export default App;

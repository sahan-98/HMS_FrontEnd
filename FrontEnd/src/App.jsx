import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./Pages/Dashboard/Dashboard";
import AddDoctor from "./Pages/Doctors/AddDoctor/AddDoctor";
import PatientViewDoctor from "./Pages/Doctors/Doctors/PatientViewDoctor";
import Home from "./Pages/Home/Home/Home";
import { AddLabAssistant } from "./Pages/LabAssistants/AddLabAssistant.jsx";
import AllLabAssistants from "./Pages/LabAssistants/AllAssistants.jsx";
import Registration from "./Pages/Login/Registration/Registration";
import PageNotFound from "./Pages/PageNotFound/PageNotFound";
import HDPResult from "./Pages/PatientPortal/HeartDiseasePrediction/Result";
import HDPStep01 from "./Pages/PatientPortal/HeartDiseasePrediction/Step01";
import HDPStep02 from "./Pages/PatientPortal/HeartDiseasePrediction/Step02";
import HDPStep03 from "./Pages/PatientPortal/HeartDiseasePrediction/Step03";
import HDPStep04 from "./Pages/PatientPortal/HeartDiseasePrediction/Step04";
import HDPDoctorPayment from "./Pages/PatientPortal/HeartDiseasePrediction/Payment";
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
import ChannelDoctorResult from "./Pages/PatientPortal/ChannelDoctor/Result";
import ChannelDoctorPayment from "./Pages/PatientPortal/ChannelDoctor/Payment";
import GeneralLogin from "./Pages/Login/GeneralLogin";
import AdminLogin from "./Pages/Login/AdminLogin";
import PatientLogin from "./Pages/PatientPortal/PatientLogin";
import DoctorLogin from "./Pages/DoctorPortal/DoctorLogin";

function App() {
  return (
    <div className="App">
      {/* <AuthProvider>

      </AuthProvider> */}
      <Router>
        <Routes>
          {/* <Route path="/login" element={<Login />} /> */}
          <Route path="/login" element={<GeneralLogin />} />
          <Route path="/patient-login" element={<PatientLogin />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/doctor-login" element={<DoctorLogin />} />

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
              <Route path="payment" element={<HDPDoctorPayment />} />
            </Route>
            <Route path="channel-doctor">
              <Route path="step-01" element={<ChannelDoctorStep01 />} />
              <Route path="step-02" element={<ChannelDoctorStep02 />} />
              <Route path="payment" element={<ChannelDoctorPayment />} />
              <Route path="completed" element={<ChannelDoctorResult />} />

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
            <Route path="patients" element={<Patients />} />
            <Route path="addPatient" element={<AddPatient />}>
              <Route path=":email" element={<AddPatient />} />
            </Route>
            <Route path="viewDoctors" element={<ViewDoctors />} />
            <Route path="patientDetails/:id" element={<PatientDetails />} />
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

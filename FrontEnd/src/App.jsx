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
import LabAssistantLogin from "./Pages/LabAssistantPortal/LabAssistantLogin";
import PatientRegistration from "./Pages/PatientPortal/PatientRegistration";
import ViewBills from "./Pages/PatientPortal/ViewBills";
import PayBill from "./Pages/PatientPortal/PayBills";
import AllBeds from "./Pages/Beds/AllBeds";
import { AddBed } from "./Pages/Beds/AddBed";
import ProtectedRoute from "./components/ProtectedRoute";

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
          <Route
            path="/patient-registration"
            element={<PatientRegistration />}
          />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/lab-assistant-login" element={<LabAssistantLogin />} />
          <Route path="/doctor-login" element={<DoctorLogin />} />

          <Route path="/patient-portal">
            <Route
              path="landing"
              index
              element={
                <ProtectedRoute loginPath={"/patient-login"}>
                  <Landing />
                </ProtectedRoute>
              }
            />
            <Route
              path="pay-bill"
              index
              element={
                <ProtectedRoute loginPath={"/patient-login"}>
                  <PayBill />
                </ProtectedRoute>
              }
            />
            <Route
              path="view-appointments"
              index
              element={
                <ProtectedRoute loginPath={"/patient-login"}>
                  <ViewAppointments />
                </ProtectedRoute>
              }
            />
            <Route
              path="view-bills"
              index
              element={
                <ProtectedRoute loginPath={"/patient-login"}>
                  <ViewBills />
                </ProtectedRoute>
              }
            />
            <Route path="heart-disease-prediction">
              <Route
                path="step-01"
                element={
                  <ProtectedRoute loginPath={"/patient-login"}>
                    <HDPStep01 />
                  </ProtectedRoute>
                }
              />
              <Route
                path="step-02"
                element={
                  <ProtectedRoute loginPath={"/patient-login"}>
                    <HDPStep02 />
                  </ProtectedRoute>
                }
              />
              <Route
                path="step-03"
                element={
                  <ProtectedRoute loginPath={"/patient-login"}>
                    <HDPStep03 />
                  </ProtectedRoute>
                }
              />
              <Route
                path="step-04"
                element={
                  <ProtectedRoute loginPath={"/patient-login"}>
                    <HDPStep04 />
                  </ProtectedRoute>
                }
              />
              <Route
                path="result"
                element={
                  <ProtectedRoute loginPath={"/patient-login"}>
                    <HDPResult />
                  </ProtectedRoute>
                }
              />
              <Route
                path="payment"
                element={
                  <ProtectedRoute loginPath={"/patient-login"}>
                    <HDPDoctorPayment />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="channel-doctor">
              <Route
                path="step-01"
                element={
                  <ProtectedRoute loginPath={"/patient-login"}>
                    <ChannelDoctorStep01 />
                  </ProtectedRoute>
                }
              />
              <Route
                path="step-02"
                element={
                  <ProtectedRoute loginPath={"/patient-login"}>
                    <ChannelDoctorStep02 />
                  </ProtectedRoute>
                }
              />
              <Route
                path="payment"
                element={
                  <ProtectedRoute loginPath={"/patient-login"}>
                    <ChannelDoctorPayment />
                  </ProtectedRoute>
                }
              />
              <Route
                path="completed"
                element={
                  <ProtectedRoute loginPath={"/patient-login"}>
                    <ChannelDoctorResult />
                  </ProtectedRoute>
                }
              />

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
              element={
                <ProtectedRoute loginPath={"/doctor-login"}>
                  <DoctorViewAppointments />
                </ProtectedRoute>
              }
            />
          </Route>

          <Route path="/lab-assistant-portal">
            <Route
              path="view-assignments"
              index
              element={
                <ProtectedRoute loginPath={"/lab-assistant-login"}>
                  <ViewAssignments />
                </ProtectedRoute>
              }
            />
          </Route>
          {/* NESTED ROUTING APPLIED */}
          <Route
            path="/"
            element={
              <ProtectedRoute loginPath={"/admin-login"}>
                <Dashboard />{" "}
              </ProtectedRoute>
            }
          >
            <Route index element={<Home></Home>} />

            <Route path="doctors" element={<PatientViewDoctor />} />
            <Route path="addDoctor" element={<AddDoctor />} />
            <Route path="patients" element={<Patients />} />
            <Route path="addPatient" element={<AddPatient />}>
              <Route path=":email" element={<AddPatient />} />
            </Route>
            <Route path="beds" element={<AllBeds />} />
            <Route path="add-bed" element={<AddBed />} />
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

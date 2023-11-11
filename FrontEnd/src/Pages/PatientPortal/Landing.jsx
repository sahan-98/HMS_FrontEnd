import Layout from "./Layout";
import PatientChoiseCard from "./PatientChoiseCard";
import doctor from "../../assets/images/doctor.png";
import heart from "../../assets/images/heart.png";
import bill from "../../assets/images/bill.png";
import appointment from "../../assets/images/appointment.png";
import Header from "./Header";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import PatientService from "../../app/services/patient-service";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../reducers/loginSlice";
import { showSystemAlert } from "../../app/services/alertServices";
import { GiPowerButton } from "react-icons/gi";

const Landing = () => {
  const navigate = useNavigate();

  const patientId = useSelector((state) => state.patient._id);
  const dispatch = useDispatch();

  const handleCDClick = useCallback(() => {
    navigate("/patient-portal/channel-doctor/step-01");
  }, [navigate]);

  const handleHDPCardClick = useCallback(() => {
    navigate("/patient-portal/heart-disease-prediction/step-01");
  }, [navigate]);

  const handleAppointmentsClick = useCallback(() => {
    navigate("/patient-portal/view-appointments");
  }, [navigate]);

  const handleBillClick = useCallback(() => {
    navigate("/patient-portal/view-bills");
  }, [navigate]);

  const handleLogoutClick = useCallback(async () => {
    console.log("logout");
    try {
      const logoutResponse = await PatientService.logout({ patientId });
      const { message } = logoutResponse;
      if (message === "Logout successful") {
        dispatch(logout());
        showSystemAlert("You have successfully logged out", "success");
        navigate("/patient-login");
      }
    } catch (error) {
      console.log(error);
      showSystemAlert("An error occured while loggin out", "error");
    }
  }, [patientId, dispatch, navigate]);


  return (
    <Layout>
      <Header />
      <IconButton sx={{
        position: "absolute",
        top: 20,
        right: 20
      }} title="Logout" onClick={handleLogoutClick}>
            <GiPowerButton />
      </IconButton>
      <div
        style={{
          height: "50vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "6rem",
        }}
      >
        {/* <PatientChoiseCard onClick={handleHDPCardClick}>
          <img src={heart} alt="check heart disease" />
          <h4>Check Heart Disease</h4>
        </PatientChoiseCard> */}
        <PatientChoiseCard onClick={handleCDClick}>
          <img src={doctor} alt="doctor" />
          <h4>Channel doctor</h4>
        </PatientChoiseCard>

        <PatientChoiseCard onClick={handleAppointmentsClick}>
          <img
            src={appointment}
            alt="appointments"
            width="100px"
            style={{ marginTop: "8px" }}
          />
          <h4>View Appointments</h4>
        </PatientChoiseCard>
        <PatientChoiseCard onClick={handleBillClick}>
          <img
            src={bill}
            alt="appointments"
            width="100px"
            style={{ marginTop: "3px" }}
          />
          <h4>View Bills</h4>
        </PatientChoiseCard>
      </div>
    </Layout>
  );
};

export default Landing;

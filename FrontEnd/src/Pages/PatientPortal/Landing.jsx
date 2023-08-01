import Layout from "./Layout";
import PatientChoiseCard from "./PatientChoiseCard";
import doctor from "../../assets/images/doctor.png";
import heart from "../../assets/images/heart.png";
import appointment from "../../assets/images/appointment.png";
import Header from "./Header";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  const handleCDClick = useCallback(() => {
    navigate("/patient-portal/channel-doctor/step-01");
  }, [navigate]);

  const handleHDPCardClick = useCallback(() => {
    navigate("/patient-portal/heart-disease-prediction/step-01");
  }, [navigate]);

  const handleAppointmentsClick = useCallback(() => {
    navigate("/patient-portal/view-appointments");
  }, [navigate]);

  return (
    <Layout>
      <Header />
      <div
        style={{
          height: "50vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "6rem",
        }}
      >
        <PatientChoiseCard onClick={handleCDClick}>
          <img src={doctor} alt="doctor" />
          <h4>Channel doctor</h4>
        </PatientChoiseCard>
        <PatientChoiseCard onClick={handleHDPCardClick}>
          <img src={heart} alt="check heart disease" />
          <h4>Check Heart Disease</h4>
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
      </div>
    </Layout>
  );
};

export default Landing;

import { Grid } from "@mui/material";
// import Map from '../../Map/Map'
import Banner from "../Banner/Banner";
import DetailsChart from "../DetailsChart/DetailsChart";
import UserInfo from "../UserInfo/UserInfo";
import { useState } from "react";

const Home = () => {
  const [doctors, setDoctors] = useState("");
  const [patients, setPatients] = useState("");
  const [labReports, setLabReports] = useState("");
  const [pendingLabReports, setPendingLabReports] = useState("");
  const [bedCount, setBedCount] = useState("");

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <Banner
            doctors={doctors}
            setDoctors={setDoctors}
            patients={patients}
            setPatients={setPatients}
            labReports={labReports}
            setLabReports={setLabReports}
            pendingLabReports={pendingLabReports}
            setPendingLabReports={setPendingLabReports}
            bedCount={bedCount}
            setBedCount={setBedCount}
          ></Banner>
          <DetailsChart
            doctors={doctors}
            patients={patients}
            labReports={labReports}
            pendingLabReports={pendingLabReports}
            bedCount={bedCount}
          ></DetailsChart>
          <UserInfo></UserInfo>
        </Grid>
      </Grid>
      {/* <Map></Map> */}
    </div>
  );
};

export default Home;

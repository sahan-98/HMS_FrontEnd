import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
// import Map from '../../Map/Map'
import Banner from "../Banner/Banner";
import DetailsChart from "../DetailsChart/DetailsChart";
import Feedback from "../Feedback/Feedback";
import RadialChart from "../PatientAgeChart/RadialChart";
import TodaysDoctors from "../TodaysDoctors/TodaysDoctors";
import UserInfo from "../UserInfo/UserInfo";

const Home = () => {
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <Banner></Banner>
          <DetailsChart></DetailsChart>
          <UserInfo></UserInfo>
        </Grid>
      </Grid>
      {/* <Map></Map> */}
    </div>
  );
};

export default Home;

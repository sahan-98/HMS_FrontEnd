import { Box, Paper, Typography } from "@mui/material";
import React from "react";
import { FaAccessibleIcon, FaAmbulance, FaUserTie } from "react-icons/fa";
import { GiCherish } from "react-icons/gi";
import { FiUsers } from "react-icons/fi";
import { TbBed } from "react-icons/tb";
import { MdPersonPin } from "react-icons/md";

const Banner = () => {
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: {
            xs: "center",
            sm: "center",
            md: "space-around",
            lg: "space-around",
            xl: "center",
          },
          alignItems: "center",
          gap: "1rem 2.6rem",
          flexWrap: "wrap",
          width: "100%",
          fontFamily: "monospace",
        }}
      >
        <Paper elevation={2} sx={{ padding: "1rem", width: "14rem" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-evenly",
            }}
          >
            <div>
              <GiCherish
                style={{
                  fontSize: "3rem",
                  color: "#22577E",
                  border: "2px solid #22577E",
                  borderRadius: "20%",
                  padding: "5px",
                }}
              />
            </div>
            <div>
              <Typography sx={{ fontWeight: "800" }}>128</Typography>
              <p>Doctors</p>
            </div>
          </Box>
          <Typography>3 doctors joined today</Typography>
        </Paper>
        <Paper elevation={2} sx={{ padding: "1rem", width: "14rem" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-evenly",
            }}
          >
            <div>
              <FaAccessibleIcon
                style={{
                  fontSize: "3rem",
                  color: "#125B50",
                  border: "2px solid #125B50",
                  borderRadius: "20%",
                  padding: "5px",
                }}
              />
            </div>
            <div>
              <Typography sx={{ fontWeight: "800" }}>155</Typography>
              <p>Patients</p>
            </div>
          </Box>
          <Typography>122 new patients admitted</Typography>
        </Paper>
        <Paper elevation={2} sx={{ padding: "1rem", width: "14rem" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-evenly",
            }}
          >
            <div>
              <FiUsers
                style={{
                  fontSize: "3rem",
                  color: "#1572A1",
                  border: "2px solid #1572A1",
                  borderRadius: "20%",
                  padding: "5px",
                }}
              />
            </div>
            <div>
              <Typography sx={{ fontWeight: "800" }}>452</Typography>
              <p>Lab Reports</p>
            </div>
          </Box>
          <Typography>12 Labs Reports pending</Typography>
        </Paper>
      </Box>
    </Box>
  );
};

export default Banner;

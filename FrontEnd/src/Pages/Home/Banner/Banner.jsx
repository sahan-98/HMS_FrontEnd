import { Box, Paper, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { FaAccessibleIcon } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { GiCherish } from "react-icons/gi";
import DoctorService from "../../../app/services/doctor-service";
import LabReportService from "../../../app/services/lab-report-service";
import PatientService from "../../../app/services/patient-service";

const Banner = () => {
  const [doctors, setDoctors] = useState("");
  const [patients, setPatients] = useState("");
  const [labReports, setLabReports] = useState("");
  const [pendingLabReports, setPendingLabReports] = useState("");

  const getDoctorCount = useCallback(async () => {
    try {
      const reponse = await DoctorService.getDoctorCount();
      setDoctors(reponse.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const getPatientCount = useCallback(async () => {
    try {
      const reponse = await PatientService.getPatientCount();
      setPatients(reponse.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const getLabReportCount = useCallback(async () => {
    try {
      const reponse = await LabReportService.getAllReportCount();
      setLabReports(reponse.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const getPendingLabReportCount = useCallback(async () => {
    try {
      const reponse = await LabReportService.getPendingCount();
      setPendingLabReports(reponse.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getDoctorCount();
    getPatientCount();
    getLabReportCount();
    getPendingLabReportCount();
  }, [
    getDoctorCount,
    getPatientCount,
    getLabReportCount,
    getPendingLabReportCount,
  ]);

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
              <Typography sx={{ fontWeight: "800" }}>{doctors}</Typography>
              <p>Doctors</p>
            </div>
          </Box>
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
              <Typography sx={{ fontWeight: "800" }}>{patients}</Typography>
              <p>Patients</p>
            </div>
          </Box>
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
              <Typography sx={{ fontWeight: "800" }}>{labReports}</Typography>
              <p> Lab reports({pendingLabReports})</p>
            </div>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default Banner;

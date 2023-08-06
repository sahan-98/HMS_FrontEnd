import BlueAcentCard from "../../../components/BlueAcentCard/BlueAcentCardAppointments";
import Header from "../Header";
import Layout from "../Layout";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  styled,
} from "@mui/material";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useCallback, useState } from "react";
//import { useNavigate } from "react-router-dom";
import HeadingText from "../../../components/HeadingText/HeadingText";
//import { useDispatch, useSelector } from "react-redux";
//import { setHeartDiseasePrediction } from "../../../reducers/heartDiseasePredictionSlice";

// const StyledButton = styled(Button)(`
// border-radius: 7px;
// border: 1px solid #DEDEDE;
// background: #59C169;
// color: #fff;
// :hover {
//   background: #68E87D;
// }
// `);

const ChannelDoc = () => {
  // const dispatch = useDispatch();
  // const doctorChannelState = useSelector((state) => state.doctorChannel);
  // const navigate = useNavigate();
  const [specialization, setSpecialization] = useState("NO_SELECTION");
  const [doctor, setDoctor] = useState("NO_SELECTION");

  // const handleNextClick = useCallback(() => {
  //   dispatch(
  //     setHeartDiseasePrediction({
  //       ...doctorChannelState,
  //       specialization: specialization,
  //       doctor: doctor,
  //     })
  //   );
  //   navigate("/patient-portal/heart-disease-prediction/step-02");
  // }, [navigate, dispatch, heartDiseasePredictionState, specialization, doctor]);

  const handleSpecializationChange = useCallback((event) => {
    setSpecialization(event.target.value);
  }, []);

  const handleDoctorChange = useCallback((event) => {
    setDoctor(event.target.value);
  }, []);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));
  function createData(date, time, totApp) {
    return { date, time, totApp };
  }

  const rows = [
    createData("23.08.2023", "06.00pm", 23),
    createData("23.08.2023", "06.00pm", 23),
    createData("23.08.2023", "06.00pm", 23),
    createData("23.08.2023", "06.00pm", 23),
  ];

  return (
    <Layout>
      <Header />
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "start",
          gap: "8rem",
        }}
      >
        <BlueAcentCard>
          <HeadingText text="Channel Doctor" />

          <FormControl fullWidth sx={{ mt: 2, textAlign: "start" }}>
            <InputLabel id="demo-simple-select-label">
              Doctor Specialization
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              value={specialization}
              label="Doctor Specialization"
              onChange={handleSpecializationChange}
            >
              <MenuItem value={"NO_SELECTION"}>Please select</MenuItem>
              <MenuItem value={"MALE"}>Male</MenuItem>
              <MenuItem value={"FEMALE"}>Female</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ mt: 2, textAlign: "start" }}>
            <InputLabel id="demo-simple-select-label">Select Doctor</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              value={doctor}
              label="Select Doctor"
              onChange={handleDoctorChange}
            >
              <MenuItem value={"NO_SELECTION"}>Please select</MenuItem>
              <MenuItem value={"MALE"}>Male</MenuItem>
              <MenuItem value={"FEMALE"}>Female</MenuItem>
            </Select>
          </FormControl>
          {/* <Progress currentStep={0} />
          <StyledButton fullWidth sx={{ my: 4 }} onClick={handleNextClick}>
            Next
          </StyledButton> */}

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700, mt: 2 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Date</StyledTableCell>
                  <StyledTableCell align="right">Time</StyledTableCell>
                  <StyledTableCell align="right">
                    No of Appointments
                  </StyledTableCell>
                  <StyledTableCell align="right">Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <StyledTableRow key={row.date}>
                    <StyledTableCell component="th" scope="row">
                      {row.date}
                    </StyledTableCell>
                    <StyledTableCell align="right">{row.time}</StyledTableCell>

                    <StyledTableCell align="right">
                      {row.totApp}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.totApp}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </BlueAcentCard>
      </div>
    </Layout>
  );
};

export default ChannelDoc;

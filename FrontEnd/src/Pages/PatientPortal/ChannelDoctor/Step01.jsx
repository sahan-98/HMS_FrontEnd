import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  styled,
} from "@mui/material";
import { useCallback, useState } from "react";
import BlueAcentCard from "../../../components/BlueAcentCard/BlueAcentCard";
import HeadingText from "../../../components/HeadingText/HeadingText";
import Header from "../Header";
import Layout from "../Layout";
import "./table.css";
import { useNavigate } from "react-router-dom";

const StyledButton = styled(Button)(`
border-radius: 7px;
border: 1px solid #DEDEDE;
background: #59C169; 
color: #fff;
min-width: 30px;
font-size: 10px;
font-weight: 600;
padding: 3px 10px;
:hover {
  background: #68E87D;
}
`);

const Step01 = () => {
  const navigate = useNavigate();
  const [specialization, setSpecialization] = useState("");
  const [doctor, setDoctor] = useState("");

  const handleSpecializationChange = useCallback((event) => {
    setSpecialization(event.target.value);
  }, []);
  const handleDoctorChange = useCallback((event) => {
    setDoctor(event.target.value);
  }, []);

  return (
    <Layout>
      <Header />
      <div
        style={{
          height: "70vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "start",
          gap: "8rem",
        }}
      >
        <BlueAcentCard width="450px">
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
              <MenuItem value={"MALE"}>Male</MenuItem>
              <MenuItem value={"FEMALE"}>Female</MenuItem>
            </Select>
          </FormControl>
          <div
            style={{
              overflow: "auto",
              height: "178px",
              scrollbarWidth: "thin",
              marginTop: "1rem",
              marginBottom: "1rem",
            }}
          >
            <table className="fixed_header">
              <thead>
                <tr>
                  <th>Doctor</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>No.of Appointments</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Dr. John Doe</td>
                  <td>Sunday</td>
                  <td>10.00 AM</td>
                  <td>10</td>
                  <td>
                    <StyledButton
                      onClick={() => {
                        navigate("/patient-portal/channel-doctor/step-02");
                      }}
                    >
                      Book
                    </StyledButton>
                  </td>
                </tr>
                <tr>
                  <td>Dr. John Doe</td>
                  <td>Monday</td>
                  <td>10.00 AM</td>
                  <td>10</td>
                  <td>
                    <StyledButton>Book</StyledButton>
                  </td>
                </tr>
                <tr>
                  <td>Dr. John Doe</td>
                  <td>Tuesday</td>
                  <td>10.00 AM</td>
                  <td>10</td>
                  <td>
                    <StyledButton>Book</StyledButton>
                  </td>
                </tr>
                <tr>
                  <td>Dr. John Doe</td>
                  <td>Wednesday</td>
                  <td>10.00 AM</td>
                  <td>10</td>
                  <td>
                    <StyledButton>Book</StyledButton>
                  </td>
                </tr>
                <tr>
                  <td>Dr. John Doe</td>
                  <td>Thursday</td>
                  <td>10.00 AM</td>
                  <td>10</td>
                  <td>
                    <StyledButton>Book</StyledButton>
                  </td>
                </tr>
                <tr>
                  <td>Dr. John Doe</td>
                  <td>Friday</td>
                  <td>10.00 AM</td>
                  <td>10</td>
                  <td>
                    <StyledButton>Book</StyledButton>
                  </td>
                </tr>
                <tr>
                  <td>Dr. John Doe</td>
                  <td>Saturday</td>
                  <td>10.00 AM</td>
                  <td>10</td>
                  <td>
                    <StyledButton>Book</StyledButton>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </BlueAcentCard>
      </div>
    </Layout>
  );
};

export default Step01;

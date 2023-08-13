import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  styled,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import BlueAcentCard from "../../../components/BlueAcentCard/BlueAcentCard";
import HeadingText from "../../../components/HeadingText/HeadingText";
import Header from "../Header";
import Layout from "../Layout";
import "./table.css";
import { useNavigate } from "react-router-dom";
import DoctorService from "../../../app/services/doctor-service";

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

const TableRow = ({ doctor, dateName, timeKeyName }) => {
  const navigate = useNavigate();

  return (
    <tr>
      <td>{doctor?.name}</td>
      <td>{dateName}</td>
      <td>{doctor[timeKeyName]}</td>
      <td>10</td>
      <td>
        <StyledButton
          onClick={() => {
            navigate(`/patient-portal/channel-doctor/step-02`);
          }}
        >
          Book
        </StyledButton>
      </td>
    </tr>
  );
};

const Step01 = () => {
  const navigate = useNavigate();
  const [specialization, setSpecialization] = useState("");
  const [specializationList, setSpecializationList] = useState([]);
  const [doctorList, setDoctorList] = useState([]);
  const [filteredDoctorList, setFilteredDoctorList] = useState([]);
  const [doctor, setDoctor] = useState("");

  const onSelectSpecialization = useCallback(
    (selectedSpecialization) => {
      const filteredDoctors = doctorList.filter(
        (doctor) => doctor.speciality === selectedSpecialization
      );
      setFilteredDoctorList(filteredDoctors);
    },
    [doctorList]
  );

  const handleSpecializationChange = useCallback(
    (event) => {
      let selectedSpecialization = event.target.value;
      setSpecialization(selectedSpecialization);
      onSelectSpecialization(selectedSpecialization);
    },
    [onSelectSpecialization]
  );
  const handleDoctorChange = useCallback((event) => {
    setDoctor(event.target.value);
  }, []);

  const loadSpecializations = useCallback(async () => {
    const availableDoctors = await DoctorService.getAvailableDoctors();
    setDoctorList(availableDoctors);
    const specializations = new Set();
    availableDoctors.forEach((doctor) => {
      specializations.add(doctor.speciality);
    });
    setSpecializationList(Array.from(specializations));
  }, []);

  useEffect(() => {
    loadSpecializations();
  }, [loadSpecializations]);

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
              {specializationList.map((specialization, index) => {
                return (
                  <MenuItem value={specialization} key={index}>
                    {specialization}
                  </MenuItem>
                );
              })}
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
              {filteredDoctorList.map((doctor, index) => {
                return (
                  <MenuItem value={doctor} key={index}>
                    {doctor?.name}
                  </MenuItem>
                );
              })}
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
                {doctor._id ? null : (
                  <tr>
                    <td colSpan={5}>Please select a doctor</td>
                  </tr>
                )}

                {doctor.sunAvailbleTime ? (
                  <TableRow
                    doctor={doctor}
                    dateName="Sunday"
                    timeKeyName="sunAvailbleTime"
                  />
                ) : null}

                {doctor.monAvailbleTime ? (
                  <TableRow
                    doctor={doctor}
                    dateName="Monday"
                    timeKeyName="monAvailbleTime"
                  />
                ) : null}

                {doctor.tueAvailbleTime ? (
                  <TableRow
                    doctor={doctor}
                    dateName="Tuesday"
                    timeKeyName="tueAvailbleTime"
                  />
                ) : null}

                {doctor.wensAvailbleTime ? (
                  <TableRow
                    doctor={doctor}
                    dateName="Wednesday"
                    timeKeyName="wensAvailbleTime"
                  />
                ) : null}

                {doctor.thusAvailbleTime ? (
                  <TableRow
                    doctor={doctor}
                    dateName="Thursday"
                    timeKeyName="thusAvailbleTime"
                  />
                ) : null}

                {doctor.friAvailbleTime ? (
                  <TableRow
                    doctor={doctor}
                    dateName="Friday"
                    timeKeyName="friAvailbleTime"
                  />
                ) : null}

                {doctor.satAvailbleTime ? (
                  <TableRow
                    doctor={doctor}
                    dateName="Saturday"
                    timeKeyName="satAvailbleTime"
                  />
                ) : null}
              </tbody>
            </table>
          </div>
        </BlueAcentCard>
      </div>
    </Layout>
  );
};

export default Step01;

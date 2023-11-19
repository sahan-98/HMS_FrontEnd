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
import { useNavigate, useSearchParams } from "react-router-dom";
import DoctorService from "../../../app/services/doctor-service";
import { useDispatch, useSelector } from "react-redux";
import { placeAppointment } from "../../../reducers/placeAppointmentSlice";
import PropTypes from "prop-types";
import Actions from "../../../components/Actions/Actions";

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

const StyledRedButton = styled(Button)(`
border-radius: 7px;
border: 1px solid #DEDEDE;
background: #DC143C; 
color: #fff;
min-width: 30px;
font-size: 10px;
font-weight: 600;
padding: 3px 10px;
:hover {
  background: #DC143C;
}
`);

const TableRow = ({ doctor, dateName, timeKeyName, appointmentType }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const patient = useSelector((state) => state.patient);

  return (
    <tr>
      <td>{doctor?.name}</td>
      <td>{dateName}</td>
      <td>{doctor[timeKeyName]}</td>
      <td>10</td>
      <td>
        <StyledButton
          onClick={() => {
            dispatch(
              placeAppointment({
                doctorid: doctor?.doctorid,
                patientid: patient?._id,
                bookingDate: new Date().toISOString().split("T")[0],
                appointmentType: appointmentType,
                type: "Normal",
                fee: doctor?.fee,
                doctorAvailability: timeKeyName,
              })
            );
            navigate(`/patient-portal/channel-doctor/step-02`);
          }}
        >
          Book
        </StyledButton>
      </td>
    </tr>
  );
};

TableRow.propTypes = {
  doctor: PropTypes.object,
  dateName: PropTypes.string,
  timeKeyName: PropTypes.string,
  appointmentType: PropTypes.string,
};

const Step01 = () => {
  // const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const speciality = searchParams.get("speciality");
  const [specialization, setSpecialization] = useState("");
  const [specializationList, setSpecializationList] = useState([]);
  const [doctorList, setDoctorList] = useState([]);
  const [filteredDoctorList, setFilteredDoctorList] = useState([]);
  const [doctor, setDoctor] = useState("");
  const [appointmentType, setAppointmentType] = useState("Normal");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const patient = useSelector((state) => state.patient);
  const {type} = useSelector((state) => state.placeAppointment);
  
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
  const handleAppointmentTypeChange = useCallback((event) => {
    setAppointmentType(event.target.value);
  }, []);

  const handleDoctorChange = useCallback((event) => {
    setDoctor(event.target.value);
  }, []);

  const loadSpecializations = useCallback(async () => {
    let availableDoctors = await DoctorService.getAllDoctors();
    availableDoctors = availableDoctors.data;
    setDoctorList(availableDoctors);
    const specializations = new Set();
    availableDoctors.forEach((doctor) => {
      specializations.add(doctor.speciality);
    });
    setSpecializationList(Array.from(specializations));
    if (speciality) {
      setSpecialization(speciality);
      const filteredDoctors = availableDoctors.filter(
        (doctor) => doctor.speciality === speciality
      );
      setFilteredDoctorList(filteredDoctors);
    }
  }, [speciality]);

  useEffect(() => {
    loadSpecializations();
  }, [loadSpecializations]);

  return (
    <Layout>
      <Header />
      <Actions />
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
          <HeadingText text={type === "Urgent" ? "Emergency Request" :"Channel Doctor"} />
          {/* <FormControl fullWidth sx={{ mt: 2, textAlign: "start" }}>
            <InputLabel id="demo-simple-select-label">Select Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              value={appointmentType}
              label="Select Type"
              onChange={handleAppointmentTypeChange}
            >
              {["Urgent", "Normal"].map((type, index) => {
                return (
                  <MenuItem value={type} key={index}>
                    {type}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl> */}
          {appointmentType === "Normal" ? (
            <>
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
                <InputLabel id="demo-simple-select-label">
                  Select Doctor
                </InputLabel>
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
                        appointmentType={appointmentType}
                      />
                    ) : null}

                    {doctor.monAvailbleTime ? (
                      <TableRow
                        doctor={doctor}
                        dateName="Monday"
                        timeKeyName="monAvailbleTime"
                        appointmentType={appointmentType}
                      />
                    ) : null}

                    {doctor.tueAvailbleTime ? (
                      <TableRow
                        doctor={doctor}
                        dateName="Tuesday"
                        timeKeyName="tueAvailbleTime"
                        appointmentType={appointmentType}
                      />
                    ) : null}

                    {doctor.wensAvailbleTime ? (
                      <TableRow
                        doctor={doctor}
                        dateName="Wednesday"
                        timeKeyName="wensAvailbleTime"
                        appointmentType={appointmentType}
                      />
                    ) : null}

                    {doctor.thusAvailbleTime ? (
                      <TableRow
                        doctor={doctor}
                        dateName="Thursday"
                        timeKeyName="thusAvailbleTime"
                        appointmentType={appointmentType}
                      />
                    ) : null}

                    {doctor.friAvailbleTime ? (
                      <TableRow
                        doctor={doctor}
                        dateName="Friday"
                        timeKeyName="friAvailbleTime"
                        appointmentType={appointmentType}
                      />
                    ) : null}

                    {doctor.satAvailbleTime ? (
                      <TableRow
                        doctor={doctor}
                        dateName="Saturday"
                        timeKeyName="satAvailbleTime"
                        appointmentType={appointmentType}
                      />
                    ) : null}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <StyledRedButton
              fullWidth
              sx={{
                mt: 4,
                mb: 5,
                p: 1.5,
                fontSize: 12,
              }}
              onClick={() => {
                dispatch(
                  placeAppointment({
                    patientid: patient?._id,
                    bookingDate: new Date().toISOString().split("T")[0],
                    type: appointmentType,
                  })
                );
                navigate(`/patient-portal/channel-doctor/step-02`);
              }}
            >
              {" "}
              Make Request
            </StyledRedButton>
          )}
        </BlueAcentCard>
      </div>
    </Layout>
  );
};

export default Step01;

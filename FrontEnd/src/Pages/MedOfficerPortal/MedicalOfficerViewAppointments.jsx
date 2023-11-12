import { Search } from "@mui/icons-material";
import {
  Box,
  Button,
  InputAdornment,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  styled,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppointmentService from "../../app/services/appointment-service";
import Actions from "../../components/Actions/Actions";
import LabReport from "../LabReport/LabReport";
import Layout from "../PatientPortal/Layout";
import Header from "../PatientPortal/Header";
import PatientService from "../../app/services/patient-service";
import { store } from "../../app/store";
import { setPatient } from "../../reducers/patientSlice";
import { setAppointmentId } from "../../reducers/heartDiseasePredictionSlice";
import { useNavigate } from "react-router-dom";

const StyledDiv = styled("div")(
  `
  border-radius: 5px;
  border: 1px solid #67aff1;
  box-shadow: 0px 0px 60px 4px rgba(119, 148, 224, 0.5);
  background-color: #fff;
  padding: 0.5rem 1rem;
  :hover {
    box-shadow: 0px 0px 60px 4px rgba(119, 148, 224, 0.7);
  }
`,
  (props) => (props.width ? { width: props.width } : "")
);

const StyledText = styled(Typography)(`
  font-size: 1.5rem;
  font-family: Hina Mincho;
  color: #636363;
  font-style: normal;
  font-weight: 400;
`);

const StyledButton = styled(Button)(
  ({ btnColor }) => `
border-radius: 7px;
border: 1px solid #DEDEDE;
background:${btnColor ? btnColor : "#59C169"}; 
color: #fff;
min-width: 30px;
font-size: 10px;
font-weight: 600;
padding: 3px 10px;
:hover {
  background: ${btnColor ? btnColor : "#59C169"}; ;
}
`
);

const StyledToggleButtonGroup = styled(ToggleButtonGroup)({
  borderRadius: 30,
  backgroundColor: "#fff",
  border: `solid 1px #67aff1`,
  "& .MuiToggleButton-root": {
    margin: 4,
    borderColor: "transparent !important",
    borderRadius: 30,
  },
});
const StyledToggleButton = styled(ToggleButton)({
  borderRadius: 30,
  backgroundColor: "#fff",
  border: `solid 1px #67aff1`,
  "&.Mui-selected": {
    backgroundColor: "#1c77f2",
    color: "#fff",
    borderRadius: 30,
  },
  "&.Mui-selected:hover": {
    backgroundColor: "#3E84E3",
    color: "#fff",
  },
  "&.MuiToggleButton-root": {
    fontSize: "11px",
    borderRadius: 30,
  },
});

const StyledTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    borderRadius: 30,
    height: "38px",
    fontSize: "14px",
  },
});
const dayNames = {
  sunAvailbleTime: "Sunday",
  monAvailbleTime: "Monday",
  tueAvailbleTime: "Tuesday",
  wensAvailbleTime: "Wednesday",
  thusAvailbleTime: "Thursday",
  friAvailbleTime: "Friday",
  satAvailbleTime: "Saturday",
};

const MedicalOfficerViewAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  const patient = useSelector((state) => state.patient);
  const [selectedType, setSelectedType] = useState("pending");
  const [searchText, setSearchText] = useState("");
  const [labReportOpen, setLabReportOpen] = useState(false);
  const [labReportToShow, setLabReportToShow] = useState({});

  const loadAppointments = useCallback(async () => {
    try {
      let appointments = await AppointmentService.getAllAppointments();
      appointments = appointments?.data.map((appointment, index) => ({
        id: index + 1,
        doctorName: appointment?.doctor?.name,
        date: dayNames[appointment?.doctorAvailability],
        time: appointment?.doctor[appointment?.doctorAvailability],
        visitStatus: appointment?.visitStatus,
        queueNumber: appointment?.queueNumber,
        appointment,
        appointmentType: appointment?.appointmentType,
      }));
      setAppointments(appointments);
    } catch (error) {
      console.log(error);
    }
  }, [patient]);

  useEffect(() => {
    loadAppointments();
  }, [loadAppointments]);

  const columns = [
    { field: "id", headerName: "#", width: 50 },
    {
      field: "doctorName",
      headerName: "Doctor name",
      width: 180,
      align: "center",
      headerAlign: "center",
    },
    { field: "date", headerName: "Date", width: 100 },
    { field: "time", headerName: "Time", width: 100 },
    {
      field: "appointmentType",
      headerName: "Appointment type",
      width: 150,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "queueNumber",
      headerName: "Appointment Number",
      width: 70,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 180,
      align: "center",
      headerAlign: "center",
      disableClickEventBubbling: true,
      renderCell: (params) => {
        const { appointment } = params.row;
        const onClick = async () => {
          //get patient details and set appointment details
          const patient = await PatientService.gePatientById({
            patientId: appointment?.patientid,
          });
          console.log(patient);
          store.dispatch(setPatient({ ...patient.data }));
          store.dispatch(setAppointmentId({ appointmentId: appointment?._id }));
          navigate('/patient-portal/heart-disease-prediction/step-01');
        };
        return (
          <>
            <StyledButton onClick={onClick}>Predict</StyledButton>
          </>
        );
      },
    },
  ];

  let filteredAppointments = [...appointments];
  if (searchText.length > 0) {
    filteredAppointments = appointments.filter(
      (appointment) =>
        appointment?.doctorName
          .toLowerCase()
          .includes(searchText.toLowerCase()) ||
        appointment?.date.toLowerCase().includes(searchText.toLowerCase())
    );
  }

  filteredAppointments = filteredAppointments.filter((appointment) =>
    selectedType === "pending"
      ? appointment?.visitStatus === "pending"
      : appointment?.visitStatus === "completed"
  );

  return (
    <Layout>
      <Header />
      <Actions />
      {labReportOpen && (
        <LabReport
          open={labReportOpen}
          setOpen={setLabReportOpen}
          data={{ ...labReportToShow }}
        />
      )}
      <div
        style={{
          height: "70vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "start",
        }}
      >
        <StyledDiv width="850px">
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mt: "0.5rem",
            }}
          >
            <StyledText>Appointments</StyledText>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <StyledTextField
                placeholder="Search Appointments"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
                size="small"
                sx={{
                  width: "230px",
                }}
                value={searchText}
                onChange={(event) => {
                  setSearchText(event.target.value);
                }}
              />
              {/* <StyledToggleButtonGroup
                color="primary"
                exclusive
                aria-label="Platform"
                size="small"
                value={selectedType}
                onChange={(event, newType) => {
                  if (newType !== null) {
                    setSelectedType(newType);
                  }
                }}
                sx={{
                  height: "2.3rem",
                  ml: "1rem",
                }}
              >
                <StyledToggleButton value="pending" sx={{ px: 2.2 }}>
                  Pending
                </StyledToggleButton>
                <StyledToggleButton value="completed">
                  Completed
                </StyledToggleButton>
              </StyledToggleButtonGroup> */}
            </Box>
          </Box>

          <div style={{ height: "55vh", width: "100%", padding: "1rem 0" }}>
            <DataGrid
              rows={filteredAppointments}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              pageSizeOptions={[5, 10]}
            />
          </div>
        </StyledDiv>
      </div>
    </Layout>
  );
};

export default MedicalOfficerViewAppointments;

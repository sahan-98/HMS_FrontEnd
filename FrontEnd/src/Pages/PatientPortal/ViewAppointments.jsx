import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  styled,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "./Header";
import Layout from "./Layout";
import { Search } from "@mui/icons-material";
import { useCallback, useEffect, useState } from "react";
import AppointmentService from "../../app/services/appointment-service";
import { useDispatch, useSelector } from "react-redux";
import { GiPowerButton } from "react-icons/gi";
import PatientService from "../../app/services/patient-service";
import { logout } from "../../reducers/loginSlice";
import { useNavigate } from "react-router";
import { showSystemAlert } from "../../app/services/alertServices";
import LabReport from "../LabReport/LabReport";

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

const ViewAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const patient = useSelector((state) => state.patient);
  const [selectedType, setSelectedType] = useState("pending");
  const [searchText, setSearchText] = useState("");
  const patientId = useSelector((state) => state.patient._id);
  const [labReportOpen, setLabReportOpen] = useState(false);
  const [labReportToShow, setLabReportToShow] = useState({});

  const loadAppointments = useCallback(async () => {
    try {
      let appointments = await AppointmentService.getAppointmentsByPatientId({
        patientId: patient._id,
      });
      appointments = appointments?.data.map((appointment, index) => ({
        id: index + 1,
        doctorName: appointment?.doctor?.name,
        date: dayNames[appointment?.doctorAvailability],
        time: appointment?.doctor[appointment?.doctorAvailability],
        visitStatus: appointment?.visitStatus,
        queueNumber: appointment?.queueNumber,
        appointment,
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
      field: "visitStatus",
      headerName: "Appointment status",
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
        const onClick = () => {
          setLabReportToShow(appointment);
          setLabReportOpen(true);
        };
        return (
          <>
            <StyledButton
              onClick={onClick}
              disabled={appointment.labReportid ? false : true}
            >
              Lab Report
            </StyledButton>
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

  const handleLogoutClick = useCallback(async () => {
    console.log("logout");
    try {
      const logoutResponse = await PatientService.logout({ patientId });
      const { message } = logoutResponse;
      if (message === "Logout successful") {
        dispatch(logout());
        showSystemAlert("You have successfully logged out", "success");
        navigate("/patient-login");
      }
    } catch (error) {
      console.log(error);
      showSystemAlert("An error occured while loggin out", "error");
    }
  }, [patientId, dispatch, navigate]);

  return (
    <Layout>
      <Header />
      <LabReport
        open={labReportOpen}
        setOpen={setLabReportOpen}
        data={{ ...labReportToShow }}
      />
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
              <StyledToggleButtonGroup
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
              </StyledToggleButtonGroup>
              <IconButton title="Logout" onClick={handleLogoutClick}>
                <GiPowerButton />
              </IconButton>
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

export default ViewAppointments;

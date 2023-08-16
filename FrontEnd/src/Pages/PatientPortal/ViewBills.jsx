import {
  Box,
  Button,
  IconButton,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  styled,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "./Header";
import Layout from "./Layout";
import { useCallback, useEffect, useState } from "react";
import AppointmentService from "../../app/services/appointment-service";
import { useDispatch, useSelector } from "react-redux";
import { GiPowerButton } from "react-icons/gi";
import PatientService from "../../app/services/patient-service";
import { logout } from "../../reducers/loginSlice";
import { useNavigate } from "react-router";
import { showSystemAlert } from "../../app/services/alertServices";
import LabReport from "../LabReport/LabReport";
import BedService from "../../app/services/bed-service";
import LabReportService from "../../app/services/lab-report-service";

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

const ViewBills = () => {
  const [appointmentBills, setAppointmentBills] = useState([]);
  const [labReportBills, setLabReportBills] = useState([]);
  const [bedBills, setBedBills] = useState([]);
  const [showing, setShowing] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const patient = useSelector((state) => state.patient);
  const [selectedType, setSelectedType] = useState("appointment");
  const patientId = useSelector((state) => state.patient._id);
  const [labReportOpen, setLabReportOpen] = useState(false);
  const [labReportToShow, setLabReportToShow] = useState({});

  const loadAppointmentBills = useCallback(async () => {
    try {
      let appointmentBills =
        await AppointmentService.getAppointmentBillsByPatientId({
          patientId: patient._id,
        });
      appointmentBills = appointmentBills?.data.map(
        (appointmentBill, index) => ({
          id: index + 1,
          date: new Date(appointmentBill?.bookingDate)
            .toISOString()
            .split("T")[0],
          status: appointmentBill?.visitStatus,
          amount: appointmentBill?.totalPrice,
          billObj: appointmentBill,
        })
      );
      setAppointmentBills(appointmentBills);
    } catch (error) {
      console.log(error);
    }
  }, [patient]);

  const loadBedBills = useCallback(async () => {
    try {
      let bedBills = await BedService.getBedBillsByPatientId({
        patientId: patient._id,
      });
      bedBills = bedBills?.data.map((bedBill, index) => ({
        id: index + 1,
        date: new Date(bedBill?.allocationDate).toISOString().split("T")[0],
        status: bedBill?.payStatus,
        amount: bedBill?.totalPrice,
        billObj: bedBill,
      }));
      setBedBills(bedBills);
    } catch (error) {
      console.log(error);
    }
  }, [patient]);

  const loadLabReportBills = useCallback(async () => {
    try {
      let labReportBills = await LabReportService.getLabReportBillByPatient({
        patientId: patient._id,
      });
      labReportBills = labReportBills?.data.map((labReportBill, index) => ({
        id: index + 1,
        date: labReportBill?.createdAt
          ? new Date(labReportBill?.createdAt).toISOString().split("T")[0]
          : "",
        status: labReportBill?.payStatus,
        amount: labReportBill?.totalPrice,
        billObj: labReportBill,
      }));
      setLabReportBills(labReportBills);
    } catch (error) {
      console.log(error);
    }
  }, [patient]);

  useEffect(() => {
    loadAppointmentBills();
    loadBedBills();
    loadLabReportBills();
  }, [loadAppointmentBills, loadBedBills, loadLabReportBills]);

  useEffect(() => {
    if (selectedType === "appointment") {
      setShowing(appointmentBills);
      return;
    }
    if (selectedType === "labreport") {
      setShowing(labReportBills);
      return;
    }
    if (selectedType === "bedbill") {
      setShowing(bedBills);
      return;
    }
  }, [selectedType, appointmentBills, labReportBills, bedBills]);

  const columns = [
    { field: "id", headerName: "#", width: 150 },
    {
      field: "date",
      headerName: "Date",
      width: 180,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "amount",
      headerName: "Bill Amount",
      width: 180,
      align: "center",
      headerAlign: "center",
    },

    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      align: "center",
      headerAlign: "center",
      disableClickEventBubbling: true,
      renderCell: (params) => {
        const { billObj } = params.row;
        const onClick = () => {
          setLabReportToShow(billObj);
          setLabReportOpen(true);
        };
        return (
          <>
            <StyledButton onClick={onClick}>Pay bill</StyledButton>
          </>
        );
      },
    },
  ];

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
            <StyledText>View Bills</StyledText>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
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
                  mr: "0.5rem",
                }}
              >
                <StyledToggleButton value="appointment" sx={{ px: 2.2 }}>
                  Appointment Bills
                </StyledToggleButton>
                <StyledToggleButton value="labreport">
                  Lab report Bills
                </StyledToggleButton>
                <StyledToggleButton value="bedbill">
                  Bed Bills
                </StyledToggleButton>
              </StyledToggleButtonGroup>
              <IconButton title="Logout" onClick={handleLogoutClick}>
                <GiPowerButton />
              </IconButton>
            </Box>
          </Box>

          <div style={{ height: "55vh", width: "100%", padding: "1rem 0" }}>
            <DataGrid
              rows={showing}
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

export default ViewBills;

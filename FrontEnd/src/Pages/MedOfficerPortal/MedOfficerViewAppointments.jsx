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
import Header from "../../components/Header/Header";
import Layout from "../../components/PortalLayout/Layout";
import { Search } from "@mui/icons-material";
import { useCallback, useEffect, useState } from "react";
import LabReportService from "../../app/services/lab-report-service";
import { useDispatch, useSelector } from "react-redux";
import LabAssistantReport from "./LabAssistantReport";
import { GiPowerButton } from "react-icons/gi";
import LabAssistantService from "../../app/services/lab-assistant-service";
import { logout } from "../../reducers/loginSlice";
import { showSystemAlert } from "../../app/services/alertServices";
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

const StyledButton = styled(Button)(
  `
border-radius: 7px;
border: 1px solid #DEDEDE;
color: #fff;
min-width: 30px;
font-size: 10px;
font-weight: 600;
padding: 5px 10px;
`,
  ({ btnColor }) => ({
    background: btnColor ? btnColor : "#59C169",
    "&:hover": {
      background: btnColor ? btnColor : "#59C169",
    },
  })
);

const MedOfficerViewAppointments = () => {
  const [labTasks, setLabTasks] = useState([]);
  const [labReportToShow, setLabReportToShow] = useState({});
  const [labReportOpen, setLabReportOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const columns = [
    { field: "id", headerName: "#", width: 50 },
    { field: "patientName", headerName: "Patient Name", width: 150 },
    { field: "date", headerName: "Date", width: 150 },
    {
      field: "doctor",
      headerName: "Doctor",
      width: 150,
    },
    {
      field: "status",
      headerName: "Status",
      width: 100,
    },

    {
      field: "actions",
      headerName: "Actions",
      width: 180,
      align: "center",
      headerAlign: "center",
      disableClickEventBubbling: true,
      renderCell: (params) => {
        const { labReport } = params.row;
        const onClick = () => {
          setLabReportToShow(labReport);
          setLabReportOpen(true);
        };
        return (
          <>
            {labReport.status === "completed" ? (
              <StyledButton onClick={onClick} btnColor={"#3E84E3"}>
                View Lab Report
              </StyledButton>
            ) : (
              <StyledButton onClick={onClick}>View Lab task</StyledButton>
            )}
          </>
        );
      },
    },
  ];

  const labAssistant = useSelector((state) => state.labAssistant);

  const loadLabTasks = useCallback(async () => {
    try {
      let labTasks = await LabReportService.getLabReportByLabAssistantId({
        labAssistantId: labAssistant._id,
      });
      labTasks = labTasks?.data.map((labTask, index) => ({
        id: index + 1,
        patientName: labTask?.patient?.firstname,
        date: new Date(labTask?.updatedAt).toISOString().split("T")[0],
        doctor: labTask?.doctor?.name,
        status: labTask.status,
        labReport: labTask,
      }));
      setLabTasks(labTasks);
    } catch (error) {
      console.log(error);
    }
  }, [labAssistant]);

  const [selectedType, setSelectedType] = useState("Pending");

  useEffect(() => {
    if (!labReportOpen) {
      loadLabTasks();
    }
  }, [loadLabTasks, labReportOpen]);

  const handleLogoutClick = useCallback(async () => {
    console.log("logout");
    try {
      const logoutResponse = await LabAssistantService.logout({
        labAssistantId: labAssistant._id,
      });
      console.log(logoutResponse);
      const { message } = logoutResponse;
      if (message === "Logout successful") {
        dispatch(logout());
        showSystemAlert("You have successfully logged out", "success");
        navigate("/lab-assistant-login");
      }
    } catch (error) {
      console.log(error);
      showSystemAlert("An error occured while loggin out", "error");
    }
  }, [labAssistant, dispatch, navigate]);

  let filteredAssignments = [...labTasks];
  if (searchText.length > 0) {
    filteredAssignments = labTasks.filter(
      (labTask) =>
        labTask?.status.toLowerCase().includes(searchText.toLowerCase()) ||
        labTask?.date.toLowerCase().includes(searchText.toLowerCase())
    );
  }

  filteredAssignments = filteredAssignments.filter((labTask) =>
    selectedType === "Pending"
      ? labTask?.status === "Pending"
      : labTask?.status === "completed"
  );

  return (
    <Layout>
      <Header />
      <LabAssistantReport
        open={labReportOpen}
        setOpen={setLabReportOpen}
        data={labReportToShow}
      />
      <div
        style={{
          height: "70vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "start",
        }}
      >
        <StyledDiv width="800px">
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mt: "0.5rem",
            }}
          >
            <StyledText>Lab Assignments</StyledText>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <StyledTextField
                placeholder="Search Assignments"
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
                onChange={(event) => {
                  setSearchText(event.target.value);
                }}
                value={searchText}
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
                <StyledToggleButton value="Pending" sx={{ px: 2.2 }}>
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
              rows={filteredAssignments}
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

export default MedOfficerViewAppointments;

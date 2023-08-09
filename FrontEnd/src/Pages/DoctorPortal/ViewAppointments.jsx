import { Search } from "@mui/icons-material";
import {
  Box,
  IconButton,
  InputAdornment,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  styled,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useCallback, useState } from "react";
import { GiPowerButton } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showSystemAlert } from "../../app/services/alertServices";
import DoctorService from "../../app/services/doctor-service";
import Header from "../../components/Header/Header";
import Layout from "../../components/PortalLayout/Layout";
import { logout } from "../../reducers/loginSlice";

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
const ViewAppointments = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const columns = [
    { field: "id", headerName: "Id", width: 150 },
    { field: "firstName", headerName: "First name", width: 150 },
    { field: "lastName", headerName: "Last name", width: 150 },
    {
      field: "age",
      headerName: "Age",
      width: 150,
    },
    {
      field: "fullName",
      headerName: "Full name",
      width: 150,
    },
  ];

  const rows = [
    { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
    { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
    { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
    { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
    { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
    { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
    { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
    { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
    { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
  ];
  const [selectedType, setSelectedType] = useState("pending");
  const doctorid = useSelector((state) => state.login.userId);

  const handleLogoutClick = useCallback(async () => {
    console.log("logout");
    try {
      const logoutResponse = await DoctorService.logout({ doctorid });
      console.log(logoutResponse);
      const { message } = logoutResponse;
      if (message === "Logout successful") {
        dispatch(logout());
        showSystemAlert("You have successfully logged out", "success");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      showSystemAlert("An error occured while loggin out", "error");
    }
  }, [doctorid, dispatch]);

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
        <StyledDiv width="800px">
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
              rows={rows}
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

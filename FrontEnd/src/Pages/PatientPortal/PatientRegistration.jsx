import BlueAcentCard from "../../components/BlueAcentCard/BlueAcentCardLogin";
import {
  Box,
  Button,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import Header from "../../components/Header/Header";
import HeadingText from "../../components/HeadingText/HeadingText";
import Layout from "../PatientPortal/Layout";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { showSystemAlert } from "../../app/services/alertServices";
import PatientService from "../../app/services/patient-service";
import Calender from "../Shared/Calender/Calender";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers";
import { Container } from "@mui/system";
import { useDispatch } from "react-redux";
import { setPatient } from "../../reducers/patientSlice";
import { useNavigate } from "react-router-dom";

const StyledButton = styled(Button)(`
border-radius: 7px;
border: 1px solid #DEDEDE;
background: #59C169;
color: #fff;
:hover {
  background: #68E87D;
}
`);

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
const PatientRegistration = () => {
  const [date, setDate] = useState(new Date().toDateString());
  const disptach = useDispatch();
  const navigate = useNavigate();

  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      gender: "",
    },
  });

  const onSubmit = async (data) => {
    const formData = {
      ...data,
      dateOfBirth: new Date(date).toLocaleDateString(),
    };
    console.log(formData);

    try {
      const response = await PatientService.newPatient({
        patient: formData,
      });
      console.log(response);
      disptach(setPatient({ ...response }));
      navigate("/patient-login");
      showSystemAlert("Patient profile created. Please login", "success");
    } catch (error) {
      showSystemAlert(
        "An error occurred while creating patient profile",
        "error"
      );
    }
  };
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
        <StyledDiv width="800px">
          <HeadingText text="Patient Registration" />

          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                label="First Name"
                variant="outlined"
                fullWidth
                sx={{
                  mb: 2,
                }}
                {...register("firstname", {
                  // required: {
                  //   value: true,
                  //   message: "*Name is required",
                  // },
                })}
              />
              <TextField
                label="Last Name"
                variant="outlined"
                fullWidth
                sx={{
                  mb: 2,
                }}
                {...register("lastname", {
                  // required: {
                  //   value: true,
                  //   message: "*Email is required",
                  // },
                })}
              />
              <TextField
                label="Mobile"
                variant="outlined"
                fullWidth
                sx={{
                  mb: 2,
                }}
                {...register("mobile", {
                  // required: {
                  //   value: true,
                  //   message: "*Email is required",
                  // },
                })}
              />

              <Typography textAlign={"start"} sx={{ mb: 1 }}>
                Date of birth
              </Typography>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  value={date}
                  onChange={(newValue) => {
                    console.log(newValue);
                    setDate(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField className="datetime" {...params} fullWidth />
                  )}
                />
              </LocalizationProvider>

              <Box display={"flex"}>
                <Typography textAlign={"start"} sx={{ my: 2, mr: 2 }}>
                  Gender
                </Typography>
                <Controller
                  rules={{ required: true }}
                  control={control}
                  name="gender"
                  render={({ field }) => (
                    <RadioGroup {...field} sx={{ flexDirection: "row" }}>
                      <FormControlLabel
                        value="MALE"
                        control={<Radio />}
                        label="Male"
                      />
                      <FormControlLabel
                        value="FEMALE"
                        control={<Radio />}
                        label="Female"
                      />
                    </RadioGroup>
                  )}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Address"
                variant="outlined"
                fullWidth
                sx={{
                  mb: 2,
                }}
                {...register("address", {
                  // required: {
                  //   value: true,
                  //   message: "*Address is required",
                  // },
                })}
              />
              <TextField
                label="Email address"
                variant="outlined"
                fullWidth
                sx={{
                  mb: 2,
                }}
                {...register("email", {
                  // required: {
                  //   value: true,
                  //   message: "*Speciality is required",
                  // },
                })}
              />
              <TextField
                label="UserName"
                variant="outlined"
                fullWidth
                sx={{
                  mb: 2,
                }}
                {...register("userName", {
                  // required: {
                  //   value: true,
                  //   message: "*Speciality is required",
                  // },
                })}
              />
              <TextField
                label="Password"
                variant="outlined"
                fullWidth
                sx={{
                  mb: 2,
                }}
                {...register("password", {
                  // required: {
                  //   value: true,
                  //   message: "*Speciality is required",
                  // },
                })}
              />
              <TextField
                label="Confirm Password"
                variant="outlined"
                fullWidth
                sx={{
                  mb: 2,
                }}
                {...register("conpass", {
                  // required: {
                  //   value: true,
                  //   message: "*Speciality is required",
                  // },
                })}
              />
            </Grid>
          </Grid>

          <Box display={"flex"} gap={2}>
            <StyledButton
              fullWidth
              sx={{ my: 4 }}
              variant="outlined"
              color="secondary"
            >
              Go Back
            </StyledButton>
            <StyledButton
              fullWidth
              sx={{ my: 4 }}
              onClick={handleSubmit(onSubmit)}
            >
              Register
            </StyledButton>
          </Box>
        </StyledDiv>
      </div>
    </Layout>
  );
};

export default PatientRegistration;

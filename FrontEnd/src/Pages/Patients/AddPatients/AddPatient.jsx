import {
  Box,
  Button,
  Chip,
  Grid,
  TextField,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import Calender from "../../Shared/Calender/Calender";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { showSystemAlert } from "../../../app/services/alertServices";
import PatientService from "../../../app/services/patient-service.js";
import calculateAge from "../../../utils/calculate-age.js";
import { Controller } from "react-hook-form";
import { useLocation } from "react-router-dom";

const AddPatient = () => {
  const [date, setDate] = useState(new Date().toDateString());
  const location = useLocation();
  const patientToBeEdited = location.state?.patient;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm({
    defaultValues: {
      gender: "",
    },
  });

  const onSubmit = async (data) => {
    const formData = {
      ...data,
      dateOfBirth: new Date(date).toLocaleDateString(),
      age: calculateAge(new Date(date)),
    };
    console.log(formData);

    try {
      const response = await PatientService.newPatient({
        patient: formData,
      });
      console.log(response);
      showSystemAlert("Patient profile created", "success");
    } catch (error) {
      showSystemAlert(
        "An error occurred while creating patient profile",
        "error"
      );
    }
  };

  useEffect(() => {
    if (patientToBeEdited) {
      setValue("firstname", patientToBeEdited.firstname);
      setValue("lastname", patientToBeEdited.lastname);
      setValue("email", patientToBeEdited.email);
      setValue("userName", patientToBeEdited.userName);
      setValue("gender", patientToBeEdited.gender);
      setDate(patientToBeEdited.dateOfBirth);
      setValue("dateOfJoin", patientToBeEdited.dateOfJoin);
      setValue("speciality", patientToBeEdited.speciality);
      setValue("mobile", patientToBeEdited.mobile);
      setValue("address", patientToBeEdited.address);
      setValue("age", patientToBeEdited.age);
      setValue("fee", patientToBeEdited.fee);
      setValue("salary", patientToBeEdited.salary);
    }
  }, [patientToBeEdited, setValue]);

  return (
    <Box
      style={{
        border: "2px solid #ccc",
        padding: "1rem 1rem",
        background: "#fff",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          {patientToBeEdited ? "Edit Patient" : "Add Patient"}
        </Typography>
      </Box>
      <hr></hr>
      <Grid
        container
        spacing={2}
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          padding: ".5rem 2rem",
          textAlign: "start",
        }}
      >
        {/* Add Name */}
        <Grid item xs={12} md={4}>
          <Typography variant="OVERLINE TEXT">First name</Typography>
        </Grid>
        <Grid item xs={12} md={8} sx={{ marginLeft: { md: "-5rem" } }}>
          <TextField
            id="standard-basic"
            placeholder="Enter first name"
            name="firstname"
            required
            fullWidth
            {...register("firstname", {
              // required: {
              //   value: true,
              //   message: "*Name is required",
              // },
            })}
          />
        </Grid>
        {/* Email */}
        <Grid item xs={12} md={4}>
          <Typography variant="OVERLINE TEXT">Last name</Typography>
        </Grid>
        <Grid item xs={12} md={8} sx={{ marginLeft: { md: "-5rem" } }}>
          <TextField
            id="standard-basic"
            placeholder="Enter last name"
            name="lastname"
            required
            fullWidth
            {...register("lastname", {
              // required: {
              //   value: true,
              //   message: "*Email is required",
              // },
            })}
          />
        </Grid>
        {/* Phone */}
        <Grid item xs={12} md={4}>
          <Typography variant="OVERLINE TEXT">Mobile no</Typography>
        </Grid>
        <Grid item xs={12} md={8} sx={{ marginLeft: { md: "-5rem" } }}>
          <TextField
            id="standard-basic"
            placeholder="Enter mobile number"
            name="mobile"
            required
            fullWidth
            {...register("mobile", {
              // required: {
              //   value: true,
              //   message: "*Email is required",
              // },
            })}
          />
        </Grid>

        {/* Email */}
        <Grid item xs={12} md={4}>
          <Typography variant="OVERLINE TEXT">Email</Typography>
        </Grid>
        <Grid item xs={12} md={8} sx={{ marginLeft: { md: "-5rem" } }}>
          <TextField
            id="standard-basic"
            placeholder="Enter email"
            name="email"
            required
            fullWidth
            {...register("email", {
              // required: {
              //   value: true,
              //   message: "*Speciality is required",
              // },
            })}
          />
        </Grid>
        {/* Address */}
        <Grid item xs={12} md={4}>
          <Typography variant="OVERLINE TEXT">Address</Typography>
        </Grid>
        <Grid item xs={12} md={8} sx={{ marginLeft: { md: "-5rem" } }}>
          <TextField
            id="standard-basic"
            placeholder="Enter Address"
            variant="outlined"
            name="address"
            multiline
            rows={5}
            fullWidth
            {...register("address", {
              // required: {
              //   value: true,
              //   message: "*Address is required",
              // },
            })}
          />
        </Grid>
        {/*Date of birth */}
        <Grid item xs={12} md={4}>
          <Typography variant="OVERLINE TEXT">Date Of Birth</Typography>
        </Grid>
        <Grid item xs={12} md={8} sx={{ marginLeft: { md: "-6.5rem" } }}>
          <Calender value={date} setValue={setDate} />
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="OVERLINE TEXT">Gender</Typography>
        </Grid>
        <Grid item xs={12} md={8} sx={{ marginLeft: { md: "-5rem" } }}>
          <Controller
            rules={{ required: true }}
            control={control}
            name="gender"
            render={({ field }) => (
              <RadioGroup {...field}>
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
        </Grid>
        {/* UserName */}
        <Grid item xs={12} md={4}>
          <Typography variant="OVERLINE TEXT">UserName</Typography>
        </Grid>
        <Grid item xs={12} md={8} sx={{ marginLeft: { md: "-5rem" } }}>
          <TextField
            id="standard-basic"
            placeholder="Enter userName"
            name="userName"
            required
            fullWidth
            {...register("userName", {
              // required: {
              //   value: true,
              //   message: "*Email is required",
              // },
            })}
          />
        </Grid>
        {/* Password */}
        <Grid item xs={12} md={4}>
          <Typography variant="OVERLINE TEXT">Password</Typography>
        </Grid>

        <Grid item xs={12} md={8} sx={{ marginLeft: { md: "-5rem" } }}>
          <TextField
            id="standard-basic"
            placeholder="Enter password"
            name="password"
            required
            fullWidth
            {...register("password", {
              // required: {
              //   value: true,
              //   message: "*Email is required",
              // },
            })}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="OVERLINE TEXT">Confirm Password</Typography>
        </Grid>

        <Grid item xs={12} md={8} sx={{ marginLeft: { md: "-5rem" } }}>
          <TextField
            id="standard-basic"
            placeholder="Enter password"
            name="conpass"
            required
            fullWidth
            {...register("conpass", {
              // required: {
              //   value: true,
              //   message: "*Email is required",
              // },
            })}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="OVERLINE TEXT">Decision</Typography>
        </Grid>
        <Grid item xs={12} md={8} sx={{ marginLeft: { md: "-5rem" } }}>
          <Box sx={{ display: "flex", margin: "1rem 0" }}>
            <Button variant="outlined" color="error" type="reset">
              RESET
            </Button>
            <Chip
              label="OR"
              color="secondary"
              style={{
                marginLeft: "-.8rem",
                marginRight: "-.8rem",
                marginTop: ".1rem",
              }}
            />
            <Button
              variant="outlined"
              color="success"
              onClick={handleSubmit(onSubmit)}
            >
              SAVE
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AddPatient;

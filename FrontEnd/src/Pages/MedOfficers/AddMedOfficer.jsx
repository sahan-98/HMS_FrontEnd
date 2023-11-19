import { Box, Button, Chip, Grid, TextField, Typography } from "@mui/material";
import Calender from "../Shared/Calender/Calender.jsx";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { showSystemAlert } from "../../app/services/alertServices.js";
import { useLocation, useNavigate } from "react-router-dom";
import MedOfficerService from "../../app/services/med-officer-service.js";

export const AddMedOfficer = () => {
  const [date, setDate] = useState(new Date().toDateString());
  const location = useLocation();
  const medOfficerToBeEdited = location.state?.medOfficer;
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      gender: "",
    },
  });

  const onSubmit = async (data) => {
    const formData = {
      ...data,
      dateOfBirth: new Date(date).toLocaleDateString(),
      age: "25",
    };
    console.log(formData);
    let response = null;

    try {
      if (medOfficerToBeEdited) {
        response = await MedOfficerService.updateMedOfficer({
          id:medOfficerToBeEdited._id,
          medOfficer: formData,
        });
        console.log(response);
        showSystemAlert("Medical Officer profile updated", "success");
        navigate("/all-med-officers");
      } else {
        response = await MedOfficerService.newMedOfficer({
          medOfficer: {...formData, dateOfBirth:'1998-08-22'},
        });
        console.log(response);
        showSystemAlert("Medical Officer profile created", "success");
        navigate("/all-med-officers");
      }
    } catch (error) {
      showSystemAlert(
        response?.warn
          ? response?.warn
          : "An error occurred while creating medical Officer profile",
        "error"
      );
    } 
  };

  useEffect(() => {
    if (medOfficerToBeEdited) {
      setValue("firstname", medOfficerToBeEdited.firstname);
      setValue("lastname", medOfficerToBeEdited.lastname);
      setValue("email", medOfficerToBeEdited.email);
      setValue("userName", medOfficerToBeEdited.userName);
      setValue("gender", medOfficerToBeEdited.gender);
      setDate(medOfficerToBeEdited.dateOfBirth);
      setValue("dateOfJoin", medOfficerToBeEdited.dateOfJoin);
      setValue("speciality", medOfficerToBeEdited.speciality);
      setValue("mobile", medOfficerToBeEdited.mobile);
      setValue("address", medOfficerToBeEdited.address);
      setValue("age", medOfficerToBeEdited.age);
      setValue("fee", medOfficerToBeEdited.fee);
      setValue("salary", medOfficerToBeEdited.salary);
    }
  }, [medOfficerToBeEdited, setValue]);

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
          {medOfficerToBeEdited ? "Edit Lab Assistant" : "Add Lab Assistant"}
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
        {medOfficerToBeEdited ? null : (
          <>
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
            {/* Confirm Password */}
            <Grid item xs={12} md={4}>
              <Typography variant="OVERLINE TEXT">Confirm Password</Typography>
            </Grid>
            <Grid item xs={12} md={8} sx={{ marginLeft: { md: "-5rem" } }}>
              <TextField
                id="standard-basic"
                placeholder="Enter confirm password"
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
          </>
        )}

        <Grid item xs={12} md={4}>
          <Typography variant="OVERLINE TEXT">Decision</Typography>
        </Grid>
        <Grid item xs={12} md={8} sx={{ marginLeft: { md: "-5rem" } }}>
          <Box sx={{ display: "flex", margin: "1rem 0" }}>
            <Button
              variant="outlined"
              color="error"
              type="reset"
              onClick={() => {
                setValue("firstname", "");
                setValue("lastname", "");
                setValue("email", "");
                setValue("userName", "");
                setValue("password", "");
                setValue("conpass", "");
                setValue("gender", "");
                setDate(new Date());
                setValue("dateOfJoin", "");
                setValue("speciality", "");
                setValue("mobile", "");
                setValue("address", "");
              }}
            >
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

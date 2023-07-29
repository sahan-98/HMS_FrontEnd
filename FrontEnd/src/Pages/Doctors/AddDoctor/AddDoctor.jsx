import {
  Box,
  Button,
  Chip,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  Select,
  MenuItem,
  OutlinedInput,
} from "@mui/material";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import Calender from "../../Shared/Calender/Calender";
import { Controller, useForm } from "react-hook-form";
import DoctorService from "../../../app/services/doctor-service";
import { showSystemAlert } from "../../../app/services/alertServices";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const degreeList = ["MBBS", "BCS", "FCPS", "PHD", "BMBS", "MBChC", "MBBCh"];
function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const AddDoctor = () => {
  const theme = useTheme();
  const [personName, setPersonName] = useState([]);
  const [date, setDate] = useState(new Date().toDateString());
  // const [image, setImage] = useState(null);
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const {
    register,
    handleSubmit,
    watch,
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
      dateOfJoin: new Date(date).toLocaleDateString(),
      degree: personName[0],
    };

    try {
      const response = await DoctorService.newDoctor({
        doctor: formData,
      });
      console.log(response);
      showSystemAlert("Doctor profile created", "success");
    } catch (error) {
      showSystemAlert("An error occured while creating doctor", "error");
    }
  };

  return (
    <Box
      style={{
        border: "2px solid #ccc",
        padding: "1rem 1rem",
        background: "#fff",
      }}
    >
      <Box style={{ display: "flex" }}>
        <Button variant="contained">
          <NavLink
            to="/doctors"
            style={{ textDecoration: "none", width: "100%", color: "#fff" }}
          >
            Doctors List
          </NavLink>
        </Button>
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
          <Typography variant="OVERLINE TEXT">Name</Typography>
        </Grid>
        <Grid item xs={12} md={8} sx={{ marginLeft: { md: "-5rem" } }}>
          <TextField
            id="standard-basic"
            label="Enter name"
            name="name"
            required
            fullWidth
            {...register("name", {
              // required: {
              //   value: true,
              //   message: "*Name is required",
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
            label="Enter email"
            name="email"
            required
            fullWidth
            {...register("email", {
              // required: {
              //   value: true,
              //   message: "*Email is required",
              // },
            })}
          />
        </Grid>
        {/* Phone */}
        <Grid item xs={12} md={4}>
          <Typography variant="OVERLINE TEXT">Phone</Typography>
        </Grid>
        <Grid item xs={12} md={8} sx={{ marginLeft: { md: "-5rem" } }}>
          <TextField
            id="standard-basic"
            label="Enter number"
            name="phone"
            required
            fullWidth
            {...register("phone", {
              // required: {
              //   value: true,
              //   message: "*Email is required",
              // },
            })}
          />
        </Grid>
        {/* Fees */}
        <Grid item xs={12} md={4}>
          <Typography variant="OVERLINE TEXT">Fees</Typography>
        </Grid>
        <Grid item xs={12} md={8} sx={{ marginLeft: { md: "-5rem" } }}>
          <TextField
            id="standard-basic"
            label="Set Fees"
            name="fee"
            required
            fullWidth
            {...register("fee", {
              // required: {
              //   value: true,
              //   message: "*Email is required",
              // },
            })}
          />
        </Grid>
        {/* Age */}
        <Grid item xs={12} md={4}>
          <Typography variant="OVERLINE TEXT">Age</Typography>
        </Grid>
        <Grid item xs={12} md={8} sx={{ marginLeft: { md: "-5rem" } }}>
          <TextField
            id="standard-basic"
            label="Set Age"
            name="age"
            required
            fullWidth
            {...register("age", {
              // required: {
              //   value: true,
              //   message: "*Email is required",
              // },
            })}
          />
        </Grid>
        {/* Specialist */}
        <Grid item xs={12} md={4}>
          <Typography variant="OVERLINE TEXT">Specialist</Typography>
        </Grid>
        <Grid item xs={12} md={8} sx={{ marginLeft: { md: "-5rem" } }}>
          <TextField
            id="standard-basic"
            label="Speciality"
            name="speciality"
            required
            fullWidth
            {...register("speciality", {
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
            label="Enter Address"
            variant="standard"
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
        {/* Degrees */}
        <Grid item xs={12} md={4}>
          <Typography variant="OVERLINE TEXT">Choose Degrees</Typography>
        </Grid>
        <Grid item xs={12} md={8} sx={{ marginLeft: { md: "-5rem" } }}>
          <Box>
            <Select
              labelId="demo-multiple-chip-label"
              id="demo-multiple-chip"
              name="degrees"
              value={personName}
              onChange={handleChange}
              variant="standard"
              fullWidth
              input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              <MenuItem disabled value="">
                <em>You Can Choose Multiple Degrees </em>
              </MenuItem>
              {degreeList.map((name) => (
                <MenuItem
                  key={name}
                  value={name}
                  style={getStyles(name, personName, theme)}
                >
                  {name}
                </MenuItem>
              ))}
            </Select>
          </Box>
        </Grid>
        {/* Salary */}
        <Grid item xs={12} md={4}>
          <Typography variant="OVERLINE TEXT">Salary</Typography>
        </Grid>
        <Grid item xs={12} md={8} sx={{ marginLeft: { md: "-5rem" } }}>
          <TextField
            id="standard-basic"
            label="Enter salary"
            name="salary"
            // required
            fullWidth
            {...register("salary", {
              // required: {
              //   value: true,
              //   message: "*Salary is required",
              // },
            })}
          />
        </Grid>
        {/* available date */}
        <Grid item xs={12} md={4}>
          <Typography variant="OVERLINE TEXT">Available Time</Typography>
        </Grid>
        <Grid item xs={12} md={8} sx={{ marginLeft: { md: "-5rem" } }}>
          <TextField
            id="standard-basic"
            label="Eg: 8pm-10pm"
            name="availbleTime"
            required
            fullWidth
            {...register("availbleTime", {
              // required: {
              //   value: true,
              //   message: "*Availble time is required",
              // },
            })}
          />
        </Grid>
        {/* Joining date */}
        <Grid item xs={12} md={4}>
          <Typography variant="OVERLINE TEXT">Date Of Joining</Typography>
        </Grid>
        <Grid item xs={12} md={8} sx={{ marginLeft: { md: "-6.5rem" } }}>
          {/* <TextField
              id="standard-basic"
              label="Eg: 28-12-20"
              name="salary"
              required
              fullWidth
            /> */}
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
        {/* add image */}
        {/* <Grid item xs={12} md={4}>
            <Typography variant="OVERLINE TEXT">Add Image</Typography>
          </Grid>
          <Grid item xs={12} md={8} sx={{ marginLeft: { md: "-5rem" } }}>

            <Fab color="primary" aria-label="add">
              <input
                accept="image/*"
                type="file"
                onChange={(e) => setImage(e.target.files[0])} // <-- set the selected file as the image state
                name="image" // <-- make sure this matches the property name used in the data object
                alt="image-upload"

                style={{
                  opacity: 0,
                  cursor: "pointer",
                  zIndex: 1,
                  height: "55px",
                }}
              />
              <AddIcon
                style={{
                  position: "absolute",
                  top: 15,
                  left: 17,
                }}
              />
            </Fab>
          </Grid> */}
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

export default AddDoctor;

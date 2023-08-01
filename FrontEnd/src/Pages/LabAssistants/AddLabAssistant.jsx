import {
    Box,
    Button,
    Chip, FormControlLabel,
    Grid,
    MenuItem,
    OutlinedInput, Radio,
    RadioGroup,
    Select,
    TextField,
    Typography
} from "@mui/material";
import {NavLink} from "react-router-dom";
import Calender from "../Shared/Calender/Calender.jsx";
import {Controller, useForm} from "react-hook-form";
import {useTheme} from "@mui/material/styles";
import {useState} from "react";
import DoctorService from "../../app/services/doctor-service.js";
import {showSystemAlert} from "../../app/services/alertServices.js";

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


export const AddLabAssistant = () => {

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

    return <Box
            style={{
                border: "2px solid #ccc",
                padding: "1rem 1rem",
                background: "#fff",
            }}
        >
            <Box sx={{ display: "flex", justifyContent:"center" }}>
                <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                    Add Lab Assistant
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
                        label="Enter first name"
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
                        label="Enter last name"
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
                        label="Enter mobile number"
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
                        label="Enter email"
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
                        label="Enter Address"
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
                        label="Enter userName"
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
                        label="Enter password"
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
}
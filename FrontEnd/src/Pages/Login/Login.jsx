import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Button, Card, TextField, Typography } from "@mui/material";
import { Link, NavLink, useNavigate } from "react-router-dom";
import GoogleIcon from "@mui/icons-material/Google";

const Login = () => {
  // Adding google sign-in system

  const [loginData, setLoginData] = useState({});
  const handleOnChange = (e) => {
    const feild = e.target.name;
    const value = e.target.value;
    console.log(feild, value);
    const newLoginData = { ...loginData };
    newLoginData[feild] = value;
    setLoginData(newLoginData);
  };

  //   const handleLoginSubmit = e => {
  //     loginUser(loginData.email, loginData.password);

  //     e.preventDefault();
  // }

  return (
    <Card
      sx={{
        minWidth: 200,
      }}
      xs={12}
      md={12}
      sm={12}
    >
      <Container fixed>
        <Box sx={{ flexGrow: 1 }}>
          <Grid
            container
            spacing={2}
            justifyContent="center"
            alignItems="center"
          >
            <Grid
              item
              xs={5}
              md={5}
              sm={5}
              sx={{
                backgroundColor: "#F6FAFD",
                borderRadius: "5px",
                marginTop: "15%",
                marginBottom: "6%",
              }}
            >
              <Typography variant="h5" gutterBottom component="div">
                Login
              </Typography>
              <form>
                {/* onClick={handleLoginSubmit} */}
                <TextField
                  sx={{ width: "50%", m: 1 }}
                  id="standard-basic-1"
                  label="Your mail"
                  name="email"
                  // onChange={handleOnChange}
                  variant="standard"
                />

                <TextField
                  sx={{ width: "50%", m: 1 }}
                  id="standard-basic-2"
                  label="Your password"
                  name="password"
                  // onChange={handleOnChange}
                  variant="standard"
                  type="password"
                />
                <Button
                  sx={{ width: "50%", m: 1 }}
                  varient="contained"
                  type="submit"
                  style={{
                    backgroundColor: "green",
                    color: "white",
                  }}
                >
                  Login
                </Button>
                <Typography>-----------OR-----------</Typography>
                <NavLink
                  to="/registration"
                  style={{
                    textDecoration: "none",
                  }}
                >
                  <Button sx={{ width: "50%", m: 1, background: "#F6FAFD" }}>
                    For the First time ?
                  </Button>
                </NavLink>
              </form>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Card>
  );
};

export default Login;

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MenuIcon from "@mui/icons-material/Menu";
import TreeView from "@mui/lab/TreeView";
import { Container } from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import * as React from "react";
import { BsCardChecklist, BsHeartPulse } from "react-icons/bs";
import { FaMandalorian, FaUserNurse } from "react-icons/fa";
import { FcHome } from "react-icons/fc";
import { AiOutlineProfile, AiOutlineSchedule } from "react-icons/ai";
import { MdOutlinePersonAddAlt } from "react-icons/md";
import { TbBed, TbTestPipe } from "react-icons/tb";
import { NavLink, Outlet } from "react-router-dom";

import LoginIcon from "@mui/icons-material/Login";
import { useState } from "react";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const NavItem = ({ path, title, icon }) => {
  return (
    <NavLink
      to={path}
      style={{ textDecoration: "none", width: "100%", color: "#000" }}
    >
      <ListItem disablePadding>
        <ListItemButton style={{ borderRadius: "0 40px 40px 0" }}>
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText primary={title} />
        </ListItemButton>
      </ListItem>
    </NavLink>
  );
};

export default function NewHeader() {
  const [open, setOpen] = React.useState(true);
  const [expandedNodeId, setExpandedNodeId] = React.useState("1");

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  // User login check
  // const {user} = useAuth();
  // const getTv = () => {
  //     fetch("https://iptv-org.github.io/iptv/countries/br.m3u")
  //         .then(response => response.text())
  //         .then(data => {
  //             let channels = [];
  //             let lines = data.split("\n");
  //             let currentChannel = {};
  //             for (let i = 0; i < lines.length; i++) {
  //                 let line = lines[i].trim();

  //                 if (line.startsWith("#EXTINF:")) {
  //                     let info = line.split(/,(.+)/);
  //                     currentChannel["name"] = info[1];
  //                     currentChannel["logo"] = info[0].match(/tvg-logo="(.*?)"/)[1];
  //                 } else if (line.startsWith("http")) {
  //                     currentChannel["url"] = line;
  //                     channels.push(currentChannel);
  //                     currentChannel = {};
  //                 }
  //             }

  //             console.log(channels);
  //         })
  //         .catch(error => {
  //             console.error('Error:', error);
  //         });
  // }
  // getTv();

  return (
    <Box sx={{ display: "flex", background: "#F6F6F6" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar style={{ background: "#fff", color: "#000" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            fontFamily={"Roboto"}
            noWrap
            component="div"
            sx={{ width: "90%", display: "flex", justifyContent: "center" }}
          >
            Hospital Management System
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        // variant="temporary"
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader sx={{ display: "flex", justifyContent: "flex-start" }}>
          <Toolbar style={{ color: "#000" }}>
            <Typography variant="h6" noWrap>
              {" "}
              SmartCare{" "}
            </Typography>
            <FaMandalorian style={{ fontSize: "1.5rem", marginLeft: "20px" }} />
          </Toolbar>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />
        {/* Links for routing */}
        <List>
          <NavLink
            to="/"
            style={{ textDecoration: "none", width: "100%", color: "#000" }}
          >
            <ListItem disablePadding>
              <ListItemButton style={{ borderRadius: "0 40px 40px 0" }}>
                <ListItemIcon>
                  <FcHome style={{ color: "#000", fontSize: "1.5rem" }} />
                </ListItemIcon>
                <ListItemText primary="Overview" />
              </ListItemButton>
            </ListItem>
          </NavLink>

          {/* Doctor view for admin */}
          <ListItem
            disablePadding
            onClick={() => {
              if (expandedNodeId === 1) {
                setExpandedNodeId(-1);
              } else {
                setExpandedNodeId(1);
              }
            }}
          >
            <ListItemButton style={{ borderRadius: "0 40px 40px 0" }}>
              <ListItemIcon>
                <FaUserNurse style={{ color: "#000", fontSize: "1.5rem" }} />
              </ListItemIcon>
              <ListItemText primary="Doctors" />
            </ListItemButton>
          </ListItem>

          <TreeView
            style={{
              color: "#000",
              background: "#fff",
              textAlign: "justify",
              paddingLeft: "2.5rem",
            }}
            aria-label="file system navigator"
            defaultExpanded={["1"]}
            sx={{
              height: expandedNodeId === 1 ? 100 : 0,
              flexGrow: 1,
              maxWidth: 420,
              overflowY: "hidden",
              transition: "height 0.5s",
            }}
          >
            <NavLink
              to="/doctors"
              style={{
                textDecoration: "none",
                width: "100%",
                color: "#000",
              }}
            >
              <ListItem disablePadding>
                <ListItemButton style={{ borderRadius: "0 40px 40px 0" }}>
                  <ListItemIcon>
                    <BsCardChecklist
                      style={{ color: "#000", fontSize: "1.3rem" }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary="Doctor List"
                    style={{ marginLeft: "-1rem" }}
                  />
                </ListItemButton>
              </ListItem>
            </NavLink>

            <NavLink
              to="/addDoctor"
              style={{
                textDecoration: "none",
                width: "100%",
                color: "#000",
              }}
            >
              <ListItem disablePadding>
                <ListItemButton style={{ borderRadius: "0 40px 40px 0" }}>
                  <ListItemIcon>
                    <MdOutlinePersonAddAlt
                      style={{ color: "#000", fontSize: "1.4rem" }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary="Add Doctor"
                    style={{ marginLeft: "-1rem" }}
                  />
                </ListItemButton>
              </ListItem>
            </NavLink>
          </TreeView>

          {/* Patient for Admin view  */}
          <ListItem
            disablePadding
            onClick={() => {
              if (expandedNodeId === 2) {
                setExpandedNodeId(-1);
              } else {
                setExpandedNodeId(2);
              }
            }}
          >
            <ListItemButton style={{ borderRadius: "0 40px 40px 0" }}>
              <ListItemIcon>
                <TbBed style={{ color: "#000", fontSize: "1.5rem" }} />
              </ListItemIcon>
              <ListItemText primary="Patients" />
            </ListItemButton>
          </ListItem>

          <TreeView
            style={{
              color: "#000",
              background: "#fff",
              textAlign: "justify",
              paddingLeft: "2.5rem",
            }}
            aria-label="file system navigator"
            defaultExpanded={["1"]}
            defaultCollapseIcon={
              <div style={{ padding: ".3rem 0", visibility: "hidden" }}>
                <FaUserNurse style={{ color: "#000", fontSize: "1.5rem" }} />
              </div>
            }
            defaultExpandIcon={
              <div style={{ padding: ".3rem 0", visibility: "hidden" }}>
                <FaUserNurse style={{ color: "#000", fontSize: "1.5rem" }} />
              </div>
            }
            sx={{
              height: expandedNodeId === 2 ? 100 : 0,
              flexGrow: 1,
              maxWidth: 400,
              overflowY: "hidden",
              transition: "height 0.5s",
            }}
          >
            <NavLink
              to="/patients"
              style={{
                textDecoration: "none",
                width: "100%",
                color: "#000",
              }}
            >
              <ListItem disablePadding>
                <ListItemButton style={{ borderRadius: "0 40px 40px 0" }}>
                  <ListItemIcon>
                    <BsCardChecklist
                      style={{ color: "#000", fontSize: "1.3rem" }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary="Patient List"
                    style={{ marginLeft: "-1rem" }}
                  />
                </ListItemButton>
              </ListItem>
            </NavLink>
            <NavLink
              to="/addPatient"
              style={{
                textDecoration: "none",
                width: "100%",
                color: "#000",
              }}
            >
              <ListItem disablePadding>
                <ListItemButton style={{ borderRadius: "0 40px 40px 0" }}>
                  <ListItemIcon>
                    <MdOutlinePersonAddAlt
                      style={{ color: "#000", fontSize: "1.4rem" }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary="Add Patient"
                    style={{ marginLeft: "-1rem" }}
                  />
                </ListItemButton>
              </ListItem>
            </NavLink>
          </TreeView>

          {/* Lab management for Admin view  */}
          <ListItem
            disablePadding
            onClick={() => {
              if (expandedNodeId === 3) {
                setExpandedNodeId(-1);
              } else {
                setExpandedNodeId(3);
              }
            }}
          >
            <ListItemButton style={{ borderRadius: "0 40px 40px 0" }}>
              <ListItemIcon>
                <TbTestPipe style={{ color: "#000", fontSize: "1.5rem" }} />
              </ListItemIcon>
              <ListItemText primary="Lab Assistants" />
            </ListItemButton>
          </ListItem>

          <TreeView
            style={{
              color: "#000",
              background: "#fff",
              textAlign: "justify",
              paddingLeft: "2.5rem",
            }}
            aria-label="file system navigator"
            defaultExpanded={["1"]}
            defaultCollapseIcon={
              <div style={{ padding: ".3rem 0", visibility: "hidden" }}>
                <FaUserNurse style={{ color: "#000", fontSize: "1.5rem" }} />
              </div>
            }
            defaultExpandIcon={
              <div style={{ padding: ".3rem 0", visibility: "hidden" }}>
                <FaUserNurse style={{ color: "#000", fontSize: "1.5rem" }} />
              </div>
            }
            sx={{
              height: expandedNodeId === 3 ? 100 : 0,
              flexGrow: 1,
              maxWidth: 400,
              overflowY: "hidden",
              transition: "height 0.5s",
            }}
          >
            <NavLink
              to="/all-lab-assistants"
              style={{
                textDecoration: "none",
                width: "100%",
                color: "#000",
              }}
            >
              <ListItem disablePadding>
                <ListItemButton style={{ borderRadius: "0 40px 40px 0" }}>
                  <ListItemIcon>
                    <BsCardChecklist
                      style={{ color: "#000", fontSize: "1.3rem" }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary="All Assistants"
                    style={{ marginLeft: "-1rem" }}
                  />
                </ListItemButton>
              </ListItem>
            </NavLink>
            <NavLink
              to="/add-lab-assistant"
              style={{
                textDecoration: "none",
                width: "100%",
                color: "#000",
              }}
            >
              <ListItem disablePadding>
                <ListItemButton style={{ borderRadius: "0 40px 40px 0" }}>
                  <ListItemIcon>
                    <MdOutlinePersonAddAlt
                      style={{ color: "#000", fontSize: "1.4rem" }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary="Add Assistant"
                    style={{ marginLeft: "-1rem" }}
                  />
                </ListItemButton>
              </ListItem>
            </NavLink>
          </TreeView>

          <NavLink
            to="/login"
            style={{ textDecoration: "none", width: "100%", color: "#000" }}
          >
            <ListItem disablePadding>
              <ListItemButton style={{ borderRadius: "0 40px 40px 0" }}>
                <ListItemIcon>
                  <LoginIcon style={{ color: "#000", fontSize: "1.5rem" }} />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItemButton>
            </ListItem>
          </NavLink>
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <Container maxWidth="lg">
          <Outlet />
        </Container>
      </Main>
    </Box>
  );
}

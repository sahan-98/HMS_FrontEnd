import { Home } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { useCallback } from 'react';
import { GiPowerButton } from 'react-icons/gi'
import PatientService from '../../app/services/patient-service';
import { logout } from '../../reducers/loginSlice';
import { showSystemAlert } from '../../app/services/alertServices';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Actions = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const patientId = useSelector((state) => state.patient._id);
    const userType = useSelector(state=>state.login.userType);
    const handleLogoutClick = useCallback(async () => {
        console.log("logout");
        try {
          if(userType === "patient"){
            const logoutResponse = await PatientService.logout({ patientId });
            const { message } = logoutResponse;
            if (message === "Logout successful") {
              dispatch(logout());
              showSystemAlert("You have successfully logged out", "success");
              navigate("/patient-login");
            }
          }else{
            showSystemAlert("You have successfully logged out", "success");
            navigate("/medical-officer-login");
          }
        
        } catch (error) {
          console.log(error);
          showSystemAlert("An error occured while loggin out", "error");
        }
      }, [patientId, dispatch, navigate]);
  return (
    <>
    <IconButton sx={{
        position: "absolute",
        top: 20,
        right: 60
      }} title="Go to home" onClick={()=>{
        if(userType === "patient"){
          navigate('/patient-portal/landing')
        }else{
          navigate("/medical-officer-portal/view-appointments");
        }
       
      }}>
            <Home />
      </IconButton>
      <IconButton sx={{
        position: "absolute",
        top: 20,
        right: 20
      }} title="Logout" onClick={handleLogoutClick}>
            <GiPowerButton />
      </IconButton></>
  )
}

export default Actions

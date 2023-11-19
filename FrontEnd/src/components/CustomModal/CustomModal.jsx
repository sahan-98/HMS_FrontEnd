import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";
import PropTypes from "prop-types";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "90%", sm: 450, md: 500 },
  bgcolor: "background.paper",
  border: "none",
  borderRadius: 2,
  boxShadow: 24,
  p: 0,
  px: 3,
};

export default function CustomModal({ open, children, sx = {} }) {
  // const handleOpen = () => setOpen(true);

  return (
    <Modal
      open={open}
      closeAfterTransition
      BackdropComponent={Backdrop}
      disableAutoFocus={true}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Box sx={{ ...style, ...sx }}>{children}</Box>
      </Fade>
    </Modal>
  );
}

CustomModal.propTypes = {
  open: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  sx: PropTypes.object,
};

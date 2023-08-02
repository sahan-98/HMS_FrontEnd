import backgroundImage from "../../assets/images/patient-portal-bg.png";
import proptypes from "prop-types";

const Layout = ({ children }) => {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundImage: `url(${backgroundImage})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {children}
    </div>
  );
};

export default Layout;

Layout.propTypes = {
  children: proptypes.node.isRequired,
};

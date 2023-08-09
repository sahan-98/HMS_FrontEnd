import logo from "../../assets/images/hms-logo.png";

const Header = () => {
  return (
    <div
      style={{
        height: "25vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img
        src={logo}
        alt="logo"
        style={{ width: "60px", marginRight: "10px" }}
      />
      <p
        style={{
          fontSize: "3rem",
        }}
      >
        Cardiac Wing HMS
      </p>
    </div>
  );
};

export default Header;

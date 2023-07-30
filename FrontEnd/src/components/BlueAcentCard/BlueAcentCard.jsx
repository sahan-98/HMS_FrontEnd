import { styled } from "@mui/material";
import proptypes from "prop-types";

const StyledDiv = styled("div")(`
  width: 400px;
  border-radius: 5px;
  border: 1px solid #67aff1;
  box-shadow: 0px 0px 60px 4px rgba(119, 148, 224, 0.5);
  background-color: #fff;
  padding: 0 2rem;
  :hover {
    box-shadow: 0px 0px 60px 4px rgba(119, 148, 224, 0.7);
  }
`);

const BlueAcentCard = ({ children }) => {
  return <StyledDiv>{children}</StyledDiv>;
};

export default BlueAcentCard;

BlueAcentCard.propTypes = {
  children: proptypes.node.isRequired,
};

import { styled } from "@mui/material";
import proptypes from "prop-types";

const StyledDiv = styled("div")`
  height: 150px;
  width: 170px;
  border-radius: 5px;
  border: 1px solid #67aff1;
  box-shadow: 0px 0px 60px 4px rgba(119, 148, 224, 0.5);
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  :hover {
    cursor: pointer;
    box-shadow: 0px 0px 60px 4px rgba(119, 148, 224, 0.7);
  }
`;

const PatientChoiseCard = ({ children, onClick }) => {
  return <StyledDiv onClick={onClick}>{children}</StyledDiv>;
};

export default PatientChoiseCard;

PatientChoiseCard.propTypes = {
  children: proptypes.node.isRequired,
  onClick: proptypes.func,
};

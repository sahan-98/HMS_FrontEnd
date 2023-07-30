import { styled } from "@mui/material";
import proptypes from "prop-types";

const StyledParagraph = styled("p")(`
  font-size: 1.5rem;
  font-family: Hina Mincho;
  color: #636363;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`);

const HeadingText = ({ text }) => {
  return <StyledParagraph>{text}</StyledParagraph>;
};

export default HeadingText;

HeadingText.propTypes = {
  text: proptypes.string.isRequired,
};

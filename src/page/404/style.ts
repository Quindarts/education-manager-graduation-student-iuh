import styled from "@emotion/styled";
import { Box, Button } from "@mui/material";

const TextStyled = styled(Box)`
  text-align: center;
  margin-top: 8px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  column-gap: 20px;
`;

const ImageStyled = styled(Box)`
  display: flex;
  width: 420px;
  align-self: center;
  justify-content: center;
  margin: auto;
`;

const LinkStyled = styled(Button)`
  color: #ffffff;
  font-size: 20px;
  position: relative;
  background-color: none;
  &:hover {
    transition: color 0.5s;
    &:after {
      content: '';
      position: absolute;
      left: 0;
      bottom: -5px;
      height: 2px;
      width: 100%;
      background-color: #b5e2ff;
      transition: width 0.5s ease-in-out;
    }
  }
  &:after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -5px;
    height: 2px;
    width: 0;
    background-color: #b5e2ff;
    transition: width 0.5s ease-in-out;
  }
`;

export {
    TextStyled,
    ImageStyled,
    LinkStyled,
}
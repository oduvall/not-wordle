import styled from "styled-components";


const colorSchemes = {
    white : { 
      color : "black",
      backgroundColor : "white",
      border : "#6C757D",
      hover: "#F8F9FA"
    },
    grey : {
      color : "white",
      backgroundColor : "#495057",
      border : "#212529",
      hover : "#ADB5BD"
    },
    gold : {
      color : "white",
      backgroundColor : "#EDC531",
      border : "#B69121",
      hover : "#FFE169"
    },
    green : {
      color : "white",
      backgroundColor : "#55A630",
      border : "#007F5F",
      hover : "#AACC00"
    },
    submitDisabled : {
      color : "white",
      backgroundColor : "#DEE2E6",
      border : "#CED4DA",
      hover : "#6C757D",
    },
    submitEnabled : {
      color : "white",
      backgroundColor : "#0077B6",
      border : "#03045E",
      hover : "#ADE8F4"
    }
  
};
  
const Col = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 2em;
`;
  
  
const Row = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
`;


const Box = styled.div`
    color: ${props => (colorSchemes[props.backgroundColor].color)}; 
    background-color: ${props => (colorSchemes[props.backgroundColor].backgroundColor)};
    display: flex;
    flex-direction: row;
    justify-content: center;
    height: 45px;
    width: 45px;
    border: solid ${props => (colorSchemes[props.backgroundColor].border)};;
    border-radius: 5px;
    font-size: 2.5em;
    font-family: Courier New;
    font-weight: bold;
    margin: 5px;
`;
  
  
const StyledButton = styled.button`
    display: inline-block;
    color: ${props => (colorSchemes[props.backgroundColor].color)};
    background-color: ${props => (colorSchemes[props.backgroundColor].backgroundColor)};
    box-shadow: 10px, 10px, 8px, 10px, #888888;
    font-size: 1em;
    font-family: Courier New;
    font-weight: bold;
    margin: 4px;
    padding: 0.25em 1em;
    border: 0.1px solid ${props => (colorSchemes[props.backgroundColor].border)};
    border-bottom: 5px solid ${props => (colorSchemes[props.backgroundColor].border)};
    border-radius: 10px;
    display: block;
    transition: all 0.2s ease-in-out;
    cursor: pointer;
    text-decoration: none;
    &:disabled {
      background-color: ${colorSchemes.submitDisabled.backgroundColor};
      border: 0.1px solid ${colorSchemes.submitDisabled.border};
      border-bottom: 5px solid ${colorSchemes.submitDisabled.border};
    }
    &:hover:not([disabled]) {
      background-color: ${props => (colorSchemes[props.backgroundColor].hover)};
      border: 0.1px solid ${props => (colorSchemes[props.backgroundColor].border)};
    }
`;


const ResetButton = styled.button`
    display: inline-block;
    color: white;
    background-color: #0077B6;
    box-shadow: 10px, 10px, 8px, 10px, #888888;
    font-size: 1em;
    font-family: Courier New;
    font-weight: bold;
    margin: 4px;
    padding: 0.25em 1em;
    border: 0.1px solid #03045E;
    border-bottom: 5px solid #03045E;
    border-radius: 10px;
    display: block;
    transition: all 0.2s ease-in-out;
    cursor: pointer;
    text-decoration: none;
    &:hover {
      background-color: #ADE8F4;
      border: 0.1px solid #03045E;
    }
`


export { colorSchemes, Col, Row, Box, StyledButton, ResetButton };
  
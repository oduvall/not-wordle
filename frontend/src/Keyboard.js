import React from "react";
import { Row, StyledButton } from "./Styles"


class KeyBoard extends React.Component {
    constructor(props) {
      super(props)
      this.handleClick = this.handleClick.bind(this);
    };
    handleClick(event) {
      this.props.onClick(event.target.value);
    };
    render() {
      const keyBoardRow0 = this.props.keyBoardLetters[0];
      const keyBoardRow1 = this.props.keyBoardLetters[1];
      const keyBoardRow2 = this.props.keyBoardLetters[2];
      return(
        <div>
          <Row>
            {Object.keys(keyBoardRow0).map(key => 
              <StyledButton 
                key={key} 
                value={key} 
                backgroundColor={keyBoardRow0[key]} 
                onClick={this.handleClick}
              >{key}
              </StyledButton>)
            }
          </Row>
          <Row>
            {Object.keys(keyBoardRow1).map(key => 
              <StyledButton 
                key={key} 
                value={key} 
                backgroundColor={keyBoardRow1[key]}
                onClick={this.handleClick}
              >{key}
              </StyledButton>)
            }
          </Row>
          <Row>
            {Object.keys(keyBoardRow2).map(key => 
              <StyledButton 
                key={key} 
                value={key} 
                backgroundColor={keyBoardRow2[key]}
                onClick={this.handleClick}
                >{key}
              </StyledButton>)
            }
          </Row>
        </div>
      )
    };
  };


export default KeyBoard;

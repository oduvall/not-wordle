import React from "react";
import GuessBox from "./GuessBox"
import { Col, Row } from "./Styles"


class GuessGrid extends React.Component {
  render() {
    const grid = [];
    for (let rowNumber=0 ; rowNumber<6 ; rowNumber++) {
      let row = [];
      for (let boxNumber=0 ; boxNumber<5 ; boxNumber++) {
        let boxLetter = '';
        if (!this.props.gridProps[rowNumber].disabled) {
          boxLetter = this.props.currentGuess[boxNumber];
        } else {
          boxLetter = this.props.guesses[rowNumber][boxNumber];
        }
        row.push(<GuessBox 
          currentLetter={boxLetter} 
          backgroundColor={this.props.gridProps[rowNumber].boxColors[boxNumber].background}
          rowNumber={rowNumber} 
          boxNumber={boxNumber}
        />);
      }
      grid.push(row);
    }
    return (
      <Col>
        {
          grid.map((element, index) => {
            return (
              <Row key={index}>
                {element}
              </Row>
            )
          })
        }
      </Col>
    );
  };
};


  export default GuessGrid;
  

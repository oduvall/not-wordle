import React from "react";
import Modal from "react-modal";
import Confetti from "react-confetti";
import { Row, Col, ResetButton } from "./Styles";


class CustomModal extends React.Component {
    render() {
        if (this.props.type === "win") {
            return (
                <Modal 
                className="modalContentWin"
                overlayClassName={{ base: "modalOverlay", afterOpen: "modalAfterOpen", beforeClose: "modalBeforeClose"}}
                isOpen={this.props.isOpen} 
                onRequestClose={this.props.onRequestClose}
                closeTimeoutMS={500} 
                contentLabel="contentLabel"
              >
                <Confetti/>
                <Col>
                  <Row>
                    <h2>CONGRATULATIONS!</h2>
                  </Row>
                  <Row>
                    <div className="modalBody">You have correctly guessed: </div>
                  </Row>
                  <Row>
                    <div className="modalCorrectWord">{this.props.correctWord}</div>
                  </Row>
                  <Row>
                    <ResetButton onClick={this.props.onRequestClose}>New Game</ResetButton>
                  </Row>
                </Col>
              </Modal>
            )
        } else {
            return (
                <Modal 
                    className="modalContentLoss"
                    overlayClassName={{ base: "modalOverlay", afterOpen: "modalAfterOpen", beforeClose: "modalBeforeClose"}}
                    isOpen={this.props.isOpen} 
                    onRequestClose={this.props.onRequestClose}
                    closeTimeoutMS={500} 
                    contentLabel="contentLabel"
                >
                    <Col>
                        <Row>
                            <h2>GAME OVER!</h2>
                        </Row>
                        <Row>
                            <div className="modalBody">The correct word was: </div>
                        </Row>
                        <Row>
                            <div className="modalCorrectWord">{this.props.correctWord}</div>
                        </Row>
                        <Row>
                            <ResetButton onClick={this.props.onRequestClose}>New Game</ResetButton>
                        </Row>
                    </Col>
                </Modal>
            )
        }
        
    }
}

export default CustomModal;

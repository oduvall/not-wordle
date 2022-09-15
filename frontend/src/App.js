import React from "react";
import update from "immutability-helper";
import KeyBoard from "./Keyboard";
import { Col, Row, StyledButton } from "./Styles"
import GuessGrid from "./GuessGrid";
import Modal from "react-modal";
import CustomModal from "./CustomModal";


Modal.setAppElement("div");

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameOver: false,
      playerWins: false,
      correctWord: "",
      guessNumber : 0, 
      currentGuess : "",
      guesses : {
        0: "",
        1: "",
        2: "",
        3: "",
        4: "",
        5: ""
      },
      guessRows : {
        0 : {
          disabled : false,
          boxColors : {
            0 : { background : "white", text : "black" },
            1 : { background : "white", text : "black" },
            2 : { background : "white", text : "black" },
            3 : { background : "white", text : "black" },
            4 : { background : "white", text : "black" },
          }
        },
        1 : {
          disabled : true,
          boxColors : {
            0 : { background : "white", text : "black" },
            1 : { background : "white", text : "black" },
            2 : { background : "white", text : "black" },
            3 : { background : "white", text : "black" },
            4 : { background : "white", text : "black" },
          }
        },
        2 : {
          disabled : true,
          boxColors : {
            0 : { background : "white", text : "black" },
            1 : { background : "white", text : "black" },
            2 : { background : "white", text : "black" },
            3 : { background : "white", text : "black" },
            4 : { background : "white", text : "black" },
          }
        },
        3 : {
          disabled : true,
          boxColors : {
            0 : { background : "white", text : "black" },
            1 : { background : "white", text : "black" },
            2 : { background : "white", text : "black" },
            3 : { background : "white", text : "black" },
            4 : { background : "white", text : "black" },
          }
        },
        4 : {
          disabled : true,
          boxColors : {
            0 : { background : "white", text : "black" },
            1 : { background : "white", text : "black" },
            2 : { background : "white", text : "black" },
            3 : { background : "white", text : "black" },
            4 : { background : "white", text : "black" },
          }
        },
        5 : {
          disabled : true,
          boxColors : {
            0 : { background : "white", text : "black" },
            1 : { background : "white", text : "black" },
            2 : { background : "white", text : "black" },
            3 : { background : "white", text : "black" },
            4 : { background : "white", text : "black" },
          }
        }
      },
      keyBoardLetters : {
        0 : {
          "Q" : "white",
          "W" : "white",
          "E" : "white",
          "R" : "white",
          "T" : "white",
          "Y" : "white",
          "U" : "white",
          "I" : "white",
          "O" : "white",
          "P" : "white"
        },
        1 : {
          "A" : "white",
          "S" : "white",
          "D" : "white",
          "F" : "white",
          "G" : "white",
          "H" : "white",
          "J" : "white",
          "K" : "white",
          "L" : "white"
        },
        2 : {
          "Z" : "white",
          "X" : "white",
          "C" : "white",
          "V" : "white",
          "B" : "white",
          "N" : "white",
          "M" : "white"
        }
      },
      submissionAllowed : false,
      submitMessage: "SUBMIT",
      submitColorScheme: "submitDisabled",
      modalIsOpen: false
    };

    this.fetchWord = this.fetchWord.bind(this);
    this.validateWord = this.validateWord.bind(this);
    this.getNewColors = this.getNewColors.bind(this);
    this.onClick = this.onClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateState = this.updateState.bind(this);
    this.resetGame = this.resetGame.bind(this);
    this.charCounts = [...this.state.correctWord].reduce((res, char) => { 
      res[char] = res[char] ? res[char] + 1 : 1; return res 
    }, {});
  };


  async fetchWord() {
      await fetch('http://127.0.0.1:5000/get_word')
        .then((response) => response.json())
        .then((data) => {return data["word"]})
        .then((word) => this.setState(
          { correctWord : word.toUpperCase() }
        ));
    };
  

  async validateWord(word) {
    await fetch(`http://127.0.0.1:5000/validate_guess/${word}`)
    .then((response) => response.json())
    .then((data) => { 
      if (data["valid"] ) {
        // Enable Submit Button
        this.setState({ submissionAllowed : true });
        this.setState({ submitColorScheme : "submitEnabled"});
      } else {
        // Change button text to "Not a word"
        this.setState({ submitMessage : "NOT A WORD"});
      }
    });
  };


  getNewColors() {
    // Assign colors to input boxes.
    let indices = [0,1,2,3,4];
    let countClone = structuredClone(this.charCounts);
    let newColors = {};
    // Identify green boxes.
    for (
      let char = 0; 
      char < this.state.guesses[this.state.guessNumber].length; 
      char++
      ) {
      // If character's count > 0 and character in correct position, assign 
      // "green", reduce count by 1, and remove index from indices array.
      if (
          countClone[this.state.guesses[this.state.guessNumber][char]] !== 0 && 
          this.state.guesses[this.state.guessNumber][char] === 
          this.state.correctWord[char]
        ) {
          newColors[char] = "green";
          countClone[this.state.guesses[this.state.guessNumber][char]] -= 1;
          if (indices.indexOf(char) > -1) {
            indices.splice(indices.indexOf(char), 1);
          }
      }
    }
    // Identify gold and grey boxes.
    for (let index of indices) {
      // If character's count > 0 and character is in the correct word, assign 
      // "gold" and reduce count by 1.
      if (
        this.state.correctWord.includes(
          this.state.guesses[this.state.guessNumber][index]
        ) && 
        countClone[this.state.guesses[this.state.guessNumber][index]] !== 0
      ) {
        newColors[index] = "gold";
        countClone[this.state.guesses[this.state.guessNumber][index]] -= 1;
      // Otherwise, assign "grey".
      } else {
        newColors[index] = "grey";
      }
    }
    return newColors;
  };


  componentDidMount() {
    this.fetchWord()
    window.addEventListener('keydown', (event) => {
      event.preventDefault();

      // If key is a letter:
      const regex = /^[a-zA-Z]$/;
      if (regex.test(event.key) && this.state.currentGuess.length < 5) {
        this.setState((prevState) => (
          { 
            currentGuess: prevState.currentGuess + 
            event.key.toLocaleUpperCase() 
          }
        ), () => {
          // Disable submit button if guess length < 5.
          if (this.state.currentGuess.length < 5) {
            this.setState({ submissionAllowed : false });
            this.setState({ submitMessage : "SUBMIT" });
            this.setState({ submitColorScheme : "submitDisabled"});
          // If guess length = 5, check if word is valid.
          } else {
            this.validateWord(this.state.currentGuess);
          };
        });
        
        // If key is Backspace:
      } else if (
          event.key === "Backspace" && this.state.currentGuess.length > 0
        ) {
          this.setState((prevState) => ({
            currentGuess: prevState.currentGuess.slice(0, -1)
        }), () => {
          // Disable submit button if guess length < 5.
          if (this.state.currentGuess.length < 5) {
            this.setState({ submissionAllowed : false });
            this.setState({ submitMessage : "SUBMIT" });
            this.setState({ submitColorScheme : "submitDisabled"});
          // If guess length = 5, check if word is valid.
          } else {
            this.validateWord(this.state.currentGuess);
          };
        });
      };
    });
  };


  onClick(event) {
    // Append pressed key to currentGuess.
    this.setState((prevState) => (
        { currentGuess : prevState.currentGuess + event }
      ), 
      () => {
        // Disable submit button if guess length < 5.
        if (this.state.currentGuess.length < 5) {
          this.setState({ submissionAllowed : false });
          this.setState({ submitMessage : "SUBMIT" });
          this.setState({ submitColorScheme : "submitDisabled"});
        // If guess length = 5, check if word is valid.
        } else {
          this.validateWord(this.state.currentGuess);
        };
      }
    );
  };


  updateState(row, newColors) {
    // Update GuessRow boxes.
    let newState = update(this.state, {
      guessRows : {
        [row] : {
          disabled : { $set : true },
          boxColors : {
            0 : { 
              background : { $set : newColors[0] }, 
              text : { $set : "white" }
            },
            1 : { 
              background : { $set : newColors[1] }, 
              text : { $set : "white" }
            },
            2 : { 
              background : { $set : newColors[2] }, 
              text : { $set : "white" }
            },
            3 : { 
              background : { $set : newColors[3] }, 
              text : { $set : "white" }
            },
            4 : { 
              background : { $set : newColors[4] }, 
              text : { $set : "white" }
            }
          }
        },
        [(row === 5 ? 0 : row + 1)] : {
          disabled : { 
            $set : (
              (
                this.state.guesses[this.state.guessNumber] === 
                this.state.correctWord || row === 5
              ) 
              ? true : false
            )
          }
        }
      }
    });
    // Update Keyboard keys.
    let modifiedState = { 
      keyBoardLetters : {
        0 : {},
        1 : {},
        2 : {}
      }
    };
    let colorPriority = ["white", "grey", "gold", "green"];
    for (let i=0 ; i<this.state.guesses[this.state.guessNumber].length ; i++) {
      let keyBoardRow = (
        this.state.guesses[this.state.guessNumber][i] in 
        this.state.keyBoardLetters[0] 
        ? 0 : (
          this.state.guesses[this.state.guessNumber][i] in 
          this.state.keyBoardLetters[1] 
          ? 1 : 2
        )
      );
      let greatestColor = Math.max(
        colorPriority.indexOf(
          this.state.keyBoardLetters[keyBoardRow]
          [this.state.guesses[this.state.guessNumber][i]]
        ), 
        colorPriority.indexOf(newColors[i])
      );
      let newEntry = { 
        keyBoardLetters : {
          [keyBoardRow] : {
            [this.state.guesses[this.state.guessNumber][i]] : { 
              $set : colorPriority[greatestColor] 
            }
          }
        }
      };
      modifiedState.keyBoardLetters[keyBoardRow][
        this.state.guesses[this.state.guessNumber][i]
      ] = (
        newEntry.keyBoardLetters[keyBoardRow][
          this.state.guesses[this.state.guessNumber][i]
        ]
      );
    };
    newState = update(newState, modifiedState);
    this.setState(newState);
  };


  handleSubmit(event) {
    // Log currentGuess in guesses.
    this.setState(prevState => {
      let guesses = Object.assign({}, prevState.guesses);
      guesses[this.state.guessNumber] = this.state.currentGuess;
      return { guesses };
    }, () => {
    // Check if guess is correct.
      if (
        this.state.guesses[this.state.guessNumber] === this.state.correctWord
      ) {
        // Player wins!!
        this.setState(
          {gameOver : true}, () => {
            this.setState({playerWins : true})
            this.setState({modalIsOpen : true});
          }
        );
        
      // Check whether game is over or not.
      } else if (this.state.guessNumber > 4) {
        // Player loses.
        this.setState(
          { gameOver : true }, () => {
            this.setState({modalIsOpen : true})
          }
        );
      } 
      let newColors = this.getNewColors();
      // Update Colors of GuessRow boxes and Keyboard keys.
      this.updateState(this.state.guessNumber, newColors)
        
      // Increment guessNumber, reset currentGuess, disable submission.
      this.setState((prevState) => (
        { guessNumber : prevState.guessNumber + 1}
      ), () => {
        this.setState({ 
          currentGuess : "" ,
          submissionAllowed : false,
        });
      });
    });
    event.preventDefault();
  };


  resetGame() {
    this.fetchWord();
    this.setState(
      {
        gameOver: false,
        guessNumber : 0, 
        currentGuess : "",
        guesses : {
          0: "",
          1: "",
          2: "",
          3: "",
          4: "",
          5: ""
        },
        guessRows : {
          0 : {
            disabled : false,
            boxColors : {
              0 : { background : "white", text : "black" },
              1 : { background : "white", text : "black" },
              2 : { background : "white", text : "black" },
              3 : { background : "white", text : "black" },
              4 : { background : "white", text : "black" },
            }
          },
          1 : {
            disabled : true,
            boxColors : {
              0 : { background : "white", text : "black" },
              1 : { background : "white", text : "black" },
              2 : { background : "white", text : "black" },
              3 : { background : "white", text : "black" },
              4 : { background : "white", text : "black" },
            }
          },
          2 : {
            disabled : true,
            boxColors : {
              0 : { background : "white", text : "black" },
              1 : { background : "white", text : "black" },
              2 : { background : "white", text : "black" },
              3 : { background : "white", text : "black" },
              4 : { background : "white", text : "black" },
            }
          },
          3 : {
            disabled : true,
            boxColors : {
              0 : { background : "white", text : "black" },
              1 : { background : "white", text : "black" },
              2 : { background : "white", text : "black" },
              3 : { background : "white", text : "black" },
              4 : { background : "white", text : "black" },
            }
          },
          4 : {
            disabled : true,
            boxColors : {
              0 : { background : "white", text : "black" },
              1 : { background : "white", text : "black" },
              2 : { background : "white", text : "black" },
              3 : { background : "white", text : "black" },
              4 : { background : "white", text : "black" },
            }
          },
          5 : {
            disabled : true,
            boxColors : {
              0 : { background : "white", text : "black" },
              1 : { background : "white", text : "black" },
              2 : { background : "white", text : "black" },
              3 : { background : "white", text : "black" },
              4 : { background : "white", text : "black" },
            }
          }
        },
        keyBoardLetters : {
          0 : {
            "Q" : "white",
            "W" : "white",
            "E" : "white",
            "R" : "white",
            "T" : "white",
            "Y" : "white",
            "U" : "white",
            "I" : "white",
            "O" : "white",
            "P" : "white"
          },
          1 : {
            "A" : "white",
            "S" : "white",
            "D" : "white",
            "F" : "white",
            "G" : "white",
            "H" : "white",
            "J" : "white",
            "K" : "white",
            "L" : "white"
          },
          2 : {
            "Z" : "white",
            "X" : "white",
            "C" : "white",
            "V" : "white",
            "B" : "white",
            "N" : "white",
            "M" : "white"
          }
        },
        submissionAllowed : false,
        submitMessage: "SUBMIT",
        submitColorScheme: "submitDisabled",
        modalIsOpen: false
      }
    );
    setTimeout(() => {
        this.setState({playerWins : false})
      }, 500
    );
  };


  render() {
    return (
      <div>
        <CustomModal 
          type={this.state.playerWins ? "win" : "lose"} 
          isOpen={this.state.modalIsOpen} 
          onRequestClose={this.resetGame} 
          correctWord={this.state.correctWord}
        />
        <Col>
          <Row>
            <h1 class="rainbow-letters">
              <span>N</span>
              <span>O</span>
              <span>T</span>
              <span> </span>
              <span>W</span>
              <span>O</span>
              <span>R</span>
              <span>D</span>
              <span>L</span>
              <span>E</span>
            </h1>
          </Row>
          <GuessGrid 
            currentGuess={this.state.currentGuess} 
            gridProps={this.state.guessRows} 
            guesses={this.state.guesses}
          />
          <Row>
            <KeyBoard 
              keyBoardLetters={this.state.keyBoardLetters} 
              onClick={this.onClick}
            />
          </Row>
          <Row>
            <form onSubmit={this.handleSubmit}>
              <StyledButton 
                type="submit" 
                disabled={!this.state.submissionAllowed} 
                backgroundColor={this.state.submitColorScheme}
              >
                {this.state.submitMessage}
              </StyledButton>
            </form>
          </Row>
        </Col>
      </div>
    )
  };
};


export default App;

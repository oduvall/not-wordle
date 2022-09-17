// Main game file which handles user-interface and user inputs.
import React from "react";
import update from "immutability-helper";
import KeyBoard from "./Keyboard";
import { Col, Row, StyledButton } from "./Styles"
import GuessGrid from "./GuessGrid";
import Modal from "react-modal";
import CustomModal from "./CustomModal";


// Initialize endgame modal.
Modal.setAppElement("div");

// Main App component that handles the state of the game.
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

  // Send GET request to Flask backend to retrieve a word from WordsAPI.
  async fetchWord() {
      await fetch('http://127.0.0.1:5000/get_word')
        .then((response) => response.json())
        .then((data) => {return data["word"]})
        .then((word) => this.setState(
          { correctWord : word.toUpperCase() }
        ));
    };
  
  // Send GET request to Flask backend to check if user's input is a real word.
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

  // Return an object of new colors to update the current guess boxes to.
  getNewColors() {
    let indices = [0,1,2,3,4];
    let countClone = structuredClone(this.charCounts);
    let newColors = {};
    // Identify green boxes.
    for (
      let index = 0; 
      index < this.state.guesses[this.state.guessNumber].length; 
      index++
      ) {
      // If character's count > 0 and character in correct position:
      if (
          countClone[this.state.guesses[this.state.guessNumber][index]] !== 0 && 
          this.state.guesses[this.state.guessNumber][index] === 
          this.state.correctWord[index]
        ) {
        // Assign "green", decrement count, and remove index from indices array.
          newColors[index] = "green";
          countClone[this.state.guesses[this.state.guessNumber][index]] -= 1;
          if (indices.indexOf(index) > -1) {
            indices.splice(indices.indexOf(index), 1);
          }
      }
    }
    // Identify gold and grey boxes.
    for (let index of indices) {
      // If character's count > 0 and character is in the correct word:
      if (
        this.state.correctWord.includes(
          this.state.guesses[this.state.guessNumber][index]
        ) && 
        countClone[this.state.guesses[this.state.guessNumber][index]] !== 0
        // Assign "gold" and reduce count by 1.
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

  /* After App mounts, call fetchWord() to initialize correctWord, add event 
  listener for keydown events, and handle them. 
  */
  componentDidMount() {
    this.fetchWord()
    window.addEventListener('keydown', (event) => {
      event.preventDefault();

      // If key is a valid letter:
      const regex = /^[a-zA-Z]$/;
      if (regex.test(event.key) && this.state.currentGuess.length < 5) {
        // Append pressed key to currentGuess.
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
          // If guess length = 5, call validateWord() to validate user's guess.
          } else {
            this.validateWord(this.state.currentGuess);
          };
        });
      };
    });
  };

  // Handle digital key click events.
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

  // Update colors on previous guess boxes and digital keyboard keys.
  updateState(row, newColors) {
    // Update guess boxes.
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
        // Disable previous guess boxes, enable current guess boxes.
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
    for (let i=0 ; i<this.state.guesses[this.state.guessNumber].length ; i++) {
      // Find which row of the KeyBoard the key is in.
      let keyBoardRow = (
        this.state.guesses[this.state.guessNumber][i] in 
        this.state.keyBoardLetters[0] 
        ? 0 : (
          this.state.guesses[this.state.guessNumber][i] in 
          this.state.keyBoardLetters[1] 
          ? 1 : 2
        )
      );
      /* Ensure that lower colors do not override higher colors when assigning 
      colors to keys. 
      */
      let colorPriority = ["white", "grey", "gold", "green"];
      let greatestColor = Math.max(
        colorPriority.indexOf(
          this.state.keyBoardLetters[keyBoardRow]
          [this.state.guesses[this.state.guessNumber][i]]
        ), 
        colorPriority.indexOf(newColors[i])
      );
      // Update modifiedState with KeyBoard colors.
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
    // Update game state with new colors.
    newState = update(newState, modifiedState);
    this.setState(newState);
  };

  // Handle user guess submissions.
  handleSubmit(event) {
    // Save currentGuess in guesses at the current guess number.
    this.setState(prevState => {
      let guesses = Object.assign({}, prevState.guesses);
      guesses[this.state.guessNumber] = this.state.currentGuess;
      return { guesses };
    }, () => {
    // Check if guess is correct.
      if (
        this.state.guesses[this.state.guessNumber] === this.state.correctWord
      ) {
        // Player wins.
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
      // Update Colors of guess boxes and KeyBoard keys.
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

  // Get a new word and reset the game to its initial state.
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
    // Ensure modal does not switch from win to loss on fade out transition.
    setTimeout(() => {
        this.setState({playerWins : false})
      }, 500
    );
  };

  // Render the user-interface every time state is updated.
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

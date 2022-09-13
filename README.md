# Not-Wordle
A project web app inspired by the popular web and mobile game Wordle.

## Table of contents
* [Introduction](#introduction)
* [How to play](#how-to-play)
* [Technologies](#technologies)
* [Setup](#setup)
* [Screenshots](#screenshots)
* [To-do](#to-do)

## Introduction
This project is a recreation of the popular game Wordle, originally developed by Josh Wardle and published by The New York Times Company. The project takes advantage of two popular web frameworks, ReactJS for the front-end and Flask for the back-end, to generate a game in which the user has six attempts to guess a five-letter word randomly pulled from WORDS API at https://www.wordsapi.com. The ReactJS front-end handles the display of the user-interface and the inputs entered by the user, and the Flask back-end acts as an intermediary between the front-end and WORDS API. 

I took on this project in order to sharpen my skills working with ReactJS, Flask, and requests to and from a RESTful API. This project was developed purely for educational purposes and not made for commercial distribution or monetary gain.

## How to play
* Upon launch, a five-letter word from WORDS API will be generated. The user must attempt to guess this word in six or fewer guesses.
* Every time the user submits a guess, the background colors behind the letters of their guess will change color to indicate whether the correct word contains the given letter, and if so, it will indicate whether the letter is in the correct position or not.
  * GREEN: Indicates that the letter exists within the correct word and the letter is in its correct position.
  * YELLOW: Indicates that the letter exists within the correct word but is not in its correct position.
  * GREY: Indicates that the letter does not exist within the correct word.
* Guesses that are not real words are not allowed. When a user finishes typing a five-letter guess, a GET request will be sent to WORDS API to validate whether or not the user's guess is a real word. If it is not, the user will not be allowed to submit the guess.
* To reset the game, the user must either refresh the page, or press the "New Game" button that appears once the game has concluded.

## Technologies
This project is created with:
* Python 3.9
* ReactJS 18.2
* Flask 2.2.2

## Setup
1. Clone this repository to your local machine.
2. Ensure ports 3000 and 5000 on your local machine are not already in use.
3. In your IDE, from starting from wordle-clone/, run 
```
cd backend
flask run
```

4. In a new terminal, starting again from wordle-clone/, run
```
cd frontend
npm start
```

5. A new browser tab will automatically open containing the game, and the game will commence.

## Screenshots
<img width="611" alt="Screen Shot 2022-09-13 at 11 53 22 AM" src="https://user-images.githubusercontent.com/42651770/189986366-1f560458-0fdb-4f19-afff-42fc2d58c1ce.png">
<img width="612" alt="Screen Shot 2022-09-13 at 11 56 53 AM" src="https://user-images.githubusercontent.com/42651770/189987139-10e60dba-dec5-4314-beab-99746aeff3ff.png">
<img width="605" alt="Screen Shot 2022-09-13 at 12 06 30 PM" src="https://user-images.githubusercontent.com/42651770/189988800-bf935270-d82b-42ea-af2b-5e1b41c48b74.png">

## To-do
* Add virtual backspace key.
* Allow submission with enter key.
* Simplify setup.
* Write unit tests.

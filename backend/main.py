""" This program runs a clone of the popular mobile game Wordle. """
from random import randint
from string import ascii_uppercase


class Letter:
    """ Holds guessed letters and their respective colors. 
    
    Attributes:
        _letter (str): A single character containing the letter.
        _color (str): A color associated with the letter that changes 
            with the user's guess.
    """
    def __init__(self, letter: str) -> None:
        """ Initialize the Letter class. 
        
        Args:
            letter (str): A single character string that sets the 
                _letter attribute for the class.
        """
        if len(letter) == 1:
            self._letter = letter.upper()
        else:
            raise ValueError("Only single characters may be passed.")
        self._color = "white"
    
    @property
    def letter(self) -> str:
        return self._letter
    
    @letter.setter
    def letter(self, letter: str):
        if len(letter) == 1:
            self._letter = letter.upper()
        else:
            raise ValueError("Only single characters may be passed.")

    @property
    def color(self) -> str:
        return self._color
    
    @color.setter
    def color(self, value: str):
        self._color = value


def main():
    """ Run the program. """

    # Initialize dictionary of Letter objects.
    letter_objects = {}
    for letter in ascii_uppercase:
        letter_objects[letter] = Letter(letter)

    # Initialize list of valid words.
    valid_words = [x.upper() for x in 
    ["power", "stone", "lucky", "lifts", "jocks"]] # TEMPORARY

    # Pick a target word.
    target_word = valid_words[randint(0,4)]
    target_letters = list(target_word)

    # Initialize number of guesses.
    num_guesses = 0

    while True:

        # Display status of guessed letters.
        for letters, objects in letter_objects.items():
            print(f"{letters}: {objects.color}", end=" ")
        print("")

        # Validate user's guess.
        user_guess = input("Your guess: ").upper()
        if user_guess == "EXIT":
            break
        if len(user_guess) != 5:
            print("Word must be 5 characters long. Please try again.")
            continue
        if user_guess not in valid_words:
            print("Not a real word. Please try again.")
            continue
        guessed_letters = list(user_guess)

        # Process user's guess.
        correct_letters = 0
        for index in range(0,5):
            if guessed_letters[index] == target_letters[index]:
                letter_objects[guessed_letters[index]].color = "green"
                correct_letters +=1
            elif guessed_letters[index] in target_letters:
                letter_objects[guessed_letters[index]].color = "yellow"
            else:
                letter_objects[guessed_letters[index]].color = "grey"
        num_guesses += 1

        # Check game ending conditons.
        if correct_letters == 5:
            print(f"You have corectly guessed {target_word}! Good job!!")
            break
        elif num_guesses == 6:
            print(
                f"Out of guesses! The word was {target_word}. "
                f"Better luck next time!"
                )
            break


if __name__ == "__main__":
    main()

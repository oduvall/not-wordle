from flask import Flask, jsonify, make_response
from flask_cors import cross_origin
from requests import get as get_from_api


api = Flask(__name__)


@api.route('/')
def home():
    return "Hello world!"


@api.route('/get_word', methods=['GET', 'OPTIONS'])
@cross_origin()
def get_word():
    """ Retrieve word from WORDSAPI for user to guess. """
    word_url = 'https://wordsapiv1.p.rapidapi.com/words/'
    word_headers = {
    "X-RapidAPI-Key": "50540411d2msh7ff30df76695ef4p1159d6jsn8d70f2b006e0",
    "X-RapidAPI-Host": "wordsapiv1.p.rapidapi.com"
    }
    word_params = {"random":"true", "letters":5}
    api_response = get_from_api(
        url=word_url, 
        headers=word_headers, 
        params=word_params
        )
    if api_response.status_code == 200:
        word = api_response.json()['word']
        word_response = make_response(jsonify({"word": word}), 200)
        word_response.headers["Content-Type"] = "application/json"
    else: 
        word_response = api_response
    return word_response


@api.route('/validate_guess/<string:guess>', methods=['GET', 'OPTIONS'])
@cross_origin()
def validate_guess(guess):
    """ Check if a guessed word is a real word by sending a request to 
    WORDSAPI. 
    """
    wordsapi_url = f'https://wordsapiv1.p.rapidapi.com/words/{guess}'
    wordsapi_headers = {
    "X-RapidAPI-Key": "50540411d2msh7ff30df76695ef4p1159d6jsn8d70f2b006e0",
    "X-RapidAPI-Host": "wordsapiv1.p.rapidapi.com"
    }
    api_response = get_from_api(
        url=wordsapi_url, 
        headers=wordsapi_headers, 
        )
    response_body = {"guess": guess, 
                      "valid": True if api_response.status_code == 200 else False}
    return make_response(response_body, 200)


def unit_test():
    get_word_resp = get_from_api("http:127.0.0.1:8000/get_word")
    print(f"get_word() status code: {get_word_resp.status_code}")
    for _ in range(5):
        get_word_resp = get_from_api("http:127.0.0.1:8000/get_word")
        word = get_word_resp.json()['word']
        if len(word) == 5:
            print(f"PASS: get_word() returns word of length {len(word)}")
        else:
            print(f"FAIL: get_word() returns word of length {len(word)}")
        validate_guess_resp = get_from_api(f"http:127.0.0.1:8000/validate_guess/{word}")
        if validate_guess_resp.json()['valid']:
            print(f"PASS: validate_guess('{word}') says '{word}' is valid.")
        else:
            print(f"FAIL: validate_guess('{word}') says '{word}' is invalid.")
    for word in ['asdfg','ghtyi','jhkgl','htedf','qwedf']:
        validate_guess_resp = get_from_api(f"http:127.0.0.1:8000/validate_guess/{word}")
        if validate_guess_resp.json()['valid']:
            print(f"FAIL: validate_guess('{word}') says '{word}' is valid.")
        else:
            print(f"PASS: validate_guess('{word}') says '{word}' is invalid.")


if __name__ == '__main__':
    api.run(host='0.0.0.0', port=5000, debug=True)


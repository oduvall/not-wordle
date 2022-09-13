from flask import Flask, render_template


app = Flask(__name__)

@app.route('/')
def hello_world():
    return render_template("base.html", list_of_names = ["bob","steve","elspith"])

@app.route('/<string:name>')
def greet(name):
    return f"Hello {name}"

@app.route('/about')
def about():
    return render_template('about.html')

if __name__ == "__main__":
    app.run(debug=True)
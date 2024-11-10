from flask import Flask, render_template, jsonify, request
from mainFile import userInput
import createDiagram

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/data', methods=['GET'])
def get_data():
    data = {"message": "Hello from Flask!"}
    return jsonify(data)

@app.route('/api/data', methods=['POST'])
def receive_data():
    data = request.get_json()  # Get the JSON data from the request
    message = data.get("message", "")
    response = {"reply": f"Received: {userInput(message)}"}

    
    createDiagram.dumpCourseToJSON(message, 'static/js/JSON/diagramData.json')
    
    print(response)
    
    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True)
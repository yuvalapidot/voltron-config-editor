from flask import Flask, request, jsonify
from server.test import *
from server.utils import *

app = Flask(__name__)
print(f"from main: {fake_node}")


@app.route('/', methods=['POST'])
def upload_file():
    """Handles the upload of a file."""
    d = {}
    try:
        file = request.files['file_from_react']
        filename = file.filename
        print(f"\nUploading file {filename}\n")
        file_bytes = file.read()
        initial_dict = yaml_to_dict(file_bytes)
        elements_dict = create_elements(initial_dict)

        print(elements_dict)
        d['response'] = elements_dict

    except Exception as e:
        d['response'] = 0

    return jsonify(d)


if __name__ == "__main__":
    app.run()

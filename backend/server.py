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
        create_fake_node(initial_dict)

        print(initial_dict)
        d['response'] = fake_node

    except Exception as e:
        print(f"Couldn't upload file {e}")
        d['response'] = 0

    return jsonify(d)


if __name__ == "__main__":
    app.run()

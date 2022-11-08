from flask import Flask, request, jsonify
from io import BytesIO

app = Flask(__name__)


@app.route('/', methods=['POST'])
def upload_file():
    """Handles the upload of a file."""
    d = {}
    try:
        file = request.files['file_from_react']
        filename = file.filename
        print(f"Uploading file {filename}")
        file_bytes = file.read()
        file_content = BytesIO(file_bytes).readlines()
        print(file_content)
        d['status'] = 1

    except Exception as e:
        print(f"Couldn't upload file {e}")
        d['status'] = 0

    print(d)

    return jsonify(d)


if __name__ == "__main__":
    app.run()

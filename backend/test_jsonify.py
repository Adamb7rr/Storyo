import datetime
import json
from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/')
def test():
    data = {
        "timestamp": datetime.datetime.utcnow()
    }
    return jsonify(data)

if __name__ == "__main__":
    with app.test_request_context():
        try:
            res = test()
            print("Successfully jsonified datetime")
            print(res.get_data(as_text=True))
        except Exception as e:
            print(f"Failed to jsonify datetime: {type(e).__name__}: {str(e)}")

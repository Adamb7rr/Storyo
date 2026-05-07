import urllib.request
import json

url = "http://127.0.0.1:5000/generate_story"
data = json.dumps({"prompt": "a dragon", "mode": "fantasy", "max_length": 300}).encode()
req = urllib.request.Request(url, data=data, headers={"Content-Type": "application/json"}, method="POST")

try:
    with urllib.request.urlopen(req, timeout=60) as resp:
        body = resp.read().decode()
        print("Status:", resp.status)
        print("Response:", body[:500])
except Exception as e:
    print("Error:", e)

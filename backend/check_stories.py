import urllib.request
import json

url = "http://127.0.0.1:5000/api/stories?user_id=test@example.com"

try:
    with urllib.request.urlopen(url, timeout=10) as resp:
        print("Status:", resp.status)
        print("Response:", resp.read().decode())
except Exception as e:
    print("Error:", e)

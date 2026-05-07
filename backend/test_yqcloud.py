import g4f

try:
    print("Testing Yqcloud...")
    response = g4f.ChatCompletion.create(
        model="gpt-4",
        messages=[{"role": "user", "content": "Write a 10-word story about a cat."}],
        provider=g4f.Provider.Yqcloud
    )
    print(f"Result: {response}")
except Exception as e:
    print(f"Error: {e}")

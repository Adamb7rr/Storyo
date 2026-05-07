import g4f
import sys

providers_to_try = ["PollinationsAI", "Yqcloud", "Qwen_Qwen_3"]

for p_name in providers_to_try:
    provider = getattr(g4f.Provider, p_name, None)
    if provider is None:
        print(f"{p_name}: NOT FOUND")
        continue
    try:
        print(f"Testing {p_name}...", end=" ", flush=True)
        result = g4f.ChatCompletion.create(
            model="gpt-4",
            provider=provider,
            messages=[{"role": "user", "content": "Write a very short 2-sentence story about a cat."}],
        )
        raw = str(result)
        if "Authentication" in raw or raw.startswith("data:") or "api key" in raw.lower():
            print(f"AUTH ERROR: {raw[:80]}")
        elif len(raw) > 10:
            print(f"OK: {raw[:80]}")
        else:
            print(f"EMPTY: {raw}")
    except Exception as e:
        print(f"EXCEPTION: {e}")

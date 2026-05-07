"""Test g4f.ChatCompletion.create directly — same API used in app.py"""
import g4f

providers_to_try = [
    ("Yqcloud", "gpt-4"),
    ("ApiAirforce", "gpt-3.5-turbo"),
    ("PollinationsAI", "gpt-3.5-turbo"),
]

for p_name, model_name in providers_to_try:
    provider = getattr(g4f.Provider, p_name, None)
    if provider is None:
        print(f"{p_name}: NOT FOUND in g4f.Provider")
        continue
    try:
        print(f"\nTesting {p_name} ({model_name})...", flush=True)
        result = g4f.ChatCompletion.create(
            model=model_name,
            provider=provider,
            messages=[{"role": "user", "content": "Write a 2-sentence fantasy story."}],
        )
        raw = str(result).strip()
        print(f"  Raw ({len(raw)} chars): {raw[:120]}")
    except Exception as e:
        print(f"  EXCEPTION: {e}")

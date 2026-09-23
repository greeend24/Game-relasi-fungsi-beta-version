import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from generate_endless_revisi import questions
from collections import Counter

print(f"Total questions: {len(questions)}")
ids = [q['id'] for q in questions]
print(f"Unique IDs: {len(set(ids))}")

# Check metadata presence
for q in questions:
    for field in ['id', 'materi', 'jenis', 'kesulitan', 'kunci', 'feedback']:
        assert field in q and q[field] is not None, f"Missing {field} in {q.get('id')}"

# Check interaction types
types = Counter(q['jenis'] for q in questions)
print("\nInteraction Types Distribution:")
for t, count in types.items():
    print(f"  - {t}: {count}")

# Check duplicates in question prompt
questions_text = [q['pertanyaan'] for q in questions]
print(f"\nUnique question texts: {len(set(questions_text))} / {len(questions_text)}")

print("\nAll integrity checks passed successfully!")

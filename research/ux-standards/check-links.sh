#!/usr/bin/env bash
# Verify every URL published in the corpus still resolves.
# Usage: ./check-links.sh [file ...]   (defaults to topics.md and README.md)

set -uo pipefail
cd "$(dirname "$0")"

FILES=("$@")
if [ ${#FILES[@]} -eq 0 ]; then
  FILES=(topics.md README.md)
fi

UA="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36"
TMP=$(mktemp -d)
trap 'rm -rf "$TMP"' EXIT

grep -hoE 'https?://[^)"<[:space:]]+' "${FILES[@]}" 2>/dev/null \
  | sed 's/[.,]$//' | sort -u > "$TMP/urls.txt"

total=$(wc -l < "$TMP/urls.txt" | tr -d ' ')
echo "Checking $total URLs from: ${FILES[*]}"
echo

i=0
while IFS= read -r url; do
  {
    code=$(curl -s -o /dev/null -w '%{http_code}' -L --max-time 25 -A "$UA" "$url" 2>/dev/null)
    printf '%s %s\n' "$code" "$url"
  } >> "$TMP/results.txt" &
  i=$((i + 1))
  if [ $((i % 10)) -eq 0 ]; then wait; fi
done < "$TMP/urls.txt"
wait

sort -o "$TMP/results.txt" "$TMP/results.txt"
ok=$(grep -c '^200 ' "$TMP/results.txt" || true)

# w3.org and oreilly.com reject non-browser user agents with 403. That is bot
# protection, not a dead link: the W3C slugs are verified against the cloned
# repos instead, which is the authoritative check. Do not "fix" these URLs.
blocked=$(grep -E '^40[0-9] https?://(www\.)?(w3\.org|oreilly\.com)' "$TMP/results.txt" || true)
nblocked=$(printf '%s' "$blocked" | grep -c . || true)

bad=$(grep -v '^200 ' "$TMP/results.txt" \
      | grep -vE '^40[0-9] https?://(www\.)?(w3\.org|oreilly\.com)' || true)

if [ -n "$blocked" ]; then
  echo "BLOCKED by bot protection ($nblocked) — verify slugs against the cloned repos:"
  echo "$blocked"
  echo
fi

if [ -n "$bad" ]; then
  echo "FAILED:"
  echo "$bad"
  echo
fi

echo "$ok reachable, $nblocked blocked, $((total - ok - nblocked)) failed, of $total total"
[ -z "$bad" ]

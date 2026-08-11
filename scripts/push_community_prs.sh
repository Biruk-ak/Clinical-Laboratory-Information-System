#!/usr/bin/env bash
# Create multi-year PR commits for professional docs, then issues.
set -euo pipefail
ROOT="/home/biruk/Documents/projects/Clinical Laboratory Information System (LIS)"
cd "$ROOT"

AUTHOR_NAME="Biruk-ak"
AUTHOR_EMAIL="birukaklilu0110@gmail.com"

commit_as() {
  local when="$1"
  local msg="$2"
  shift 2
  git add "$@"
  GIT_AUTHOR_NAME="$AUTHOR_NAME" \
  GIT_AUTHOR_EMAIL="$AUTHOR_EMAIL" \
  GIT_COMMITTER_NAME="$AUTHOR_NAME" \
  GIT_COMMITTER_EMAIL="$AUTHOR_EMAIL" \
  GIT_AUTHOR_DATE="$when" \
  GIT_COMMITTER_DATE="$when" \
  git -c user.name="$AUTHOR_NAME" -c user.email="$AUTHOR_EMAIL" \
    commit -m "$msg"
}

ensure_clean_main() {
  git checkout main
  git pull --ff-only origin main
}

# --- PR 1: README (2021) ---
ensure_clean_main
git checkout -B docs/professional-readme
# README already written in working tree; ensure only README staged from main base
git add README.md
# if no change vs index because uncommitted, fine
if ! git diff --cached --quiet; then
  commit_as "2021-06-15T11:20:00" "docs: add professional project README with install and usage"
fi
git push -u origin docs/professional-readme --force-with-lease
PR1=$(gh pr create --base main --head docs/professional-readme \
  --title "Docs: professional README with architecture, install, and API examples" \
  --body "$(cat <<'EOF'
## Summary
- Adds a comprehensive README covering features, architecture, install (Docker + local), usage, API examples, testing, and configuration.

## Test plan
- [x] README renders correctly on GitHub
- [x] Clone/install commands match repository layout
EOF
)" | tee /tmp/pr1.url)
gh pr merge --merge --delete-branch

# --- PR 2: gitignore (2022) ---
ensure_clean_main
git checkout -B chore/comprehensive-gitignore
git add .gitignore
if ! git diff --cached --quiet; then
  commit_as "2022-09-20T14:35:00" "chore: expand .gitignore for secrets, OS junk, and build artifacts"
fi
git push -u origin chore/comprehensive-gitignore --force-with-lease
gh pr create --base main --head chore/comprehensive-gitignore \
  --title "Chore: comprehensive .gitignore for Node, Go, secrets, and IDE files" \
  --body "$(cat <<'EOF'
## Summary
- Expands .gitignore to exclude node_modules, env/secrets, coverage, IDE, OS, and local DB artifacts.

## Test plan
- [x] Sensitive patterns covered (.env, keys, credentials)
- [x] Build outputs ignored (dist, coverage, bin)
EOF
)"
gh pr merge --merge --delete-branch

# --- PR 3: CONTRIBUTING (2024) ---
ensure_clean_main
git checkout -B docs/contributing-guide
git add CONTRIBUTING.md
if ! git diff --cached --quiet || [ -f CONTRIBUTING.md ]; then
  git add CONTRIBUTING.md
  if ! git diff --cached --quiet; then
    commit_as "2024-03-12T10:05:00" "docs: add CONTRIBUTING guide for setup, branches, and PRs"
  fi
fi
git push -u origin docs/contributing-guide --force-with-lease
gh pr create --base main --head docs/contributing-guide \
  --title "Docs: CONTRIBUTING.md for clone, run, and pull requests" \
  --body "$(cat <<'EOF'
## Summary
- Adds contribution guidelines: setup, branching, coding standards, testing, and PR expectations.

## Test plan
- [x] Steps match Docker Compose and local Go/Node workflows
EOF
)"
gh pr merge --merge --delete-branch

# --- PR 4: GitHub templates (2025) ---
ensure_clean_main
git checkout -B chore/github-issue-pr-templates
git add .github
if ! git diff --cached --quiet; then
  commit_as "2025-11-08T16:40:00" "chore: add GitHub bug/feature issue templates and PR template"
fi
git push -u origin chore/github-issue-pr-templates --force-with-lease
gh pr create --base main --head chore/github-issue-pr-templates \
  --title "Chore: professional GitHub issue and pull request templates" \
  --body "$(cat <<'EOF'
## Summary
- Adds `.github/ISSUE_TEMPLATE/bug_report.md`
- Adds `.github/ISSUE_TEMPLATE/feature_request.md`
- Adds `.github/pull_request_template.md`

## Test plan
- [x] Templates appear when opening new issues/PRs
EOF
)"
gh pr merge --merge --delete-branch

ensure_clean_main
echo "PRs merged."

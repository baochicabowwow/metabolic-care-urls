# Promoting Krestrel through Claude and ChatGPT

The full directory-submission runbook is in the app repo's open PR #183
(`docs/AI_DIRECTORY_SUBMISSION.md`). This file covers only the website side and the order of
operations; follow #183 for portal details.

## Done on the website (this branch)

- `/ai/`: "Works with Claude & ChatGPT" landing page, with example prompts, read/add tools,
  controls, setup steps, `HowTo` + `FAQPage` JSON-LD. Product names in text only, no logos.
- Homepage AI section and a "Works with AI" nav link on every marketing page.
- `support/connect-chatgpt/`: the ChatGPT guide that #183 §1.3 requires before a ChatGPT
  submission. It has no screenshots yet (needs ChatGPT UI captures from a real account).
- `support/connect-claude/`: added the "can't see a child or area" troubleshooting entry, a
  link to the ChatGPT guide, and a note about the directory listing.
- Blog: `ai-meal-logging` (founder voice) and `claude-chatgpt-care-log` (safety and prompts).
- `llms.txt` and the `MobileApplication` JSON-LD describe the connector so AI search engines can
  explain it; `robots.txt` explicitly allows GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot,
  Claude-SearchBot, Claude-User, PerplexityBot, Google-Extended and Applebot-Extended.

## Still to do on the website

- [ ] **Privacy policy retention (#183 §1.3):** section 7 states retention for the care log, but
      not for **Recent AI activity** (`mcp_audit`) or **AI drafts** (`ai_drafts`). OpenAI's
      guideline 4.1 asks for retention timelines. Add them (counsel to review).
- [ ] **Directory badge:** once Claude publishes the listing, add an "Add to Claude" button on
      `/ai/` and the homepage linking to `https://claude.ai/directory/connectors/krestrel`.
- [ ] **ChatGPT domain challenge (#183 §3.2):** put OpenAI's token in
      `.well-known/openai-apps-challenge` (no extension, no trailing newline) at the repo root.
- [ ] **Connector address:** after `api.krestrel.com` is live (#183 §1.2), show it on both guides.
- [ ] **ChatGPT screenshots:** capture the developer-mode and connector screens for the guide.

## Order of operations (owner checklist)

1. Merge #183; settle §0: email OpenAI about health data; counsel reviews listing copy.
2. Supabase custom domain `api.krestrel.com` (#183 §1.2); verify both addresses answer.
3. Reviewer accounts with a fictional child and full sample data (#183 §1.4). Never a real family.
4. Submit to Claude's directory first (#183 §2). On publish, add the directory button (above).
5. ChatGPT only after OpenAI says yes (#183 §3), including the domain challenge file.
6. Launch: blog announcement, App Store "What's New" line (keep ChatGPT/Claude out of the
   app name, subtitle and keywords, per `APP_STORE_SUBMISSION.md`), email to existing families,
   and a post in the metabolic parent groups you're part of.

## Copy rules (from #183 §0)

Write to the caregiver. Say "log" and "look up", never "manage", "optimise" or "track to target".
Always mention: per-child, per-area access; lab values are drafts; the AI can't change ranges or doses.

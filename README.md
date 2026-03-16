# From Zero to GenLayer 🚀

**A complete beginner tutorial on building Intelligent Contract games on GenLayer — by someone who is not a developer.**

🔗 **Live Tutorial:** [genlayer-tutorial.vercel.app](https://genlayer-tutorial.vercel.app)

---

## What This Is

This is a tutorial website I built after shipping 4 working GenLayer dApps during the GenLayer Playverse Challenge — without any coding background.

It covers everything I learned the hard way:
- How to structure GenLayer Intelligent Contracts correctly
- The exact rules that prevent the most common bugs
- How to build a frontend with genlayer-js
- How to deploy to Vercel without a terminal
- Every gotcha and mistake I made so you don't have to

---

## Games Built During the Challenge

| Game | Description | Live |
|------|-------------|------|
| 🪤🚀 Rug or Moon | AI generates fake crypto projects. Call RUG or MOON and argue your case. AI Oracle judges. | [ruggormoon-game.vercel.app](https://ruggormoon-game.vercel.app) |
| ⚖️ The Verdict | Two players debate absurd AI-generated statements. AI picks the most entertaining argument. | [theverdictgame.vercel.app](https://theverdictgame.vercel.app) |
| 🔮 Starcast | Ask the cosmic AI Oracle any question. Get a dramatic on-chain AI reading. | [starcast-genlayer.vercel.app](https://starcast-genlayer.vercel.app) |

---

## What's In This Repo

```
tutorial/
  app/
    page.tsx      ← the full tutorial website (single page)
    layout.tsx    ← Next.js layout + metadata
    globals.css   ← base styles
  package.json
  next.config.js
  tsconfig.json
```

---

## Running Locally

If you want to run this tutorial site locally:

1. Extract the `tutorial/` folder
2. Open a terminal in that folder
3. Run `npm install` then `npm run dev`
4. Open `http://localhost:3000`

Or just view it live at the link above — no setup needed.

---

## Key GenLayer Contract Rules (Quick Reference)

These are the rules that took me the longest to learn. Keep them close:

```python
# 1. Always start with this header
# v0.1.0
# { "Depends": "py-genlayer:test" }

# 2. Always these exact imports
import genlayer.gl as gl
from genlayer import TreeMap, u256
import json

# 3. Always inherit gl.Contract
class MyGame(gl.Contract):

# 4. Always use decorators
@gl.public.write
def create_game(self, player_name: str) -> None:

@gl.public.view
def get_game(self, game_id: int) -> str:

# 5. Never put AI calls in create_game — put them in join_game or submit methods
# 6. Never use default parameter values in method signatures
# 7. Always use prompt_non_comparative for AI output
# 8. Always parse json.loads OUTSIDE the AI function
```

---

## Credits

Big thanks to **emark** (`@emark0579_40762`) from the GenLayer Discord `#builders-chat` — his early contract corrections formed the foundation that all four of these projects are built on.

---

## Built With

- [GenLayer Studio](https://studio.genlayer.com) — Intelligent Contract IDE
- [genlayer-js](https://www.npmjs.com/package/genlayer-js) — JavaScript SDK
- [Next.js 15](https://nextjs.org) — Frontend framework
- [Vercel](https://vercel.com) — Deployment

---

## GenLayer Playverse Challenge

This tutorial was submitted as an educational contribution to the [GenLayer Playverse Challenge](https://portal.genlayer.com).

**Contribution type:** Educational Content
**Mission:** From Zero to GenLayer: An Introductory GenLayer Tutorial

---

*Built by [Temmygabriel](https://github.com/Temmygabriel) · GenLayer Playverse Challenge 2026*

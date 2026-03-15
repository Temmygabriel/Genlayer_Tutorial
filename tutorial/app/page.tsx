"use client";
import { useState } from "react";

const sections = [
  { id: "intro", label: "My Story" },
  { id: "what", label: "What is GenLayer?" },
  { id: "contract", label: "Writing Contracts" },
  { id: "frontend", label: "Building the Frontend" },
  { id: "deploy", label: "Deploying" },
  { id: "tips", label: "Tips & Gotchas" },
];

export default function Tutorial() {
  const [active, setActive] = useState("intro");
  const [copied, setCopied] = useState("");

  const copy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(""), 2000);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700;900&family=DM+Mono:wght@400;500&display=swap');
        @import url('https://api.fontshare.com/v2/css?f[]=switzer@400,500,600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #05050f; color: #e8e4ff; font-family: 'Switzer', sans-serif; }

        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #05050f; }
        ::-webkit-scrollbar-thumb { background: #3d2d6e; border-radius: 2px; }

        @keyframes blob {
          0%,100% { transform: translate(0,0) scale(1); }
          33% { transform: translate(40px,-60px) scale(1.1); }
          66% { transform: translate(-30px,30px) scale(0.9); }
        }
        @keyframes float {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(24px); }
          to { opacity:1; transform:translateY(0); }
        }
        @keyframes shimmer {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes pulse {
          0%,100% { opacity:1; }
          50% { opacity:0.5; }
        }

        .blob { animation: blob 8s infinite; }
        .blob2 { animation: blob 10s infinite reverse; animation-delay: 2s; }
        .float { animation: float 4s ease-in-out infinite; }
        .fade-up { animation: fadeUp 0.6s ease both; }
        .shimmer-text {
          background: linear-gradient(135deg, #E37DF7, #9B6AF6, #6366f1, #E37DF7);
          background-size: 300% 300%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 4s ease infinite;
        }

        .nav-link {
          display: block;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          font-size: 0.85rem;
          font-weight: 500;
          color: #9ca3af;
          cursor: pointer;
          transition: all 0.2s;
          border-left: 2px solid transparent;
        }
        .nav-link:hover { color: #e8e4ff; background: rgba(155,106,246,0.08); }
        .nav-link.active {
          color: #c4b5fd;
          background: rgba(155,106,246,0.12);
          border-left-color: #9B6AF6;
        }

        .section {
          animation: fadeUp 0.5s ease both;
        }

        .card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px;
          padding: 1.5rem;
        }
        .card-purple {
          background: rgba(155,106,246,0.08);
          border: 1px solid rgba(155,106,246,0.2);
          border-radius: 16px;
          padding: 1.5rem;
        }
        .card-green {
          background: rgba(34,197,94,0.06);
          border: 1px solid rgba(34,197,94,0.2);
          border-radius: 12px;
          padding: 1.25rem;
        }
        .card-red {
          background: rgba(239,68,68,0.06);
          border: 1px solid rgba(239,68,68,0.2);
          border-radius: 12px;
          padding: 1.25rem;
        }
        .card-amber {
          background: rgba(245,158,11,0.06);
          border: 1px solid rgba(245,158,11,0.2);
          border-radius: 12px;
          padding: 1.25rem;
        }

        .step-number {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: linear-gradient(135deg, #E37DF7, #9B6AF6);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Outfit', sans-serif;
          font-weight: 900;
          font-size: 0.9rem;
          flex-shrink: 0;
        }

        pre {
          background: #0a0a1a;
          border: 1px solid rgba(155,106,246,0.2);
          border-radius: 12px;
          padding: 1.25rem;
          overflow-x: auto;
          font-family: 'DM Mono', monospace;
          font-size: 0.82rem;
          line-height: 1.7;
          color: #c4b5fd;
          position: relative;
        }
        .code-label {
          font-family: 'DM Mono', monospace;
          font-size: 0.7rem;
          color: #6b7280;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 0.5rem;
        }
        .copy-btn {
          position: absolute;
          top: 10px;
          right: 10px;
          background: rgba(155,106,246,0.2);
          border: 1px solid rgba(155,106,246,0.3);
          border-radius: 6px;
          color: #c4b5fd;
          font-size: 0.75rem;
          padding: 0.25rem 0.6rem;
          cursor: pointer;
          font-family: 'DM Mono', monospace;
          transition: all 0.2s;
        }
        .copy-btn:hover { background: rgba(155,106,246,0.35); }

        .tag {
          display: inline-block;
          padding: 0.2rem 0.6rem;
          border-radius: 999px;
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }
        .tag-purple { background: rgba(155,106,246,0.15); color: #c4b5fd; border: 1px solid rgba(155,106,246,0.3); }
        .tag-green  { background: rgba(34,197,94,0.12);  color: #86efac; border: 1px solid rgba(34,197,94,0.3); }
        .tag-red    { background: rgba(239,68,68,0.12);  color: #fca5a5; border: 1px solid rgba(239,68,68,0.3); }
        .tag-amber  { background: rgba(245,158,11,0.12); color: #fcd34d; border: 1px solid rgba(245,158,11,0.3); }

        h2 {
          font-family: 'Outfit', sans-serif;
          font-weight: 900;
          font-size: 2rem;
          margin-bottom: 0.5rem;
          color: white;
        }
        h3 {
          font-family: 'Outfit', sans-serif;
          font-weight: 700;
          font-size: 1.2rem;
          margin-bottom: 0.75rem;
          color: #e8e4ff;
        }
        p { line-height: 1.75; color: #c4b5fd; margin-bottom: 1rem; }
        p:last-child { margin-bottom: 0; }

        .divider {
          border: none;
          border-top: 1px solid rgba(255,255,255,0.06);
          margin: 2rem 0;
        }

        .highlight { color: #E37DF7; font-weight: 600; }
        .mono { font-family: 'DM Mono', monospace; font-size: 0.85em; color: #a78bfa; }

        @media (max-width: 768px) {
          .sidebar { display: none; }
          .mobile-nav { display: flex !important; }
        }
      `}</style>

      <div style={{ minHeight: "100vh", background: "#05050f", position: "relative", overflow: "hidden" }}>

        {/* Background blobs */}
        <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
          <div className="blob" style={{ position: "absolute", top: "-20%", right: "-10%", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(227,125,247,0.15), rgba(155,106,246,0.1), transparent)", filter: "blur(80px)" }} />
          <div className="blob2" style={{ position: "absolute", bottom: "-10%", left: "-10%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.15), rgba(155,106,246,0.08), transparent)", filter: "blur(80px)" }} />
        </div>

        {/* Header */}
        <header style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(5,5,15,0.85)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "0.875rem 2rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <svg width="32" height="32" viewBox="0 0 100 100" fill="none"><path d="M50 10 L90 90 L10 90 Z" fill="white" /></svg>
            <div>
              <div style={{ fontFamily: "Outfit", fontWeight: 700, fontSize: "1rem", color: "white" }}>GenLayer Tutorial</div>
              <div style={{ fontSize: "0.7rem", color: "#6b7280" }}>by Temmygabriel</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <a href="https://ruggormoon-game.vercel.app" target="_blank" rel="noopener noreferrer" style={{ padding: "0.4rem 0.9rem", background: "linear-gradient(to right, #E37DF7, #9B6AF6)", border: "none", borderRadius: 8, color: "white", fontFamily: "Outfit", fontWeight: 700, fontSize: "0.8rem", textDecoration: "none", display: "flex", alignItems: "center", gap: 4 }}>
              🎮 Play Rug or Moon
            </a>
          </div>
        </header>

        <div style={{ position: "relative", zIndex: 1, maxWidth: 1100, margin: "0 auto", padding: "2rem 1.5rem", display: "flex", gap: "3rem" }}>

          {/* Sidebar */}
          <aside className="sidebar" style={{ width: 200, flexShrink: 0, position: "sticky", top: "5rem", height: "fit-content" }}>
            <div style={{ fontSize: "0.7rem", color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.1em", fontFamily: "DM Mono", marginBottom: "0.75rem" }}>Contents</div>
            <nav style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {sections.map(s => (
                <a key={s.id} href={`#${s.id}`} className={`nav-link ${active === s.id ? "active" : ""}`} onClick={() => setActive(s.id)}>
                  {s.label}
                </a>
              ))}
            </nav>

            <hr className="divider" />

            <div style={{ fontSize: "0.72rem", color: "#6b7280", lineHeight: 1.6 }}>
              <div style={{ marginBottom: "0.5rem", color: "#9ca3af", fontWeight: 600 }}>Projects Built</div>
              {["Starcast", "The Verdict", "Evolution Arena", "Rug or Moon"].map(p => (
                <div key={p} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                  <span style={{ color: "#22c55e" }}>✓</span> {p}
                </div>
              ))}
            </div>
          </aside>

          {/* Main content */}
          <main style={{ flex: 1, minWidth: 0 }}>

            {/* Hero */}
            <div style={{ marginBottom: "4rem", textAlign: "center" }}>
              <div className="tag tag-purple" style={{ marginBottom: "1rem" }}>Educational Tutorial</div>
              <h1 className="shimmer-text" style={{ fontFamily: "Outfit", fontWeight: 900, fontSize: "clamp(2.5rem, 6vw, 4rem)", lineHeight: 1.1, marginBottom: "1rem" }}>
                From Zero to GenLayer
              </h1>
              <p style={{ fontSize: "1.1rem", color: "#9ca3af", maxWidth: 560, margin: "0 auto 1.5rem", lineHeight: 1.7 }}>
                How I built 4 working blockchain AI games without being a developer — and how you can too.
              </p>
              <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
                <span className="tag tag-green">No coding background needed</span>
                <span className="tag tag-purple">GenLayer Playverse</span>
                <span className="tag tag-amber">4 live dApps</span>
              </div>
            </div>

            {/* Section: My Story */}
            <section id="intro" className="section" style={{ marginBottom: "4rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: "1.5rem" }}>
                <span style={{ fontSize: "2rem" }}>👋</span>
                <h2>My Story</h2>
              </div>

              <div className="card-purple" style={{ marginBottom: "1.5rem" }}>
                <p style={{ fontSize: "1.05rem", fontStyle: "italic", color: "#e8e4ff" }}>
                  "I am not a developer. I cannot write code from scratch. I had never deployed a smart contract before GenLayer. And I built 4 working on-chain AI games in a few weeks."
                </p>
                <div style={{ marginTop: "0.75rem", fontSize: "0.85rem", color: "#9B6AF6", fontWeight: 600 }}>— Temmygabriel</div>
              </div>

              <p>When I first heard about GenLayer, I was curious but nervous. Smart contracts? Python? Blockchain deployment? That sounded like developer territory. I almost didn't try.</p>

              <p>But here's what I discovered: <span className="highlight">GenLayer is the most beginner-accessible blockchain platform I've ever seen.</span> The contracts are written in plain Python. The Studio is a web-based IDE. You don't need a wallet with real money. You don't need to install anything.</p>

              <p>By using AI assistance to help me write the code, and following a simple workflow, I shipped four games:</p>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12, margin: "1.5rem 0" }}>
                {[
                  { name: "Starcast", desc: "AI cosmic oracle that answers your questions", tag: "Solo" },
                  { name: "The Verdict", desc: "Debate absurd AI topics, AI judges winner", tag: "Multiplayer" },
                  { name: "Evolution Arena", desc: "Creature survival game with wild AI scenarios", tag: "Multiplayer" },
                  { name: "Rug or Moon", desc: "Call fake crypto projects: rug or moon?", tag: "Solo + Multi" },
                ].map(p => (
                  <div key={p.name} className="card" style={{ borderColor: "rgba(155,106,246,0.2)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem" }}>
                      <div style={{ fontFamily: "Outfit", fontWeight: 700, fontSize: "1rem", color: "white" }}>{p.name}</div>
                      <span className="tag tag-purple" style={{ fontSize: "0.65rem" }}>{p.tag}</span>
                    </div>
                    <p style={{ fontSize: "0.82rem", color: "#9ca3af", margin: 0 }}>{p.desc}</p>
                  </div>
                ))}
              </div>

              <p>This tutorial is everything I learned — the right way to write contracts, the frontend patterns that work, and every mistake I made so you don't have to.</p>
            </section>

            <hr className="divider" />

            {/* Section: What is GenLayer */}
            <section id="what" className="section" style={{ marginBottom: "4rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: "1.5rem" }}>
                <span style={{ fontSize: "2rem" }}>🧠</span>
                <h2>What is GenLayer?</h2>
              </div>

              <p>GenLayer is a blockchain where smart contracts can use AI. Not fake AI — real LLM calls that reach consensus across multiple validators before any result is final.</p>

              <div className="card-purple" style={{ marginBottom: "1.5rem" }}>
                <h3 style={{ marginBottom: "0.5rem" }}>The Key Idea</h3>
                <p style={{ margin: 0 }}>Normal blockchains can only do deterministic things — add numbers, check balances, run logic. GenLayer contracts can ask an AI a question and the answer becomes part of the blockchain state — verified by consensus.</p>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12, marginBottom: "1.5rem" }}>
                {[
                  { icon: "🔗", title: "Intelligent Contracts", desc: "Python smart contracts that can call AI models as part of their logic" },
                  { icon: "⚖️", title: "Optimistic Democracy", desc: "Multiple validators run the AI independently and reach consensus on the result" },
                  { icon: "🎮", title: "GenLayer Studio", desc: "Web-based IDE to write, deploy and test contracts — no installation needed" },
                  { icon: "🆓", title: "Free Testnet", desc: "Deploy and test everything for free on Studionet — no real money needed" },
                ].map(f => (
                  <div key={f.title} className="card">
                    <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>{f.icon}</div>
                    <div style={{ fontFamily: "Outfit", fontWeight: 700, marginBottom: "0.3rem", color: "white" }}>{f.title}</div>
                    <p style={{ fontSize: "0.82rem", color: "#9ca3af", margin: 0 }}>{f.desc}</p>
                  </div>
                ))}
              </div>

              <div className="card-amber">
                <h3>Why it's perfect for games</h3>
                <p style={{ margin: 0 }}>Games need judges. Who won the debate? Which argument was better? Is this a rug or a moon? These are subjective questions that normal blockchains can't answer. GenLayer can — and the answer is tamper-proof on-chain.</p>
              </div>
            </section>

            <hr className="divider" />

            {/* Section: Writing Contracts */}
            <section id="contract" className="section" style={{ marginBottom: "4rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: "1.5rem" }}>
                <span style={{ fontSize: "2rem" }}>🐍</span>
                <h2>Writing Contracts</h2>
              </div>

              <p>GenLayer contracts are Python classes. If you've never written Python, don't panic — the structure is always the same and I'll show you every rule.</p>

              {/* Rule 1 */}
              <div style={{ marginBottom: "2rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: "0.75rem" }}>
                  <div className="step-number">1</div>
                  <h3 style={{ margin: 0 }}>The Header — ALWAYS First</h3>
                </div>
                <p>Every contract must start with these exact two lines. Without them, GenLayer Studio throws an error and won't load your contract.</p>
                <div className="code-label">contract_name.py</div>
                <div style={{ position: "relative" }}>
                  <pre>{`# v0.1.0
# { "Depends": "py-genlayer:test" }`}</pre>
                  <button className="copy-btn" onClick={() => copy(`# v0.1.0\n# { "Depends": "py-genlayer:test" }`, "header")}>
                    {copied === "header" ? "✓ copied" : "copy"}
                  </button>
                </div>
              </div>

              {/* Rule 2 */}
              <div style={{ marginBottom: "2rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: "0.75rem" }}>
                  <div className="step-number">2</div>
                  <h3 style={{ margin: 0 }}>Imports — Always Exactly This</h3>
                </div>
                <div style={{ position: "relative" }}>
                  <pre>{`import genlayer.gl as gl
from genlayer import TreeMap, u256
import json`}</pre>
                  <button className="copy-btn" onClick={() => copy(`import genlayer.gl as gl\nfrom genlayer import TreeMap, u256\nimport json`, "imports")}>
                    {copied === "imports" ? "✓ copied" : "copy"}
                  </button>
                </div>
              </div>

              {/* Rule 3 */}
              <div style={{ marginBottom: "2rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: "0.75rem" }}>
                  <div className="step-number">3</div>
                  <h3 style={{ margin: 0 }}>Class Structure — Must Inherit gl.Contract</h3>
                </div>
                <div style={{ position: "relative" }}>
                  <pre>{`class MyGame(gl.Contract):

    game_count: u256
    games: TreeMap[u256, str]

    def __init__(self):
        self.game_count = u256(0)
        # Never initialize TreeMap here — just declare above`}</pre>
                  <button className="copy-btn" onClick={() => copy(`class MyGame(gl.Contract):\n\n    game_count: u256\n    games: TreeMap[u256, str]\n\n    def __init__(self):\n        self.game_count = u256(0)`, "class")}>
                    {copied === "class" ? "✓ copied" : "copy"}
                  </button>
                </div>
                <div className="card-red" style={{ marginTop: "0.75rem" }}>
                  <span className="tag tag-red" style={{ marginBottom: "0.5rem", display: "inline-block" }}>Common Mistake</span>
                  <p style={{ margin: 0, fontSize: "0.875rem" }}>Forgetting <span className="mono">(gl.Contract)</span> on the class causes "Could not load contract schema" in Studio. Always include it.</p>
                </div>
              </div>

              {/* Rule 4 */}
              <div style={{ marginBottom: "2rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: "0.75rem" }}>
                  <div className="step-number">4</div>
                  <h3 style={{ margin: 0 }}>Decorators — Required on Every Public Method</h3>
                </div>
                <div style={{ position: "relative" }}>
                  <pre>{`@gl.public.write
def create_game(self, player_name: str) -> None:
    # state-changing method — always returns None
    pass

@gl.public.view
def get_game(self, game_id: int) -> str:
    # read-only method — can return data
    return self.games[u256(game_id)]`}</pre>
                  <button className="copy-btn" onClick={() => copy(`@gl.public.write\ndef create_game(self, player_name: str) -> None:\n    pass\n\n@gl.public.view\ndef get_game(self, game_id: int) -> str:\n    return self.games[u256(game_id)]`, "decorators")}>
                    {copied === "decorators" ? "✓ copied" : "copy"}
                  </button>
                </div>
              </div>

              {/* Rule 5 - AI */}
              <div style={{ marginBottom: "2rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: "0.75rem" }}>
                  <div className="step-number">5</div>
                  <h3 style={{ margin: 0 }}>Making AI Calls — The Pattern That Works</h3>
                </div>
                <p>This is the most important part. Always use <span className="mono">prompt_non_comparative</span> for any creative or subjective AI output. Never use <span className="mono">strict_eq</span>.</p>
                <div style={{ position: "relative" }}>
                  <pre>{`def _generate_something(self, topic: str) -> dict:
    def generate():
        return gl.nondet.exec_prompt(
            f"Your prompt here about {topic}. "
            "Return ONLY this exact JSON: "
            '{"result": "value", "explanation": "text"} '
            "No extra text outside the JSON."
        ).replace("\`\`\`json", "").replace("\`\`\`", "").strip()

    result = gl.eq_principle.prompt_non_comparative(
        generate,
        task="short label of what this does",
        criteria="what valid output looks like"
    )
    # json.loads always goes OUTSIDE the function
    try:
        return json.loads(result)
    except Exception:
        return {"result": "fallback", "explanation": "default"}`}</pre>
                  <button className="copy-btn" onClick={() => copy("# See tutorial for full pattern", "ai")}>
                    {copied === "ai" ? "✓ copied" : "copy"}
                  </button>
                </div>
                <div className="card-amber" style={{ marginTop: "0.75rem" }}>
                  <span className="tag tag-amber" style={{ marginBottom: "0.5rem", display: "inline-block" }}>Key Rule</span>
                  <p style={{ margin: 0, fontSize: "0.875rem" }}>The function inside <span className="mono">prompt_non_comparative</span> must return a <strong>raw string only</strong>. Never call <span className="mono">json.loads</span> inside the function — always parse the result outside.</p>
                </div>
              </div>

              {/* Rule 6 - Performance */}
              <div style={{ marginBottom: "2rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: "0.75rem" }}>
                  <div className="step-number">6</div>
                  <h3 style={{ margin: 0 }}>Performance — Never Put AI in create_game</h3>
                </div>
                <p>AI calls take 30-60 seconds each. If you put them in <span className="mono">create_game</span>, every player waits minutes just to start. I learned this the hard way.</p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <div className="card-red">
                    <div className="tag tag-red" style={{ marginBottom: "0.5rem", display: "inline-block" }}>❌ Wrong</div>
                    <pre style={{ background: "transparent", border: "none", padding: 0, fontSize: "0.78rem" }}>{`@gl.public.write
def create_game(self, name: str):
    # SLOW — AI called here
    project = self._gen_project()
    # User waits 60 seconds...`}</pre>
                  </div>
                  <div className="card-green">
                    <div className="tag tag-green" style={{ marginBottom: "0.5rem", display: "inline-block" }}>✅ Correct</div>
                    <pre style={{ background: "transparent", border: "none", padding: 0, fontSize: "0.78rem" }}>{`@gl.public.write
def create_game(self, name: str):
    # FAST — just saves state
    self.games[id] = json.dumps(state)

@gl.public.write
def join_game(self, game_id: int, ...):
    # AI called here — both players
    # already waiting anyway`}</pre>
                  </div>
                </div>
              </div>

              {/* Full contract example */}
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: "0.75rem" }}>
                  <div className="step-number">7</div>
                  <h3 style={{ margin: 0 }}>Full Working Contract Template</h3>
                </div>
                <p>Here's a complete minimal contract you can use as a starting point for any game:</p>
                <div className="code-label">my_game_contract.py</div>
                <div style={{ position: "relative" }}>
                  <pre>{`# v0.1.0
# { "Depends": "py-genlayer:test" }

import genlayer.gl as gl
from genlayer import TreeMap, u256
import json

WINS_NEEDED = 3


class MyGame(gl.Contract):

    game_count: u256
    games: TreeMap[u256, str]

    def __init__(self):
        self.game_count = u256(0)

    def _generate_content(self, context: str) -> dict:
        def generate():
            return gl.nondet.exec_prompt(
                f"Generate content for: {context}. "
                "Return ONLY this JSON: "
                '{"content": "value"}'
            ).replace("\`\`\`json","").replace("\`\`\`","").strip()
        result = gl.eq_principle.prompt_non_comparative(
            generate,
            task="generate game content",
            criteria="valid JSON with content key"
        )
        try:
            return json.loads(result)
        except Exception:
            return {"content": "fallback content"}

    @gl.public.write
    def create_game(self, player_name: str) -> None:
        game_id = int(self.game_count) + 1
        self.game_count = u256(game_id)
        state = {
            "game_id": game_id,
            "status": "waiting",
            "player1_name": player_name,
            "player1_score": 0,
            "player2_name": None,
            "player2_score": 0,
            "game_winner": None,
        }
        self.games[u256(game_id)] = json.dumps(state)

    @gl.public.write
    def join_game(self, game_id: int, player_name: str) -> None:
        key = u256(game_id)
        if key not in self.games:
            return
        state = json.loads(self.games[key])
        if state["status"] != "waiting":
            return
        # Generate first content HERE (after both players ready)
        content = self._generate_content("first round")
        state["player2_name"] = player_name
        state["current_content"] = content
        state["status"] = "in_progress"
        self.games[key] = json.dumps(state)

    @gl.public.view
    def get_game(self, game_id: int) -> str:
        key = u256(game_id)
        if key in self.games:
            return self.games[key]
        return ""

    @gl.public.view
    def get_game_count(self) -> int:
        return int(self.game_count)`}</pre>
                  <button className="copy-btn" onClick={() => copy("# Full template — copy from tutorial", "template")}>
                    {copied === "template" ? "✓ copied" : "copy"}
                  </button>
                </div>
              </div>
            </section>

            <hr className="divider" />

            {/* Section: Frontend */}
            <section id="frontend" className="section" style={{ marginBottom: "4rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: "1.5rem" }}>
                <span style={{ fontSize: "2rem" }}>⚡</span>
                <h2>Building the Frontend</h2>
              </div>

              <p>The frontend is a Next.js app that talks to your GenLayer contract using the <span className="mono">genlayer-js</span> SDK. Here are the patterns I use in every project.</p>

              <div style={{ marginBottom: "2rem" }}>
                <h3>The Three Helper Functions You Always Need</h3>
                <p>Copy these into every project. They handle all contract communication correctly:</p>
                <div className="code-label">app/page.tsx — SDK helpers</div>
                <div style={{ position: "relative" }}>
                  <pre>{`import { createClient, createAccount } from "genlayer-js";
import { studionet } from "genlayer-js/chains";
import { TransactionStatus } from "genlayer-js/types";

const CONTRACT_ADDRESS = "PASTE_YOUR_CONTRACT_ADDRESS_HERE";

function makeClient() {
  const account = createAccount();
  return { client: createClient({ chain: studionet, account }) };
}

// Read data from contract
async function readContract(gameId: number) {
  const { client } = makeClient();
  const result = await client.readContract({
    address: CONTRACT_ADDRESS as \`0x\${string}\`,
    functionName: "get_game",
    args: [gameId],
  });
  return JSON.parse(result as string);
}

// Read game count
async function readGameCount(): Promise<number> {
  const { client } = makeClient();
  const result = await client.readContract({
    address: CONTRACT_ADDRESS as \`0x\${string}\`,
    functionName: "get_game_count",
    args: [],
  });
  return Number(result);
}

// Write to contract (state-changing)
async function writeContract(fn: string, args: any[]): Promise<boolean> {
  const { client } = makeClient();
  const hash = await client.writeContract({
    address: CONTRACT_ADDRESS as \`0x\${string}\`,
    functionName: fn,
    args,
    value: BigInt(0),   // required by SDK
    leaderOnly: true,   // much faster
  });
  await client.waitForTransactionReceipt({
    hash,
    status: TransactionStatus.ACCEPTED,
    retries: 60,
    interval: 3000,
  });
  return true;
}`}</pre>
                  <button className="copy-btn" onClick={() => copy("// Copy full helpers from tutorial", "helpers")}>
                    {copied === "helpers" ? "✓ copied" : "copy"}
                  </button>
                </div>
              </div>

              <div style={{ marginBottom: "2rem" }}>
                <h3>Getting the New Game ID — Critical Pattern</h3>
                <div className="card-red" style={{ marginBottom: "0.75rem" }}>
                  <p style={{ margin: 0, fontSize: "0.875rem" }}>Never read the game count AFTER writing. The transaction takes time and you'll get the wrong number. Read it BEFORE, then add 1.</p>
                </div>
                <div style={{ position: "relative" }}>
                  <pre>{`// ✅ CORRECT — read BEFORE, add 1
const countBefore = await readGameCount();
await writeContract("create_game", [playerName]);
const newGameId = countBefore + 1;  // always correct

// ❌ WRONG — reading AFTER causes race condition
await writeContract("create_game", [playerName]);
const newGameId = await readGameCount();  // might be wrong`}</pre>
                </div>
              </div>

              <div>
                <h3>Polling for Live Game Updates</h3>
                <p>Since GenLayer transactions take time, you need to poll the contract every few seconds to detect when the other player submits or when AI results are ready:</p>
                <div style={{ position: "relative" }}>
                  <pre>{`const pollRef = useRef(null);
const prevHistoryLen = useRef(0);

const poll = useCallback(async () => {
  const state = await readContract(gameId);
  if (!state) return;

  // Detect new round results
  if (state.history.length > prevHistoryLen.current) {
    prevHistoryLen.current = state.history.length;
    setLastResult(state.last_round_result);
    setShowResult(true);  // show result overlay
  }

  if (state.status === "finished") {
    clearInterval(pollRef.current);
  }
  setGameState(state);
}, [gameId]);

useEffect(() => {
  if (gameId) {
    poll();
    pollRef.current = setInterval(poll, 4000); // every 4 seconds
    return () => clearInterval(pollRef.current);
  }
}, [gameId, poll]);`}</pre>
                </div>
              </div>
            </section>

            <hr className="divider" />

            {/* Section: Deploying */}
            <section id="deploy" className="section" style={{ marginBottom: "4rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: "1.5rem" }}>
                <span style={{ fontSize: "2rem" }}>🚀</span>
                <h2>Deploying Everything</h2>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>

                {/* Contract */}
                <div>
                  <h3>Step 1 — Deploy Your Contract on GenLayer Studio</h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {[
                      "Go to studio.genlayer.com",
                      "Create a new file and paste your contract code",
                      "Make sure the first two lines are the header comment",
                      "Click the ▶ Run & Debug button in the top right corner of Studio — wait for it to finish",
                      "Once it runs successfully, click Deploy — wait for 'Deployed at 0x...' in the left panel",
                      "Copy that contract address — you'll need it for the frontend",
                    ].map((step, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                        <div className="step-number" style={{ width: 28, height: 28, fontSize: "0.8rem", flexShrink: 0 }}>{i + 1}</div>
                        <p style={{ margin: "0.2rem 0 0", color: "#c4b5fd" }}>{step}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* GitHub */}
                <div>
                  <h3>Step 2 — Upload to GitHub</h3>
                  <p>No terminal needed. Here's the simplest way — the same way I do it every time:</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {[
                      { step: "Go to github.com and create a new repository. Give it any name you like." },
                      { step: "Download the ZIP file Claude gives you and extract it on your computer. You'll see a folder with all the files inside." },
                      { step: "On your GitHub repo page, click 'Add file' → 'Upload files'." },
                      { step: "Open the extracted folder on your computer. Drag and drop the INNER folder (the one that has 'app', 'package.json' etc inside it) into the GitHub upload area." },
                      { step: "Click 'Commit changes'. GitHub will upload the whole folder structure automatically." },
                      { step: "Open app/page.tsx in your repo, click the pencil (edit) icon, find the CONTRACT_ADDRESS line and paste your contract address. Commit." },
                    ].map((item, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                        <div className="step-number" style={{ width: 28, height: 28, fontSize: "0.8rem", flexShrink: 0 }}>{i + 1}</div>
                        <p style={{ margin: "0.2rem 0 0", color: "#c4b5fd" }}>{item.step}</p>
                      </div>
                    ))}
                  </div>
                  <div className="card-amber" style={{ marginTop: "0.75rem" }}>
                    <span className="tag tag-amber" style={{ marginBottom: "0.5rem", display: "inline-block" }}>Pro Tip</span>
                    <p style={{ margin: 0, fontSize: "0.875rem" }}>When you get to Vercel, set the Root Directory to the name of the folder you uploaded (e.g. 'rugg_or_moon'). This tells Vercel where to find the files.</p>
                  </div>
                </div>

                {/* Vercel */}
                <div>
                  <h3>Step 3 — Deploy to Vercel</h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: "1rem" }}>
                    {[
                      "Go to vercel.com → Add New Project → Import your GitHub repo",
                      "CRITICAL: Set Framework Preset to 'Next.js' manually",
                      "If your files are in a subfolder, set Root Directory to that folder name",
                      "Click Deploy",
                    ].map((step, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                        <div className="step-number" style={{ width: 28, height: 28, fontSize: "0.8rem", flexShrink: 0 }}>{i + 1}</div>
                        <p style={{ margin: "0.2rem 0 0", color: "#c4b5fd" }}>{step}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <hr className="divider" />

            {/* Section: Tips */}
            <section id="tips" className="section" style={{ marginBottom: "4rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: "1.5rem" }}>
                <span style={{ fontSize: "2rem" }}>💡</span>
                <h2>Tips & Gotchas</h2>
              </div>

              <p>These are every mistake I made — so you don't have to make them too.</p>

              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  { type: "red", icon: "❌", title: "Missing (gl.Contract) on your class", fix: "Always write class MyGame(gl.Contract): — without it Studio shows 'Could not load contract schema'" },
                  { type: "red", icon: "❌", title: "Missing @gl.public.write decorator", fix: "Every write method needs @gl.public.write above it. Every view method needs @gl.public.view. Without them the schema won't load." },
                  { type: "red", icon: "❌", title: "Default parameter values in method signatures", fix: "def create_game(self, name: str, solo: bool = False) breaks the schema parser. Create two separate methods instead." },
                  { type: "red", icon: "❌", title: "Using @genlayer/js in package.json", fix: "The correct package is genlayer-js (no @). The @genlayer/js package returns a 404 error." },
                  { type: "red", icon: "❌", title: "Next.js version below 15.2.6", fix: "Vercel blocks deployment of vulnerable Next.js versions. Always use 15.2.6 or higher." },
                  { type: "amber", icon: "⚠️", title: "AI calls in create_game", fix: "AI takes 30-60 seconds. Put AI calls in join_game or submit methods — never in create_game." },
                  { type: "amber", icon: "⚠️", title: "json.loads inside the AI function", fix: "The function passed to prompt_non_comparative must return raw string only. Parse JSON outside the function." },
                  { type: "amber", icon: "⚠️", title: "Reading game count after writing", fix: "Read count before writing, add 1. Reading after a write can race and give wrong result." },
                  { type: "green", icon: "✅", title: "Always have JSON fallbacks", fix: "AI can return malformed JSON. Always wrap json.loads in try/except with a sensible default value." },
                  { type: "green", icon: "✅", title: "Add .replace() to clean AI output", fix: 'Always add .replace("```json","").replace("```","").strip() to your exec_prompt calls to clean up AI formatting.' },
                ].map((tip, i) => (
                  <div key={i} className={`card-${tip.type}`} style={{ display: "flex", gap: 12 }}>
                    <span style={{ fontSize: "1.2rem", flexShrink: 0 }}>{tip.icon}</span>
                    <div>
                      <div style={{ fontFamily: "Outfit", fontWeight: 700, marginBottom: "0.25rem", color: "white" }}>{tip.title}</div>
                      <p style={{ margin: 0, fontSize: "0.875rem" }}>{tip.fix}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Other Projects */}
            <div style={{ marginBottom: "3rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: "1.5rem" }}>
                <span style={{ fontSize: "2rem" }}>🎮</span>
                <h2>See It In Action</h2>
              </div>
              <p>All four games I built during the GenLayer Playverse Challenge are live right now. Try them — especially Rug or Moon, which I find most Fun.</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12, marginTop: "1.5rem" }}>
                {[
                  { name: "🪤🚀 Rug or Moon", desc: "The main one. Call fake crypto projects, argue your case, AI Oracle judges. Solo vs AI or multiplayer.", url: "https://ruggormoon-game.vercel.app", featured: true },
                  { name: "⚖️ The Verdict", desc: "Two players debate absurd AI-generated statements. The AI judge picks the most entertaining argument.", url: "https://theverdictgame.vercel.app", featured: false },
                  { name: "🔮 Starcast", desc: "Ask the cosmic AI Oracle any question. Get a dramatic on-chain AI reading.", url: "https://starcast-genlayer.vercel.app", featured: false },
                ].map(p => (
                  <a key={p.name} href={p.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", display: "block", background: p.featured ? "rgba(155,106,246,0.12)" : "rgba(255,255,255,0.04)", border: p.featured ? "1px solid rgba(155,106,246,0.35)" : "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: "1.25rem", transition: "all 0.2s", cursor: "pointer" }}>
                    <div style={{ fontFamily: "Outfit", fontWeight: 700, fontSize: "1rem", color: "white", marginBottom: "0.4rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      {p.name}
                      {p.featured && <span className="tag tag-purple" style={{ fontSize: "0.65rem" }}>Main</span>}
                    </div>
                    <p style={{ fontSize: "0.82rem", color: "#9ca3af", margin: "0 0 0.75rem" }}>{p.desc}</p>
                    <div style={{ fontSize: "0.78rem", color: "#9B6AF6", fontFamily: "DM Mono" }}>Play now →</div>
                  </a>
                ))}
              </div>
            </div>

            <hr className="divider" />

            {/* Credits */}
            <div style={{ marginBottom: "3rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: "1.5rem" }}>
                <span style={{ fontSize: "2rem" }}>🙏</span>
                <h2>Credits</h2>
              </div>
              <div className="card-purple">
                <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                  <div style={{ fontSize: "2.5rem", flexShrink: 0 }}>👨‍💻</div>
                  <div>
                    <div style={{ fontFamily: "Outfit", fontWeight: 700, fontSize: "1.1rem", color: "white", marginBottom: "0.25rem" }}>
                      emark <span style={{ fontFamily: "DM Mono", fontSize: "0.8rem", color: "#9ca3af" }}>(@emark0579_40762)</span>
                    </div>
                    <p style={{ margin: 0, fontSize: "0.9rem", color: "#c4b5fd" }}>
                      A huge thank you to <span className="highlight">emark</span> from the GenLayer Discord builders-chat. 
                      He reviewed my early contracts and provided the key corrections that fixed the fundamental issues — 
                      the correct import structure, the equivalence principle rules, and the TreeMap patterns. 
                      Every project I built after that was built on the foundation of his feedback. 
                      If you're building on GenLayer, the builders-chat community is an incredible resource.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <hr className="divider" />

            {/* Final CTA */}
            <div style={{ background: "linear-gradient(135deg, rgba(227,125,247,0.1), rgba(155,106,246,0.1))", border: "1px solid rgba(155,106,246,0.3)", borderRadius: 20, padding: "2.5rem", textAlign: "center" }}>
              <div className="float" style={{ fontSize: "3rem", marginBottom: "1rem" }}>🚀</div>
              <h2 style={{ marginBottom: "0.75rem" }}>Now Go Build Something</h2>
              <p style={{ maxWidth: 480, margin: "0 auto 1.5rem", color: "#9ca3af" }}>
                You have everything you need. Start with a simple idea, use the contract template, follow the rules, and ship it. The GenLayer community is waiting to play your game.
              </p>
              <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                <a href="https://studio.genlayer.com" target="_blank" rel="noopener noreferrer" style={{ padding: "0.75rem 1.5rem", background: "linear-gradient(to right, #E37DF7, #9B6AF6)", border: "none", borderRadius: 10, color: "white", fontFamily: "Outfit", fontWeight: 700, textDecoration: "none" }}>
                  Open GenLayer Studio →
                </a>
                <a href="https://ruggormoon-game.vercel.app" target="_blank" rel="noopener noreferrer" style={{ padding: "0.75rem 1.5rem", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 10, color: "white", fontFamily: "Outfit", fontWeight: 700, textDecoration: "none" }}>
                  Play Rug or Moon 🎮
                </a>
              </div>
            </div>

          </main>
        </div>

        {/* Footer */}
        <footer style={{ position: "relative", zIndex: 1, textAlign: "center", padding: "2rem", borderTop: "1px solid rgba(255,255,255,0.06)", marginTop: "2rem" }}>
          <p style={{ fontSize: "0.8rem", color: "#4b5563", fontFamily: "DM Mono" }}>
            Built by Temmygabriel · GenLayer Playverse Challenge · 2026
          </p>
        </footer>

      </div>
    </>
  );
}

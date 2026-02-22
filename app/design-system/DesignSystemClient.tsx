"use client";

import { useState, useEffect } from "react";

const SECTIONS = [
  { id: "colors", n: "01", label: "Colors" },
  { id: "typography", n: "02", label: "Typography" },
  { id: "spacing", n: "03", label: "Spacing" },
  { id: "buttons", n: "04", label: "Buttons" },
  { id: "inputs", n: "05", label: "Inputs" },
  { id: "cards", n: "06", label: "Cards" },
  { id: "badges", n: "07", label: "Badges" },
  { id: "alerts", n: "08", label: "Alerts" },
  { id: "avatars", n: "09", label: "Avatars" },
  { id: "ui-components", n: "10", label: "UI Components" },
  { id: "dropdown", n: "11", label: "Dropdown" },
  { id: "shadows", n: "12", label: "Shadows" },
  { id: "modal", n: "13", label: "Modal" },
];

function Section({
  id,
  number,
  title,
  children,
}: {
  id: string;
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} style={{ marginBottom: "var(--space-16)" }}>
      <h2
        style={{
          fontSize: "var(--text-h2)",
          fontWeight: "var(--weight-semibold)",
          color: "var(--color-text-primary)",
          marginBottom: "var(--space-6)",
          letterSpacing: "var(--tracking-tight)",
        }}
      >
        <span style={{ color: "var(--color-text-tertiary)", marginRight: "var(--space-2)" }}>
          {number}
        </span>
        {title}
      </h2>
      {children}
    </section>
  );
}

function ColorStrip({ name, vars }: { name: string; vars: string[] }) {
  return (
    <div style={{ marginBottom: "var(--space-4)" }}>
      <div
        style={{
          fontSize: "var(--text-xs)",
          fontWeight: "var(--weight-medium)",
          color: "var(--color-text-tertiary)",
          marginBottom: "var(--space-2)",
        }}
      >
        {name}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "2px" /* TODO: design-system - review spacing (2px hairline, no token) */, borderRadius: "var(--radius-md)", overflow: "hidden" }}>
        {vars.map((v) => (
          <div
            key={v}
            style={{
              width: "var(--space-10)",
              height: "var(--space-10)",
              background: `var(${v})`,
              flex: "1 1 auto",
              minWidth: "var(--space-8)",
            }}
            title={v}
          />
        ))}
      </div>
    </div>
  );
}

function SwatchRow({ label, tokens }: { label: string; tokens: [string, string][] }) {
  return (
    <div style={{ marginBottom: "var(--space-3)" }}>
      <div
        style={{
          fontSize: "var(--text-label)",
          fontWeight: "var(--weight-semibold)",
          color: "var(--color-text-tertiary)",
          marginBottom: "var(--space-2)",
          textTransform: "uppercase",
          letterSpacing: "var(--tracking-wider)",
        }}
      >
        {label}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-2)" }}>
        {tokens.map(([name, varName]) => (
          <div
            key={name}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "var(--space-2)",
              padding: "var(--space-2) var(--space-3)",
              background: "var(--color-surface-2)",
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--color-border-subtle)",
            }}
          >
            <div
              style={{
                width: "var(--space-6)",
                height: "var(--space-6)",
                borderRadius: "var(--radius-sm)",
                background: `var(${varName})`,
                border: "1px solid var(--color-border-subtle)",
              }}
            />
            <span style={{ fontSize: "var(--text-xs)", color: "var(--color-text-secondary)" }}>
              {name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function DesignSystemClient() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [modalOpen, setModalOpen] = useState(false);
  const [lineTab, setLineTab] = useState(0);
  const [pillTab, setPillTab] = useState(0);
  const [active, setActive] = useState("colors");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-10% 0px -75% 0px" }
    );
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "var(--color-bg-base)",
        color: "var(--color-text-primary)",
      }}
    >
      {/* Sidebar */}
      <aside
        style={{
          width: "14rem", /* TODO: design-system - review spacing (224px, no single token; calc(var(--space-16)*3.5) not practical) */
          flexShrink: 0,
          position: "sticky",
          top: 0,
          height: "100vh",
          overflowY: "auto",
          borderRight: "1px solid var(--color-border-subtle)",
          background: "var(--color-surface-1)",
          display: "flex",
          flexDirection: "column",
          padding: "var(--space-6) var(--space-4)",
        }}
      >
        {/* Title */}
        <div style={{ padding: "var(--space-2) var(--space-3)", marginBottom: "var(--space-6)" }}>
          <div
            style={{
              fontSize: "var(--text-sm)",
              fontWeight: "var(--weight-bold)",
              letterSpacing: "var(--tracking-tight)",
              color: "var(--color-text-primary)",
            }}
          >
            Design System
          </div>
          <div style={{ fontSize: "var(--text-xs)", color: "var(--color-text-tertiary)", marginTop: "var(--space-1)" }}>
            noah.estate
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, display: "flex", flexDirection: "column", gap: "2px" /* TODO: design-system - review spacing (2px, no token) */ }}>
          {SECTIONS.map(({ id, n, label }) => (
            <a
              key={id}
              href={`#${id}`}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "var(--space-3)",
                padding: "var(--space-2) var(--space-3)",
                borderRadius: "var(--radius-md)",
                fontSize: "var(--text-sm)",
                fontWeight: active === id ? "var(--weight-medium)" : "var(--weight-regular)",
                color: active === id ? "var(--color-text-primary)" : "var(--color-text-secondary)",
                background: active === id ? "var(--color-surface-2)" : "transparent",
                textDecoration: "none",
                transition:
                  "background var(--duration-fast) var(--ease-out), color var(--duration-fast) var(--ease-out)",
              }}
            >
              <span
                style={{
                  fontSize: "var(--text-xs)",
                  color: "var(--color-text-tertiary)",
                  fontVariantNumeric: "tabular-nums",
                  minWidth: "var(--space-6)",
                }}
              >
                {n}
              </span>
              {label}
            </a>
          ))}
        </nav>

        {/* Theme toggle */}
        <div
          style={{
            paddingTop: "var(--space-4)",
            borderTop: "1px solid var(--color-border-subtle)",
          }}
        >
          <button
            type="button"
            className="btn btn-secondary btn-sm btn-block"
            onClick={() => setTheme((t) => (t === "light" ? "dark" : "light"))}
            aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
          >
            {theme === "light" ? "Dark mode" : "Light mode"}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main
        style={{
          flex: 1,
          padding: "var(--space-12) var(--space-10)",
          overflowY: "auto",
          minWidth: 0,
        }}
      >
        {/* 01 Colors */}
        <Section id="colors" number="01" title="Colors">
          <ColorStrip
            name="Stone"
            vars={[
              "--raw-stone-50",
              "--raw-stone-100",
              "--raw-stone-200",
              "--raw-stone-300",
              "--raw-stone-400",
              "--raw-stone-500",
              "--raw-stone-600",
              "--raw-stone-700",
              "--raw-stone-800",
              "--raw-stone-900",
              "--raw-stone-950",
            ]}
          />
          <ColorStrip
            name="Amber"
            vars={[
              "--raw-amber-50",
              "--raw-amber-100",
              "--raw-amber-200",
              "--raw-amber-300",
              "--raw-amber-400",
              "--raw-amber-500",
              "--raw-amber-600",
              "--raw-amber-700",
              "--raw-amber-800",
            ]}
          />
          <div style={{ display: "flex", gap: "var(--space-6)", flexWrap: "wrap", marginBottom: "var(--space-6)" }}>
            <ColorStrip name="Green" vars={["--raw-green-50", "--raw-green-300", "--raw-green-600", "--raw-green-700"]} />
            <ColorStrip name="Red" vars={["--raw-red-50", "--raw-red-300", "--raw-red-600", "--raw-red-700"]} />
            <ColorStrip name="Blue" vars={["--raw-blue-50", "--raw-blue-300", "--raw-blue-600", "--raw-blue-700"]} />
          </div>
          <div style={{ background: "var(--color-surface-2)", padding: "var(--space-5)", borderRadius: "var(--radius-lg)", border: "1px solid var(--color-border-subtle)" }}>
            <SwatchRow
              label="Background"
              tokens={[
                ["bg-base", "--color-bg-base"],
                ["bg-elevated", "--color-bg-elevated"],
                ["bg-sunken", "--color-bg-sunken"],
              ]}
            />
            <SwatchRow
              label="Surface"
              tokens={[
                ["surface-1", "--color-surface-1"],
                ["surface-2", "--color-surface-2"],
                ["surface-3", "--color-surface-3"],
              ]}
            />
            <SwatchRow
              label="Border"
              tokens={[
                ["border-subtle", "--color-border-subtle"],
                ["border-default", "--color-border-default"],
                ["border-strong", "--color-border-strong"],
              ]}
            />
            <SwatchRow
              label="Text"
              tokens={[
                ["text-primary", "--color-text-primary"],
                ["text-secondary", "--color-text-secondary"],
                ["text-tertiary", "--color-text-tertiary"],
                ["text-inverse", "--color-text-inverse"],
              ]}
            />
            <SwatchRow
              label="Accent"
              tokens={[
                ["accent", "--color-accent"],
                ["accent-subtle", "--color-accent-subtle"],
                ["accent-muted", "--color-accent-muted"],
              ]}
            />
            <SwatchRow
              label="Status"
              tokens={[
                ["success", "--color-success"],
                ["error", "--color-error"],
                ["info", "--color-info"],
              ]}
            />
          </div>
        </Section>

        {/* 02 Typography */}
        <Section id="typography" number="02" title="Typography">
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
            {[
              { name: "Display", var: "--text-display" },
              { name: "H1", var: "--text-h1" },
              { name: "H2", var: "--text-h2" },
              { name: "H3", var: "--text-h3" },
              { name: "H4", var: "--text-h4" },
              { name: "Large", var: "--text-lg" },
              { name: "Base", var: "--text-base" },
              { name: "Small", var: "--text-sm" },
              { name: "XS", var: "--text-xs" },
              { name: "Code", var: "--text-code" },
              { name: "Label", var: "--text-label" },
            ].map(({ name, var: v }) => (
              <div key={v} style={{ padding: "var(--space-2) 0", borderBottom: "1px solid var(--color-border-subtle)" }}>
                <span style={{ fontSize: "var(--text-xs)", color: "var(--color-text-tertiary)", marginRight: "var(--space-3)" }}>{name}</span>
                <span style={{ fontFamily: "var(--font-body)", fontSize: `var(${v})` }}>The quick brown fox jumps over the lazy dog.</span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: "var(--space-8)" }}>
            <div style={{ fontSize: "var(--text-sm)", fontWeight: "var(--weight-medium)", color: "var(--color-text-secondary)", marginBottom: "var(--space-3)" }}>Font weights</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-4)" }}>
              {[300, 400, 500, 600, 700].map((w) => (
                <span key={w} style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-base)", fontWeight: w }}>
                  {w}
                </span>
              ))}
            </div>
          </div>
          <div style={{ marginTop: "var(--space-6)" }}>
            <div style={{ fontSize: "var(--text-sm)", fontWeight: "var(--weight-medium)", color: "var(--color-text-secondary)", marginBottom: "var(--space-3)" }}>Line height</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
              {["--leading-tight", "--leading-snug", "--leading-normal", "--leading-relaxed"].map((lh) => (
                <div key={lh} style={{ lineHeight: `var(${lh})`, fontSize: "var(--text-base)" }}>
                  Line height {lh.replace("--leading-", "")}: The quick brown fox jumps over the lazy dog.
                </div>
              ))}
            </div>
          </div>
          <div style={{ marginTop: "var(--space-6)" }}>
            <div style={{ fontSize: "var(--text-sm)", fontWeight: "var(--weight-medium)", color: "var(--color-text-secondary)", marginBottom: "var(--space-3)" }}>Tracking</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
              {["--tracking-tighter", "--tracking-tight", "--tracking-normal", "--tracking-wide", "--tracking-wider"].map((t) => (
                <div key={t} style={{ letterSpacing: `var(${t})`, fontSize: "var(--text-base)" }}>
                  {t.replace("--tracking-", "")}
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* 03 Spacing */}
        <Section id="spacing" number="03" title="Spacing">
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", gap: "var(--space-4)" }}>
            {[1, 1.5, 2, 2.5, 3, 4, 5, 6, 7, 8, 10, 12, 16].map((n) => {
              const key = n === 1.5 ? "1_5" : String(n);
              const varName = `--space-${key}`;
              return (
                <div key={varName} style={{ textAlign: "center" }}>
                  <div
                    style={{
                      width: `var(${varName})`,
                      height: `var(${varName})`,
                      minHeight: "var(--space-2)",
                      background: "var(--color-accent)",
                      borderRadius: "var(--radius-sm)",
                    }}
                  />
                  <div style={{ fontSize: "var(--text-xs)", color: "var(--color-text-tertiary)", marginTop: "var(--space-1)" }}>{key}</div>
                </div>
              );
            })}
          </div>
        </Section>

        {/* 04 Buttons */}
        <Section id="buttons" number="04" title="Buttons">
          <div style={{ marginBottom: "var(--space-6)" }}>
            <div style={{ fontSize: "var(--text-sm)", color: "var(--color-text-tertiary)", marginBottom: "var(--space-3)" }}>Variants</div>
            <div className="btn-row" style={{ flexWrap: "wrap" }}>
              <button type="button" className="btn btn-primary">Primary</button>
              <button type="button" className="btn btn-accent">Accent</button>
              <button type="button" className="btn btn-secondary">Secondary</button>
              <button type="button" className="btn btn-ghost">Ghost</button>
              <button type="button" className="btn btn-outline">Outline</button>
              <button type="button" className="btn btn-danger">Danger</button>
              <button type="button" className="btn btn-social">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.5 12.5h-4.5v7h-3v-7H6.5v-3H10V7.5c0-1.38 1.12-2.5 2.5-2.5h3v3h-2c-.28 0-.5.22-.5.5v2h3.5v3z" /></svg>
                Social
              </button>
            </div>
          </div>
          <div style={{ marginBottom: "var(--space-6)" }}>
            <div style={{ fontSize: "var(--text-sm)", color: "var(--color-text-tertiary)", marginBottom: "var(--space-3)" }}>Sizes</div>
            <div className="btn-row">
              <button type="button" className="btn btn-primary btn-sm">Small</button>
              <button type="button" className="btn btn-primary">Medium</button>
              <button type="button" className="btn btn-primary btn-lg">Large</button>
              <button type="button" className="btn btn-primary btn-xl">XL</button>
            </div>
          </div>
          <div style={{ marginBottom: "var(--space-6)" }}>
            <div style={{ fontSize: "var(--text-sm)", color: "var(--color-text-tertiary)", marginBottom: "var(--space-3)" }}>Loading, disabled, tooltip</div>
            <div className="btn-row">
              <button type="button" className="btn btn-primary" disabled>
                <span className="spinner spinner-sm" aria-hidden />
                Loading
              </button>
              <button type="button" className="btn btn-primary" disabled>Disabled</button>
              <button type="button" className="btn btn-secondary" data-tooltip="Tooltip text">With tooltip</button>
            </div>
          </div>
        </Section>

        {/* 05 Inputs */}
        <Section id="inputs" number="05" title="Inputs">
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)", maxWidth: "400px" }}>
            <div className="field">
              <label className="label" htmlFor="input-text">Text input</label>
              <input id="input-text" type="text" className="input" placeholder="Placeholder" />
            </div>
            <div className="field">
              <label className="label" htmlFor="input-textarea">Textarea</label>
              <textarea id="input-textarea" className="input textarea" placeholder="Multi-line input" rows={3} />
            </div>
            <div className="field">
              <label className="label" htmlFor="input-sm">Size sm</label>
              <input id="input-sm" type="text" className="input input-sm" placeholder="Small" />
            </div>
            <div className="field">
              <label className="label" htmlFor="input-lg">Size lg</label>
              <input id="input-lg" type="text" className="input input-lg" placeholder="Large" />
            </div>
            <div className="field">
              <label className="label" htmlFor="input-error">Error state</label>
              <input id="input-error" type="text" className="input input-error" placeholder="Error" defaultValue="Invalid value" />
              <span className="field-error">This field is required.</span>
            </div>
            <div className="field">
              <label className="label" htmlFor="input-disabled">Disabled</label>
              <input id="input-disabled" type="text" className="input" placeholder="Disabled" disabled defaultValue="Disabled" />
            </div>
            <label className="toggle">
              <input type="checkbox" defaultChecked />
              <span className="toggle__track"><span className="toggle__thumb" /></span>
              <span className="toggle__label">Toggle switch</span>
            </label>
          </div>
        </Section>

        {/* 06 Cards */}
        <Section id="cards" number="06" title="Cards">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "var(--space-6)" }}>
            <div className="card">
              <div className="card-header">
                <span style={{ fontWeight: "var(--weight-semibold)" }}>Default card</span>
              </div>
              <div className="card-body">
                <p style={{ margin: 0, fontSize: "var(--text-sm)", color: "var(--color-text-secondary)" }}>Body content goes here.</p>
              </div>
              <div className="card-footer">
                <span style={{ fontSize: "var(--text-xs)", color: "var(--color-text-tertiary)" }}>Footer</span>
              </div>
            </div>
            <div className="card card-interactive">
              <div className="card-header">
                <span style={{ fontWeight: "var(--weight-semibold)" }}>Interactive card</span>
              </div>
              <div className="card-body">
                <p style={{ margin: 0, fontSize: "var(--text-sm)", color: "var(--color-text-secondary)" }}>Hover for effect.</p>
              </div>
              <div className="card-footer">
                <span style={{ fontSize: "var(--text-xs)", color: "var(--color-text-tertiary)" }}>Footer</span>
              </div>
            </div>
            <div className="card card-accent">
              <div className="card-header">
                <span style={{ fontWeight: "var(--weight-semibold)" }}>Accent border</span>
              </div>
              <div className="card-body">
                <p style={{ margin: 0, fontSize: "var(--text-sm)", color: "var(--color-text-secondary)" }}>Accent border variant.</p>
              </div>
              <div className="card-footer">
                <span style={{ fontSize: "var(--text-xs)", color: "var(--color-text-tertiary)" }}>Footer</span>
              </div>
            </div>
          </div>
        </Section>

        {/* 07 Badges */}
        <Section id="badges" number="07" title="Badges">
          <div style={{ marginBottom: "var(--space-4)" }}>
            <div style={{ fontSize: "var(--text-xs)", color: "var(--color-text-tertiary)", marginBottom: "var(--space-2)" }}>Variants</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-2)" }}>
              <span className="badge badge-default">Default</span>
              <span className="badge badge-primary">Primary</span>
              <span className="badge badge-accent">Accent</span>
              <span className="badge badge-success">Success</span>
              <span className="badge badge-error">Error</span>
              <span className="badge badge-info">Info</span>
              <span className="badge badge-outline">Outline</span>
            </div>
          </div>
          <div>
            <div style={{ fontSize: "var(--text-xs)", color: "var(--color-text-tertiary)", marginBottom: "var(--space-2)" }}>Sizes</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-2)", alignItems: "center" }}>
              <span className="badge badge-default">Default size</span>
              <span className="badge badge-default badge-lg">Large</span>
            </div>
          </div>
        </Section>

        {/* 08 Alerts */}
        <Section id="alerts" number="08" title="Alerts">
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)", maxWidth: "560px" }}>
            <div className="alert alert-info">
              <svg className="alert-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" /></svg>
              <div className="alert-content">
                <div className="alert-title">Info</div>
                <p style={{ margin: 0 }}>Informational message with icon, title and description.</p>
              </div>
            </div>
            <div className="alert alert-success">
              <svg className="alert-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" /></svg>
              <div className="alert-content">
                <div className="alert-title">Success</div>
                <p style={{ margin: 0 }}>Operation completed successfully.</p>
              </div>
            </div>
            <div className="alert alert-warning">
              <svg className="alert-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" /></svg>
              <div className="alert-content">
                <div className="alert-title">Warning</div>
                <p style={{ margin: 0 }}>Please review before continuing.</p>
              </div>
            </div>
            <div className="alert alert-error">
              <svg className="alert-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" /></svg>
              <div className="alert-content">
                <div className="alert-title">Error</div>
                <p style={{ margin: 0 }}>Something went wrong. Please try again.</p>
              </div>
            </div>
          </div>
        </Section>

        {/* 09 Avatars */}
        <Section id="avatars" number="09" title="Avatars">
          <div style={{ marginBottom: "var(--space-6)" }}>
            <div style={{ fontSize: "var(--text-xs)", color: "var(--color-text-tertiary)", marginBottom: "var(--space-3)" }}>Sizes</div>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "var(--space-4)" }}>
              <span className="avatar avatar-xs">XS</span>
              <span className="avatar avatar-sm">SM</span>
              <span className="avatar avatar-md">MD</span>
              <span className="avatar avatar-lg">LG</span>
              <span className="avatar avatar-xl">XL</span>
            </div>
          </div>
          <div style={{ marginBottom: "var(--space-6)" }}>
            <div style={{ fontSize: "var(--text-xs)", color: "var(--color-text-tertiary)", marginBottom: "var(--space-3)" }}>Claude variant</div>
            <span className="avatar avatar-lg avatar-claude">C</span>
          </div>
          <div>
            <div style={{ fontSize: "var(--text-xs)", color: "var(--color-text-tertiary)", marginBottom: "var(--space-3)" }}>Avatar group</div>
            <div className="avatar-group">
              <span className="avatar avatar-md">A</span>
              <span className="avatar avatar-md">B</span>
              <span className="avatar avatar-md">C</span>
              <span className="avatar avatar-md">+2</span>
            </div>
          </div>
        </Section>

        {/* 10 UI Components */}
        <Section id="ui-components" number="10" title="UI Components">
          <div style={{ marginBottom: "var(--space-8)" }}>
            <div style={{ fontSize: "var(--text-sm)", color: "var(--color-text-tertiary)", marginBottom: "var(--space-3)" }}>Tabs (line)</div>
            <div className="tabs">
              {["Tab one", "Tab two", "Tab three"].map((label, i) => (
                <button key={label} type="button" className={`tab ${lineTab === i ? "active" : ""}`} onClick={() => setLineTab(i)}>
                  {label}
                </button>
              ))}
            </div>
            <div style={{ padding: "var(--space-4)", background: "var(--color-surface-2)", borderRadius: "var(--radius-md)", marginTop: "var(--space-2)" }}>
              <p style={{ margin: 0, fontSize: "var(--text-sm)" }}>Content for tab {lineTab + 1}</p>
            </div>
          </div>
          <div style={{ marginBottom: "var(--space-8)" }}>
            <div style={{ fontSize: "var(--text-sm)", color: "var(--color-text-tertiary)", marginBottom: "var(--space-3)" }}>Tabs (pill)</div>
            <div className="tabs-pill">
              {["Pill A", "Pill B", "Pill C"].map((label, i) => (
                <button key={label} type="button" className={`tab ${pillTab === i ? "active" : ""}`} onClick={() => setPillTab(i)}>
                  {label}
                </button>
              ))}
            </div>
            <div style={{ padding: "var(--space-4)", marginTop: "var(--space-2)" }}>
              <p style={{ margin: 0, fontSize: "var(--text-sm)", color: "var(--color-text-secondary)" }}>Content for pill {pillTab + 1}</p>
            </div>
          </div>
          <div style={{ marginBottom: "var(--space-6)" }}>
            <div style={{ fontSize: "var(--text-sm)", color: "var(--color-text-tertiary)", marginBottom: "var(--space-3)" }}>Spinner sizes</div>
            <div style={{ display: "flex", alignItems: "center", gap: "var(--space-6)" }}>
              <span className="spinner spinner-sm" aria-hidden />
              <span className="spinner spinner-md" aria-hidden />
              <span className="spinner spinner-lg" aria-hidden />
            </div>
          </div>
          <div style={{ marginBottom: "var(--space-6)" }}>
            <div style={{ fontSize: "var(--text-sm)", color: "var(--color-text-tertiary)", marginBottom: "var(--space-3)" }}>Progress bars</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)", maxWidth: "400px" }}>
              <div>
                <div className="progress"><div className="progress-bar" style={{ width: "60%" }} /></div>
                <span style={{ fontSize: "var(--text-xs)", color: "var(--color-text-tertiary)" }}>Default</span>
              </div>
              <div>
                <div className="progress"><div className="progress-bar progress-bar-success" style={{ width: "80%" }} /></div>
                <span style={{ fontSize: "var(--text-xs)", color: "var(--color-text-tertiary)" }}>Success</span>
              </div>
              <div>
                <div className="progress"><div className="progress-bar progress-bar-error" style={{ width: "30%" }} /></div>
                <span style={{ fontSize: "var(--text-xs)", color: "var(--color-text-tertiary)" }}>Error</span>
              </div>
              <div>
                <div className="progress progress-sm"><div className="progress-bar" style={{ width: "50%" }} /></div>
                <span style={{ fontSize: "var(--text-xs)", color: "var(--color-text-tertiary)" }}>Small</span>
              </div>
              <div>
                <div className="progress progress-lg"><div className="progress-bar" style={{ width: "70%" }} /></div>
                <span style={{ fontSize: "var(--text-xs)", color: "var(--color-text-tertiary)" }}>Large</span>
              </div>
            </div>
          </div>
          <div style={{ marginBottom: "var(--space-6)" }}>
            <div style={{ fontSize: "var(--text-sm)", color: "var(--color-text-tertiary)", marginBottom: "var(--space-3)" }}>Skeleton</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)", maxWidth: "320px" }}>
              <div className="skeleton" style={{ height: "var(--space-4)", width: "60%" }} />
              <div className="skeleton" style={{ height: "var(--space-3)", width: "100%" }} />
              <div className="skeleton" style={{ height: "var(--space-3)", width: "90%" }} />
            </div>
          </div>
          <div>
            <div style={{ fontSize: "var(--text-sm)", color: "var(--color-text-tertiary)", marginBottom: "var(--space-3)" }}>Divider</div>
            <div className="divider">or</div>
          </div>
        </Section>

        {/* 11 Dropdown (static) */}
        <Section id="dropdown" number="11" title="Dropdown">
          <div className="dropdown" style={{ maxWidth: "240px" }}>
            <div className="dropdown-label">Actions</div>
            <button type="button" className="dropdown-item">Edit</button>
            <button type="button" className="dropdown-item">Duplicate</button>
            <div className="dropdown-separator" />
            <button type="button" className="dropdown-item">Share</button>
            <button type="button" className="dropdown-item dropdown-item-danger">Delete</button>
          </div>
        </Section>

        {/* 12 Shadows */}
        <Section id="shadows" number="12" title="Shadows">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: "var(--space-6)" }}>
            {["xs", "sm", "md", "lg", "xl", "2xl", "focus"].map((name) => (
              <div
                key={name}
                style={{
                  height: "calc(var(--space-16) + var(--space-8))",
                  background: "var(--color-surface-1)",
                  borderRadius: "var(--radius-lg)",
                  border: "1px solid var(--color-border-subtle)",
                  boxShadow: `var(--shadow-${name})`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "var(--text-xs)",
                  color: "var(--color-text-tertiary)",
                }}
              >
                {name}
              </div>
            ))}
          </div>
        </Section>

        {/* 13 Modal */}
        <Section id="modal" number="13" title="Modal">
          <button type="button" className="btn btn-primary" onClick={() => setModalOpen(true)}>
            Open modal
          </button>
        </Section>
      </main>

      {/* Modal overlay */}
      {modalOpen && (
        <div className="modal-overlay" onClick={() => setModalOpen(false)} role="dialog" aria-modal="true" aria-labelledby="modal-title">
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 id="modal-title" className="modal-title">Modal title</h3>
              <button type="button" className="modal-close" onClick={() => setModalOpen(false)} aria-label="Close">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="modal-body">
              This is a working modal overlay. Click outside or the close button to dismiss.
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-ghost" onClick={() => setModalOpen(false)}>Cancel</button>
              <button type="button" className="btn btn-primary" onClick={() => setModalOpen(false)}>Confirm</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

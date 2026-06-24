import React, { useState, useEffect, useRef } from "react";
import "./HomeAutomation.css";

const automationFeatures = [
  {
    id: 1,
    icon: "💡",
    title: "Smart Lighting",
    description:
      "AI-powered lighting that adapts to your lifestyle — from sunrise simulations to cinema mode.",
    stats: "Up to 60% energy savings",
    color: "#FFD166",
  },
  {
    id: 2,
    icon: "🌡️",
    title: "Climate Control",
    description:
      "Predictive thermostats that learn your comfort preferences and schedule automatically.",
    stats: "30% reduction in HVAC costs",
    color: "#06D6A0",
  },
  {
    id: 3,
    icon: "🔒",
    title: "Security Systems",
    description:
      "Real-time surveillance, smart locks, and AI motion detection — all on one dashboard.",
    stats: "24/7 intelligent monitoring",
    color: "#118AB2",
  },
  {
    id: 4,
    icon: "🔌",
    title: "Energy Management",
    description:
      "Smart plugs and solar integration that optimize your home's energy footprint in real time.",
    stats: "Track usage by device",
    color: "#EF476F",
  },
  {
    id: 5,
    icon: "🎙️",
    title: "Voice & App Control",
    description:
      "Control everything from Alexa, Google Home, or our dedicated FusionWorks mobile app.",
    stats: "Works with 200+ devices",
    color: "#9B5DE5",
  },
  {
    id: 6,
    icon: "📊",
    title: "Smart Analytics",
    description:
      "Detailed reports on energy, security, and automation usage with actionable insights.",
    stats: "Weekly & monthly insights",
    color: "#F15BB5",
  },
];

const stats = [
  { value: "5000+", label: "Homes Automated" },
  { value: "98%", label: "Customer Satisfaction" },
  { value: "200+", label: "Compatible Devices" },
  { value: "24/7", label: "Expert Support" },
];

// ---------- Sub-components ----------

function AnimatedCounter({ target, suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const numeric = parseInt(target.replace(/\D/g, ""), 10);
          if (isNaN(numeric)) {
            setCount(target);
            return;
          }
          const duration = 1800;
          const steps = 60;
          const increment = numeric / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= numeric) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current) + suffix);
            }
          }, duration / steps);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, suffix]);

  return <span ref={ref}>{count || "0"}</span>;
}

function FeatureCard({ feature, index }) {
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.transitionDelay = `${index * 80}ms`;
          el.classList.add("ha-card--visible");
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [index]);

  return (
    <div
      ref={cardRef}
      className={`ha-card ${hovered ? "ha-card--hovered" : ""}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ "--accent": feature.color }}
    >
      <div className="ha-card__icon-wrap">
        <span className="ha-card__icon">{feature.icon}</span>
      </div>
      <h3 className="ha-card__title">{feature.title}</h3>
      <p className="ha-card__desc">{feature.description}</p>
      <div className="ha-card__badge">{feature.stats}</div>
    </div>
  );
}

// ---------- Main Section ----------

export default function HomeAutomation() {
  const [activeTab, setActiveTab] = useState("features");
  const [demoActive, setDemoActive] = useState(false);
  const [deviceStates, setDeviceStates] = useState({
    light: false,
    fan: false,
    ac: false,
    lock: true,
  });

  const toggleDevice = (device) => {
    setDeviceStates((prev) => ({ ...prev, [device]: !prev[device] }));
  };

  return (
    <section className="ha-section" id="home-automation" aria-label="Home Automation">
      {/* Hero */}
      <div className="ha-hero">
        <div className="ha-hero__eyebrow">FusionWorks Home Automation</div>
        <h1 className="ha-hero__headline">
          Your home, <br />
          <span className="ha-hero__highlight">intelligently alive.</span>
        </h1>
        <p className="ha-hero__sub">
          Seamlessly connect, control, and automate every corner of your home —
          from a single app or a single voice command.
        </p>
        <div className="ha-hero__cta-row">
          <button
            className="ha-btn ha-btn--primary"
            onClick={() => setDemoActive(true)}
          >
            Try Live Demo
          </button>
          <button
            className="ha-btn ha-btn--ghost"
            onClick={() => setActiveTab("features")}
          >
            Explore Features ↓
          </button>
        </div>
        <div className="ha-hero__pulse" aria-hidden="true" />
      </div>

      {/* Stats Bar */}
      <div className="ha-stats" role="list">
        {stats.map((s) => (
          <div className="ha-stats__item" role="listitem" key={s.label}>
            <strong className="ha-stats__value">
              <AnimatedCounter target={s.value} />
            </strong>
            <span className="ha-stats__label">{s.label}</span>
          </div>
        ))}
      </div>

      {/* Tab Nav */}
      <div className="ha-tabs" role="tablist" aria-label="Section navigation">
        {["features", "how it works", "demo"].map((tab) => (
          <button
            key={tab}
            role="tab"
            aria-selected={activeTab === tab}
            className={`ha-tab ${activeTab === tab ? "ha-tab--active" : ""}`}
            onClick={() => {
              setActiveTab(tab);
              if (tab === "demo") setDemoActive(true);
            }}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Features Grid */}
      {activeTab === "features" && (
        <div className="ha-grid" role="list">
          {automationFeatures.map((f, i) => (
            <FeatureCard key={f.id} feature={f} index={i} />
          ))}
        </div>
      )}

      {/* How It Works */}
      {activeTab === "how it works" && (
        <div className="ha-steps">
          {[
            {
              step: "01",
              title: "Choose Your Devices",
              body: "Pick from 200+ compatible smart devices — bulbs, thermostats, locks, cameras, and more.",
            },
            {
              step: "02",
              title: "Connect to FusionWorks Hub",
              body: "Our universal hub links all your devices over Wi-Fi, Zigbee, or Z-Wave — no multiple apps needed.",
            },
            {
              step: "03",
              title: "Set Automations",
              body: "Create scenes and schedules, or let our AI suggest routines based on your usage patterns.",
            },
            {
              step: "04",
              title: "Control Anywhere",
              body: "Manage everything from the FusionWorks app, browser dashboard, or via voice assistants.",
            },
          ].map(({ step, title, body }) => (
            <div className="ha-step" key={step}>
              <div className="ha-step__num" aria-hidden="true">
                {step}
              </div>
              <div className="ha-step__content">
                <h3 className="ha-step__title">{title}</h3>
                <p className="ha-step__body">{body}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Interactive Demo */}
      {(activeTab === "demo" || demoActive) && (
        <div className="ha-demo" aria-label="Live device demo">
          <h2 className="ha-demo__title">Live Control Panel</h2>
          <p className="ha-demo__subtitle">
            Tap any device to toggle it on or off.
          </p>
          <div className="ha-demo__grid">
            {[
              { key: "light", icon: "💡", label: "Living Room Light" },
              { key: "fan", icon: "🌀", label: "Ceiling Fan" },
              { key: "ac", icon: "❄️", label: "Air Conditioner" },
              { key: "lock", icon: "🔒", label: "Front Door Lock" },
            ].map(({ key, icon, label }) => (
              <button
                key={key}
                className={`ha-device ${deviceStates[key] ? "ha-device--on" : "ha-device--off"}`}
                onClick={() => toggleDevice(key)}
                aria-pressed={deviceStates[key]}
                aria-label={`${label} is ${deviceStates[key] ? "on" : "off"}`}
              >
                <span className="ha-device__icon">{icon}</span>
                <span className="ha-device__label">{label}</span>
                <span className="ha-device__status">
                  {deviceStates[key] ? "ON" : "OFF"}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* CTA Banner */}
      <div className="ha-cta-banner">
        <h2 className="ha-cta-banner__heading">
          Ready to automate your home?
        </h2>
        <p className="ha-cta-banner__sub">
          Book a free consultation with our smart home experts today.
        </p>
        <button className="ha-btn ha-btn--primary ha-btn--lg">
          Get Started Free
        </button>
      </div>
    </section>
  );
}

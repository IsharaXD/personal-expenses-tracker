import { useState, useEffect, useRef } from "react";

const CATEGORIES = {
  food: { label: "Food & Dining", icon: "🧁", color: "#E8709A" },
  transport: { label: "Transport", icon: "👛", color: "#D45F8A" },
  shopping: { label: "Shopping", icon: "🛍️", color: "#F48FB1" },
  health: { label: "Health", icon: "💊", color: "#CE93D8" },
  entertainment: { label: "Entertainment", icon: "🎀", color: "#F06292" },
  utilities: { label: "Utilities", icon: "✨", color: "#BA68C8" },
  savings: { label: "Savings", icon: "💰", color: "#E040FB" },
  other: { label: "Other", icon: "🌸", color: "#EC407A" },
};

const INITIAL_TRANSACTIONS = [
  { id: 1, type: "expense", category: "food", description: "Cupcakes & Rosé", amount: 1800, date: "2026-02-24" },
  { id: 2, type: "income", category: "other", description: "Monthly Salary", amount: 120000, date: "2026-02-20" },
  { id: 3, type: "expense", category: "transport", description: "Uber to Brunch", amount: 950, date: "2026-02-18" },
  { id: 4, type: "expense", category: "shopping", description: "Pink Blazer 💕", amount: 8500, date: "2026-02-17" },
  { id: 5, type: "expense", category: "health", description: "Pilates Membership", amount: 4500, date: "2026-02-15" },
  { id: 6, type: "savings", category: "savings", description: "Dream Fund", amount: 20000, date: "2026-02-14" },
  { id: 7, type: "expense", category: "entertainment", description: "Spa Day", amount: 6500, date: "2026-02-12" },
  { id: 8, type: "expense", category: "utilities", description: "Phone Bill", amount: 2200, date: "2026-02-10" },
  { id: 9, type: "income", category: "other", description: "Freelance Gig", amount: 35000, date: "2026-02-08" },
  { id: 10, type: "expense", category: "food", description: "Keells Haul", amount: 4800, date: "2026-02-07" },
];

const GLITTER = ["✦", "✧", "✶", "✸", "✹", "★", "☆"];

function Sparkle({ style }) {
  return <span style={{ position: "absolute", fontSize: "10px", color: "#F48FB1", opacity: 0.6, pointerEvents: "none", animation: "twinkle 2s infinite", ...style }}>✦</span>;
}

const css = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500&display=swap');

@keyframes twinkle {
  0%, 100% { opacity: 0.2; transform: scale(0.8); }
  50% { opacity: 0.9; transform: scale(1.2); }
}
@keyframes floatUp {
  0% { transform: translateY(20px); opacity: 0; }
  100% { transform: translateY(0); opacity: 1; }
}
@keyframes shimmer {
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
}
@keyframes pulse-ring {
  0% { box-shadow: 0 0 0 0 rgba(240,98,146,0.4); }
  70% { box-shadow: 0 0 0 12px rgba(240,98,146,0); }
  100% { box-shadow: 0 0 0 0 rgba(240,98,146,0); }
}
@keyframes barGrow {
  from { width: 0%; }
}
@keyframes countUp {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

* { box-sizing: border-box; margin: 0; padding: 0; }

body {
  background: #FFF0F5;
  font-family: 'DM Sans', sans-serif;
}

.app {
  min-height: 100vh;
  background: #FFF0F5;
  background-image:
    radial-gradient(ellipse at 10% 0%, rgba(244,143,177,0.25) 0%, transparent 55%),
    radial-gradient(ellipse at 90% 10%, rgba(206,147,216,0.2) 0%, transparent 45%),
    radial-gradient(ellipse at 50% 100%, rgba(248,187,208,0.3) 0%, transparent 50%);
  padding: 28px 16px 80px;
}

.wrap { max-width: 880px; margin: 0 auto; }

/* Header */
.header {
  text-align: center;
  margin-bottom: 32px;
  animation: floatUp 0.7s ease both;
  position: relative;
}
.header-badge {
  display: inline-block;
  background: linear-gradient(135deg, #F8BBD0, #F48FB1);
  color: #880E4F;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  padding: 5px 16px;
  border-radius: 50px;
  margin-bottom: 14px;
  box-shadow: 0 2px 12px rgba(244,143,177,0.4);
}
.header-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: 52px;
  font-weight: 700;
  color: #880E4F;
  line-height: 1.05;
  margin-bottom: 6px;
  background: linear-gradient(135deg, #C2185B, #E91E8C, #AD1457);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.header-sub {
  font-family: 'Cormorant Garamond', serif;
  font-style: italic;
  font-size: 18px;
  color: #E91E8C;
  opacity: 0.75;
}
.header-line {
  width: 120px;
  height: 2px;
  background: linear-gradient(90deg, transparent, #F48FB1, transparent);
  margin: 14px auto 0;
}

/* Tabs */
.tab-row {
  display: flex;
  gap: 6px;
  justify-content: center;
  margin-bottom: 28px;
  flex-wrap: wrap;
}
.tab-btn {
  padding: 9px 22px;
  border-radius: 50px;
  border: 2px solid #F8BBD0;
  background: rgba(255,255,255,0.7);
  font-family: 'DM Sans', sans-serif;
  font-size: 13px;
  font-weight: 500;
  color: #C2185B;
  cursor: pointer;
  transition: all 0.25s ease;
  backdrop-filter: blur(4px);
}
.tab-btn:hover { background: rgba(248,187,208,0.5); }
.tab-btn.active {
  background: linear-gradient(135deg, #E91E8C, #C2185B);
  border-color: transparent;
  color: white;
  box-shadow: 0 4px 16px rgba(233,30,140,0.35);
}

/* Cards */
.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
  gap: 14px;
  margin-bottom: 18px;
}
.stat-card {
  background: white;
  border-radius: 22px;
  padding: 22px 20px;
  border: 2px solid #FCE4EC;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(233,30,140,0.08);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  animation: floatUp 0.6s ease both;
}
.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 30px rgba(233,30,140,0.15);
}
.stat-card::after {
  content: '';
  position: absolute;
  top: -30px; right: -30px;
  width: 100px; height: 100px;
  border-radius: 50%;
  background: var(--glow);
  opacity: 0.15;
}
.card-emoji {
  font-size: 26px;
  margin-bottom: 8px;
  display: block;
}
.card-label {
  font-size: 10px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #F48FB1;
  margin-bottom: 6px;
  font-weight: 500;
}
.card-value {
  font-family: 'Cormorant Garamond', serif;
  font-size: 30px;
  font-weight: 700;
  color: var(--col);
}

/* Panels */
.panel {
  background: white;
  border: 2px solid #FCE4EC;
  border-radius: 24px;
  padding: 26px 24px;
  margin-bottom: 18px;
  box-shadow: 0 4px 24px rgba(233,30,140,0.07);
  animation: floatUp 0.7s ease both;
}
.panel-heading {
  font-family: 'Cormorant Garamond', serif;
  font-size: 22px;
  font-weight: 600;
  color: #880E4F;
  margin-bottom: 6px;
  display: flex;
  align-items: center;
  gap: 8px;
}
.panel-sub {
  font-size: 12px;
  color: #F48FB1;
  font-style: italic;
  margin-bottom: 20px;
}
.divider {
  height: 1px;
  background: linear-gradient(90deg, transparent, #F8BBD0, transparent);
  margin: 14px 0 20px;
}

/* Savings rate bar */
.rate-panel {
  background: linear-gradient(135deg, #FFF0F5, #FCE4EC);
  border: 2px solid #F8BBD0;
  border-radius: 22px;
  padding: 22px 24px;
  margin-bottom: 18px;
  position: relative;
  overflow: hidden;
}
.rate-panel::before {
  content: '💕';
  position: absolute;
  right: 20px; top: 16px;
  font-size: 40px;
  opacity: 0.15;
}
.rate-big {
  font-family: 'Cormorant Garamond', serif;
  font-size: 52px;
  font-weight: 700;
  color: #E91E8C;
  line-height: 1;
}
.rate-bar-track {
  height: 12px;
  background: #FCE4EC;
  border-radius: 99px;
  overflow: hidden;
  margin: 14px 0 8px;
  border: 1px solid #F8BBD0;
}
.rate-bar-fill {
  height: 100%;
  border-radius: 99px;
  background: linear-gradient(90deg, #F48FB1, #E91E8C, #C2185B);
  background-size: 200% 100%;
  animation: shimmer 2s linear infinite, barGrow 1s ease both;
  position: relative;
}
.rate-bar-fill::after {
  content: '';
  position: absolute;
  top: 2px; left: 4px; right: 4px; height: 4px;
  background: rgba(255,255,255,0.5);
  border-radius: 99px;
}

/* Prediction section ✨ */
.prediction-panel {
  background: linear-gradient(135deg, #880E4F, #C2185B, #AD1457);
  border-radius: 28px;
  padding: 30px 26px;
  margin-bottom: 18px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 8px 40px rgba(194,24,91,0.35);
  animation: floatUp 0.8s ease both;
}
.prediction-panel::before {
  content: '';
  position: absolute;
  inset: 0;
  background: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='20' cy='20' r='2' fill='rgba(255,255,255,0.06)'/%3E%3Ccircle cx='60' cy='40' r='1.5' fill='rgba(255,255,255,0.05)'/%3E%3Ccircle cx='80' cy='70' r='2.5' fill='rgba(255,255,255,0.04)'/%3E%3Ccircle cx='40' cy='80' r='1' fill='rgba(255,255,255,0.07)'/%3E%3C/svg%3E");
}
.pred-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: rgba(255,255,255,0.15);
  border: 1px solid rgba(255,255,255,0.25);
  border-radius: 50px;
  padding: 5px 14px;
  font-size: 11px;
  color: #FFCDD2;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  margin-bottom: 14px;
  backdrop-filter: blur(4px);
}
.pred-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: 28px;
  font-weight: 700;
  color: white;
  margin-bottom: 22px;
  line-height: 1.2;
}
.pred-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 12px;
  margin-bottom: 24px;
}
.pred-card {
  background: rgba(255,255,255,0.1);
  border: 1px solid rgba(255,255,255,0.2);
  border-radius: 18px;
  padding: 16px 14px;
  backdrop-filter: blur(4px);
  transition: background 0.2s;
}
.pred-card:hover { background: rgba(255,255,255,0.16); }
.pred-card-label {
  font-size: 10px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(255,205,210,0.8);
  margin-bottom: 6px;
}
.pred-card-value {
  font-family: 'Cormorant Garamond', serif;
  font-size: 26px;
  font-weight: 700;
  color: white;
  animation: countUp 0.6s ease both;
}
.pred-card-note {
  font-size: 11px;
  color: rgba(255,205,210,0.7);
  margin-top: 3px;
  font-style: italic;
}

/* Milestone bar */
.milestone-wrap { margin-top: 6px; }
.milestone-label {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}
.milestone-title {
  font-size: 13px;
  color: rgba(255,255,255,0.8);
  font-style: italic;
}
.milestone-pct {
  font-family: 'Cormorant Garamond', serif;
  font-size: 20px;
  color: white;
  font-weight: 600;
}
.milestone-track {
  height: 8px;
  background: rgba(255,255,255,0.12);
  border-radius: 99px;
  overflow: visible;
  position: relative;
  margin-bottom: 12px;
}
.milestone-fill {
  height: 100%;
  border-radius: 99px;
  background: linear-gradient(90deg, #F8BBD0, #FFB3C6, #FF85A2);
  animation: barGrow 1.2s cubic-bezier(0.34,1.56,0.64,1) both;
  position: relative;
}
.milestone-thumb {
  position: absolute;
  right: -8px; top: -4px;
  width: 16px; height: 16px;
  border-radius: 50%;
  background: white;
  box-shadow: 0 2px 8px rgba(0,0,0,0.25);
  animation: pulse-ring 2s infinite;
}
.milestone-markers {
  display: flex;
  justify-content: space-between;
  font-size: 10px;
  color: rgba(255,205,210,0.6);
  margin-top: 6px;
}

/* What you could buy */
.dreams-row {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: 20px;
}
.dream-chip {
  background: rgba(255,255,255,0.12);
  border: 1px solid rgba(255,255,255,0.2);
  border-radius: 50px;
  padding: 7px 16px;
  font-size: 12px;
  color: rgba(255,255,255,0.85);
  display: flex;
  align-items: center;
  gap: 6px;
  backdrop-filter: blur(4px);
  transition: background 0.2s;
  cursor: default;
}
.dream-chip:hover { background: rgba(255,255,255,0.2); }
.dream-chip span:first-child { font-size: 16px; }

/* Spending breakdown */
.cat-item { margin-bottom: 18px; }
.cat-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 7px; }
.cat-left-info { display: flex; align-items: center; gap: 10px; }
.cat-dot {
  width: 38px; height: 38px;
  border-radius: 12px;
  display: flex; align-items: center; justify-content: center;
  font-size: 20px;
  border: 2px solid var(--b);
  background: var(--bg);
}
.cat-name-text { font-size: 14px; color: #880E4F; font-weight: 500; }
.cat-pct-text { font-size: 11px; color: #F48FB1; margin-right: 10px; }
.cat-amt-text {
  font-family: 'Cormorant Garamond', serif;
  font-size: 18px;
  font-weight: 600;
  color: var(--c);
}
.cat-progress-track {
  height: 6px;
  background: #FCE4EC;
  border-radius: 99px;
  overflow: hidden;
}
.cat-progress-fill {
  height: 100%;
  border-radius: 99px;
  background: var(--c);
  opacity: 0.8;
  animation: barGrow 0.9s ease both;
}

/* Transactions */
.filter-strip { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 16px; }
.f-btn {
  padding: 7px 18px;
  border-radius: 50px;
  border: 2px solid #F8BBD0;
  background: transparent;
  font-family: 'DM Sans', sans-serif;
  font-size: 12px;
  color: #C2185B;
  cursor: pointer;
  transition: all 0.2s;
}
.f-btn.active {
  background: #E91E8C;
  border-color: #E91E8C;
  color: white;
}

.txn-list { display: flex; flex-direction: column; gap: 8px; }
.txn-row {
  background: white;
  border: 2px solid #FCE4EC;
  border-radius: 18px;
  padding: 14px 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all 0.2s ease;
  box-shadow: 0 2px 10px rgba(233,30,140,0.05);
}
.txn-row:hover {
  border-color: #F48FB1;
  transform: translateX(4px);
  box-shadow: 0 4px 18px rgba(233,30,140,0.1);
}
.txn-ico-wrap {
  width: 42px; height: 42px;
  border-radius: 14px;
  display: flex; align-items: center; justify-content: center;
  font-size: 20px;
  border: 2px solid var(--b);
  background: var(--bg);
  margin-right: 12px;
  flex-shrink: 0;
}
.txn-desc-text { font-size: 14px; color: #880E4F; font-weight: 500; margin-bottom: 2px; }
.txn-sub-text { font-size: 11px; color: #F48FB1; font-style: italic; }
.txn-amount-text {
  font-family: 'Cormorant Garamond', serif;
  font-size: 20px;
  font-weight: 700;
  color: var(--ac);
  flex-shrink: 0;
}

/* FAB */
.fab {
  position: fixed;
  bottom: 28px; right: 28px;
  width: 58px; height: 58px;
  border-radius: 50%;
  background: linear-gradient(135deg, #E91E8C, #C2185B);
  border: 3px solid white;
  color: white;
  font-size: 28px;
  cursor: pointer;
  box-shadow: 0 6px 24px rgba(233,30,140,0.5);
  display: flex; align-items: center; justify-content: center;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  z-index: 50;
  animation: pulse-ring 3s infinite;
}
.fab:hover {
  transform: scale(1.1) rotate(10deg);
  box-shadow: 0 8px 32px rgba(233,30,140,0.6);
}

/* Modal */
.overlay {
  position: fixed; inset: 0;
  background: rgba(136,14,79,0.35);
  backdrop-filter: blur(10px);
  display: flex; align-items: center; justify-content: center;
  z-index: 100; padding: 16px;
}
.modal {
  background: white;
  border: 2px solid #F8BBD0;
  border-radius: 30px;
  padding: 34px 28px;
  width: 100%; max-width: 420px;
  box-shadow: 0 20px 60px rgba(233,30,140,0.2);
  animation: floatUp 0.4s ease both;
}
.modal-sparkles { text-align: center; font-size: 20px; letter-spacing: 6px; margin-bottom: 6px; }
.modal-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: 28px;
  font-weight: 700;
  color: #880E4F;
  text-align: center;
  margin-bottom: 24px;
}
.field-wrap { margin-bottom: 18px; }
.field-lbl {
  font-size: 10px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #F48FB1;
  margin-bottom: 8px;
  font-weight: 500;
}
.type-row { display: flex; gap: 6px; }
.type-option {
  flex: 1; padding: 10px 0;
  border-radius: 14px; border: 2px solid #F8BBD0;
  background: white; font-family: 'DM Sans', sans-serif;
  font-size: 12px; color: #C2185B; cursor: pointer;
  transition: all 0.2s;
}
.type-option.active {
  background: linear-gradient(135deg, #E91E8C, #C2185B);
  border-color: transparent; color: white;
}
.inp {
  width: 100%; padding: 12px 16px;
  border-radius: 14px; border: 2px solid #F8BBD0;
  font-family: 'DM Sans', sans-serif; font-size: 14px;
  color: #880E4F; outline: none;
  transition: border-color 0.2s;
  background: #FFF0F5;
}
.inp:focus { border-color: #E91E8C; }
.inp::placeholder { color: #F48FB1; }
.inp-amount {
  font-family: 'Cormorant Garamond', serif;
  font-size: 32px; text-align: center;
  color: #E91E8C; font-weight: 700;
}
.modal-btns { display: flex; gap: 8px; margin-top: 6px; }
.btn-x {
  flex: 1; padding: 13px 0;
  border-radius: 14px; border: 2px solid #F8BBD0;
  background: white; font-family: 'DM Sans', sans-serif;
  font-size: 13px; color: #C2185B; cursor: pointer;
}
.btn-go {
  flex: 2; padding: 13px 0;
  border-radius: 14px; border: none;
  background: linear-gradient(135deg, #E91E8C, #C2185B);
  font-family: 'Cormorant Garamond', serif;
  font-size: 17px; font-weight: 600;
  color: white; cursor: pointer;
  box-shadow: 0 4px 16px rgba(233,30,140,0.35);
  transition: transform 0.15s, box-shadow 0.15s;
}
.btn-go:hover { transform: scale(1.02); box-shadow: 0 6px 22px rgba(233,30,140,0.45); }

@media (max-width: 520px) {
  .header-title { font-size: 36px; }
  .pred-title { font-size: 22px; }
  .rate-big { font-size: 40px; }
}
`;

function fmtLKR(val) {
  if (val >= 1000000) return `Rs. ${(val / 1000000).toFixed(1)}M`;
  if (val >= 1000) return `Rs. ${(val / 1000).toFixed(1)}k`;
  return `Rs. ${Math.round(val).toLocaleString()}`;
}

function getDreams(amount) {
  const dreams = [];
  if (amount >= 15000) dreams.push({ icon: "✈️", label: "Weekend Getaway" });
  if (amount >= 80000) dreams.push({ icon: "👜", label: "Designer Bag" });
  if (amount >= 150000) dreams.push({ icon: "💻", label: "New Laptop" });
  if (amount >= 300000) dreams.push({ icon: "🏖️", label: "Vacation Fund" });
  if (amount >= 800000) dreams.push({ icon: "🏠", label: "Down Payment Start" });
  if (amount >= 60000) dreams.push({ icon: "💅", label: "Luxury Makeover" });
  if (dreams.length === 0) dreams.push({ icon: "🌸", label: "Keep Going Babe!" });
  return dreams.slice(0, 4);
}

export default function ElleTracker() {
  const [transactions, setTransactions] = useState(INITIAL_TRANSACTIONS);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ type: "expense", category: "food", description: "", amount: "" });
  const [filter, setFilter] = useState("all");
  const [goal, setGoal] = useState(500000);

  const income = transactions.filter(t => t.type === "income").reduce((s, t) => s + t.amount, 0);
  const expenses = transactions.filter(t => t.type === "expense").reduce((s, t) => s + t.amount, 0);
  const savings = transactions.filter(t => t.type === "savings").reduce((s, t) => s + t.amount, 0);
  const balance = income - expenses - savings;

  // Prediction math
  const now = new Date();
  const monthNum = now.getMonth() + 1; // 1-12
  const monthsElapsed = monthNum === 1 ? 1 : monthNum;
  const monthsLeft = 12 - monthsElapsed;
  const monthlySavingsRate = monthsElapsed > 0 ? savings / monthsElapsed : savings;
  const projectedYearEnd = savings + (monthlySavingsRate * monthsLeft);
  const savingsPct = income > 0 ? Math.round((savings / income) * 100) : 0;
  const goalProgress = Math.min((projectedYearEnd / goal) * 100, 100);

  const categoryBreakdown = Object.entries(CATEGORIES).map(([key, meta]) => ({
    key, ...meta,
    amount: transactions.filter(t => t.category === key && t.type === "expense").reduce((s, t) => s + t.amount, 0),
  })).filter(c => c.amount > 0).sort((a, b) => b.amount - a.amount);

  const addTransaction = () => {
    if (!form.description || !form.amount) return;
    setTransactions([{
      id: Date.now(), type: form.type, category: form.category,
      description: form.description, amount: parseFloat(form.amount),
      date: new Date().toISOString().split("T")[0],
    }, ...transactions]);
    setForm({ type: "expense", category: "food", description: "", amount: "" });
    setShowModal(false);
  };

  const filtered = filter === "all" ? transactions : transactions.filter(t => t.type === filter);
  const dreams = getDreams(projectedYearEnd);

  return (
    <>
      <style>{css}</style>
      <div className="app">
        <div className="wrap">

          {/* Header */}
          <div className="header">
            <div className="header-badge">💕 Finance Girlboss Mode 💕</div>
            <h1 className="header-title">Elle's Money Diary</h1>
            <p className="header-sub">because smart girls know their numbers, darling</p>
            <div className="header-line" />
          </div>

          {/* Tabs */}
          <div className="tab-row">
            {[
              { id: "dashboard", label: "💗 Dashboard" },
              { id: "prediction", label: "🔮 Predictions" },
              { id: "transactions", label: "📒 Ledger" },
            ].map(t => (
              <button key={t.id} className={`tab-btn ${activeTab === t.id ? "active" : ""}`} onClick={() => setActiveTab(t.id)}>
                {t.label}
              </button>
            ))}
          </div>

          {/* ── DASHBOARD ── */}
          {activeTab === "dashboard" && (
            <>
              <div className="cards-grid">
                {[
                  { label: "Balance, Babe", val: balance, emoji: "👛", col: "#C2185B", glow: "rgba(194,24,91,0.2)", delay: "0s" },
                  { label: "Income Earned", val: income, emoji: "💸", col: "#7B1FA2", glow: "rgba(123,31,162,0.2)", delay: "0.1s" },
                  { label: "Spent So Far", val: expenses, emoji: "🛍️", col: "#E91E8C", glow: "rgba(233,30,140,0.2)", delay: "0.2s" },
                  { label: "Saved Away", val: savings, emoji: "🐷", col: "#AD1457", glow: "rgba(173,20,87,0.2)", delay: "0.3s" },
                ].map(c => (
                  <div className="stat-card" key={c.label} style={{ "--glow": c.glow, "--col": c.col, animationDelay: c.delay }}>
                    <span className="card-emoji">{c.emoji}</span>
                    <div className="card-label">{c.label}</div>
                    <div className="card-value" style={{ color: c.col }}>{fmtLKR(c.val)}</div>
                  </div>
                ))}
              </div>

              {/* Savings rate */}
              <div className="rate-panel">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 10 }}>
                  <div>
                    <div className="field-lbl" style={{ color: "#E91E8C" }}>💖 Savings Rate</div>
                    <div className="rate-big">{savingsPct}%</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: 15, color: "#C2185B", lineHeight: 1.5 }}>
                      {savingsPct >= 20 ? "You're absolutely slaying! 🌟" : "Aim for 20% babe, you've got this 💪"}
                    </div>
                    <div style={{ fontSize: 12, color: "#F48FB1", marginTop: 4 }}>
                      {fmtLKR(savings)} saved of {fmtLKR(income)} earned
                    </div>
                  </div>
                </div>
                <div className="rate-bar-track" style={{ marginTop: 16 }}>
                  <div className="rate-bar-fill" style={{ width: `${Math.min(savingsPct / 30 * 100, 100)}%` }} />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#F48FB1", fontStyle: "italic" }}>
                  <span>0%</span><span>Goal: 20%</span><span>30%+</span>
                </div>
              </div>

              {/* Category breakdown */}
              <div className="panel">
                <div className="panel-heading">🌸 Where the money went, honey</div>
                <p className="panel-sub">your spending breakdown for this period</p>
                <div className="divider" />
                {categoryBreakdown.length === 0 ? (
                  <p style={{ color: "#F48FB1", fontStyle: "italic", textAlign: "center" }}>Nothing spent yet — iconic! 💅</p>
                ) : categoryBreakdown.map(cat => {
                  const pct = expenses > 0 ? Math.round((cat.amount / expenses) * 100) : 0;
                  return (
                    <div key={cat.key} className="cat-item" style={{ "--c": cat.color, "--bg": `${cat.color}18`, "--b": `${cat.color}35` }}>
                      <div className="cat-top">
                        <div className="cat-left-info">
                          <div className="cat-dot">{cat.icon}</div>
                          <span className="cat-name-text">{cat.label}</span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <span className="cat-pct-text">{pct}%</span>
                          <span className="cat-amt-text">{fmtLKR(cat.amount)}</span>
                        </div>
                      </div>
                      <div className="cat-progress-track">
                        <div className="cat-progress-fill" style={{ width: `${pct}%`, background: cat.color }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {/* ── PREDICTIONS ── */}
          {activeTab === "prediction" && (
            <>
              {/* Main prediction panel */}
              <div className="prediction-panel">
                <div className="pred-badge">✨ Year-End Forecast ✨</div>
                <div className="pred-title">
                  If you keep saving {fmtLKR(monthlySavingsRate)}/month,<br />
                  by December 31st you'll have…
                </div>

                <div className="pred-grid">
                  <div className="pred-card">
                    <div className="pred-card-label">🎯 Current Savings</div>
                    <div className="pred-card-value">{fmtLKR(savings)}</div>
                    <div className="pred-card-note">in {monthsElapsed} month{monthsElapsed !== 1 ? "s" : ""}</div>
                  </div>
                  <div className="pred-card">
                    <div className="pred-card-label">📅 Monthly Rate</div>
                    <div className="pred-card-value">{fmtLKR(monthlySavingsRate)}</div>
                    <div className="pred-card-note">avg per month</div>
                  </div>
                  <div className="pred-card">
                    <div className="pred-card-label">✨ Year-End Total</div>
                    <div className="pred-card-value" style={{ fontSize: 30, color: "#FFB3C6" }}>{fmtLKR(projectedYearEnd)}</div>
                    <div className="pred-card-note">by Dec 31, 2026</div>
                  </div>
                  <div className="pred-card">
                    <div className="pred-card-label">⏳ Months Left</div>
                    <div className="pred-card-value">{monthsLeft}</div>
                    <div className="pred-card-note">to save more!</div>
                  </div>
                </div>

                {/* Goal progress */}
                <div className="milestone-wrap">
                  <div className="milestone-label">
                    <span className="milestone-title">Progress toward Rs.&nbsp;
                      <input
                        value={goal}
                        onChange={e => setGoal(Number(e.target.value) || 0)}
                        style={{ background: "transparent", border: "none", borderBottom: "1px solid rgba(255,255,255,0.4)", color: "white", fontFamily: "'Cormorant Garamond', serif", fontSize: 20, width: 110, outline: "none", textAlign: "center" }}
                        type="number"
                      /> goal
                    </span>
                    <span className="milestone-pct">{Math.round(goalProgress)}%</span>
                  </div>
                  <div className="milestone-track">
                    <div className="milestone-fill" style={{ width: `${goalProgress}%` }}>
                      {goalProgress < 100 && <div className="milestone-thumb" />}
                    </div>
                  </div>
                  <div className="milestone-markers">
                    <span>Rs. 0</span>
                    <span>{fmtLKR(goal / 2)}</span>
                    <span>{fmtLKR(goal)}</span>
                  </div>
                </div>

                {/* Dream chips */}
                <div style={{ marginTop: 22 }}>
                  <div style={{ fontSize: 12, color: "rgba(255,205,210,0.7)", fontStyle: "italic", marginBottom: 10 }}>
                    💭 What {fmtLKR(projectedYearEnd)} could get you…
                  </div>
                  <div className="dreams-row">
                    {dreams.map((d, i) => (
                      <div key={i} className="dream-chip">
                        <span>{d.icon}</span>
                        <span>{d.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Monthly projections */}
              <div className="panel">
                <div className="panel-heading">📈 Month-by-Month Forecast</div>
                <p className="panel-sub">saving {fmtLKR(monthlySavingsRate)} every month from here</p>
                <div className="divider" />
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: 10 }}>
                  {["Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((m, i) => {
                    const projected = savings + monthlySavingsRate * (i + 1);
                    const h = Math.min((projected / goal) * 100, 100);
                    return (
                      <div key={m} style={{
                        background: "#FFF0F5",
                        border: "2px solid #FCE4EC",
                        borderRadius: 16, padding: "14px 12px",
                        textAlign: "center",
                        transition: "transform 0.2s",
                      }}
                        onMouseEnter={e => e.currentTarget.style.transform = "scale(1.04)"}
                        onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                      >
                        <div style={{ fontSize: 11, color: "#F48FB1", fontWeight: 600, marginBottom: 10, letterSpacing: "0.08em" }}>{m}</div>
                        <div style={{ height: 70, display: "flex", alignItems: "flex-end", justifyContent: "center", marginBottom: 8 }}>
                          <div style={{
                            width: 28, borderRadius: "6px 6px 0 0",
                            height: `${Math.max(h, 8)}%`,
                            background: `linear-gradient(180deg, #F48FB1, #E91E8C)`,
                            boxShadow: "0 2px 8px rgba(233,30,140,0.3)",
                            transition: "height 0.5s ease",
                          }} />
                        </div>
                        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 15, fontWeight: 700, color: "#C2185B" }}>
                          {fmtLKR(projected)}
                        </div>
                      </div>
                    );
                  }).slice(Math.max(0, monthsElapsed - 2))}
                </div>

                {/* Tips */}
                <div style={{ marginTop: 20, background: "#FFF0F5", borderRadius: 16, padding: "16px 18px", border: "1px solid #FCE4EC" }}>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 17, color: "#880E4F", marginBottom: 8 }}>
                    💡 Girlboss Tips to Hit Your Goal Faster
                  </div>
                  {[
                    { tip: "Increase savings by Rs. 5,000/mo", impact: `+${fmtLKR(5000 * monthsLeft)} extra` },
                    { tip: "Cut dining out by 30%", impact: `Save ~${fmtLKR(Math.round((categoryBreakdown.find(c => c.key === "food")?.amount || 0) * 0.3 * monthsLeft))}` },
                    { tip: "Automate savings on payday", impact: "Never forget 💅" },
                  ].map((tip, i) => (
                    <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: i < 2 ? 10 : 0, paddingBottom: i < 2 ? 10 : 0, borderBottom: i < 2 ? "1px solid #FCE4EC" : "none" }}>
                      <span style={{ fontSize: 13, color: "#880E4F" }}>✦ {tip.tip}</span>
                      <span style={{ fontSize: 12, color: "#E91E8C", fontWeight: 500, fontStyle: "italic" }}>{tip.impact}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* ── TRANSACTIONS ── */}
          {activeTab === "transactions" && (
            <div className="panel">
              <div className="panel-heading">📒 All Transactions, Darling</div>
              <p className="panel-sub">every little thing you earned, spent & saved</p>
              <div className="divider" />
              <div className="filter-strip">
                {[
                  { id: "all", label: "💗 All" },
                  { id: "income", label: "💸 Income" },
                  { id: "expense", label: "🛍️ Expenses" },
                  { id: "savings", label: "🐷 Savings" },
                ].map(f => (
                  <button key={f.id} className={`f-btn ${filter === f.id ? "active" : ""}`} onClick={() => setFilter(f.id)}>
                    {f.label}
                  </button>
                ))}
              </div>
              <div className="txn-list">
                {filtered.map(t => {
                  const cat = CATEGORIES[t.category];
                  const isExp = t.type === "expense";
                  const isSave = t.type === "savings";
                  const col = isExp ? "#E91E8C" : isSave ? "#7B1FA2" : "#388E3C";
                  return (
                    <div key={t.id} className="txn-row" style={{ "--bg": `${cat.color}12`, "--b": `${cat.color}30`, "--ac": col }}>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <div className="txn-ico-wrap" style={{ background: `${cat.color}12`, borderColor: `${cat.color}30` }}>{cat.icon}</div>
                        <div>
                          <div className="txn-desc-text">{t.description}</div>
                          <div className="txn-sub-text">{t.date} · {cat.label}</div>
                        </div>
                      </div>
                      <div className="txn-amount-text" style={{ color: col }}>
                        {isExp ? "−" : "+"} {fmtLKR(t.amount)}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* FAB */}
        <button className="fab" onClick={() => setShowModal(true)}>＋</button>

        {/* Modal */}
        {showModal && (
          <div className="overlay" onClick={e => e.target === e.currentTarget && setShowModal(false)}>
            <div className="modal">
              <div className="modal-sparkles">✦ 💗 ✦</div>
              <div className="modal-title">Log an Entry, Babe</div>

              <div className="field-wrap">
                <div className="field-lbl">Type</div>
                <div className="type-row">
                  {[
                    { id: "expense", label: "🛍️ Expense" },
                    { id: "income", label: "💸 Income" },
                    { id: "savings", label: "🐷 Savings" },
                  ].map(t => (
                    <button key={t.id} className={`type-option ${form.type === t.id ? "active" : ""}`} onClick={() => setForm({ ...form, type: t.id })}>
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="field-wrap">
                <div className="field-lbl">Category</div>
                <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="inp" style={{ appearance: "none" }}>
                  {Object.entries(CATEGORIES).map(([k, v]) => <option key={k} value={k}>{v.icon} {v.label}</option>)}
                </select>
              </div>

              <div className="field-wrap">
                <div className="field-lbl">Description</div>
                <input className="inp" placeholder="What was this for, hun?" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
              </div>

              <div className="field-wrap">
                <div className="field-lbl">Amount ($)</div>
                <input className="inp inp-amount" type="number" placeholder="0.00" value={form.amount} onChange={e => setForm({ ...form, amount: e.target.value })} />
              </div>

              <div className="modal-btns">
                <button className="btn-x" onClick={() => setShowModal(false)}>Not now</button>
                <button className="btn-go" onClick={addTransaction}>Save it! 💕</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

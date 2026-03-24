"use client";

import React, { useState, useEffect, useRef } from "react";
import Script from "next/script";
import './crop.css';
import { CROPS, RULES } from "./constants";

export default function CropsModule() {
  const [activeTab, setActiveTab] = useState("recommend");
  const [saved, setSaved] = useState<Set<string>>(new Set());
  const [compare, setCompare] = useState<Set<string>>(new Set());
  const [recIds, setRecIds] = useState<string[]>([]);
  const [curFilter, setCurFilter] = useState("all");
  
  const [soil, setSoil] = useState("");
  const [season, setSeason] = useState("");
  const [water, setWater] = useState("");
  const [locInput, setLocInput] = useState("");
  
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showRecResults, setShowRecResults] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  const [detailCropId, setDetailCropId] = useState<string | null>(null);
  const [showCmpModal, setShowCmpModal] = useState(false);

  // References for Charts
  const pChartRef = useRef<HTMLCanvasElement>(null);
  const mChartRef = useRef<HTMLCanvasElement>(null);
  const pChartInstance = useRef<any>(null);
  const mChartInstance = useRef<any>(null);

  // Helper Toast
  const toastTimeout = useRef<any>(null);
  const showToast = (msg: string) => {
    setToastMsg(msg);
    if (toastTimeout.current) clearTimeout(toastTimeout.current);
    toastTimeout.current = setTimeout(() => setToastMsg(""), 2800);
  };

  // Switch Tab Logic
  const handleSwitchTab = (tab: string) => {
    setActiveTab(tab);
    if (tab === "market") {
      setTimeout(initMktChart, 100);
    }
  };

  // Toggle Save / Compare
  const toggleSave = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newSaved = new Set(saved);
    if (newSaved.has(id)) {
      newSaved.delete(id);
      showToast("🤍 Removed from saved");
    } else {
      newSaved.add(id);
      showToast("❤️ Saved!");
    }
    setSaved(newSaved);
  };

  const toggleCompare = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newCompare = new Set(compare);
    if (newCompare.has(id)) {
      newCompare.delete(id);
      showToast("Removed from compare");
    } else if (newCompare.size >= 3) {
      showToast("⚠️ Max 3 crops can be compared");
      return;
    } else {
      newCompare.add(id);
      showToast("⚖️ Added to comparison!");
    }
    setCompare(newCompare);
  };

  const clearCompare = () => {
    setCompare(new Set());
  };

  // Recommendation Engine
  const handleGetRecommendations = () => {
    if (!soil || !season || !water) {
      showToast("⚠️ Please fill Soil, Season and Water fields");
      return;
    }
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      let ids: string[] = [];
      for (const r of RULES) {
        if (r.soil === soil && r.season === season && r.water.includes(water)) {
          ids = [...new Set([...ids, ...r.ids])];
        }
      }
      if (!ids.length) {
        ids = CROPS.filter((c) => c.seasons.includes(season)).map((c) => c.id);
      }
      setRecIds(ids);
      setCurFilter("all");
      setShowRecResults(true);
      showToast(`✅ Found ${ids.length} crops for ${soil} soil in ${season} season!`);
    }, 1800);
  };

  const resetForm = () => {
    setSoil("");
    setSeason("");
    setWater("");
    setLocInput("");
    setShowRecResults(false);
  };

  // Detail Panel
  const openDetail = (id: string) => {
    setDetailCropId(id);
    document.body.style.overflow = "hidden";
  };

  const closeDetail = () => {
    setDetailCropId(null);
    document.body.style.overflow = "";
  };

  useEffect(() => {
    if (detailCropId && typeof window !== "undefined" && (window as any).Chart) {
      const c = CROPS.find((x) => x.id === detailCropId);
      if (c && pChartRef.current) {
        if (pChartInstance.current) pChartInstance.current.destroy();
        pChartInstance.current = new ((window as any).Chart)(pChartRef.current, {
          type: "bar",
          data: {
            labels: c.profit.months,
            datasets: [
              {
                label: "Income (₹)",
                data: c.profit.income,
                backgroundColor: "rgba(34,197,94,.7)",
                borderColor: "#16a34a",
                borderWidth: 1,
                borderRadius: 6,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
              y: { beginAtZero: true, ticks: { callback: (v: any) => "₹" + v.toLocaleString() } },
            },
          },
        });
      }
    }
  }, [detailCropId]);

  // Market Chart
  const initMktChart = () => {
    if (typeof window !== "undefined" && (window as any).Chart && mChartRef.current) {
      if (mChartInstance.current) mChartInstance.current.destroy();
      mChartInstance.current = new ((window as any).Chart)(mChartRef.current, {
        type: "bar",
        data: {
          labels: ["Paddy", "Chilli", "Cotton", "Maize", "Groundnut", "Sunflower"],
          datasets: [
            {
              label: "Avg Price (₹/qtl)",
              data: [2183, 8200, 6700, 1850, 5400, 4100],
              backgroundColor: [
                "rgba(34,197,94,.75)",
                "rgba(239,68,68,.75)",
                "rgba(74,222,128,.75)",
                "rgba(251,191,36,.75)",
                "rgba(249,115,22,.75)",
                "rgba(234,179,8,.75)",
              ],
              borderRadius: 8,
              borderWidth: 0,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            y: { beginAtZero: true, ticks: { callback: (v: any) => "₹" + v.toLocaleString() } },
          },
        },
      });
    }
  };

  // Compare Modal
  const openCmpModal = () => {
    if (compare.size < 2) {
      showToast("⚠️ Select at least 2 crops to compare");
      return;
    }
    setShowCmpModal(true);
    document.body.style.overflow = "hidden";
  };

  const closeCmpModal = () => {
    setShowCmpModal(false);
    document.body.style.overflow = "";
  };

  // Rendering logic
  const renderCard = (crop: any, isRec = false, rank = 0) => {
    const sv = saved.has(crop.id);
    const cmp = compare.has(crop.id);
    const score = isRec ? (rank === 0 ? "A+" : rank === 1 ? "A" : "B") : "";

    return (
      <div
        key={crop.id}
        className={`crop-card ${sv ? "saved" : ""}`}
        onClick={() => openDetail(crop.id)}
      >
        <div className="crop-banner" style={{ background: crop.bg }}>
          <span>{crop.emoji}</span>
          {score && (
            <div className={`score-ring ${rank < 2 ? "score-a" : "score-b"}`}>{score}</div>
          )}
        </div>
        <div className="crop-body">
          <div className="crop-name">{crop.name}</div>
          <div className="crop-te">{crop.te}</div>
          <div className="crop-meta">
            <span className="meta-chip">📦 {crop.yield}</span>
            <span className="meta-chip">⏱ {crop.dur}</span>
          </div>
          <div className="crop-tags">
            {crop.tags.map((t: string) =>
              t === "best" ? (
                <span key={t} className="tag tag-best">⭐ Best</span>
              ) : t === "profit" ? (
                <span key={t} className="tag tag-profit">💰 High Profit</span>
              ) : t === "risk" ? (
                <span key={t} className="tag tag-risk">🛡️ Low Risk</span>
              ) : null
            )}
          </div>
        </div>
        <div className="crop-actions" onClick={(e) => e.stopPropagation()}>
          <button
            className="btn btn-secondary btn-sm"
            style={{ flex: 1 }}
            onClick={(e) => {
              e.stopPropagation();
              openDetail(crop.id);
            }}
          >
            View Details
          </button>
          <button
            className={`save-btn ${sv ? "active" : ""}`}
            onClick={(e) => toggleSave(crop.id, e)}
            title={sv ? "Remove" : "Save"}
          >
            {sv ? "❤️" : "🤍"}
          </button>
          <button
            className={`save-btn ${cmp ? "active" : ""}`}
            onClick={(e) => toggleCompare(crop.id, e)}
            title={cmp ? "Remove" : "Compare"}
          >
            {cmp ? "⚖️" : "➕"}
          </button>
        </div>
      </div>
    );
  };

  const detailCrop = detailCropId ? CROPS.find((c) => c.id === detailCropId) : null;
  const compareCrops = [...compare].map((id) => CROPS.find((c) => c.id === id)).filter(Boolean);

  return (
    <div className="crops-body">
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.min.js" strategy="lazyOnload" onLoad={() => {if(activeTab==='market')initMktChart()}} />
      <div className="app-layout">
        {/* SIDEBAR */}
        <aside className="sidebar">
          <p className="sb-title">Crop Tools</p>
          <button className={`sb-item ${activeTab === "recommend" ? "active" : ""}`} onClick={() => handleSwitchTab("recommend")}>
            <span className="ic">🤖</span> AI Recommend
          </button>
          <button className={`sb-item ${activeTab === "planning" ? "active" : ""}`} onClick={() => handleSwitchTab("planning")}>
            <span className="ic">📅</span> Smart Planning
          </button>
          <button className={`sb-item ${activeTab === "market" ? "active" : ""}`} onClick={() => handleSwitchTab("market")}>
            <span className="ic">💰</span> Market Prices
          </button>
          <button className={`sb-item ${activeTab === "saved" ? "active" : ""}`} onClick={() => handleSwitchTab("saved")}>
            <span className="ic">❤️</span> Saved Crops <span className="sb-badge">{saved.size}</span>
          </button>
          <button className={`sb-item ${activeTab === "compare" ? "active" : ""}`} onClick={() => handleSwitchTab("compare")}>
            <span className="ic">⚖️</span> Compare
          </button>
          <p className="sb-title">Explore</p>
          <button className="sb-item" onClick={() => handleSwitchTab("recommend")}>
            <span className="ic">🌾</span> All Crops
          </button>
          <button className="sb-item" onClick={() => handleSwitchTab("recommend")}>
            <span className="ic">🐛</span> Pest Guide
          </button>
          <button className="sb-item" onClick={() => handleSwitchTab("planning")}>
            <span className="ic">🌱</span> Crop Calendar
          </button>
          <div className="divider"></div>
          <div className="sb-loc">
            <div className="sb-loc-title">📍 Your Location</div>
            <div className="sb-loc-val">Vijayawada, AP</div>
            <div className="sb-loc-sub">Black Soil · Kharif</div>
          </div>
        </aside>

        {/* MAIN */}
        <main className="main-content">
          {/* TAB: RECOMMEND */}
          {activeTab === "recommend" && (
            <div className="page-section active">
              <div className="sec-header anim">
                <div>
                  <h1 className="sec-title">🌾 AI Crop Recommendation</h1>
                  <p className="sec-sub">Get personalised crop suggestions based on your soil, season &amp; location</p>
                </div>
              </div>

              {/* FORM */}
              <div className="form-card anim d1">
                {isAnalyzing && (
                  <div className="load-ov on">
                    <div className="spinner"></div>
                    <div className="load-txt">🤖 AI is analysing your inputs…</div>
                  </div>
                )}
                <div className="form-title">📋 Enter Your Farm Details</div>
                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">📍 State / District</label>
                    <input
                      list="locList"
                      className="form-ctrl"
                      placeholder="e.g. Vijayawada, AP"
                      value={locInput}
                      onChange={(e) => setLocInput(e.target.value)}
                    />
                    <datalist id="locList">
                      <option value="Vijayawada, AP" />
                      <option value="Guntur, AP" />
                      <option value="Warangal, Telangana" />
                      <option value="Pune, Maharashtra" />
                      <option value="Nagpur, Maharashtra" />
                      <option value="Patna, Bihar" />
                      <option value="Ludhiana, Punjab" />
                      <option value="Jaipur, Rajasthan" />
                      <option value="Coimbatore, Tamil Nadu" />
                    </datalist>
                  </div>
                  <div className="form-group">
                    <label className="form-label">🪨 Soil Type</label>
                    <select className="form-ctrl" value={soil} onChange={(e) => setSoil(e.target.value)}>
                      <option value="">Select Soil Type</option>
                      <option value="Black">Black Soil (Regur)</option>
                      <option value="Red">Red Soil</option>
                      <option value="Sandy">Sandy Soil</option>
                      <option value="Loamy">Loamy Soil</option>
                      <option value="Alluvial">Alluvial Soil</option>
                      <option value="Clay">Clay Soil</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">🌤️ Season</label>
                    <select className="form-ctrl" value={season} onChange={(e) => setSeason(e.target.value)}>
                      <option value="">Select Season</option>
                      <option value="Kharif">Kharif (Jun–Oct)</option>
                      <option value="Rabi">Rabi (Nov–Mar)</option>
                      <option value="Zaid">Zaid (Mar–Jun)</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">💧 Water Availability</label>
                    <select className="form-ctrl" value={water} onChange={(e) => setWater(e.target.value)}>
                      <option value="">Select Water Level</option>
                      <option value="Low">Low (Rainfed)</option>
                      <option value="Medium">Medium (Limited Irrigation)</option>
                      <option value="High">High (Full Irrigation)</option>
                    </select>
                  </div>
                </div>
                <div className="form-footer">
                  <button className="btn btn-primary" onClick={handleGetRecommendations}>
                    🤖 Get AI Recommendation
                  </button>
                  <div className="ai-badge">
                    <div className="ai-dot"></div>AI Powered
                  </div>
                  <button className="btn btn-ghost btn-sm" onClick={resetForm}>
                    ↺ Reset
                  </button>
                </div>
              </div>

              {/* RESULTS */}
              {showRecResults ? (
                <div>
                  <div className="tabs">
                    <button className={`tab-btn ${curFilter === "all" ? "active" : ""}`} onClick={() => setCurFilter("all")}>
                      All Results
                    </button>
                    <button className={`tab-btn ${curFilter === "best" ? "active" : ""}`} onClick={() => setCurFilter("best")}>
                      ⭐ Best Match
                    </button>
                    <button className={`tab-btn ${curFilter === "profit" ? "active" : ""}`} onClick={() => setCurFilter("profit")}>
                      💰 High Profit
                    </button>
                    <button className={`tab-btn ${curFilter === "risk" ? "active" : ""}`} onClick={() => setCurFilter("risk")}>
                      🛡️ Low Risk
                    </button>
                  </div>
                  <div className="crops-grid">
                    {(() => {
                      const ids = curFilter === "all" ? recIds : recIds.filter((id) => CROPS.find((c) => c.id === id)?.tags.includes(curFilter));
                      if (!ids.length) {
                        return (
                          <div className="empty" style={{ gridColumn: "1/-1" }}>
                            <div className="ei">🔍</div>
                            <h3>No crops match this filter</h3>
                            <p>Try a different filter tab.</p>
                          </div>
                        );
                      }
                      return ids.map((id, i) => {
                        const c = CROPS.find((x) => x.id === id);
                        return c ? renderCard(c, true, i) : null;
                      });
                    })()}
                  </div>
                </div>
              ) : (
                <div>
                  <div className="sec-div">All Available Crops</div>
                  <div className="crops-grid">
                    {CROPS.map((c, i) => renderCard(c, false, i))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB: PLANNING */}
          {activeTab === "planning" && (
            <div className="page-section active">
              <div className="sec-header anim">
                <div>
                  <h1 className="sec-title">📅 Smart Crop Planning</h1>
                  <p className="sec-sub">Best sowing times, weather alerts &amp; crop cycle calendar</p>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "18px", marginBottom: "22px" }} className="anim d1">
                <div className="my-card">
                  <div className="my-card-header">
                    <span className="my-card-title">🌦️ Weather Alerts</span>
                  </div>
                  <div className="my-card-body">
                    <div className="alert-card warn">
                      <div className="alert-ic">⚠️</div>
                      <div>
                        <div className="alert-t">Moderate Rainfall Expected</div>
                        <div className="alert-b">70mm rainfall expected next week. Avoid sowing for 5 days. Good for standing kharif crops.</div>
                      </div>
                    </div>
                    <div className="alert-card ok">
                      <div className="alert-ic">✅</div>
                      <div>
                        <div className="alert-t">Ideal for Cotton Sowing</div>
                        <div className="alert-b">Temperature 28–32°C with moderate humidity. Perfect for cotton sowing in black soil regions.</div>
                      </div>
                    </div>
                    <div className="alert-card info">
                      <div className="alert-ic">ℹ️</div>
                      <div>
                        <div className="alert-t">Pest Alert – Aphids</div>
                        <div className="alert-b">High aphid activity in Guntur district. Monitor groundnut &amp; chilli crops closely.</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="my-card">
                  <div className="my-card-header">
                    <span className="my-card-title">📆 Best Sowing Times</span>
                  </div>
                  <div className="my-card-body">
                    <div style={{ display: "flex", flexDirection: "column", gap: "9px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "11px", padding: "9px", background: "var(--g50)", borderRadius: "var(--r-md)", border: "1px solid var(--g200)" }}>
                        <span style={{ fontSize: "1.4rem" }}>🌾</span>
                        <div>
                          <div style={{ fontSize: ".83rem", fontWeight: 700, color: "var(--s800)" }}>Paddy (Kharif)</div>
                          <div style={{ fontSize: ".72rem", color: "var(--s500)" }}>Optimal: Jun 15 – Jul 15</div>
                        </div>
                        <span className="tag tag-best" style={{ marginLeft: "auto" }}>NOW</span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "11px", padding: "9px", background: "var(--s50)", borderRadius: "var(--r-md)", border: "1px solid var(--s200)" }}>
                        <span style={{ fontSize: "1.4rem" }}>🌶️</span>
                        <div>
                          <div style={{ fontSize: ".83rem", fontWeight: 700, color: "var(--s800)" }}>Chilli (Rabi)</div>
                          <div style={{ fontSize: ".72rem", color: "var(--s500)" }}>Optimal: Oct 1 – Nov 15 · 3 months away</div>
                        </div>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "11px", padding: "9px", background: "var(--s50)", borderRadius: "var(--r-md)", border: "1px solid var(--s200)" }}>
                        <span style={{ fontSize: "1.4rem" }}>🌻</span>
                        <div>
                          <div style={{ fontSize: ".83rem", fontWeight: 700, color: "var(--s800)" }}>Sunflower (Rabi)</div>
                          <div style={{ fontSize: ".72rem", color: "var(--s500)" }}>Optimal: Oct 20 – Nov 30</div>
                        </div>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "11px", padding: "9px", background: "var(--amber100)", borderRadius: "var(--r-md)", border: "1px solid #fcd34d" }}>
                        <span style={{ fontSize: "1.4rem" }}>🌽</span>
                        <div>
                          <div style={{ fontSize: ".83rem", fontWeight: 700, color: "var(--s800)" }}>Maize (Zaid)</div>
                          <div style={{ fontSize: ".72rem", color: "var(--s500)" }}>Optimal: Feb 15 – Mar 30</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="my-card anim d2">
                <div className="my-card-header">
                  <span className="my-card-title">📅 Crop Cycle Calendar – Paddy (Kharif)</span>
                </div>
                <div className="my-card-body">
                  <div className="cal-grid">
                    <div className="cal-cell idle"><div>Jan</div></div>
                    <div className="cal-cell idle"><div>Feb</div></div>
                    <div className="cal-cell idle"><div>Mar</div></div>
                    <div className="cal-cell idle"><div>Apr</div></div>
                    <div className="cal-cell idle"><div>May</div></div>
                    <div className="cal-cell sow"><div>Jun</div>🌱</div>
                    <div className="cal-cell sow"><div>Jul</div>🌱</div>
                    <div className="cal-cell grow"><div>Aug</div>🌿</div>
                    <div className="cal-cell grow"><div>Sep</div>🌿</div>
                    <div className="cal-cell harvest"><div>Oct</div>🌾</div>
                    <div className="cal-cell harvest"><div>Nov</div>🌾</div>
                    <div className="cal-cell idle"><div>Dec</div></div>
                  </div>
                  <div className="cal-legend">
                    <div className="leg-item"><div className="leg-dot sow"></div>Sowing</div>
                    <div className="leg-item"><div className="leg-dot grow"></div>Growing</div>
                    <div class="leg-item"><div className="leg-dot harvest"></div>Harvest</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: MARKET */}
          {activeTab === "market" && (
            <div className="page-section active">
              <div className="sec-header anim">
                <div>
                  <h1 className="sec-title">💰 Market Insights</h1>
                  <p className="sec-sub">Live mandi prices, demand trends and profit estimates</p>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "18px", marginBottom: "22px" }} className="anim d1">
                <div className="my-card">
                  <div className="my-card-header">
                    <span className="my-card-title">📊 Price Comparison</span>
                  </div>
                  <div className="my-card-body">
                    <div className="chart-wrap">
                      <canvas ref={mChartRef}></canvas>
                    </div>
                  </div>
                </div>
                <div className="my-card">
                  <div className="my-card-header">
                    <span className="my-card-title">🏪 Nearby Mandi Prices</span>
                  </div>
                  <div className="my-card-body" style={{ padding: "14px 18px" }}>
                    <table className="mandi-table">
                      <thead>
                        <tr>
                          <th>Crop</th>
                          <th>Mandi</th>
                          <th>₹/qtl</th>
                          <th>Demand</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr><td>🌾 Paddy</td><td>Vijayawada</td><td>₹2,183</td><td><span className="demand-badge d-high">High</span></td></tr>
                        <tr><td>🌶️ Chilli</td><td>Guntur</td><td>₹8,200</td><td><span className="demand-badge d-high">High</span></td></tr>
                        <tr><td>🌿 Cotton</td><td>Nandyal</td><td>₹6,700</td><td><span className="demand-badge d-med">Med</span></td></tr>
                        <tr><td>🌽 Maize</td><td>Krishna</td><td>₹1,850</td><td><span className="demand-badge d-med">Med</span></td></tr>
                        <tr><td>🫘 Groundnut</td><td>Kurnool</td><td>₹5,400</td><td><span className="demand-badge d-high">High</span></td></tr>
                        <tr><td>🌻 Sunflower</td><td>Anantapur</td><td>₹4,100</td><td><span className="demand-badge d-low">Low</span></td></tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: SAVED */}
          {activeTab === "saved" && (
            <div className="page-section active">
              <div className="sec-header anim">
                <div>
                  <h1 className="sec-title">❤️ Saved Crops</h1>
                  <p className="sec-sub">Your favourites for quick access</p>
                </div>
                <button className="btn btn-secondary btn-sm" onClick={() => handleSwitchTab("compare")}>⚖️ Compare Saved</button>
              </div>
              <div className="crops-grid anim d1">
                {saved.size === 0 ? (
                  <div className="empty" style={{ gridColumn: "1/-1" }}>
                    <div className="ei">❤️</div>
                    <h3>No Saved Crops</h3>
                    <p>Click ❤️ on any crop card to save it here.</p>
                  </div>
                ) : (
                  [...saved].map((id) => {
                    const c = CROPS.find((x) => x.id === id);
                    return c ? renderCard(c, false, 0) : null;
                  })
                )}
              </div>
            </div>
          )}

          {/* TAB: COMPARE */}
          {activeTab === "compare" && (
            <div className="page-section active">
              <div className="sec-header anim">
                <div>
                  <h1 className="sec-title">⚖️ Compare Crops</h1>
                  <p className="sec-sub">Side-by-side analysis for smart decisions</p>
                </div>
              </div>
              <div className="anim d1">
                <div className="empty">
                  <div className="ei">⚖️</div>
                  <h3>Select Crops to Compare</h3>
                  <p>Go to recommendations, then click ➕ on crop cards to add to comparison.</p>
                  <button className="btn btn-primary" style={{ marginTop: "14px" }} onClick={() => handleSwitchTab("recommend")}>
                    Browse Crops
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* DETAIL PANEL */}
      <div className={`overlay ${detailCropId ? "open" : ""}`} onClick={closeDetail}></div>
      <div className={`detail-panel ${detailCropId ? "open" : ""}`}>
        {detailCrop && (
          <>
            <div className="d-hero">
              <div className="d-hero-top">
                <div className="d-emoji">{detailCrop.emoji}</div>
                <div>
                  <div className="d-name">{detailCrop.name}</div>
                  <div className="d-te">{detailCrop.te}</div>
                  <div style={{ display: "flex", gap: "5px", marginTop: "7px" }}>
                    {detailCrop.tags.map((t) =>
                      t === "best" ? (
                        <span key={t} className="tag tag-best">⭐ Best Match</span>
                      ) : t === "profit" ? (
                        <span key={t} className="tag tag-profit">💰 High Profit</span>
                      ) : t === "risk" ? (
                        <span key={t} className="tag tag-risk">🛡️ Low Risk</span>
                      ) : null
                    )}
                  </div>
                </div>
                <button className="d-close" onClick={closeDetail}>✕</button>
              </div>
              <p className="d-desc">{detailCrop.desc}</p>
            </div>
            
            <div className="d-body">
              <div>
                <div className="d-sec-title">Key Stats</div>
                <div className="stats-row">
                  <div className="stat-box">
                    <div className="stat-val">{detailCrop.yield}</div>
                    <div className="stat-lbl">Expected Yield</div>
                  </div>
                  <div className="stat-box">
                    <div className="stat-val">{detailCrop.dur}</div>
                    <div className="stat-lbl">Duration</div>
                  </div>
                  <div className="stat-box">
                    <div className="stat-val">₹{detailCrop.avgPrice}</div>
                    <div className="stat-lbl">Avg Price/qtl</div>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="d-sec-title">Ideal Growing Conditions</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                  <div className="stat-box" style={{ textAlign: "left" }}>
                    <div style={{ fontSize: ".68rem", color: "var(--s400)", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".04em", marginBottom: "3px" }}>🪨 Soil</div>
                    <div style={{ fontSize: ".82rem", fontWeight: 600, color: "var(--s800)" }}>{detailCrop.idealSoil}</div>
                  </div>
                  <div className="stat-box" style={{ textAlign: "left" }}>
                    <div style={{ fontSize: ".68rem", color: "var(--s400)", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".04em", marginBottom: "3px" }}>🌡️ Climate</div>
                    <div style={{ fontSize: ".82rem", fontWeight: 600, color: "var(--s800)" }}>{detailCrop.idealClimate}</div>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="d-sec-title">Growth Stages</div>
                <div className="growth-tl">
                  {detailCrop.stages.map((s, idx) => (
                    <div key={idx} className="stage">
                      <div className={`stage-dot ${s.on ? "" : "off"}`}>{s.ic}</div>
                      <div className="stage-name">{s.n}</div>
                      <div className="stage-days">{s.d}</div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <div className="d-sec-title">Fertilizer Recommendations</div>
                <div className="fert-grid">
                  {detailCrop.ferts.map((f, idx) => (
                    <div key={idx} className="fert-item">
                      <div className="fert-name">🧪 {f.n}</div>
                      <div className="fert-dose">{f.dose}</div>
                      <span className="fert-timing">{f.t}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <div className="d-sec-title">💧 Water Requirements</div>
                {detailCrop.water_req.map((w, idx) => (
                  <div key={idx} className="prog-item">
                    <div className="prog-header">
                      <span className="prog-lbl">{w.l}</span>
                      <span className="prog-val">{w.v}%</span>
                    </div>
                    <div className="prog-bar">
                      <div className={`prog-fill ${w.v > 85 ? "sky" : ""}`} style={{ width: `${w.v}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div>
                <div className="d-sec-title">📈 Expected Profit Timeline</div>
                <div className="chart-wrap">
                  <canvas ref={pChartRef}></canvas>
                </div>
              </div>
              
              <div>
                <div className="d-sec-title">🐛 Pest &amp; Disease Guide</div>
                <div className="pest-grid">
                  {detailCrop.pests.map((p, idx) => (
                    <div key={idx} className="pest-card">
                      <div className="pest-ic">{p.ic}</div>
                      <div>
                        <div className="pest-name">{p.n}</div>
                        <div className="pest-sym">🔍 {p.sym}</div>
                        <div className="pest-trt">💊 {p.trt}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: "10px" }}>
                  <button className="btn btn-purple btn-sm">🤖 AI Disease Detection (Coming Soon)</button>
                </div>
              </div>
              
              <div>
                <div className="d-sec-title">💰 Market Analysis</div>
                <div className="market-grid">
                  <div className="mkt-stat">
                    <div className="mkt-val">₹{detailCrop.minPrice}–{detailCrop.maxPrice}</div>
                    <div className="mkt-lbl">Price Range (₹/qtl)</div>
                    <div className="mkt-chg up">↑ Current season data</div>
                  </div>
                  <div className="mkt-stat">
                    <div className="mkt-val">
                      <span className={`demand-badge ${detailCrop.demand === "High" ? "d-high" : detailCrop.demand === "Medium" ? "d-med" : "d-low"}`}>
                        {detailCrop.demand}
                      </span>
                    </div>
                    <div className="mkt-lbl">Market Demand</div>
                  </div>
                </div>
                <div style={{ background: "var(--g50)", border: "1px solid var(--g200)", borderRadius: "var(--r-md)", padding: "11px", fontSize: ".8rem", color: "var(--g800)", lineHeight: 1.6 }}>
                  📊 {detailCrop.mktNote}
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* COMPARE BAR */}
      <div className={`cmp-bar ${compare.size > 0 ? "on" : ""}`}>
        <span style={{ fontSize: ".78rem", fontWeight: 600, whiteSpace: "nowrap" }}>⚖️ Comparing:</span>
        <div className="cmp-chips">
          {[...compare].map((id) => {
            const c = CROPS.find((x) => x.id === id);
            if (!c) return null;
            return (
              <div key={id} className="cmp-chip">
                {c.emoji} {c.name.split("(")[0].trim()}
                <span className="cmp-rm" onClick={(e) => toggleCompare(id, e)}>✕</span>
              </div>
            );
          })}
        </div>
        <button className="btn btn-primary btn-sm" onClick={openCmpModal}>Compare Now</button>
        <button
          className="btn btn-ghost btn-sm"
          style={{ background: "rgba(255,255,255,.08)", borderColor: "rgba(255,255,255,.15)", color: "rgba(255,255,255,.7)" }}
          onClick={clearCompare}
        >
          Clear
        </button>
      </div>

      {/* COMPARE MODAL */}
      <div className={`modal-ov ${showCmpModal ? "open" : ""}`} onClick={(e) => { if (e.target === e.currentTarget) closeCmpModal(); }}>
        <div className="modal-box">
          <div className="modal-header">
            <span className="modal-title">⚖️ Crop Comparison</span>
            <button className="d-close" onClick={closeCmpModal}>✕</button>
          </div>
          <div className="modal-body">
            <table className="cmp-table">
              <thead>
                <tr>
                  <th>Feature</th>
                  {compareCrops.map((c: any) => (
                    <th key={c.id}>{c.emoji} {c.name.split("(")[0].trim()}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Yield</td>
                  {compareCrops.map((c: any) => <td key={c.id}>{c.yield}</td>)}
                </tr>
                <tr>
                  <td>Duration</td>
                  {compareCrops.map((c: any) => <td key={c.id}>{c.dur}</td>)}
                </tr>
                <tr>
                  <td>Ideal Soil</td>
                  {compareCrops.map((c: any) => <td key={c.id}>{c.idealSoil}</td>)}
                </tr>
                <tr>
                  <td>Season</td>
                  {compareCrops.map((c: any) => <td key={c.id}>{c.seasons.join(", ")}</td>)}
                </tr>
                <tr>
                  <td>Water Need</td>
                  {compareCrops.map((c: any) => <td key={c.id}>{c.water.join(", ")}</td>)}
                </tr>
                <tr>
                  <td>Market Price</td>
                  {compareCrops.map((c: any) => <td key={c.id}>₹{c.avgPrice}/qtl</td>)}
                </tr>
                <tr>
                  <td>Market Demand</td>
                  {compareCrops.map((c: any) => <td key={c.id}>{c.demand}</td>)}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className={`toast ${toastMsg ? "show" : ""}`}>{toastMsg}</div>
    </div>
  );
}

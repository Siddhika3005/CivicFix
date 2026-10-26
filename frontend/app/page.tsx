"use client";

import Link from "next/link";
import { useState, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";

const FILTERS = [
  { label: "All Incidents", value: "all" },
  { label: "Roadway", value: "roadway" },
  { label: "Drainage", value: "drainage" },
  { label: "Electrical", value: "electrical" },
  { label: "Structural", value: "structural" },
];

const INCIDENTS = [
  {
    id: "CF-9042",
    category: "structural",
    location: "Chandigarh [30.7333 N, 76.7794 E] / SEC-01",
    status: "Critical hazard",
    title: "Structural Wall Displacement at Sector 17 Vent Gate",
    description:
      "Sub-surface aggregate suspected beneath primary ventilation gate assembly.",
    attestations: 128,
    image:
      "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "CF-1108",
    category: "drainage",
    location: "New Delhi [28.6139 N, 77.2090 E] / SEC-05",
    status: "Inspection queued",
    title: "Storm Drain Silt Blockage along Ring Road",
    description:
      "Heavy silt and urban sediment restricting hydraulic discharge capacity to 22%.",
    attestations: 54,
    image:
      "https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "CF-4820",
    category: "roadway",
    location: "Mumbai [19.0760 N, 72.8777 E] / SEC-03",
    status: "Critical hazard",
    title: "Asphalt Shear Fissure on Marine Drive East",
    description:
      "Linear lateral crack extending 14 meters across an eastbound vehicular lane.",
    attestations: 92,
    image:
      "https://images.unsplash.com/photo-1517732306149-e8f829eb588a?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "CF-7731",
    category: "electrical",
    location: "Bengaluru [12.9716 N, 77.5946 E] / SEC-02",
    status: "In triage",
    title: "Pedestrian Luminaire Failure on MG Road Crossing",
    description:
      "Three overhead public luminaires have been non-operational since 20:00 IST.",
    attestations: 31,
    image:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "CF-1092",
    category: "drainage",
    location: "Kolkata [22.5726 N, 88.3639 E] / SEC-08",
    status: "Critical hazard",
    title: "Hydraulic Culvert Overflow at Hooghly Gate",
    description:
      "Debris entanglement preventing automated sluice door opening sequence.",
    attestations: 146,
    image:
      "https://images.unsplash.com/photo-1520637836862-4d197d17c44a?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "CF-3301",
    category: "structural",
    location: "Pune [18.5204 N, 73.8567 E] / SEC-02",
    status: "Repaired / verified",
    title: "Seismic Joint Displacement at Station Footbridge",
    description:
      "Post-tremor inspection confirmed micro-gap closure. Dampener replaced.",
    attestations: 210,
    image:
      "https://images.unsplash.com/photo-1534430480872-3498386e7856?auto=format&fit=crop&w=900&q=85",
  },
];

const METRICS = [
  ["Total anomalies", "1,420", "Historical archive cumulative log"],
  ["Pending dispatch", "38", "Active field teams; 14 units deployed"],
  ["Resolved / archived", "1,382", "97.3% resolution rate this quarter"],
  ["Avg clearance time", "4.2d", "Variance within nominal tolerance"],
];

export default function Dashboard() {
  const [activeFilter, setActiveFilter] = useState("all");
  const router = useRouter();
  const isAuthenticated = useSyncExternalStore(
    (onStoreChange) => {
      window.addEventListener("civicfix-auth-changed", onStoreChange);
      return () =>
        window.removeEventListener("civicfix-auth-changed", onStoreChange);
    },
    () =>
      Boolean(
        window.sessionStorage.getItem("civicfix_access_token") ||
        window.localStorage.getItem("civicfix_access_token"),
      ),
    () => false,
  );
  const visibleIncidents = INCIDENTS.filter(
    (incident) => activeFilter === "all" || incident.category === activeFilter,
  );

  function handleLogout() {
    window.sessionStorage.removeItem("civicfix_access_token");
    window.localStorage.removeItem("civicfix_access_token");
    window.dispatchEvent(new Event("civicfix-auth-changed"));
    router.push("/login");
  }

  return (
    <div className="min-h-screen bg-[#f7f7f4] text-[#171717] font-mono selection:bg-[#a52727] selection:text-white">
      <header className="border-b border-[#d7d7d2] bg-[#fbfbf9] px-5 py-3 sm:px-8">
        <nav className="mx-auto flex max-w-360 items-center justify-between text-[9px] uppercase tracking-[0.16em]">
          <div className="flex items-center gap-2">
            <span className="font-serif text-[13px] tracking-normal">
              CIVICFIX
            </span>
            <span className="hidden text-[8px] text-[#777] sm:inline">
              National Urban Infrastructure Bureau // India
            </span>
          </div>
          <div className="flex items-center gap-4 sm:gap-8">
            <Link href="/" className="border-b border-black pb-1">
              Dashboard
            </Link>
            {isAuthenticated ? (
              <button
                type="button"
                onClick={handleLogout}
                className="hover:text-[#a52727]"
              >
                Logout
              </button>
            ) : (
              <Link href="/login" className="hover:text-[#a52727]">
                Login
              </Link>
            )}
            <span className="h-4 w-4 rounded-full bg-black text-center text-[8px] leading-4 text-white">
              ◉
            </span>
          </div>
        </nav>
      </header>
      <main className="mx-auto max-w-360 px-5 py-8 sm:px-8 lg:py-12">
        <div className="mb-2 flex justify-between text-[8px] uppercase tracking-[0.2em] text-[#888883]">
          <span>National infrastructure telemetry // India</span>
          <span className="hidden sm:inline">Registry protocol v4</span>
        </div>
        <div className="mb-7 flex flex-col justify-between gap-4 border-b border-[#cfcfc9] pb-5 lg:flex-row lg:items-end">
          <h1 className="font-serif text-3xl tracking-[-0.04em] sm:text-5xl">
            CivicFix Command &amp; Issue Overview
          </h1>
          <div className="text-[8px] uppercase tracking-[0.13em] leading-5 text-[#777] lg:text-right">
            <p>
              <span className="mr-1 inline-block h-1 w-1 bg-[#a52727]" />
              2026-10-27 23:56:52 IST
            </p>
            <p>Synchronised with municipal dispatch</p>
          </div>
        </div>
        <div className="mb-7 flex flex-col justify-between gap-3 border-b border-[#d7d7d2] pb-4 text-[8px] uppercase tracking-[0.16em] sm:flex-row sm:items-center">
          <div className="flex flex-wrap gap-1">
            {FILTERS.map((filter) => {
              const selected = activeFilter === filter.value;
              return (
                <button
                  key={filter.value}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setActiveFilter(filter.value)}
                  className={`border px-3 py-1.5 transition-colors ${selected ? "border-black bg-black text-white" : "border-[#deded9] bg-[#fafaf8] text-[#777] hover:border-black hover:text-black"}`}
                >
                  {filter.label}
                </button>
              );
            })}
          </div>
          <div className="flex gap-4 text-[#777]">
            <span>Index: chronological // desc</span>
            <span className="hidden sm:inline">Autonomous audit on</span>
          </div>
        </div>
        <section className="mb-8 grid grid-cols-2 border-y border-[#d7d7d2] lg:grid-cols-4">
          {METRICS.map(([label, value, detail], index) => (
            <div
              key={label}
              className={`border-[#e1e1dc] px-4 py-4 sm:px-5 ${index > 0 ? "border-l" : ""} ${index > 1 ? "border-t lg:border-t-0" : ""}`}
            >
              <p className="mb-3 text-[8px] uppercase tracking-[0.16em] text-[#878782]">
                {label}
              </p>
              <p
                className={`font-serif text-3xl tracking-[-0.04em] sm:text-4xl ${index === 1 ? "text-[#b52e2e]" : ""}`}
              >
                {value}
              </p>
              <p className="mt-1 text-[8px] leading-4 text-[#777]">{detail}</p>
            </div>
          ))}
        </section>
        <div className="mb-4 flex items-center justify-between text-[8px] uppercase tracking-[0.18em]">
          <span>Verified field chronicle / Public infrastructure records</span>
          <span className="text-[#777]">
            Showing {visibleIncidents.length} verified records
          </span>
        </div>
        <section className="grid grid-cols-1 gap-x-7 gap-y-7 sm:grid-cols-2 lg:grid-cols-3">
          {visibleIncidents.map((incident) => (
            <article
              key={incident.id}
              className="group flex min-w-0 flex-col border border-[#deded9] bg-[#fafaf8]"
            >
              <div className="relative h-40 overflow-hidden border-b border-[#deded9] bg-[#363636] sm:h-44">
                <div
                  className="absolute inset-0 bg-cover bg-center grayscale-[0.2] transition-transform duration-500 group-hover:scale-105"
                  style={{ backgroundImage: `url(${incident.image})` }}
                />
                <span
                  className={`absolute left-2 top-2 border px-1.5 py-1 text-[7px] uppercase tracking-[0.14em] ${incident.status.includes("Critical") ? "border-[#c24040] bg-[#f6e1de] text-[#a52727]" : "border-[#bbbdb8] bg-[#f3f3ef] text-[#444]"}`}
                >
                  {incident.status}
                </span>
                <span className="absolute bottom-2 right-2 bg-black/70 px-1.5 py-1 text-[7px] text-white">
                  IMG // {incident.id}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-3">
                <p className="mb-2 text-[7px] uppercase leading-3 tracking-[0.12em] text-[#777]">
                  {incident.location}
                </p>
                <h2 className="font-serif text-[16px] leading-[1.15] tracking-[-0.02em]">
                  {incident.title}
                </h2>
                <p className="mt-2 line-clamp-2 text-[9px] leading-4 text-[#666]">
                  {incident.description}
                </p>
                <div className="mt-5 flex items-center justify-between border-t border-[#e3e3de] pt-2 text-[7px] uppercase tracking-[0.12em] text-[#777]">
                  <span>{incident.attestations} attestations</span>
                  <button
                    type="button"
                    className="font-bold text-black hover:text-[#a52727]"
                  >
                    Examine telemetry [-]
                  </button>
                </div>
              </div>
            </article>
          ))}
        </section>
        <section className="mt-8 grid grid-cols-1 gap-4 border-t border-[#d7d7d2] pt-4 md:grid-cols-3">
          <div className="border border-[#e4e4df] p-3 text-[8px] leading-4">
            <strong className="block text-[7px] uppercase tracking-[0.14em] text-[#a52727]">
              Municipal accord act 72-B
            </strong>
            Every entry is tied to ward maintenance logs and immutable municipal
            ledger blocks.
          </div>
          <div className="border border-[#e4e4df] p-3 text-[8px] leading-4">
            <strong className="block text-[7px] uppercase tracking-[0.14em]">
              Field sensor consensus
            </strong>
            Citizen attestations require cross-validation by at least 2 sensor
            nodes within 500m before dispatch activation.
          </div>
          <div className="border border-[#e4e4df] p-3 text-[8px] leading-4 text-[#777]">
            <strong className="block text-[7px] uppercase tracking-[0.14em] text-[#a52727]">
              Public archive access · dispatch status: normal
            </strong>
            <span className="mt-3 block">
              Dispatch latency T-0: 0.18s · batch committed to national ledger
            </span>
          </div>
        </section>
      </main>
      <footer className="border-t border-[#d7d7d2] bg-[#f0f0ec] px-5 py-8 sm:px-8">
        <div className="mx-auto grid max-w-360 gap-8 text-[8px] leading-4 text-[#666] sm:grid-cols-3">
          <div>
            <p className="mb-2 font-serif text-[14px] text-black">
              CIVICFIX NATIONAL INFRASTRUCTURE RECORD
            </p>
            <p>
              Public infrastructure accountability, incident monitoring, and
              municipal dispatch coordination across India.
            </p>
          </div>
          <div>
            <p className="mb-2 uppercase tracking-[0.16em] text-black">
              Ledger modules
            </p>
            <p>
              Incident dispatch
              <br />
              Cartographic grid
              <br />
              Public chronicle
              <br />
              Municipal index
            </p>
          </div>
          <div>
            <p className="mb-2 uppercase tracking-[0.16em] text-black">
              Telemetry data
            </p>
            <p>
              Server // India-01
              <br />
              Latency // 14ms active
              <br />
              Integrity // SHA-256 verified
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

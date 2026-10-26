"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberSession, setRememberSession] = useState(false);
  const [message, setMessage] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000"}/api/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            password,
            remember_session: rememberSession,
          }),
        },
      );

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      const data: { access_token: string } = await response.json();
      window.sessionStorage.setItem("civicfix_access_token", data.access_token);
      if (rememberSession) {
        window.localStorage.setItem("civicfix_access_token", data.access_token);
      }
      setAuthenticated(true);
      setMessage(
        rememberSession
          ? "Authenticated session retained for this browser."
          : "Dispatch access granted.",
      );
    } catch {
      setAuthenticated(false);
      setMessage(
        "Unable to authenticate. Check the CivicFix API or verify your administrator credentials.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#111217] p-1.5 font-mono text-[#191919] selection:bg-[#6655dc] selection:text-white sm:p-2">
      <div className="flex min-h-[calc(100vh-12px)] flex-col border-4 border-[#6c5de5] bg-[#f7f7f5] sm:min-h-[calc(100vh-16px)]">
        <header className="mx-auto flex w-full max-w-317.5 items-center justify-between border-b border-[#d6d6d2] px-5 py-5 sm:px-10 lg:py-7">
          <div className="flex items-baseline gap-3">
            <span className="font-serif text-xl tracking-tight sm:text-2xl">
              CIVICFIX
            </span>
            <span className="hidden text-[8px] uppercase tracking-[0.18em] text-[#777] sm:inline">
              National Urban Infrastructure Bureau // India
            </span>
          </div>
          <div className="flex items-center gap-4 text-[8px] uppercase tracking-[0.14em] text-[#666] sm:gap-8">
            <span>
              <i className="mr-2 inline-block h-1.5 w-1.5 bg-[#bb3838]" />
              Gateway: active
            </span>
            <span className="hidden sm:inline">System ver 4.19.8-IN</span>
            <span className="hidden md:inline">Terminal ref: #TK-CHD-09</span>
          </div>
        </header>

        <section className="mx-auto grid w-full max-w-317.5 flex-1 border-x border-b border-[#d6d6d2] lg:grid-cols-2">
          <div className="flex flex-col px-8 py-8 sm:px-12 sm:py-12 lg:px-14 lg:py-14">
            <div className="mb-8 flex items-center justify-between border-b border-[#e2e2de] pb-5 text-[8px] uppercase tracking-[0.16em] text-[#777]">
              <span className="border border-black px-2 py-1 text-[7px] text-black">
                AUTH. SEC-04
              </span>
              <span className="text-[#b23737]">Clearance: restricted</span>
              <span className="hidden sm:inline">Chandigarh-01</span>
            </div>
            <div className="max-w-137.5">
              <p className="mb-2 text-base font-bold tracking-tight sm:text-lg">
                Citizen Registry / Officer Login
              </p>
              <h1 className="font-serif text-3xl leading-tight tracking-[-0.03em] sm:text-4xl">
                Civic Registry Terminal Access
              </h1>
              <p className="mt-4 max-w-117.5 text-[10px] leading-5 text-[#626262]">
                Enter municipal credentials or citizen cryptographic passkey to
                access the CivicFix telemetry, regional sensor grids, and rapid
                incident dispatch logs.
              </p>
            </div>
            <form onSubmit={handleSubmit} className="mt-8 max-w-130">
              <label
                htmlFor="email"
                className="mb-2 flex justify-between text-[8px] uppercase tracking-[0.14em] text-[#555]"
              >
                <span>Bureau email or ID // User ID</span>
                <span>Req: UTF-8</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="username"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="e.g. admin@civicfix.com"
                className="mb-6 h-10 w-full border border-[#bdbdb9] bg-[#fbfbfa] px-3 text-[10px] outline-none transition-colors placeholder:text-[#b6b6b2] focus:border-black"
                required
              />
              <label
                htmlFor="password"
                className="mb-2 flex justify-between text-[8px] uppercase tracking-[0.14em] text-[#555]"
              >
                <span>Cryptographic passkey // Password</span>
                <button type="button" className="text-[#999] hover:text-black">
                  Forgot passkey?
                </button>
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="••••••••••••••••"
                className="h-10 w-full border border-[#bdbdb9] bg-[#fbfbfa] px-3 text-[10px] outline-none transition-colors placeholder:text-[#b6b6b2] focus:border-black"
                required
              />
              <label className="mt-5 flex cursor-pointer items-start gap-2 text-[10px] leading-4 text-[#626262]">
                <input
                  type="checkbox"
                  checked={rememberSession}
                  onChange={(event) => setRememberSession(event.target.checked)}
                  className="mt-0.5 h-3 w-3 accent-black"
                />{" "}
                <span>
                  Preserve authenticated token across CivicFix relay nodes
                  <br className="hidden sm:inline" /> (24-hour cycle)
                </span>
              </label>
              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-7 h-10 w-full bg-black text-[9px] uppercase tracking-[0.18em] text-white transition-colors hover:bg-[#6c5de5] disabled:cursor-wait disabled:opacity-60"
              >
                {isSubmitting
                  ? "Authenticating..."
                  : "Authenticate dispatch access"}{" "}
                <span className="ml-2">→</span>
              </button>
              <button
                type="button"
                className="mt-2 h-9 w-full border border-[#bdbdb9] bg-transparent text-[9px] uppercase tracking-[0.16em] transition-colors hover:border-black"
              >
                Register citizen telemetry key
              </button>
            </form>
            {message && (
              <p
                role="status"
                className={`mt-5 max-w-130 border-l-2 px-3 py-2 text-[9px] leading-4 ${authenticated ? "border-[#37764c] bg-[#edf6ee] text-[#27653b]" : "border-[#b23737] bg-[#fbefed] text-[#9c3030]"}`}
              >
                {message}
              </p>
            )}
            {authenticated && (
              <Link
                href="/"
                className="mt-3 block max-w-130 text-center text-[9px] uppercase tracking-[0.16em] underline underline-offset-4 hover:text-[#6c5de5]"
              >
                Continue to CivicFix dashboard →
              </Link>
            )}
            <div className="mt-auto grid max-w-130 grid-cols-2 gap-4 border-t border-[#e2e2de] pt-6 text-[8px] uppercase tracking-[0.12em] text-[#888]">
              <span>
                Security clearance: L2-general
                <br />
                Host node: CHD-UTK-01.CIVICFIX.NET
              </span>
              <span className="text-right">
                Protocol: ED25519-SHA512
                <br />
                <b className="font-normal text-[#b23737]">Encrypted stream</b>
              </span>
            </div>
          </div>

          <aside className="border-t border-[#d6d6d2] bg-[#f2f2ef] px-8 py-8 sm:px-12 sm:py-12 lg:border-l lg:border-t-0 lg:px-14 lg:py-14">
            <div className="flex items-center justify-between border-b border-[#deded9] pb-5 text-[8px] uppercase tracking-[0.16em] text-[#555]">
              <span>Visual surveillance feed</span>
              <span className="text-[#888]">Feed CH-08 // India live</span>
            </div>
            <div
              className="relative mt-12 h-70 overflow-hidden bg-[#26343e] sm:h-90 lg:h-97.5"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1200&q=85')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 bg-linear-to-t from-black/75 via-transparent to-black/10" />
              <span className="absolute left-3 top-3 bg-black/75 px-2 py-1 text-[8px] uppercase tracking-[0.12em] text-white">
                CAM // METRO-NORTH-09
              </span>
              <span className="absolute right-3 top-3 bg-black/75 px-2 py-1 text-[8px] uppercase tracking-[0.12em] text-white">
                <i className="mr-1 inline-block h-1.5 w-1.5 bg-[#c53737]" />
                Live feed
              </span>
              <div className="absolute inset-x-3 bottom-3 grid grid-cols-2 gap-3 border-t border-white/40 pt-2 text-[8px] uppercase tracking-[0.12em] text-white">
                <span>
                  Surveillance coordinates
                  <br />
                  <b className="font-normal">Lat 30.7333 N // Lon 76.7794 E</b>
                </span>
                <span className="text-right">
                  Weather condition
                  <br />
                  <b className="font-normal">
                    Light haze // 24.1° C // Wind 8.2 km/h
                  </b>
                </span>
              </div>
            </div>
            <div className="mt-12 border-t border-[#deded9] pt-3 text-[9px] leading-5 text-[#666]">
              <div className="flex justify-between text-[8px] uppercase tracking-[0.14em]">
                <span>Plate 09 // Chandigarh urban link</span>
                <span>Metropolitan observation twilight</span>
              </div>
              <p className="mt-3">
                High-definition optical server feed verified against regional
                node CF-44. Sensors monitor structural roadbed vibration,
                pedestrian density, and stormwater drain outflow in real-time.
              </p>
            </div>
          </aside>
        </section>
        <footer className="mx-auto flex w-full max-w-317.5 justify-between gap-5 px-0 py-5 text-[7px] uppercase tracking-[0.14em] text-[#888] sm:px-0 sm:py-7">
          <span>
            © 2026 National Urban Infrastructure Bureau · Civic telemetry system
          </span>
          <span className="hidden gap-6 sm:flex">
            <span>Accessibility policy</span>
            <span>Crypto specifications</span>
            <span>Incident hotline</span>
          </span>
        </footer>
      </div>
    </main>
  );
}

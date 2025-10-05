import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { geoSearch } from "../../api/openMeteo";
import styles from "./home.module.css";

export function HomePage() {
  const nav = useNavigate();
  const [q, setQ] = useState("");
  const [results, setResults] = useState<
    { name: string; subtitle: string; lat: number; lon: number }[]
  >([]);

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function onSearch(v: string) {
    setQ(v);
    if (!v.trim()) return setResults([]);
    try {
      setLoading(true);
      setErr(null);
      const data = await geoSearch(v.trim());
      const list = (data.results ?? []).map((r) => ({
        name: r.name,
        subtitle: [r.admin1, r.country].filter(Boolean).join(", "),
        lat: r.latitude,
        lon: r.longitude,
      }));
      setResults(list);
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : "Search failed");
    } finally {
      setLoading(false);
    }
  }


  function pick(lat: number, lon: number, label: string) {
    nav(`/results?lat=${lat}&lon=${lon}&name=${encodeURIComponent(label)}`);
  }


  function useMyLocation() {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        nav(`/results?lat=${latitude}&lon=${longitude}&name=My%20location`);
      },
      () => alert("Could not get location")
    );
  }

  
  return (
    <div className={styles.page}>
      <h1>Clean‑Air Day Finder</h1>
      <p>Find the best outdoor windows based on air quality and weather.</p>
      <div className={styles.searchBox}>
        <input
          value={q}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Search a city or area (e.g., Baghdad)"
        />
        <button onClick={useMyLocation}>Use my location</button>
      </div>
      {loading && <div className={styles.hint}>Searching…</div>}
      {err && <div className={styles.error}>{err}</div>}
      <ul className={styles.results}>
        {results.map((r, i) => (
          <li
            key={i}
            onClick={() =>
              pick(
                r.lat,
                r.lon,
                `${r.name}${r.subtitle ? " • " + r.subtitle : ""}`
              )
            }
          >
            <div className={styles.name}>{r.name}</div>
            <div className={styles.sub}>{r.subtitle}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getAirQuality, getWeather } from "../../api/openMeteo"
import { scoreHour, contiguousWindows, type HourData } from "../../lib/green"
import { format, parseISO } from "date-fns"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend }
  from "recharts";
import styles from "./results.module.css";

function useQueryParams() {
   const location = useLocation();
  const search = location.search;

   const p = new URLSearchParams(search);
  const lat = parseFloat(p.get("lat") || "");
  const lon = parseFloat(p.get("lon") || "");
  const name = p.get("name") || "Selected Location";
  return { lat, lon, name };
}


export const ResultsPage = () => {

  const { lat, lon, name } = useQueryParams();

  const aq = useQuery({
    queryKey: ["aq", lat, lon],
    queryFn: () => getAirQuality(lat, lon),
    enabled: Number.isFinite(lat) && Number.isFinite(lon)
  });

  const wx = useQuery({
    queryKey: ["wx", lat, lon],
    queryFn: () => getWeather(lat, lon),
    enabled: Number.isFinite(lat) && Number.isFinite(lon)
  });


  const combined = useMemo(() => {
    if (!aq.data || !wx.data) return [] as HourData[];
    const t = wx.data.hourly.time;
    return t.map((time, i) => ({
      time,
      pm2_5: aq.data!.hourly.pm2_5[i] ?? null,
      temperature_2m: wx.data!.hourly.temperature_2m[i] ?? null,
      wind_speed_10m: wx.data!.hourly.wind_speed_10m[i] ?? null
    }))
  }, [aq.data, wx.data])


  const scored = useMemo(() => combined.map(scoreHour), [combined]);
  const windows = useMemo(() => contiguousWindows(scored).sort((a, b) => b.length - a.length).slice(0, 3), [scored]);

  if (aq.isLoading || wx.isLoading) return <div className={styles.page}> loading...</div>
  if (aq.isError || wx.isError) return <div className={styles.page}> Failed to load data</div>

  return (
    <div className={styles.page}>
      <h2>{name}</h2>
      <p className={styles.sub}>Top green windows (next 48–72h):</p>
      <ul className={styles.windows}>
        {windows.length === 0 && <li>No ideal windows; consider a mask or
          indoor activity.</li>}
        {windows.map((w, i) => (
          <li key={i}>
            {format(parseISO(w.start), "EEE HH:mm")} → {format(parseISO(w.end),
              "EEE HH:mm")} · {w.length}h
          </li>
        ))}
      </ul>
      <div className={styles.card}>
        <h3>Hourly conditions</h3>
        <div className={styles.legendRow}>
          <span className={styles.goodDot} /> Good · <span
            className={styles.fairDot} /> Fair · <span className={styles.poorDot} /> Poor
        </div>
        <div className={styles.chartWrap}>
          <ResponsiveContainer width="100%" height={360}>
            <LineChart data={scored.map(h => ({
              time: format(parseISO(h.time), "EEE HH:mm"),
              pm2_5: h.pm2_5 ?? null,
              temperature: h.temperature_2m ?? null
            }))}>
              <XAxis dataKey="time" minTickGap={24} />
              <YAxis yAxisId="left" label={{
                value: "PM2.5 (μg/m³)", angle:
                  -90, position: "insideLeft"
              }} />
              <YAxis yAxisId="right" orientation="right" label={{
                value: "Temp(°C)", angle: 90, position: "insideRight" }} />
              <Tooltip />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="pm2_5" dot={false}
                name="PM2.5" />
              <Line yAxisId="right" type="monotone" dataKey="temperature"
                dot={false} name="Temperature" />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className={styles.grid}>
          {scored.slice(0, 24).map((h, i) => (
            <div key={i} className={`${styles.tag} ${h.label === "Good" ?
              styles.good : h.label === "Fair" ? styles.fair : styles.poor}`}>
              {format(parseISO(h.time), "HH:mm")} · {h.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
import { AirQualitySchema, WeatherSchema, GeoSearchSchema, type AirQuality, type Weather, type GeoSearch } from "./schema";

export async function  getAirQuality(lat: number, lon:number): Promise<AirQuality> {
    const url = new URL("https://air-quality-api.open-meteo.com/v1/air-quality");
    url.searchParams.set("latitude", String(lat));
    url.searchParams.set("longitude", String(lon));
    url.searchParams.set("hourly","pm2_5,pm10,ozone");
    const res = await fetch(url.toString());
    
    if(!res.ok) throw new Error("Failed to fetch air quality");
    return AirQualitySchema.parse(await res.json())
}

export async function getWeather(lat:number, lon: number): Promise<Weather>{
    const url = new URL("https://api.open-meteo.com/v1/forecast");
   url.searchParams.set("latitude", String(lat));
    url.searchParams.set("longitude", String(lon));
    url.searchParams.set("hourly"," temperature_2m, relative_humidity_2m, wind_speed_10m");
    const res = await fetch (url.toString());
    if (!res.ok) throw new Error("Failed to fetch Weather")
        return WeatherSchema.parse(await res.json())
}

export async function geoSearch(q: string): Promise<GeoSearch>{
    const url = new URL("https://geocoding-api.open-meteo.com/v1/search");
    url.searchParams.set("name",q);
    url.searchParams.set("count","5");
    url.searchParams.set("language","en");
    const res = await fetch(url.toString());
    if(!res.ok) throw new Error("Geocoding Failed");
    return GeoSearchSchema.parse(await res.json())
    
}
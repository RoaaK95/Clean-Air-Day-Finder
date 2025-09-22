import {optional, z} from "zod";

export const AirQualitySchema = z.object({
    hourly:z.object({
        time:z.array(z.string()),
        pm2_5: z.array(z.number().nullable()), //fine particulate matter (<2.5 µm).
        pm10: z.array(z.number().nullable()), //coarse particulate matter (<10 µm)
        ozone: z.array(z.number().nullable()) //ground-level ozone concentration.
    })
});
export type AirQuality = z.infer<typeof AirQualitySchema>;


export const WeatherSchema = z.object({
    hourly: z.object({
        time: z.array(z.string()),
        temperature_2m: z.array(z.number().nullable()),
        wind_speed_10m: z.array(z.number().nullable()),
        relative_humidity_2m: z.array(z.number().nullable())
    })
});
export type Weather = z.infer<typeof WeatherSchema>;


export const GeoSearchSchema = z.object({
    results: z
    .array(
        z.object({
            id: z.number(),
            name: z.string(),
            latitude: z.number(),
            longitude: z.number(),
            country: z.string().optional(),
            admin1: z.string().optional()
        })
    )
    .optional()
});
export type GeoSearchSchema = z.infer<typeof GeoSearchSchema>
export type HourData = {
    time: string; //ISO yyyy-mm-ddThh:mm
    pm2_5: number | null;
    temperature_2m: number | null;
    wind_speed_10m: number | null;
};

export type HourWithScore = HourData & {
    score: number; //0 to 100
    isGreen: boolean;
    label: "Good" | "Fair" | "Poor";
};

//Thresholds
const PM25_GOOD_MAX = 12; // μg/m³
const TEMP_MIN = 18; // °C
const TEMP_MAX = 28; // °C
const WIND_MAX = 25; // km/h

export function scoreHour(h: HourData): HourWithScore {
    const pmOk = h.pm2_5!=null && h.pm2_5 <= PM25_GOOD_MAX;
   const tOk = h.temperature_2m !=null && h.temperature_2m >= TEMP_MIN && h.temperature_2m <= TEMP_MAX;
   const wOk = h.wind_speed_10m != null && h.wind_speed_10m <=WIND_MAX;

   const parts = [pmOk,tOk,wOk];
   const score = (parts.filter(Boolean).length/ parts.length) * 100;
   const isGreen = score >= 67; //at least 2/3 of conditions true
   const label: "Good" | "Fair" | "Poor" = score>=67 ?"Good" : score >=34 ? "Fair" : "Poor";
   return {...h,score, isGreen,label}
}


export function contiguousWindows(hours: HourWithScore[]): Array<{start:string; end:string; length:number}> {
   const out:Array<{start: string; end:string; length: number}> =[]; //list of windows
   let start: string |null = null; //first hour of the current green streak
   let prev: string | null =null; //last green hour seen
   let len = 0; // length of the streak in hours
   
   for(const h of hours){
    if(h.isGreen){
        if(!start) start = h.time;
        prev= h.time;
        len++;
    }
    else if(start){
         out.push({start, end: prev!, length:len}) //push out a green window streak
         start = null; prev=null; len=0; // reset the values to start a new streak once a streak is pushed out
    }
   }
   if(start) out.push({start, end:prev!, length:len});
   return out
}
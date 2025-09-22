import {format, parseISO} from "date-fns"

export const hh=(iso:string) => format(parseISO(iso), "EEE HH:mm");
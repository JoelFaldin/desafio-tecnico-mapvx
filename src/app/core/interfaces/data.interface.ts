import { ZodError } from "zod";

import { GeoJsonInterface } from "./geojson.interface";

export interface UpdatePointsResult {
    valid: GeoJSON.Feature[];
    invalid: {
        feature: unknown;
        errors?: string[];
    }[]
}

export interface InvalidDataInterface {
    error: ZodError,
    feature: GeoJsonInterface,
    index: number,
    success: boolean,
}
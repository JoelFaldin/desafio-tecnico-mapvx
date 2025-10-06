import { z } from 'zod';

const geometrySchema = z.object({
    type: z.
        literal('Point', { message: "Only point geometries supported" }),
    coordinates: z.
        tuple([z.number().min(-180).max(180), z.number().min(-90).max(90)])
})

const featureSchema = z.object({
    id: z.string(),
    type: z.
        literal('Feature'),
    geometry: geometrySchema,
    properties: z.object({
        name: z.string(),
        category: z.string(),
        id: z.any().optional(),
    }).required()
})

export const validateGeoJSON = (data: any) => {
    const featureArray = Array.isArray(data) ? data : [data];

    const results = featureArray.map((feature, index) => {
        const parse = featureSchema.safeParse(feature);

        return {
            index,
            feature,
            success: parse.success,
            data: parse.data,
            error: parse.error,
        }
    })

    const valid = results.filter(r => r.success === true).map(r => r.data)
    const invalid = results.filter(r => !r.success)

    return { valid, invalid }
}
export interface GeoJsonInterface {
    id: string,
    type: string,
    geometry: GeometryInterface,
    properties: PropertiesInterface,
}

interface GeometryInterface {
    type: string,
    coordinates: CoordinatesType,
}

type CoordinatesType = [number, number];

interface PropertiesInterface {
    name: string,
    category: string,
}
export function ObjectArrayTo2DimArray(data: { [key: string]: any }[]): any[][] {
    return data.map(row => Object.values(row));
};
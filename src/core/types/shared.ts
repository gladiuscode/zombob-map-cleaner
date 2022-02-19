import DatabaseService from '../../database/database.service';

interface IPoint {
    x: string;
    y: string;
}
export interface ICoordsToPurge {
    start: IPoint;
    end: IPoint;
}
export interface IVehicleIdRecord {
    id: number;
}

export interface IGetMapFilesToDeleteParams {
    readonly mapFiles: string[];
    readonly coordsToPurge: ICoordsToPurge[];
}

export interface IGetVehiclesIDsToDeleteParams {
    readonly vehiclesDB: DatabaseService;
    readonly coordsToPurge: ICoordsToPurge[];
}

export interface IDeleteVehiclesByParams {
    readonly vehiclesDB: DatabaseService;
    readonly vehiclesIDsToDelete: number[];
}

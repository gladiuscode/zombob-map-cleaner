interface IPoint {
    x: string;
    y: string;
}
export interface ICoordsToPurge {
    start: IPoint;
    end: IPoint;
}

export interface IGetMapFilesToDeleteParams {
    readonly mapFiles: string[];
    readonly coordsToPurge: ICoordsToPurge[];
}

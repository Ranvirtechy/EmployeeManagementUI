import { SystemMonitor } from "./systemMonitor.model";

export class PerformanceChartResponse {
    PerformanceLogs: SystemMonitor[];
    TopTenList: SystemMonitor[];
    MaxTimeElapsedMethodName: string;
    MaxTimeElapsedMethodURL: string; 
}
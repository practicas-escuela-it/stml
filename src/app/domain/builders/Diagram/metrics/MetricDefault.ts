import { Model } from "../../../entities/Model";
import { Metric } from "./Metric";

export class MetricDefault extends Metric {
    calculate(): void {
        
    }
    getValueOf(_className: string): number {
        return 0;
    }
    
}
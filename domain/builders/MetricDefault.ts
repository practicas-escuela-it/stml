import { Model } from "../entities/Model";
import { Metric } from "./Metric";

export class MetricDefault extends Metric {
    protected calculate(model: Model): void {
        
    }
    getValueOf(_className: string): number {
        return 0;
    }
    
}
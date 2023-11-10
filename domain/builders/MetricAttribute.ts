import { Model } from "../entities/Model";
import { Metric } from "./Metric"

export class MetricAttribute extends Metric {
    calculate(model: Model): void {
        
    }
    
    getValueOf(_className: string): number {
        return 0;
    }

}
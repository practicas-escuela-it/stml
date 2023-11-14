import { ComparatorType } from "./ComparatorType";
import { Metric } from "./Metric";
import { MetricType } from "./MetricType";

export class MetricFilter {   
                
    private _metric: Metric;
    private _forAdd: boolean;    
    private _amount: number;
    private _aritmeticComparation: ComparatorType;        
    private _className: string;

    constructor(metric: Metric, forAdd: boolean, amount: number, aritmeticComparation: ComparatorType) {        
        this._forAdd = forAdd;
        this._amount = amount;
        this._aritmeticComparation = aritmeticComparation;                
        this._metric = metric;
        this._className = "";
    }

    getMetric(): Metric {
        return this._metric;
    }   

    classPassFilter(className: string): boolean {
        let value: number = this._metric.getValueOf(className); 
        switch (this._aritmeticComparation) {
            case ComparatorType.EQUAL: 
               return this._amount == value; 
            case ComparatorType.GREATER:
               return value > this._amount; 
            case ComparatorType.GREATER_OR_EQUAL:
                return value >= this._amount; 
            case ComparatorType.MINOR:
                return value < this._amount;
            case ComparatorType.MINOR_OR_EQUAL:
                return value <= this._amount;
            default: 
                return false;
        }
     }

     isForAdd(): boolean {
        return this._forAdd;
     }

     isForRemove(): boolean {
        return !this._forAdd;
     }
}
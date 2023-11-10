import { Model } from "../entities/Model";
import { Metric } from "./Metric";
import { MetricAfferent } from "./MetricAfferent";
import { MetricAttribute } from "./MetricAttribute";
import { MetricDefault } from "./MetricDefault";
import { MetricEfferent } from "./MetricEfferent";
import { MetricMethod } from "./MetricMethod";
import { MetricParameter } from "./MetricParameter";
import { MetricType } from "./MetricType";

export class MetricFactory {

    private _metricType: MetricType;

    constructor(metricType: MetricType) {
       this._metricType = metricType;
    }

    instance(model: Model): Metric {
       if (this._metricType == MetricType.AFFERENCE) {
          return new MetricAfferent(model);
       } else if (this._metricType == MetricType.EFFERENCE) {
          return new MetricEfferent(model);
       } else if (this._metricType == MetricType.METHODS) {
          return new MetricMethod(model);
       } else if (this._metricType == MetricType.ATTRIBUTES) {
          return new MetricAttribute(model);
       } else if (this._metricType == MetricType.PARAMETERS) {
          return new MetricParameter(model);
       }
       return new MetricDefault(model);
    }
}
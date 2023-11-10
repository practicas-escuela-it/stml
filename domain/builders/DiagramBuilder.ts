import { Model } from "../entities/Model";
import { OutputFormatType } from '../../outputViews/OutputFormatType';
import { OutputFormatter } from '../../outputViews/OutputFormatter';
import { OutputFormatterFactory } from "../../outputViews/OuputFormatterFactory";
import { MetricFilter } from "./MetricFilter";
import { MetricType } from "./MetricType";
import { ComparatorType } from "./ComparatorType";
import { Class } from "../entities/Class";
import { Metric } from "./Metric";
import { MetricFactory } from "./MetricFactory";
import { MetricAfferent } from "./MetricAfferent";
import { MetricEfferent } from "./MetricEfferent";
import { MetricMethod } from "./MetricMethod";
import { MetricAttribute } from "./MetricAttribute";
import { MetricParameter } from "./MetricParameter";

export class DiagramBuilder {

   private _model: Model;
   private _filteredModel: Model;
   private _outputFormatType: OutputFormatType;
   private _metricFilters: MetricFilter[];
   private _concretClassesToAdd: string[];
   private _concretClassesToRemove: string[];

   constructor(model: Model, outputFormatType: OutputFormatType = OutputFormatType.PlantUml) {
      this._outputFormatType = outputFormatType;
      this._model = model;
      this._filteredModel = new Model();
      //  this._filteredModel.copy(this._model);
      this._metricFilters = [];
      this._concretClassesToAdd = [];
      this._concretClassesToRemove = [];      
   }

   addConcretClasses(classNames: string[]): DiagramBuilder {
      this._concretClassesToAdd.push(...classNames);
      return this;
   }

   removeConcretClasses(classNames: string[]): DiagramBuilder {
      this._concretClassesToRemove.push(...classNames);
      return this;
   }

   addAfferentMetric(comparatorType: ComparatorType, amount: number): DiagramBuilder {
      let metricFilter: MetricFilter = new MetricFilter(new MetricAfferent(this._model), true, amount, comparatorType);
      this._metricFilters.push(metricFilter);
      return this;
   }

   addEfferentMetric(comparatorType: ComparatorType, amount: number): DiagramBuilder {
      let metricFilter: MetricFilter = new MetricFilter(new MetricEfferent(this._model), true, amount, comparatorType);
      this._metricFilters.push(metricFilter);
      return this;
   }

   addMethodsMetric(comparatorType: ComparatorType, amount: number): DiagramBuilder {
      let metricFilter: MetricFilter = new MetricFilter(new MetricMethod(this._model), true, amount, comparatorType);
      this._metricFilters.push(metricFilter);
      return this;
   }

   addAttributesMetric(comparatorType: ComparatorType, amount: number): DiagramBuilder {
      let metricFilter: MetricFilter = new MetricFilter(new MetricAttribute(this._model), true, amount, comparatorType);
      this._metricFilters.push(metricFilter);
      return this;
   }

   addParametersMetric(comparatorType: ComparatorType, amount: number): DiagramBuilder {
      let metricFilter: MetricFilter = new MetricFilter(new MetricParameter(this._model), true, amount, comparatorType);
      this._metricFilters.push(metricFilter);
      return this;
   }

   removeAfferentMetric(comparatorType: ComparatorType, amount: number): DiagramBuilder {
      let metricFilter: MetricFilter = new MetricFilter(new MetricAfferent(this._model), false, amount, comparatorType);
      this._metricFilters.push(metricFilter);
      return this;
   }

   removeEfferentMetric(comparatorType: ComparatorType, amount: number): DiagramBuilder {
      let metricFilter: MetricFilter = new MetricFilter(new MetricEfferent(this._model), false, amount, comparatorType);
      this._metricFilters.push(metricFilter);
      return this;
   }

   removeMethodsMetric(comparatorType: ComparatorType, amount: number): DiagramBuilder {
      let metricFilter: MetricFilter = new MetricFilter(new MetricMethod(this._model), false, amount, comparatorType);
      this._metricFilters.push(metricFilter);
      return this;
   }

   removeAttributesMetric(comparatorType: ComparatorType, amount: number): DiagramBuilder {
      let metricFilter: MetricFilter = new MetricFilter(new MetricAttribute(this._model), false, amount, comparatorType);
      this._metricFilters.push(metricFilter);
      return this;
   }

   removeParametersMetric(comparatorType: ComparatorType, amount: number): DiagramBuilder {
      let metricFilter: MetricFilter = new MetricFilter(new MetricParameter(this._model), false, amount, comparatorType);
      this._metricFilters.push(metricFilter);
      return this;
   }

   build(): string {
      this._applyAddFilters();
      this._applyRemoveFilters();
      this._applyConcretClassToAdd();
      this._applyConcretClassToRemove();      
      if (this._filteredModel.hasClasses()) {
         return new OutputFormatterFactory(this._outputFormatType).instance(this._filteredModel).format();
      } else {
         return new OutputFormatterFactory(this._outputFormatType).instance(this._model).format();
      }
   }

   private _applyAddFilters() {
      this._model.getClasses().forEach(
         (_class: Class) => {
            if (!this._isConcreteClassToRemove(_class.name)) {
               this._metricFilters.forEach(
                  (metricFilter: MetricFilter) => {                     
                     if (metricFilter.isForAdd() && metricFilter.classPassFilter(_class.name)) {
                        this._filteredModel.addClass(_class);
                     }
                  }
               );
            }
         }
      );
   }

   private _isConcreteClassToRemove(name: string): boolean {
      return this._concretClassesToRemove.includes(name);
   }

   private _applyRemoveFilters() {
      this._model.getClasses().forEach(
         (_class: Class) => {
            this._metricFilters.forEach(
               (metricFilter: MetricFilter) => {                  
                  if (metricFilter.isForRemove() && metricFilter.classPassFilter(_class.name)) {
                     this._filteredModel.removeClass(_class);
                  }
               }
            )
         }
      )
   }

   private _applyConcretClassToAdd() {
      this._concretClassesToAdd.forEach(
         (className: string) => {
            if (!this._filteredModel.exists(className)) {               
               this._filteredModel.addClass(this._model.getClass(className));
            }
         }
      );
   }

   private _applyConcretClassToRemove() {
      this._concretClassesToRemove.forEach(
         (className: string) => {
            if (this._filteredModel.exists(className)) {
               this._filteredModel.removeClass(this._model.getClass(className));
            }
         }
      )
   }

}
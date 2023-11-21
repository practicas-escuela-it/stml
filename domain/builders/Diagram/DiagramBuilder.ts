import { Model } from "../../entities/Model";
import { OutputFormatType } from '../../../outputViews/OutputFormatType';
import { OutputFormatterFactory } from "../../../outputViews/OuputFormatterFactory";
import { MetricFilter } from "./MetricFilter";
import { ComparatorType } from "./classFilters/ComparatorType";
import { Class } from "../../entities/Class";
import { MetricAfferent } from "./MetricAfferent";
import { MetricEfferent } from "./MetricEfferent";
import { MetricMethod } from "./MetricMethod";
import { MetricAttribute } from "./MetricAttribute";
import { MetricParameter } from "./MetricParameter";
import { ClassFilter } from "./classFilters/ClassFilter";
import { Direction } from './classFilters/Direction';
import { InitialConfig } from "./InitialConfig";
import { Relation } from "./Relation";
import { RelationClassesFactory } from "./relationsClasses/RelationClassesFactory";
import { ClassElementFilter } from "./classFilters/ClassElementFilter";
import { RelationClass } from "./relationsClasses/RelationClass";

export class DiagramBuilder {     

   private _model: Model;
   private _filteredModel: Model;
   private _outputFormatType: OutputFormatType;
   private _metricFilters: MetricFilter[];
   //private _classFilters: Map<string, Class>;   
   private _classMap: Map<string, Class>;
   private _currentClass: Class;
   private _relationClasses: RelationClass[];

   constructor(model: Model, outputFormatType: OutputFormatType = OutputFormatType.PlantUml) {
      this._outputFormatType = outputFormatType;
      this._model = model;
      this._filteredModel = new Model();
      //  this._filteredModel.copy(this._model);
      this._metricFilters = [];
      //this._classFilters = new Map<string, Class>();
      this._classMap = new Map<string, Class>();
      this._currentClass = new Class(""); 
      this._relationClasses = [];
      this.setClassesMap();     
   }

   private setClassesMap(): void {
      this._model.getClasses().forEach(
         (_class: Class) => {
            this._classMap.set(_class.name, _class);
         }
      )
   }

   setClass(className: string, classState: InitialConfig = InitialConfig.EMPTY): DiagramBuilder {
      let _class: Class | undefined = this._classMap.get(className)?? undefined;      
      if (_class != undefined) {
         this._currentClass = _class;                           
      }
      return this;
    }

    coupling(direction: Direction, relation: Relation) {
        this._relationClasses.push(new RelationClassesFactory(direction, relation, this._currentClass, this._model).instance());        
        return this;
    }

   private hasClassSetted(): boolean {
      return this._currentClass != null;
   }     


   /*
   removeConcretClasses(className: string): DiagramBuilder {
      this._concretClassesToRemove.push(new ClassFilter(className));
      return this;
   } */

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
      //this._applyConcretClassToAdd();
      //this._applyConcretClassToRemove();      
      if (this._filteredModel.hasClasses()) {
         return new OutputFormatterFactory(this._outputFormatType).instance(this._filteredModel).format();
      } else {
         return new OutputFormatterFactory(this._outputFormatType).instance(this._model).format();
      }
   }

   private _applyAddFilters() {
      if (this.hasClassSetted()) {
         this._applyRelations();
      } else {
         this._applyMetricFiltersToAllClasses();
      }     
   }

   private _applyMetricFiltersToAllClasses() {
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

   private _applyRelations(): void {     
      console.log("APLICANDO RELACIONES");
      this._relationClasses.forEach(
         (relationClass: RelationClass) => {
            this._filteredModel.addClasses(relationClass.getRelationClasses())
         }
      );               
   }

   private _isConcreteClassToRemove(name: string): boolean {
      //return this._concretClassesToRemove.includes(name);
      return false;
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

   /*
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
   }*/

}
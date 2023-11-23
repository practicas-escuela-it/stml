import { Model } from "../../entities/Model";
import { OutputFormatType } from '../../../outputViews/OutputFormatType';
import { OutputFormatterFactory } from "../../../outputViews/OuputFormatterFactory";
import { MetricFilter } from "./metrics/MetricFilter";
import { ComparatorType } from "./types/ComparatorType";
import { Class } from "../../entities/Class";
import { MetricAfferent } from "./metrics/MetricAfferent";
import { MetricEfferent } from "./metrics/MetricEfferent";
import { MetricMethod } from "./metrics/MetricMethod";
import { MetricAttribute } from "./metrics/MetricAttribute";
import { MetricParameter } from "./metrics/MetricParameter";
import { Direction } from './types/Direction';
import { InitialConfig } from "./InitialConfig";
import { RelationClassesFactory } from "./relations/RelationClassesFactory";
import { Attribute } from "../../entities/Attribute";
import { Relation } from "./relations/Relation";
import { RelationType } from "./types/RelationType";
import { AttributeFilter } from "./ClassElements/AttributeFilter";
import { MethodFilter } from "./ClassElements/MethodFilter";

export class DiagramBuilder {           

   private _model: Model;
   private _filteredModel: Model;
   private _outputFormatType: OutputFormatType;
   private _metricFilters: MetricFilter[];   
   private _classMap: Map<string, Class>;
   private _originalClass: Class;
   private _filteredClass: Class;
   private _relations: Relation[];

   constructor(model: Model, outputFormatType: OutputFormatType = OutputFormatType.PlantUml) {
      this._outputFormatType = outputFormatType;
      this._model = model;
      this._filteredModel = new Model();
      //  this._filteredModel.copy(this._model);
      this._metricFilters = [];
      //this._classFilters = new Map<string, Class>();
      this._classMap = new Map<string, Class>();
      this._originalClass = new Class(""); 
      this._filteredClass = new Class("");
      this._relations = [];
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
         this._originalClass = _class;       
         this._filteredClass = new Class(_class.name);                                
      }
      return this;
    }       

    coupling(direction: Direction, relation: RelationType): DiagramBuilder {
        this._relations.push(new RelationClassesFactory(direction, relation, this._originalClass, this._model, this._filteredClass).instance());        
        return this;
    }

    attribute(names: string[] = []): DiagramBuilder {
      new AttributeFilter(names, this._originalClass, this._filteredClass).filter();
      return this;
    }   

    method(names: string[] = []): DiagramBuilder {
      new MethodFilter(names, this._originalClass, this._filteredClass).filter();
      return this;
    }

   private hasClassSetted(): boolean {
      return this._originalClass != null;
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
      this._relations.forEach(
         (relationClass: Relation) => {                        
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
}
import { Model } from "../../entities/Model";
import { MetricFilter } from "./metrics/MetricFilter";
import { ComparatorType } from "./types/ComparatorType";
import { Class } from "../../entities/Class";
import { MetricAfferent } from "./metrics/MetricAfferent";
import { MetricEfferent } from "./metrics/MetricEfferent";
import { MetricMethod } from "./metrics/MetricMethod";
import { MetricAttribute } from "./metrics/MetricAttribute";
import { MetricParameter } from "./metrics/MetricParameter";
import { Direction } from './types/Direction';
import { ActionType } from "./ActionType";
import { RelationClassesFactory } from "./relations/RelationClassesFactory";
import { Attribute } from "../../entities/Attribute";
import { Relation } from "./relations/Relation";
import { RelationType } from "./types/RelationType";
import { AttributeFilter } from "./ClassElements/AttributeFilter";
import { MethodFilter } from "./ClassElements/MethodFilter";
import { Assert } from "../../utils/Assert";
import { OutputFormatType } from "../../outputFomat/OutputFormatType";
import { OutputFormatterFactory } from "../../outputFomat/OuputFormatterFactory";

export class DiagramBuilder {           

   private _model: Model;
   private _diagramModel: Model;
   private _outputFormatType: OutputFormatType;
   private _metricFilters: MetricFilter[];      
   private _modelClass: Class;
   private _diagramClass: Class;
   private _relations: Relation[];
   private _actionType: ActionType;

   constructor(model: Model, outputFormatType: OutputFormatType = OutputFormatType.PlantUml) {
      this._outputFormatType = outputFormatType;
      this._model = model;
      this._diagramModel = new Model();      
      this._metricFilters = [];      
      this._modelClass = new Class(""); 
      this._diagramClass = new Class("");
      this._relations = [];
      this._actionType = ActionType.ADD;      
   }   

   setClass(className: string, actionType: ActionType = ActionType.ADD): this {
      Assert.test(this._model.getClass(className) != null, "No puedes pasar una clase inexistente");
      let _class: Class | undefined = this._model.getClass(className)?? undefined;      
      if (_class != undefined) {           
         this._modelClass = _class;                                  
         this.setDiagramClass(actionType);
      }
      return this;
    }       
    
    private setDiagramClass(actionType: ActionType): this  {
      this._actionType = actionType;
      if (actionType == ActionType.ADD) {
         this._diagramClass = new Class(this._modelClass.name);
      } else {
         this._diagramClass.copy(this._modelClass); 
      }
      return this;
    }   

    coupling(direction: Direction, relation: RelationType): this {
        this._relations.push(new RelationClassesFactory(direction, relation, this._modelClass, this._model, this._diagramClass).instance());        
        return this;
    }

    attribute(names: string[] = []): this {
      new AttributeFilter(names, this._modelClass, this._diagramClass).filter();
      return this;
    }   

    method(names: string[] = []): this {
      new MethodFilter(names, this._modelClass, this._diagramClass).filter();
      return this;
    }

   private hasClassSetted(): boolean {
      return this._modelClass != null;
   }        

   addAfferentMetric(comparatorType: ComparatorType, amount: number): this {
      let metricFilter: MetricFilter = new MetricFilter(new MetricAfferent(this._model), true, amount, comparatorType);
      this._metricFilters.push(metricFilter);
      return this;
   }

   addEfferentMetric(comparatorType: ComparatorType, amount: number): this {
      let metricFilter: MetricFilter = new MetricFilter(new MetricEfferent(this._model), true, amount, comparatorType);
      this._metricFilters.push(metricFilter);
      return this;
   }

   addMethodsMetric(comparatorType: ComparatorType, amount: number): this {
      let metricFilter: MetricFilter = new MetricFilter(new MetricMethod(this._model), true, amount, comparatorType);
      this._metricFilters.push(metricFilter);
      return this;
   }

   addAttributesMetric(comparatorType: ComparatorType, amount: number): this {
      let metricFilter: MetricFilter = new MetricFilter(new MetricAttribute(this._model), true, amount, comparatorType);
      this._metricFilters.push(metricFilter);
      return this;
   }

   addParametersMetric(comparatorType: ComparatorType, amount: number): this {
      let metricFilter: MetricFilter = new MetricFilter(new MetricParameter(this._model), true, amount, comparatorType);
      this._metricFilters.push(metricFilter);
      return this;
   }

   removeAfferentMetric(comparatorType: ComparatorType, amount: number): this {
      let metricFilter: MetricFilter = new MetricFilter(new MetricAfferent(this._model), false, amount, comparatorType);
      this._metricFilters.push(metricFilter);
      return this;
   }

   removeEfferentMetric(comparatorType: ComparatorType, amount: number): this {
      let metricFilter: MetricFilter = new MetricFilter(new MetricEfferent(this._model), false, amount, comparatorType);
      this._metricFilters.push(metricFilter);
      return this;
   }

   removeMethodsMetric(comparatorType: ComparatorType, amount: number): this {
      let metricFilter: MetricFilter = new MetricFilter(new MetricMethod(this._model), false, amount, comparatorType);
      this._metricFilters.push(metricFilter);
      return this;
   }

   removeAttributesMetric(comparatorType: ComparatorType, amount: number): this {
      let metricFilter: MetricFilter = new MetricFilter(new MetricAttribute(this._model), false, amount, comparatorType);
      this._metricFilters.push(metricFilter);
      return this;
   }

   removeParametersMetric(comparatorType: ComparatorType, amount: number): this {
      let metricFilter: MetricFilter = new MetricFilter(new MetricParameter(this._model), false, amount, comparatorType);
      this._metricFilters.push(metricFilter);
      return this;
   }

   build(): string {
      this._applyAddFilters();      
      if (this._diagramModel.hasClasses()) {
         return new OutputFormatterFactory(this._outputFormatType).instance(this._diagramModel).format();
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
                        this._diagramModel.addClass(_class);
                     }
                  }
               );
            }
         }
      );
   }

   private _applyRelations(): void {           
      if (this._actionType == ActionType.ADD) {
         this._applyRelationsForAdd();  
      } else {
         this._applyRelationsForRemove();
      }
   }

   private _applyRelationsForAdd(): void {
      this._relations.forEach(
         (relation: Relation) => {              
            this._diagramModel.addClasses(relation.getRelationClasses());            
         }
      ); 
   }

   private _applyRelationsForRemove(): void {
      this._relations.forEach(
         (relation: Relation) => {                        
            this._diagramModel.removeClasses(relation.getRelationClasses())
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
                     this._diagramModel.removeClass(_class);
                  }
               }
            )
         }
      )
   }  
}
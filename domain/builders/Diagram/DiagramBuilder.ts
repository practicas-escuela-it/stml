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
import { Direction } from "./classFilters/Direction";

export class DiagramBuilder {   

   private _model: Model;
   private _filteredModel: Model;
   private _outputFormatType: OutputFormatType;
   private _metricFilters: MetricFilter[];
   private _concretClasses: Map<string, ClassFilter>;   
   private _classMap: Map<string, Class>;
   private _currentConcretClass: Class;

   constructor(model: Model, outputFormatType: OutputFormatType = OutputFormatType.PlantUml) {
      this._outputFormatType = outputFormatType;
      this._model = model;
      this._filteredModel = new Model();
      //  this._filteredModel.copy(this._model);
      this._metricFilters = [];
      this._concretClasses = new Map<string, ClassFilter>();
      this._classMap = new Map<string, Class>();
      this._currentConcretClass = new Class(""); 
      this.setClassesMap();     
   }

   private setClassesMap(): void {
      this._model.getClasses().forEach(
         (_class: Class) => {
            this._classMap.set(_class.name, _class);
         }
      )
   }

   setClass(className: string): DiagramBuilder {
      let _class: Class | undefined = this._classMap.get(className)?? undefined;      
      if (_class != undefined) {
         this._currentConcretClass = _class;   
         this._concretClasses.set(className, new ClassFilter(_class, this._model, this._filteredModel));
      }
      return this;
    }

   private hasClassSetted(): boolean {
      return this._currentConcretClass != null;
   }     

   withCompositions(direction: Direction): DiagramBuilder {
      this._concretClasses.get(this._currentConcretClass.name)?.addCompositions(direction);      
      return this;
   }  

   withAssociations(direction: Direction): DiagramBuilder {
      this._concretClasses.get(this._currentConcretClass.name)?.addAssociations(direction);
      return this;
   }
   

   withUses(direction: Direction): DiagramBuilder {
      this._concretClasses.get(this._currentConcretClass.name)?.addUses(direction);
      return this;
   }   

   withInherits(direction: Direction): DiagramBuilder {
      this._concretClasses.get(this._currentConcretClass.name)?.addInherits(direction);      
      return this;
   }  

   withEfferences(): DiagramBuilder {
      this.withAssociations(Direction.EFFERENT);
      this.withCompositions(Direction.EFFERENT);
      this.withInherits(Direction.EFFERENT);
      this.withUses(Direction.EFFERENT);
      return this;
   }   

   withAfferences(): DiagramBuilder {
      this.withAssociations(Direction.AFFERENT);
      this.withCompositions(Direction.AFFERENT);
      this.withInherits(Direction.AFFERENT);
      this.withUses(Direction.AFFERENT);
      return this;
   }   
   
   withAll(): DiagramBuilder {
     this.withEfferences();
     this.withAfferences();
     return this;
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
         this._applyAddFilterToConcretClasses();
      } else {
         this._applyAddFilterToAllClasses();
      }     
   }

   private _applyAddFilterToAllClasses() {
      this._model.getClasses().forEach(
         (_class: Class) => {
            if (!this._isConcreteClassToRemove(_class.name)) {
               this._applyFilters(_class);
            }
         }
      );
   }

   private _applyAddFilterToConcretClasses(): void {
      //let _class: Class = this._model.getClass(this._currentConcretClass);
      // this._applyFilters(_class);
      this._model.getClasses().forEach(
         (_class: Class) => {
            let _classFilter: ClassFilter | undefined = this._concretClasses.get(_class.name)?? undefined;
            if (_classFilter) {
               _classFilter.apply();
            }
         }
      )
         
   }

   private _applyFilters(_class: Class) {
      this._metricFilters.forEach(
         (metricFilter: MetricFilter) => {                     
            if (metricFilter.isForAdd() && metricFilter.classPassFilter(_class.name)) {
               this._filteredModel.addClass(_class);
            }
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
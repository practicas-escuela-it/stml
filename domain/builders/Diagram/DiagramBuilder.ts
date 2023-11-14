import { Model } from "../../entities/Model";
import { OutputFormatType } from '../../../outputViews/OutputFormatType';
import { OutputFormatterFactory } from "../../../outputViews/OuputFormatterFactory";
import { MetricFilter } from "./MetricFilter";
import { ComparatorType } from "./ComparatorType";
import { Class } from "../../entities/Class";
import { MetricAfferent } from "./MetricAfferent";
import { MetricEfferent } from "./MetricEfferent";
import { MetricMethod } from "./MetricMethod";
import { MetricAttribute } from "./MetricAttribute";
import { MetricParameter } from "./MetricParameter";
import { ClassFilter } from "./ClassFilter";
import { Direction } from "./Direction";

export class DiagramBuilder {   

   private _model: Model;
   private _filteredModel: Model;
   private _outputFormatType: OutputFormatType;
   private _metricFilters: MetricFilter[];
   private _concretClassesToAdd: Map<string, ClassFilter>;
   private _concretClassesToRemove: Map<string, ClassFilter>;   
   private _currentConcretClass: string;

   constructor(model: Model, outputFormatType: OutputFormatType = OutputFormatType.PlantUml) {
      this._outputFormatType = outputFormatType;
      this._model = model;
      this._filteredModel = new Model();
      //  this._filteredModel.copy(this._model);
      this._metricFilters = [];
      this._concretClassesToAdd = new Map<string, ClassFilter>();
      this._concretClassesToRemove = new Map<string, ClassFilter>();      
      this._currentConcretClass = "";      
   }

   setClass(className: string): DiagramBuilder {
      this._currentConcretClass = className;
      return this;
    }

   private hasClassSetted(): boolean {
      return this._currentConcretClass != "";
   }
   
   addConcretClass(className: string): DiagramBuilder {      
      this._currentConcretClass = className;           
      this._concretClassesToAdd.set(className, new ClassFilter(className));
      return this;
   } 

   withCompositions(direction: Direction): DiagramBuilder {
      this._concretClassesToAdd.get(this._currentConcretClass)?.addCompositions(direction);      
      return this;
   }

   withoutCompositions(direction: Direction): DiagramBuilder {
      this._concretClassesToAdd.get(this._currentConcretClass)?.removeCompositions(direction);
      return this;
   }

   withAssociations(direction: Direction): DiagramBuilder {
      this._concretClassesToAdd.get(this._currentConcretClass)?.addAssociations(direction);
      return this;
   }

   withoutAssociations(direction: Direction): DiagramBuilder {
      this._concretClassesToAdd.get(this._currentConcretClass)?.removeAssociations(direction);
      return this;
   }

   withUses(direction: Direction): DiagramBuilder {
      this._concretClassesToAdd.get(this._currentConcretClass)?.addUses(direction);
      return this;
   }

   withoutUses(direction: Direction): DiagramBuilder {
      this._concretClassesToAdd.get(this._currentConcretClass)?.removeUses(direction);
      return this;
   }

   withInherits(direction: Direction): DiagramBuilder {
      this._concretClassesToAdd.get(this._currentConcretClass)?.addInherits(direction);      
      return this;
   }

   withoutInherits(direction: Direction): DiagramBuilder {
      this._concretClassesToAdd.get(this._currentConcretClass)?.removeInherits(direction);
      return this;
   }

   withEfferences(): DiagramBuilder {
      this.withAssociations(Direction.EFFERENT);
      this.withCompositions(Direction.EFFERENT);
      this.withInherits(Direction.EFFERENT);
      this.withUses(Direction.EFFERENT);
      return this;
   }

   withoutEfferences(): DiagramBuilder {
      this.withoutAssociations(Direction.EFFERENT);
      this.withoutCompositions(Direction.EFFERENT);
      this.withoutInherits(Direction.EFFERENT);
      this.withoutUses(Direction.EFFERENT);
      return this;
   }

   withAfferences(): DiagramBuilder {
      this.withAssociations(Direction.AFFERENT);
      this.withCompositions(Direction.AFFERENT);
      this.withInherits(Direction.AFFERENT);
      this.withUses(Direction.AFFERENT);
      return this;
   }

   withoutAfferences(): DiagramBuilder {
      this.withoutAssociations(Direction.AFFERENT);
      this.withoutCompositions(Direction.AFFERENT);
      this.withoutInherits(Direction.AFFERENT);
      this.withoutUses(Direction.AFFERENT);
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
         this._applyAddFilterToConcretClass();
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

   private _applyAddFilterToConcretClass(): void {
      let _class: Class = this._model.getClass(this._currentConcretClass);
      this._applyFilters(_class);
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
import { Model } from "../../entities/Model";
import { MetricFilter } from "./metrics/MetricFilter";
import { ComparatorType } from "./types/ComparatorType";
import { Class } from "../../entities/Class";
import { MetricAfferent } from "./metrics/MetricAfferent";
import { MetricEfferent } from "./metrics/MetricEfferent";
import { MetricMethod } from "./metrics/MetricMethod";
import { MetricAttribute } from "./metrics/MetricAttribute";
import { MetricParameter } from "./metrics/MetricParameter";
import { ActionType } from "./ActionType";
import { RelationClassesFactory } from "./relations/RelationClassesFactory";
import { Relation } from "./relations/Relation";
import { AttributeFilter } from "./ClassElements/AttributeFilter";
import { MethodFilter } from "./ClassElements/MethodFilter";
import { Assert } from "../../utils/Assert";
import { OutputFormatType } from "../../outputFomat/OutputFormatType";
import { OutputFormatterFactory } from "../../outputFomat/OuputFormatterFactory";
import { Axis } from "./relations/Axis";
import { ClassFilter } from "./classFilters/ClassFilter";

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

   setModel(model: Model): void {
      this._model = model;
   }

   clear(): void {
     this._relations.splice(0, this._relations.length);
     this._relations = [];
   }

   addClass(className: string): this {
      Assert.test(this._model.getClass(className) != null, "No puedes pasar una clase inexistente");
      let _class: Class | undefined = this._model.getClass(className)?? undefined;
      if (_class != undefined) {
         this._modelClass = _class;
         this.setDiagramClass(ActionType.ADD);
      }
      return this;
    }

    getClasses(): Class[] {
      return this._diagramModel.getClasses();
    }

    private setDiagramClass(actionType: ActionType): this  {
      this._actionType = actionType;
      this._diagramClass = new Class(this._modelClass.name);
      this._diagramModel.addClass(this._diagramClass);
      return this;
    }

    addCoupling(axis: Axis): this {
      this._relations.push(new RelationClassesFactory(axis, this._modelClass, this._model, this._diagramClass, this._diagramModel, ActionType.ADD).instance());
      return this;
    }

  /*  coupling(direction: Direction, relation: RelationType = RelationType.ALL): this {
        this._relations.push(new RelationClassesFactory(direction, relation, this._modelClass, this._model, this._diagramClass, this._actionType).instance());
        return this;
    }  */

    removeCoupling(axis: Axis): this {
      this._relations.push(new RelationClassesFactory(axis, this._modelClass, this._model, this._diagramClass, this._diagramModel, ActionType.REMOVE).instance());
      return this;
    }

    removeClass(className: string): this {
      this._relations.push(new ClassFilter(this._model.getClass(className), this._diagramClass, this._diagramModel, ActionType.REMOVE));
      return this;
    }

    addAttribute(names: string[] = []): this {
      new AttributeFilter(names, this._modelClass, this._diagramClass, ActionType.ADD).filter();
      return this;
    }

    removeAttribute(names: string[] = []): this {
      new AttributeFilter(names, this._modelClass, this._diagramClass, ActionType.REMOVE).filter();
      return this;
    }

    addMethod(names: string[] = []): this {
      new MethodFilter(names, this._modelClass, this._diagramClass, ActionType.ADD).filter();
      return this;
    }

    removeMethod(names: string[] = []): this {
      new MethodFilter(names, this._modelClass, this._diagramClass, ActionType.REMOVE).filter();
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
    this._relations.forEach(
      (relation: Relation) => {
        relation.applyRelation();
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

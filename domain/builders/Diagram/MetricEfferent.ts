import { Metric } from "./Metric";
import { Class } from '../../entities/Class';
import { Model } from "../../entities/Model";
import { Composition } from "../../entities/Composition";
import { Identifier } from "../../entities/Identifier";
import { Use } from "../../entities/Use";
import { Association } from "../../entities/Asociation";

export class MetricEfferent extends Metric {

    private _classesEfference: Map<string, string[]>;

    constructor(_model: Model) {        
        super(_model);        
        this._classesEfference = new Map<string, string[]>();
        this.calculate();
    }

    calculate(): void {        
        this._model.getClasses().forEach(
            (_class: Class) => {            
                let _efferences: string[] = [];
                _efferences.push(...this.getEfferentClassesOfInherit(_class));
                _efferences.push(...this.getEfferentClassesOfCompositions(_class));
                _efferences.push(...this.getEfferentClassesOfAssociations(_class));
                _efferences.push(...this.getEfferentClassesOfUses(_class));
                if (_efferences.length > 0) {                                 
                   this._classesEfference.set(_class.name, _efferences);
                }
            }
        )
    }

    getValueOf(className: string): number {
       return this._classesEfference.get(className)?.length ?? 0;
    }

    private getEfferentClassesOfInherit(_class: Class): string[] {
        let _inheritedClasses: string[] = [];
        _class.getInherits().forEach(
            (_inheritedClass: Class) => {
                _inheritedClasses.push(_inheritedClass.name);
            }
        );
        return _inheritedClasses;
    }

    private getEfferentClassesOfCompositions(_class: Class): string[] {
       let _compositionsClasses: string[] = [];
       _class.getCompositions().forEach(
         (_compositionClass: Composition) => {
            _compositionClass.getClasses().forEach(
                (_identifier: Identifier) => {
                   _compositionsClasses.push(_identifier.value);
                }
            )
         }
       );
       return _compositionsClasses;
    }

    private getEfferentClassesOfUses(_class: Class): string[] {
       let _useClasses: string[] = [];
       _class.getUses().forEach(
          (_useClass: Use) => {
             _useClass.identifiers.forEach(
                (_identifier: Identifier) => {
                    _useClasses.push(_identifier.value);
                }
             )
          }
       );
       return _useClasses;  
    }

    private getEfferentClassesOfAssociations(_class: Class): string[] {
       let _associationClasses: string[] = [];
       _class.getAssociations().forEach(
         (_associationClass: Association) => {
            _associationClass.identifiers.forEach(
                (_identifier: Identifier) => {
                    _associationClasses.push(_identifier.value);
                }
            )
         }
       );
       return _associationClasses;
    }
}
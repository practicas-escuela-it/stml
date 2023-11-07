import { Association } from "./Asociation";
import { Class } from "./Class";
import { Composition } from "./Composition";
import { Identifier } from "./Identifier";
import { Metric } from "./Metric";
import { Model } from "./Model";
import { Use } from "./Use";

export class MetricEfferent extends Metric {

    private _classesAfference: Map<string, string[]>;

    constructor(_model: Model) {
        super(_model);
        this._classesAfference = new Map<string, string[]>();
    }

    calculate(): void {
        this._model.getClasses().forEach(
            (_class: Class) => {
                let _afferences: string[] = [];
                _afferences.push(...this.getAfferentInheritancesOn(_class));
                _afferences.push(...this.getAfferentCompositionsOn(_class));
                _afferences.push(...this.getAfferentAssociationsOn(_class));
                _afferences.push(...this.getAfferentUsesOn(_class));
                this._classesAfference.set(_class.name, _afferences);
            }
        )
    }
    private getAfferentInheritancesOn(_class: Class): string[] {
        let _inheritedClasses: string[] = [];
        this._model.getClasses().forEach(
            (_otherClass: Class) => {
                if (_otherClass.name != _class.name) {
                    _otherClass.getInherits().forEach(
                        (_inheritedClass: Class) => {
                            if (_inheritedClass.name == _class.name)
                                _inheritedClasses.push(_otherClass.name);
                        });
                }
            });

        return _inheritedClasses;
    }

    getAfferentCompositionsOn(_class: Class): string[] {
        let _compositionClasses: string[] = [];
        this._model.getClasses().forEach(
            (_otherClass: Class) => {
                if (_otherClass.name != _class.name) {
                    _otherClass.getCompositions().forEach(
                        (_compositionClass: Composition) => {
                            _compositionClass.getIdentifiers().forEach(
                                (_identifier: Identifier) => {
                                    if (_identifier.value == _class.name) {
                                        _compositionClasses.push(_otherClass.name);
                                    }
                                });
                        });
                }
            });
        return _compositionClasses;
    }

    getAfferentAssociationsOn(_class: Class): string[] {
        let _associationsClasses: string[] = [];
        this._model.getClasses().forEach(
            (_otherClass: Class) => {
                if (_otherClass.name != _class.name) {
                    _otherClass.getAssociations().forEach(
                        (_associationClass: Association) => {
                            _associationClass.identifiers.forEach(
                                (_identifier: Identifier) => {
                                    if (_identifier.value == _class.name) {
                                        _associationsClasses.push(_otherClass.name);
                                    }
                                });
                        });
                }
            });
        return _associationsClasses;        
    }

    getAfferentUsesOn(_class: Class): string[] {
        let _useClasses: string[] = [];
        this._model.getClasses().forEach(
            (_otherClass: Class) => {
                if (_otherClass.name != _class.name) {
                    _otherClass.getUses().forEach(
                        (_useClass: Use) => {
                            _useClass.identifiers.forEach(
                                (_identifier: Identifier) => {
                                    if (_identifier.value == _class.name) {
                                        _useClasses.push(_otherClass.name);
                                    }
                                });
                        });
                }
            });
        return _useClasses;
    }

    getValueOf(_className: string): number {
        let afferences: string[] | undefined = this._classesAfference.get(_className);
        if (afferences == undefined) {
            return 0;
        }
        return afferences.length;
    }
}
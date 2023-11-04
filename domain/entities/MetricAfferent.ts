import { Class } from "./Class";
import { Composition } from "./Composition";
import { Identifier } from "./Identifier";
import { Metric } from "./Metric";
import { Model } from "./Model";

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
                _afferences.push(...this.getAfferentClassesOfInherit(_class));
                _afferences.push(...this.getAfferentClassesOfCompositions(_class));
                _afferences.push(...this.getAfferentClassesOfAssociations(_class));
                _afferences.push(...this.getAfferentClassesOfUses(_class));
                this._classesAfference.set(_class.name, _afferences);
            }
        )
    }
    private getAfferentClassesOfInherit(_class: Class): string[] {
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

    getAfferentClassesOfCompositions(_class: Class): string[] {
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

    getAfferentClassesOfAssociations(_class: Class): string[] {
        return [];
    }

    getAfferentClassesOfUses(_class: Class): string[] {
        return [];
    }

    getValueOf(_className: string): number {
        return 0;
    }

}
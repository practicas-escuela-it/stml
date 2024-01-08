import { Class } from "../../../entities/Class";
import { Identifier } from "../../../entities/Identifier";
import { Metric } from "./Metric";
import { Model } from "../../../entities/Model";
import { Relation } from "src/app/domain/entities/Relation";
import * as EntityRelation from "../../../entities/Relation";

export class MetricAfferent extends Metric {

    private _classesAfference: Map<string, string[]>;

    constructor(_model: Model) {
        super(_model);
        this._classesAfference = new Map<string, string[]>();
        this.calculate();
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

    private getAfferentCompositionsOn(_class: Class): string[] {
        let _compositionClasses: string[] = [];
        this._model.getClasses().forEach(
            (_otherClass: Class) => {
                if (_otherClass.name != _class.name) {
                    _otherClass.getCompositions().forEach(
                        (_compositionClass: EntityRelation.Relation) => {
                            // _compositionClasses.push(...this.getAfferentIdentifiers(_compositionClass.getClasses(), _class, _otherClass));
                        });
                }
            });
        return _compositionClasses;
    }

    private getAfferentIdentifiers(identifiers: Identifier[], _class: Class, _otherClass: Class): string[] {
        let classes: string[] = [];
        identifiers.forEach(
            (_identifier: Identifier) => {
                if (_identifier.value == _class.name) {
                    classes.push(_otherClass.name);
                }
            });
        return classes;
    }

    private getAfferentAssociationsOn(_class: Class): string[] {
        let _associationsClasses: string[] = [];
        this._model.getClasses().forEach(
            (_otherClass: Class) => {
                if (_otherClass.name != _class.name) {
                    _otherClass.getAssociations().forEach(
                        (_associationClass: Relation) => {
                            // _associationsClasses.push(...this.getAfferentIdentifiers(_associationClass.classes, _class, _otherClass));
                        });
                }
            });
        return _associationsClasses;
    }

    private getAfferentUsesOn(_class: Class): string[] {
        let _useClasses: string[] = [];
        this._model.getClasses().forEach(
            (_otherClass: Class) => {
                if (_otherClass.name != _class.name) {
                    _otherClass.getUses().forEach(
                        (_useClass: Relation) => {
                            // _useClasses.push(...this.getAfferentIdentifiers(_useClass.classes, _class, _otherClass));
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

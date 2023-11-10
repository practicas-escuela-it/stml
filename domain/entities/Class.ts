import { Association } from "./Asociation";
import { Attribute } from "./Attribute";
import { Composition } from "./Composition";
import { Identifier } from './Identifier';
import { Method } from "./Method";
import { Parameter } from "./Parameter";
import { Use } from "./Use";

export class Class {

    private _identifier: Identifier;
    private _inherists: Class[];
    private _attributes: Attribute[];
    private _methods: Method[];
    private _compositions: Composition[];
    private _uses: Use[];
    private _associations: Association[];

    constructor(name: string) {
        this._identifier = new Identifier(name);
        this._inherists = [];
        this._attributes = [];
        this._methods = [];
        this._compositions = [];
        this._uses = [];
        this._associations = [];
    }

    get name(): string {
        return this._identifier.value;
    }

    get getIdentifier(): Identifier {
        return this._identifier;
    }

    get getAttributes(): Attribute[] {
        return this._attributes;
    }

    hasInherit(): boolean {
        return this._inherists != null && this._inherists.length > 0;
    }

    hasAssociations(): boolean {
        return this._associations != null && this._associations.length > 0;
    }

    getInherits(): Class[] {
        return this._inherists;
    }

    getMethods(): Method[] {
        return this._methods;
    }

    getCompositions(): Composition[] {
        return this._compositions;
    }

    getUses(): Use[] {
        return this._uses;
    }

    getAssociations(): Association[] {
        return this._associations;
    }

    addAttribute(attribute: Attribute) {
        this._attributes.push(attribute);
    }

    addInherit(_class: Class) {
        this._inherists.push(_class);
    }

    addMethod(method: Method) {
        this._methods.push(method);
    }

    addComposition(composition: Composition) {
        this._compositions.push(composition);
    }

    addUse(use: Use) {
        this._uses.push(use);
    }

    addAsociation(association: Association) {
        this._associations.push(association);
    }

    copy(_classToCopy: Class) {
        this._copyIdentifier(_classToCopy._identifier);
        this._copyInherits(_classToCopy._inherists);
        this._copyMethods(_classToCopy._methods);
        this._copyAttributes(_classToCopy._attributes);
        this._copyAssociations(_classToCopy._associations);
        this._copyCompositions(_classToCopy._compositions);
        this._copyUses(_classToCopy._uses);
    }

    private _copyIdentifier(identifier: Identifier) {
        this._identifier = new Identifier(identifier.value);
    }

    private _copyInherits(inherits: Class[]) {
        inherits.forEach(
            (_inherit: Class) => {
                let inherit = new Class(_inherit.name);
                inherit.copy(_inherit);
                this._inherists.push(inherit);
            }
        )
    }

    private _copyMethods(methods: Method[]) {
        methods.forEach(
            (_method: Method) => {
                let method = new Method();
                method.setIdentifier(_method.identifier.value);
                this._methods.push(method);
                _method.parameters.forEach(
                    (_parameter: Parameter) => {
                        method.addParameter(_parameter.identifier.value, _parameter.type.value);
                    }
                )
            }
        )
    }

    private _copyAttributes(attributes: Attribute[]) {
        attributes.forEach(
            (attribute: Attribute) => {
                let _attribute: Attribute = new Attribute();
                _attribute.set(attribute.identifier.value, attribute.type.value);
                this._attributes.push(_attribute);
            }
        )
    }

    private _copyAssociations(associations: Association[]) {
        associations.forEach(
            (association: Association) => {
                association.identifiers.forEach(
                    (identifier: Identifier) => {
                        let _association: Association = new Association();
                        _association.addIdentifier(identifier.value);
                        this._associations.push(_association);
                    }
                )
            }
        )
    }

    private _copyCompositions(compositions: Composition[]) {
        compositions.forEach(
            (composition: Composition) => {
                composition.getIdentifiers().forEach(
                    (identifier: Identifier) => {
                        let _composition: Composition = new Composition();
                        _composition.addIdentifier(identifier.value);
                        this._compositions.push(_composition);
                    }
                )
            }
        )
    }

    private _copyUses(uses: Use[]) {
        uses.forEach(
            (use: Use) => {
                use.identifiers.forEach(
                    (identifier: Identifier) => {
                        let _use: Use = new Use();
                        _use.addIdentifier(identifier.value);
                        this._uses.push(_use);
                    }
                )
            }
        )
    }
}
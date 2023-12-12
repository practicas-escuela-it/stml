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

    empty(): void {
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
       let _classes: Class[] = [];
       this._inherists.forEach(
        (_class: Class) => {
          _classes.push(_class);
          _classes.push(..._class.getEfferentHierarchy());
        }
       )
        return this._inherists;
    }

    getMethods(): Method[] {
        return this._methods;
    }

    getCompositions(): Composition[] {
        return this._compositions;
    }

    getEfferentHierarchy(): Class[] {
      return [...this.getAssociationClasses(), ...this.getCompositionClasses(), ...this.getUseClasses(), ...this.getInherits()];
    }

    getCompositionClasses(): Class[] {
        let _classes: Class[] = [];
        this._compositions.forEach(
            (_composition: Composition) => {
               _composition.getClasses().forEach(
                (_class: Class) => {
                  _classes.push(_class);
                  _classes.push(..._class.getEfferentHierarchy());
                }
               )
            }
        );
        return _classes;
    }

    getUses(): Use[] {
        return this._uses;
    }

    getUseClasses(): Class[] {
        let _classes: Class[] = [];
        this._uses.forEach(
            (_use: Use) => {
               _use.classes.forEach(
                (_class: Class) => {
                   _classes.push(_class);
                   _classes.push(..._class.getEfferentHierarchy());
                }
               )
            }
        );
        return _classes;
    }

    getAssociations(): Association[] {
        return this._associations;
    }

    getAssociationClasses(): Class[] {
        let _classes: Class[] = [];
        this._associations.forEach(
            (_association: Association) => {
              _association.classes.forEach(
                (_class: Class) => {
                  _classes.push(_class);
                  _classes.push(..._class.getEfferentHierarchy());
                }
              )
            }
        );
        return _classes;
    }

    addAttribute(attribute: Attribute) {
        this._attributes.push(attribute);
    }

    removeAttribute(attributeToRemove: Attribute): void {
        this.removeAttributeByName(attributeToRemove.identifier.value);
    }

    removeAttributeByName(attributeName: string): void {
        let i: number = 0;
        this._attributes.forEach(
            (_attribute: Attribute) => {
               if (_attribute.identifier.value == attributeName) {
                  this._attributes.splice(i, 1);
                  return;
               }
               i++;
            }
        );
    }

    addInherit(_class: Class) {
        this._inherists.push(_class);
    }

    removeInherit(_class: Class): void {
        let i: number = 0;
        this._inherists.forEach(
           (_inherit: Class) => {
             if (_inherit.name == _class.name) {
                this._inherists.splice(i, 1);
                return;
             }
             i++;
           }
        )

    }

    addMethod(method: Method) {
        this._methods.push(method);
    }

    removeMethod(method: Method) {
       this.removeMethodByName(method.identifier.value);
    }

    removeMethodByName(methodName: string) {
        let i: number = 0;
        this._methods.forEach(
            (method: Method) => {
                if (method.identifier.value == methodName) {
                   this._methods.splice(i, 1);
                   return;
                }
                i++;
            }
        );
    }

    addComposition(composition: Composition) {
        this._compositions.push(composition);
    }

    removeComposition(compositionToRemove: Composition): void {
        let i: number = 0;
        this._compositions.forEach(
            (_composition: Composition) => {
                if (_composition.isEqualTo(compositionToRemove)) {
                    this._compositions.splice(i, 1);
                    return;
                }
                i++;
            }
        );
    }

    addUse(use: Use) {
        this._uses.push(use);
    }

    removeUse(useToRemove: Use) {
        let i: number = 0;
        this._uses.forEach(
            (_use: Use) => {
                if (_use.isEqualTo(useToRemove)) {
                    this._uses.splice(i, 1);
                    return;
                }
                i++;
            }
        );
    }

    addAsociation(association: Association) {
        this._associations.push(association);
    }

    removeAssociation(associationToRemove: Association) {
        let i: number = 0;
        this._associations.forEach(
            (_association: Association) => {
                if (_association.isEqualTo(associationToRemove)) {
                    this._associations.splice(i, 1);
                    return;
                }
                i++;
            }
        );
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

    private _copyInherits(inheritsToCopy: Class[]) {
        inheritsToCopy.forEach(
            (_classToCopy: Class) => {
                let _class = new Class(_classToCopy.name);
                _class.copy(_classToCopy);
                this._inherists.push(_class);
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

    private _copyAssociations(associationsToCopy: Association[]) {
        associationsToCopy.forEach(
            (associationToCopy: Association) => {
                let _association: Association = new Association();
                associationToCopy.classes.forEach(
                    (_classToCopy: Class) => {
                        let _class: Class = new Class(_classToCopy.name);
                        _class.copy(_classToCopy);
                        _association.addClass(_class);
                    }
                );
                this._associations.push(_association);
            }
        )
    }    

    private _copyCompositions(compositions: Composition[]) {
        compositions.forEach(
            (composition: Composition) => {
                let _composition: Composition = new Composition();
                composition.getClasses().forEach(
                    (_class: Class) => {
                        let _copyClass: Class = new Class(_class.name);
                        _copyClass.copy(_class);
                        _composition.addClass(_copyClass);
                    }
                );
                this._compositions.push(_composition);
            }
        )
    }

    private _copyUses(uses: Use[]) {
        uses.forEach(
            (use: Use) => {
                let _use: Use = new Use();
                use.classes.forEach(
                    (_class: Class) => {
                        let _copyClass: Class = new Class(_class.name);
                        _copyClass.copy(_class);
                        _use.addClass(_copyClass);
                    }
                );
                this._uses.push(_use);
            }
        )
    }

    hasAnyRelationWith(_classToSearch: Class): boolean {
        return this.hasAssociationRelationWith(_classToSearch) || this.hasCompositionRelationWith(_classToSearch) || this.hasInheritRelationWith(_classToSearch) || this.hasUseRelationWith(_classToSearch);
    }

    hasCompositionRelationWith(_classToSearch: Class): boolean {
        let result: boolean = false;
        this._compositions.forEach(
            (composition: Composition) => {
                composition.getClasses().forEach(
                    (_class: Class) => {
                        if (_class.name.trim() == _classToSearch.name.trim()) {
                            result = true;
                        }
                    }
                )
            }
        );
        return result;
    }

    hasAssociationRelationWith(_classToSearch: Class): boolean {
        let result: boolean = false;
        this._associations.forEach(
            (association: Association) => {
                association.classes.forEach(
                    (_class: Class) => {
                        if (_class.name.trim() == _classToSearch.name.trim()) {
                            result = true;
                        }
                    }
                )
            }
        );
        return result;
    }

    hasUseRelationWith(_classToSearch: Class): boolean {
        let result: boolean = false;
        this._uses.forEach(
            (use: Use) => {
                use.classes.forEach(
                    (_class: Class) => {
                        if (_class.name == _classToSearch.name) {
                            result = true;
                        }
                    }
                )
            }
        );
        return result;
    }

    hasInheritRelationWith(_class: Class): boolean {
        let result: boolean = false;
        this._inherists.forEach(
            (inherit: Class) => {
                if (inherit.name == _class.name) {
                    result = true;
                }
            }
        );
        return result;
    }
}

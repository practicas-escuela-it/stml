import { Attribute } from "./Attribute";
import { Identifier } from './Identifier';
import { Method } from "./Method";
import { Multiplicity } from "./Multiplicity";
import { Parameter } from "./Parameter";
import { Relation } from "./Relation";

export class Class {

    private _identifier: Identifier;
    private _inherists: Class[];
    private _attributes: Attribute[];
    private _methods: Method[];
    private _compositions: Relation[];
    private _uses: Relation[];
    private _associations: Relation[];

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

    getCompositions(): Relation[] {
        return this._compositions;
    }

    getEfferentHierarchy(): Class[] {
      return [...this.getAssociationClasses(), ...this.getCompositionClasses(), ...this.getUseClasses(), ...this.getInherits()];
    }

    getCompositionClasses(): Class[] {
        let _classes: Class[] = [];
        this._compositions.forEach(
            (_composition: Relation) => {
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

    getUses(): Relation[] {
        return this._uses;
    }

    getUseClasses(): Class[] {
        let _classes: Class[] = [];
        this._uses.forEach(
            (_use: Relation) => {
               _use.getClasses().forEach(
                (_class: Class) => {
                   _classes.push(_class);
                   _classes.push(..._class.getEfferentHierarchy());
                }
               )
            }
        );
        return _classes;
    }

    getAssociations(): Relation[] {
        return this._associations;
    }

    getAssociationClasses(): Class[] {
        let _classes: Class[] = [];
        this._associations.forEach(
            (_association: Relation) => {
              _association.getClasses().forEach(
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
        if (this._attributes.find((attr: Attribute) => attribute.identifier.value == attr.identifier.value) == null) {
           this._attributes.push(attribute);
        }
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
        if (this._methods.find((_method: Method) => _method.identifier.value == method.identifier.value) == null)
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

    addComposition(composition: Relation) {
        this._compositions.push(composition);
    }

    /*
    removeComposition(compositionToRemove: Composition): void {
        let i: number = 0;
        this._compositions.forEach(
            (_composition: Composition) => {
                if (_composition.isEqualTo(compositionToRemove)) {
                    _composition.removeClasses();
                    this._compositions.splice(i, 1);
                    return;
                }
                i++;
            }
        );
    }  */

    addUse(use: Relation) {
        this._uses.push(use);
    }

    removeUse(useToRemove: Relation) {
        let i: number = 0;
        this._uses.forEach(
            (_use: Relation) => {
                if (_use.isEqualTo(useToRemove)) {
                    this._uses.splice(i, 1);
                    return;
                }
                i++;
            }
        );
    }

    addAsociation(associationToAdd: Relation) {
      this._associations.push(associationToAdd);
    }

    removeEfferentHierarchy(): void {
      this.removeAssociations();
      this.removeCompositions();
      this.removeUses();
      this.removeInherits();
    }

    removeAssociations(): void {
      this._associations.splice(0, this._associations.length);
      this._associations = [];
    }

    removeCompositions(): void {
      this._compositions.splice(0, this._compositions.length);
      this._compositions = [];
    }

    removeUses(): void {
      this._uses.splice(0, this._uses.length);
      this._uses = [];
    }

    removeInherits(): void {
      this._inherists.splice(0, this._inherists.length);
      this._inherists = [];
    }

    removeEfferentClass(_classToRemove: Class) {
      this.removeClassFromAssociations(_classToRemove);
      this.removeClassFromCompositions(_classToRemove);
      this.removeClassFromUses(_classToRemove);
      this.removeClassFromInherits(_classToRemove);
    }

    removeClassFromAssociations(_classToRemove: Class): void {
       this._associations.forEach(
        (_association: Relation) => {
          let i: number = 0;
          _association.getClasses().forEach(
            (_class: Class) => {
              if (_class.name == _classToRemove.name) {
                 _association.getClasses().splice(i, 1);
                 return;
              }
              i++;
            }
          )
        }
       )
    }

    removeClassFromCompositions(_classToRemove: Class): void {
      this._compositions.forEach(
       (_composition: Relation) => {
         let i: number = 0;
         _composition.getClasses().forEach(
           (_class: Class) => {
             if (_class.name == _classToRemove.name) {
              _composition.getClasses().splice(i, 1);
                return;
             }
             i++;
           }
         )
       }
      )
   }

   removeClassFromUses(_classToRemove: Class): void {
    this._uses.forEach(
     (_use: Relation) => {
       let i: number = 0;
       _use.getClasses().forEach(
         (_class: Class) => {
           if (_class.name == _classToRemove.name) {
            _use.getClasses().splice(i, 1);
              return;
           }
           i++;
         }
       )
     }
    )
 }

    removeClassFromInherits(_classToRemove: Class): void {
      let i: number = 0;
      this._inherists.forEach(
        (_class: Class) => {
          if (_class.name == _classToRemove.name) {
             this._inherists.splice(i, 1);
             return;
          }
          i++;
        });
    }

    removeAssociation(associationToRemove: Relation) {
        let i: number = 0;
        this._associations.forEach(
            (_association: Relation) => {
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
        this._inherists = [];
        inheritsToCopy.forEach(
            (_classToCopy: Class) => {
                let _class = new Class(_classToCopy.name);
                _class.copy(_classToCopy);
                this._inherists.push(_class);
            }
        )
    }

    private _copyMethods(methods: Method[]) {
        this._methods = [];
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
      this._attributes = [];
        attributes.forEach(
            (attribute: Attribute) => {
                let _attribute: Attribute = new Attribute();
                _attribute.set(attribute.identifier.value, attribute.type.value);
                this._attributes.push(_attribute);
            }
        )
    }

    private _copyAssociations(associationsToCopy: Relation[]) {
      this._associations = [];
        associationsToCopy.forEach(
            (associationToCopy: Relation) => {
                let _association: Relation = new Relation();
                associationToCopy.getClasses().forEach(
                    (_classToCopy: Class) => {
                        let _class: Class = new Class(_classToCopy.name);
                        _class.copy(_classToCopy);
                        _association.addClass(_class);
                        if (associationToCopy.hasMultiplicityWith(_class.name)) {
                          let _multiplicity: Multiplicity = new Multiplicity();
                          _multiplicity.copy(associationToCopy.getMultiplicityWith(_class.name));
                          _association.addMultiplicity(_class.name, _multiplicity);
                        }
                    }
                );
                this._associations.push(_association);
            }
        )
    }

    private _copyCompositions(compositions: Relation[]) {
        this._compositions = [];
        compositions.forEach(
            (composition: Relation) => {
                let _composition: Relation = new Relation();
                composition.getClasses().forEach(
                    (_class: Class) => {
                        let _copyClass: Class = new Class(_class.name);
                        _copyClass.copy(_class);
                        _composition.addClass(_copyClass);
                        if (composition.hasMultiplicityWith(_class.name)) {
                          let _multiplicity: Multiplicity = new Multiplicity();
                          _multiplicity.copy(composition.getMultiplicityWith(_class.name));
                          _composition.addMultiplicity(_class.name, _multiplicity);
                        }
                    }
                );
                this._compositions.push(_composition);
            }
        )
    }

    private _copyUses(uses: Relation[]) {
        this._uses = [];
        uses.forEach(
            (use: Relation) => {
                let _use: Relation = new Relation();
                use.getClasses().forEach(
                    (_class: Class) => {
                        let _copyClass: Class = new Class(_class.name);
                        _copyClass.copy(_class);
                        _use.addClass(_copyClass);
                        if (use.hasMultiplicityWith(_class.name)) {
                          let _multiplicity: Multiplicity = new Multiplicity();
                          _multiplicity.copy(use.getMultiplicityWith(_class.name));
                          _use.addMultiplicity(_class.name, _multiplicity);
                        }
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
            (composition: Relation) => {
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
            (association: Relation) => {
                association.getClasses().forEach(
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
            (use: Relation) => {
                use.getClasses().forEach(
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

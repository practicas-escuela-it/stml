import { Association } from "./Asociation";
import { Class } from "./Class";
import { Composition } from "./Composition";
import { Use } from "./Use";

export class Model {

  private _classes: Map<string, Class>;

  constructor() {
    this._classes = new Map<string, Class>();
  }

  getClasses(): Class[] {
    let _classes: Class[] = []
    if (this._classes.size > 0) {
      this._classes.forEach(
        (value: Class, key: string) => {
          _classes.push(value);
        }
      );
    }
    return _classes;
  }

  hasClasses(): boolean {
    return this._classes.size > 0;
  }

  getClass(className: string): Class {
    return this._classes.get(className) as Class;
  }

  addClass(_class: Class): void {
    if (!this._classes.has(_class.name)) {
      this._classes.set(_class.name, _class);
    }
  }

  removeAssociationsOf(_settedClass: Class): void {
    let _classesToRemove: Class[] = [];
    let _refClass: Class | undefined = this._classes.get(_settedClass.name);
    if (_refClass) {
      _refClass.getAssociations().forEach(
        (_association: Association) => {
          _association.classes.forEach(
            (_class: Class) => {
              _classesToRemove.push(...this._getClassesToRemove(_class));
            }
          );
        }
      );
      _refClass.removeAssociations();
      this.removeClasses(_classesToRemove);
    }
  }

  private _getClassesToRemove(_class: Class): Class[] {
    let _classesToRemove: Class[] = [];
    _classesToRemove.push(_class);
    _classesToRemove.push(..._class.getEfferentHierarchy());
    return _classesToRemove;
  }

  removeCompositionsOf(_settedClass: Class) {
    let _classesToRemove: Class[] = [];
    let _refClass: Class | undefined = this._classes.get(_settedClass.name);
    if (_refClass) {
      _refClass.getCompositions().forEach(
        (_composition: Composition) => {
          _composition.getClasses().forEach(
            (_class: Class) => {
                _classesToRemove.push(...this._getClassesToRemove(_class));
            }
          )
        }
      );
      _refClass.removeCompositions();
      this.removeClasses(_classesToRemove);
    }
  }

  removeInheritsOf(_settedClass: Class): void {
    let _classesToRemove: Class[] = [];
    let _refClass: Class | undefined = this._classes.get(_settedClass.name);
    if (_refClass) {
      _refClass.getInherits().forEach(
        (_class: Class) => {
          _classesToRemove.push(...this._getClassesToRemove(_class));
        }
      );
      _refClass.removeInherits();
      this.removeClasses(_classesToRemove);
    }
  }

  removeUsesOf(_settedClass: Class): void {
    let _classesToRemove: Class[] = [];
    let _refClass: Class | undefined = this._classes.get(_settedClass.name);
    if (_refClass) {
      _refClass.getUses().forEach(
        (_use: Use) => {
          _use.classes.forEach(
            (_class: Class) => {
                _classesToRemove.push(...this._getClassesToRemove(_class));
            }
          )
        }
      );
      _refClass.removeUses();
      this.removeClasses(_classesToRemove);
    }
  }

  addEfferentHierarchyOf(_diagramClass: Class): void {
    let _refClass: Class | undefined = this._classes.get(_diagramClass.name);
    if (_refClass) {
      this._addEfferentAssociationClassesOf(_refClass);
      this._addEfferentCompositionClassesOf(_refClass);
      this._addEfferentUseClassesOf(_refClass);
      this._addEfferentInheritClassesOf(_refClass);
    }
  }

  private _addEfferentAssociationClassesOf(_class: Class): void {
    _class.getAssociations().forEach(
      (_association: Association) => {
        _association.classes.forEach(
          (_associationClass: Class) => {
            this.addClass(_associationClass);
            this.addClasses(_associationClass.getEfferentHierarchy());
          }
        )
      }
    );
  }

  private _addEfferentCompositionClassesOf(_class: Class): void {
    _class.getCompositions().forEach(
      (_composition: Composition) => {
        _composition.getClasses().forEach(
          (_compositionClass: Class) => {
            this.addClass(_compositionClass);
            this.addClasses(_compositionClass.getEfferentHierarchy());
          }
        )
      }
    )
  }

  private _addEfferentUseClassesOf(_class: Class): void {
    _class.getUses().forEach(
      (_use: Use) => {
        _use.classes.forEach(
          (_useClass: Class) => {
            this.addClass(_useClass);
            this.addClasses(_useClass.getEfferentHierarchy());
          }
        )
      }
    )
  }

  private _addEfferentInheritClassesOf(_class: Class): void {
    _class.getInherits().forEach(
      (_inheritClass: Class) => {
        this.addClass(_inheritClass);
        this.addClasses(_inheritClass.getEfferentHierarchy());
      }
    )
  }

  getEfferentHierarchyOf(_settedClass: Class) {
    let _efferentClasses: Class[] = [];
    let _refClass: Class | undefined = this._classes.get(_settedClass.name);
    if (_refClass) {
      let _class: Class | undefined = this._classes.get(_settedClass.name);
      if (_class != null) {
        _efferentClasses.push(...this.getEfferentAssociationsOf(_class));
        _efferentClasses.push(...this.getEfferentCompositionsOf(_class));
        _efferentClasses.push(...this.getEfferentUsesOf(_class));
        _efferentClasses.push(...this.getEfferentInheritsOf(_class));
      }
    }
    return _efferentClasses;
  }

  getEfferentAssociationsOf(_class: Class): Class[] {
    let _efferentClasses: Class[] = [];
    _class.getAssociations().forEach(
      (association: Association) => {
        association.classes.forEach(
          (_class: Class) => {
            let _copyClass: Class = new Class(_class.name);
            _copyClass.copy(_class);
            _efferentClasses.push(_copyClass);
          }
        )
      }
    );
    return _efferentClasses;
  }

  getEfferentCompositionsOf(_class: Class): Class[] {
    let _efferentClasses: Class[] = [];
    _class.getCompositions().forEach(
      (composition: Composition) => {
        composition.getClasses().forEach(
          (_class: Class) => {
            let _copyClass: Class = new Class(_class.name);
            _copyClass.copy(_class);
            _efferentClasses.push(_copyClass);
          }
        )
      }
    );
    return _efferentClasses;
  }

  getEfferentUsesOf(_class: Class): Class[] {
    let _afferentClasses: Class[] = [];
    _class.getUses().forEach(
      (use: Use) => {
        use.classes.forEach(
          (_class: Class) => {
            _afferentClasses.push(_class);
          }
        )
      }
    );
    return _afferentClasses;
  }

  getEfferentInheritsOf(_class: Class): Class[] {
    return _class.getInherits();
  }

  getAfferentHierarchyTo(_diagramClass: Class): Class[] {
    let _afferentClasses: Class[] = [];
    let _refClass: Class | undefined = this._classes.get(_diagramClass.name);
    if (_refClass) {
      this._classes.forEach(
        (_class: Class) => {
          if (_class.name != _diagramClass.name && _class.hasAnyRelationWith(_diagramClass)) {
            let _afferentClass: Class = new Class(_class.name);
            _afferentClass.copy(_class);
            _afferentClasses.push(_afferentClass);
            _afferentClasses.push(...this.getAfferentHierarchyTo(_class));
          }
        }
      );
    }
    return _afferentClasses;
  }

  hasAfferentHierarchyTo(_settedClass: Class, count: number): boolean {
    return this.getAfferentHierarchyTo(_settedClass).length == count;
  }

  addClasses(_classes: Class[]): void {
    _classes.forEach(
      (_class: Class) => {
        if (!this._classes.has(_class.name)) {
          this.addClass(_class);
        }
      }
    );
  }

  removeClass(_class: Class): void {
    let _index: number = 0;
    if (this._classes.has(_class.name)) {
      this._classes.delete(_class.name);
    }
  }

  removeClasses(_classes: Class[]): void {
    _classes.forEach(
      (_class: Class) => {
          this.removeClass(_class);
      }
    );
  }

  existsClass(className: string): boolean {
    return this._classes.has(className);
  }

  copy(model: Model) {
    model.getClasses().forEach(
      (_classToCopy: Class) => {
        let _class = new Class(_classToCopy.name);
        _class.copy(_classToCopy);
        this._classes.set(_class.name, _class);
      }
    )
  }
}

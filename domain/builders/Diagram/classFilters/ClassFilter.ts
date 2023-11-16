import { Class } from '../../../entities/Class';
import { Model } from '../../../entities/Model';
import { AfferentAssociationFilter } from './AfferentAssociationFilter';
import { AfferentCompositionFilter } from './AfferentCompositionFilter';
import { AfferentInheritFilter } from './AfferentInheritFilter';
import { AfferentUseFilter } from './AfferentUseFilter';
import { ClassElementFilter } from './ClassElementFilter';
import { ClassFilterActionType } from './ClassFilterOptionType';
import { Direction } from "./Direction";
import { EfferentAssociationFilter } from './EfferentAssociationFilter';
import { EfferentCompositionFilter } from './EfferentCompositionFilter';
import { EfferentInheritFilter } from './EfferentInheritFilter';
import { EfferentUseFilter } from './EfferentUseFilter';

export class ClassFilter {
    private _class: Class;
    private _model: Model;    
    private _filteredModel: Model;
    private _classElementsFilter: ClassElementFilter[];

    constructor(_class: Class, _model: Model, filteredModel: Model) {
        this._class = _class;
        this._model = _model;
        this._filteredModel = filteredModel;
        this._classElementsFilter = [];
    }

    addCompositions(direction: Direction): void {
        if (direction == Direction.EFFERENT) {
            this._classElementsFilter.push(new EfferentCompositionFilter(this._class));
        } else {
            this._classElementsFilter.push(new AfferentCompositionFilter(this._class, this._model));
        }
        
    }   

    addAssociations(direction: Direction): void {
        if (direction == Direction.EFFERENT) {
            this._classElementsFilter.push(new EfferentAssociationFilter(this._class));
        } else {
            this._classElementsFilter.push(new AfferentAssociationFilter(this._class, this._model));
        }
    }   

    addInherits(direction: Direction): void {
        if (direction == Direction.EFFERENT) {
            this._classElementsFilter.push(new EfferentInheritFilter(this._class));
        } else {
            this._classElementsFilter.push(new AfferentInheritFilter(this._class, this._model));
        }
    }   

    addUses(direction: Direction): void {
        if (direction == Direction.EFFERENT) {
            this._classElementsFilter.push(new EfferentUseFilter(this._class));
        } else {
            this._classElementsFilter.push(new AfferentUseFilter(this._class, this._model));
        }
    }    

    apply(): void {
        this._classElementsFilter.forEach(
            (classElementFilter: ClassElementFilter) => {
                classElementFilter.getFilteredClasses().forEach(
                    (_class: Class) => {
                        this._filteredModel.addClass(_class);
                    }
                )                
            }
        )
    }
}
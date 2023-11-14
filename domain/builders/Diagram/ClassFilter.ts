import { ClassFilterActionType } from './ClassFilterOptionType';
import { Direction } from "./Direction";

export class ClassFilter {
    private _className: string;
    private _withEfferentCompositions: ClassFilterActionType;
    private _withEfferentAssociations: ClassFilterActionType;
    private _withEfferentInherits: ClassFilterActionType;
    private _withEfferentUses: ClassFilterActionType;
    private _withAfferentCompositions: ClassFilterActionType;
    private _withAfferentAssociations: ClassFilterActionType;
    private _withAfferentInherits: ClassFilterActionType;
    private _withAfferentUses: ClassFilterActionType

    constructor(className: string) {
        this._className = className;
        this._withEfferentAssociations = ClassFilterActionType.NO_APPLY;
        this._withEfferentCompositions = ClassFilterActionType.NO_APPLY;
        this._withEfferentInherits = ClassFilterActionType.NO_APPLY;
        this._withEfferentUses = ClassFilterActionType.NO_APPLY;
        this._withAfferentAssociations = ClassFilterActionType.NO_APPLY;
        this._withAfferentCompositions = ClassFilterActionType.NO_APPLY;
        this._withAfferentInherits = ClassFilterActionType.NO_APPLY;
        this._withAfferentUses = ClassFilterActionType.NO_APPLY;
    }

    addCompositions(direction: Direction): void {
        if (direction == Direction.EFFERENT) {
           this._withEfferentCompositions = ClassFilterActionType.ADD;
        } else {
            this._withAfferentCompositions = ClassFilterActionType.ADD;
        }
    }

    removeCompositions(direction: Direction): void {
       this._withEfferentCompositions = ClassFilterActionType.REMOVE;
    }

    addAssociations(direction: Direction): void {
        this._withEfferentAssociations = ClassFilterActionType.ADD;
    }

    removeAssociations(direction: Direction): void {
        this._withEfferentAssociations = ClassFilterActionType.REMOVE;
    }

    addInherits(direction: Direction): void {
        this._withEfferentInherits = ClassFilterActionType.ADD;
    }

    removeInherits(direction: Direction): void {
        this._withEfferentInherits = ClassFilterActionType.REMOVE;
    }

    addUses(direction: Direction): void {
        this._withEfferentUses = ClassFilterActionType.ADD;
    }

    removeUses(direction: Direction): void {
        this._withEfferentUses = ClassFilterActionType.REMOVE;
    }

    
}
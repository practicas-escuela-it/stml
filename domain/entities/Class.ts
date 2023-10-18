class Class {
    private _identifier: Identifier;
    private _inherists: Identifier[];
    private _attributes: Attribute[];
    private _methods: Method[];
    private _compositions: Composition[];
    private _uses: Use[];
    private _asociations: Asociation[];

    constructor(name: string) {
        this._identifier = new Identifier(name);
        this._inherists = [];
        this._attributes = [];
        this._methods = [];
        this._compositions = [];
        this._uses = [];
        this._asociations = [];
    }

    get getIdentifier(): Identifier {
        return this._identifier;
    }

    get getInherits(): Identifier[] {
        return this._inherists;
    }

    get getAttributes(): Attribute[] {
        return this._attributes;
    }
}
import { Class } from "../../../entities/Class";
import { ClassElementFilter } from "./ClassElementFilter";

export class AttributeFilter extends ClassElementFilter {

    constructor(_class: Class) {
        super(_class)
    }

    getFilteredElements(): Class[] {
        // TODO
        return [];
    }

}
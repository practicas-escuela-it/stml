export class Strings {

    clearSpaces(input: string): string {
        input = input.replace(/\s+/g, " ");
        input = input.replace(/\s*\(\s*/g, "(");
        input = input.replace(/\s*\)\s*/g, ") ");
        input = input.replace(/\s*,\s*/g, ",");
        return input;
    } 
}
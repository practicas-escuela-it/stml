export class Assert {    

    static test(condition: boolean, message: string) {
       if (!condition) {
        console.warn(message);
       }
    }
}
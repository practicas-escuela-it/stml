class Analizer {
    getAttribute(input: string) {
        let words = input.trim().split(' ');
        return words.length == 2
            && isIdentifier(words[0])
            && isIdentifier(words[1]);
    }

    getIdentifier(identifier: string) {
        isIdentifier = /^[a-zA-Z_]+\s*/.test(identifier.trim());

        return /^[a-zA-Z_]+\s*/.test(identifier.trim());
    }
}
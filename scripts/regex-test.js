function isIdentifier(identifier) {
    return /^[a-zA-Z_]+\s*/.test(identifier.trim());
}

function isType(type) {
    return /(int|decimal|string|date|bool)/.test(type.trim());
}

function isAttribute(attribute) {
    let words = attribute.trim().split(' ');
    return words.length == 2
        && isIdentifier(words[0])
        && isType(words[1]);
}

function isAttributeList(attributesList) {
    let isValidAttribute = attributesList.length == 0;

    if (startWith(attributesList, 'attribute') && attributesList.length > 0) {
        let attributes = removeText(attributesList, 'attribute').split(',');
        let index = 0;
        do {
            isValidAttribute = isAttribute(attributes[index])
            index++;
        } while (index < attributes.length && isValidAttribute);
    }
    return startWith(attributesList, 'attribute')
        && isValidAttribute;
}

function startWith(text, startText) {
    return text.indexOf(startText) == 0;
}

function removeText(text, textToRemove) {
    return text.replace(textToRemove, '');
}

// let container = document.querySelector('div');
// const identifiers = ["claseDePrueba", "otraClase1", "otraClase*"];
// container.innerHTML += `<h1>Testing Identifier</h1>`;
// identifiers.forEach(identifier => {
//     container.innerHTML += `<h2>${identifier}: ${isIdentifier(identifier)}</h2>`;
// });

// container.innerHTML += '<br><br>'
// container.innerHTML += `<h1>Testing Type</h1>`;
// let types = ['int', 'decimal', 'string', 'date', 'bool', 'varchar'];
// types.forEach(type => {
//     container.innerHTML += `<h2>${type}: ${isType(type)}</h2>`;
// });

// container.innerHTML += '<br><br>'
// container.innerHTML += `<h1>Testing Attribute</h1>`;
// let attributes = ['name string', 'age int', 'string name'];
// attributes.forEach(attribute => {
//     container.innerHTML += `<h2>${attribute}: ${isAttribute(attribute)}</h2>`;
// });

// container.innerHTML += '<br><br>'
// container.innerHTML += `<h1>Testing Attributes</h1>`;
// let attributesList = ['name string, age int', 'name string, int age'];
// attributesList.forEach(attributes => {
//     container.innerHTML += `<h2>${attributes}: ${isAttributeList(attributes)}</h2>`;
// });


let attributeExample = 'attribute name string, age int';
console.log(isAttributeList(attributeExample));
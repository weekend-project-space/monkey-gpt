import {
    Readability
} from '@mozilla/readability'

export function getSimpleText(doc) {
    doc = doc ? doc : document;
    doc = doc.cloneNode(true)
    const app = doc.querySelector('#monkeygpt')
    app.remove()
    let article = new Readability(doc).parse();
    let str = replaceEmpty(article.textContent)
    return str
}

function replaceEmpty(str) {
    while (str.includes('  ')) {
        str = str.replaceAll('  ', ' ')
    }
    while (str.includes('\n\n')) {
        str = str.replaceAll('\n\n', '\n');
    }
    while (str.includes('\t\t')) {
        str = str.replaceAll('\t\t', '\t');
    }
    return str
}
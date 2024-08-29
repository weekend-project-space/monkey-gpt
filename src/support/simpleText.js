import {
    Readability
} from '@mozilla/readability'

export function getSimpleText(doc) {
    doc = doc ? doc : document;
    doc = doc.cloneNode(true)
    const app = doc.querySelector('#monkeygpt')
    app.remove()
    let article = new Readability(doc).parse();
    return article.textContent
}
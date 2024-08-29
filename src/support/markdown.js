import {
    marked
} from "marked"
export function md2html(md) {
    return marked(md)
}
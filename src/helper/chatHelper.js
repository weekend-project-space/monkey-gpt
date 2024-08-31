import {
    chat as chat0
} from '../support/chatgpt'

const defaultConfig = {
    model: 'gpt-4o-mini',
    apiKey: '',
    apiEndpoint: 'https://ai.01234.fun/v1/chat/completions'
}

export async function chat(content, config = defaultConfig) {
    return await chat0([{
        role: 'user',
        content: content
    }], config.model, config.apiKey, config.apiEndpoint)
}

export async function summarize(text, config = defaultConfig) {
    return chat(`请帮忙总结一下 :"${text}"`, config)
}

export async function ask(text, config = defaultConfig) {
    return chat(`请帮忙回复一下 :"${text}"`, config)
}

export async function search(text, config = defaultConfig) {
    return chat(`现在你是谷歌，请帮忙回答一下 :"${text}"`, config)
}
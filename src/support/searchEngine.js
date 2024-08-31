const engineQueryKey = {
    'www.google.com': 'q',
    'www.baidu.com': 'wd',
    'www.bing.com': 'q',
    'www.so.com': 'q'
}

export function getSearchKey() {
    const seName = getSeName()
    if (seName) {
        return new URLSearchParams(location.search).get(engineQueryKey[seName])
    } else {
        return null
    }
}

function getSeName() {
    const se = Object.keys(engineQueryKey)
    const seNames = se.filter(s => window.location.host.includes(s));
    return seNames.length > 0 ? seNames[0] : null
}
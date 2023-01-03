import fetch from 'node-fetch'
import { basename } from 'path'

const stack = () => {
    const stackTrace = (new Error()).stack!
    const stackLines = stackTrace.split('\n')
    const rawFileLine = stackLines.find((item) => item.includes('file://'))

    if (!rawFileLine)  {
        return {
            file: null
        }
    }   

    const filePosition = rawFileLine.indexOf('file://')
    const fileLine = rawFileLine.substring(filePosition).replace('file://', '')
    const fileTokens = fileLine.split(':')
    return {
        file: {
            line: Number(fileTokens[1]),
            name: basename(fileTokens[0]),
            path: fileTokens[0]
        }
    }
}

const dibug =  async (data: string|number|object|null) => {
    try {
        await fetch('http://localhost:33285', {
            method: 'POST',
            body: JSON.stringify({
                type: 'info',
                data,
                ...stack()
            })
        })
    } catch (exception) {}
}

export default dibug
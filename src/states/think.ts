import { atomWithStorage } from 'jotai/utils'

const storage = {
    getItem: (key: string) => {
        const item = localStorage.getItem(key)
        if (item) {
            return JSON.parse(item)
        }
        return null
    },
    setItem: (key: string, value: boolean) => {
        localStorage.setItem(key, JSON.stringify(value))
    },
    removeItem: (key: string) => {
        localStorage.removeItem(key)
    },
}

const thinkAtom = atomWithStorage('think', true, storage, {
    getOnInit: true,
})

export default thinkAtom

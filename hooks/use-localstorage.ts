import { useState } from 'react'

type SetValue<T> = (value: T | ((val: T) => T)) => void

const useLocalStorage = <T>(key: string, initialValue: T): [T, SetValue<T>] => {
    const [state, setState] = useState<T>(() => {
        try {
            const value = window.localStorage.getItem(key)
            return value ? JSON.parse(value) : initialValue
        } catch (error) {
            console.error(error)
            return initialValue
        }
    })

    const setValue: SetValue<T> = value => {
        try {
            const valueToStore = value instanceof Function ? value(state) : value
            window.localStorage.setItem(key, JSON.stringify(valueToStore))
            setState(valueToStore)
        } catch (error) {
            console.error(error)
        }
    }

    return [state, setValue]
}

export default useLocalStorage

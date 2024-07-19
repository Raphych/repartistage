export default function useArray(array, onChange, allowEmpty) {

    function setArray(newArray, inputName) {
        onChange({ target: { name: inputName, value: newArray } })
    }

    function push(element) {
        const updatedArray = [...array, element]
        onChange(updatedArray)
    }

    function filter(callback) {
        const updatedArray = array.filter(callback)
        if (!updatedArray.length > 0 && !allowEmpty)
            return;
        onChange(updatedArray)
    }

    function update(index, newElement) {
        const updatedArray = [...array.slice(0, index), newElement, ...array.slice(index + 1, array.length)]
        if (!updatedArray.length > 0 && !allowEmpty)
            return;
        onChange(updatedArray)
    }

    function remove(index) {
        const updatedArray = [...array.slice(0, index), ...array.slice(index + 1, array.length)]
        if (!updatedArray.length > 0 && !allowEmpty)
            return;
        onChange(updatedArray)
    }

    function clear() {
        if (!allowEmpty)
            return;
        onChange([])
    }

    return { push, set: setArray, filter, update, remove, clear }
}
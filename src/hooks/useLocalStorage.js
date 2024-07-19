// useLocalStorage.js
import { useState } from 'react';

export function useLocalStorage(key, initialValue) {
    // Get stored value from local storage or use initial value
    const storedValue = JSON.parse(localStorage.getItem(key)) || initialValue;

    // State to hold the current value
    const [value, setValue] = useState(storedValue);

    // Update local storage and state when the value changes
    function updateValue (newValue) {
        setValue(newValue);
        localStorage.setItem(key, JSON.stringify(newValue));
    }

    return [value, updateValue];
}
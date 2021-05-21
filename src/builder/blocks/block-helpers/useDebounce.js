import { useRef, useState, useMemo, useEffect } from 'react'
import debounce from 'lodash.debounce'

/**
 * Debounces a value while still providing access to the latest non-debouned value.
 * @param {number} delay Amount in miliseconds to debounce by.
 * @param {object} initialValue Initial value for both `value` and `debouncedValue`.
 * @returns {Array<object, object, function>} Returns an array with
 * [
 *  value: current value
 *  debouncedValue: debounced value
 *  setValue: function to update value
 * ]
 */
function useDebouncedValue(initialValue, delay) {
  const [value, setValue] = useState(initialValue)
  const [debouncedValue, setDebouncedValueRaw] = useState(initialValue)
  const firstUpdate = useRef(true)
  const setDebouncedValue = useMemo(() => {
    return debounce(setDebouncedValueRaw, delay, {
      leading: false,
      trailing: true,
    })
  }, [delay])

  useEffect(() => {
    if (!firstUpdate.current) {
      setDebouncedValue(value)
    } else {
      firstUpdate.current = false
    }
  }, [setDebouncedValue, value])

  return [value, debouncedValue, setValue]
}

export default useDebouncedValue

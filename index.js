import isObjectLiteral from 'is-object-literal';
import { NO_TRANSFORMATION_ERROR_MESSAGE } from './constants';

/**
 * Creates a deep clone of a JSON data structure with keys transformed by a provided function.
 *
 * @param  {Object}   object The object which keys' you wish to transform
 * @param  {Function} transform The transformation function you wish to use on the object's keys
 * @param  {Object}   [options={}] Additional options
 * @param  {Boolean}  [options.deep=true] Whether or not to transform the object's keys recursively
 * @param  {Number}   [options.recursionLevel] How deep should the transformation go
 * @return {Object}  The new, transformed object
 *
 * @throws           Throws an exception if no transformation function is provided
 *
 * @example
 * const transformFn = (value) => `_${value}`;
 * const transformed = transformKeys({key: 1}, transformFn);
 * // {_key: 1}
 */
const transformKeys = (object, transform, { deep = true, recursionLevel } = {}) => {
    if (typeof transform !== 'function') {
        throw new Error(NO_TRANSFORMATION_ERROR_MESSAGE);
    }

    const isArray = Array.isArray(object);
    const newObject = isArray ? [] : {};
    const recursionFallback = deep ? Infinity : 1;

    recursionLevel = typeof recursionLevel !== 'undefined' ? recursionLevel : recursionFallback;

    for (const key in object) {
        const value = object[key];
        const isValueObject = isObjectLiteral(value);
        const isValueArray = Array.isArray(value);
        const shouldTransform = recursionLevel > 0 && !isArray;
        const newKey = shouldTransform ? transform(key) : key;
        const newValue = isValueObject || isValueArray ? transformKeys(value, transform, {
            deep,
            recursionLevel: recursionLevel - 1,
        }) : value;

        newObject[newKey] = newValue;
    }

    return newObject;
};

export default transformKeys;

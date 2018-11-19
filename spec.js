import _ from 'lodash';
import transformKeys from '.';
import { NO_TRANSFORMATION_ERROR_MESSAGE } from './constants';

const TRANSFORM_FUNCTION = _.camelCase;

describe('transformKeys', () => {
    it('Transforms a given object\'s keys, regardless of the case convention used', () => {
        const nonCamlizedObject = {
            snake_key: 1,
            PascalKey: 1,
            'kebab-key': 1,
            '__JuSt_-_weIrd': 1,
        };
        const transformedObject = transformKeys(nonCamlizedObject, TRANSFORM_FUNCTION);
        const expectedObject = {
            snakeKey: 1,
            pascalKey: 1,
            kebabKey: 1,
            juStWeIrd: 1,
        };

        expect(transformedObject).toEqual(expectedObject);
    });

    it('Generates a new object and not a pointer', () => {
        const object = {
            firstLevel: {
                secondLevel: 1,
            },
        };
        const transformedObject = transformKeys(object, TRANSFORM_FUNCTION);

        expect(transformedObject.firstLevel).not.toBe(object.firstLevel);
    });

    it('Transforms keys recursively indefinitely', () => {
        const object = {
            first_level: {
                second_level: 1,
            },
        };
        const expectedObject = {
            firstLevel: {
                secondLevel: 1,
            },
        };
        const transformedObject = transformKeys(object, TRANSFORM_FUNCTION, { deep: true });

        expect(transformedObject).toEqual(expectedObject);
    });

    it('Transforms keys recursively, to a certain level', () => {
        const object = {
            first_level: {
                second_level: 1,
            },
        };
        const expectedObject = {
            firstLevel: {
                second_level: 1,
            },
        };
        const transformedObject = transformKeys(object, TRANSFORM_FUNCTION, { deep: true, recursionLevel: 1 });

        expect(transformedObject).toEqual(expectedObject);
    });

    it('Throws an error if a transformation function wasn\'t passed', () => {
        const badUsage = () => transformKeys({});

        expect(badUsage).toThrowError(NO_TRANSFORMATION_ERROR_MESSAGE);
    });

    it('Throws an error if not passed a function as the second argument', () => {
        const badValues = [
            1,
            'string',
            [],
            {},
        ];

        badValues.forEach((value) => {
            const badUsage = () => transformKeys({}, value);

            expect(badUsage).toThrowError(NO_TRANSFORMATION_ERROR_MESSAGE);
        });
    });
});

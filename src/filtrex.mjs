// the parser is dynamically generated from generateParser.js at compile time
import { parser } from './parser.mjs'
import { hasOwnProperty, bool, num, simple, mod, arr, str, flatten, code, ensureFunc } from './utils.mjs'
import { UnknownFunctionError, UnknownPropertyError, UnknownOptionError, InternalError } from './errors.mjs'

export { UnknownFunctionError, UnknownPropertyError, UnknownOptionError, InternalError } from './errors.mjs'

export const cast = {
    asBoolean: bool,
    asNumber: num,
    asSimple: simple, 
    asArray: arr,
    asString: str,
    asFunction: ensureFunc
}

// Shared utility functions
const std =
{

    isfn(fns, funcName) {
        return hasOwnProperty(fns, funcName) && typeof fns[funcName] === "function"
    },

    unknown(funcName) {
        throw new UnknownFunctionError(funcName)
    },

    coerceArray: arr,
    coerceNumber: num,
    coerceNumberOrString: simple,
    coerceBoolean: bool,

    isSubset(a, b) {
        const A = arr(a)
        const B = arr(b)
        return A.every( val => B.includes(val) )
    },

    warnDeprecated: (function () {
        const warnMax = 3

        let warnedTimes = {
            noop: 0
        }

        return (cause, value) => {
            switch (cause) {
                case 'noop':
                    if (warnedTimes.noop++ >= warnMax) break
                    console.warn(
                        "noop"
                    )
                    break
            }

            return value
        }

    })(),

    buildString(quote, literal)
    {
        quote = String(quote)[0]
        literal = String(literal)
        let built = ''

        if (literal[0] !== quote || literal[literal.length-1] !== quote)
            throw new InternalError(`Unexpected internal error: String literal doesn't begin/end with the right quotation mark.`)

        for (let i = 1; i < literal.length - 1; i++)
        {
            if (literal[i] === "\\")
            {
                i++;
                if (i >= literal.length - 1) throw new InternalError(`Unexpected internal error: Unescaped backslash at the end of string literal.`)

                if (literal[i] === "\\") built += '\\'
                else if (literal[i] === quote) built += quote
                else throw new InternalError(`Unexpected internal error: Invalid escaped character in string literal: ${literal[i]}`)
            }
            else if (literal[i] === quote)
            {
                throw new InternalError(`Unexpected internal error: String literal contains unescaped quotation mark.`)
            }
            else
            {
                built += literal[i]
            }
        }

        return built
    },

    reduceRelation(arr) {

        const declarations = []
        const comparisons = []

        let previousExpression = flatten([arr[0]]).join('')
        let j = 0;

        for (let i = 1; i < arr.length - 1; i += 2)
        {
            const expr = flatten([arr[i+1]]).join('')
            const tempVar = `tmp${j++}`

            comparisons.push( `ops["${arr[i]}"](${previousExpression}, ${tempVar} = ${expr})` )
            previousExpression = tempVar
            declarations.push(tempVar)
        }

        return `(function(){ var ${ declarations.join(', ')}; return ${ comparisons.join(' && ') };})()`
    },
}

parser.yy = Object.create(std)


/**
 * A custom prop function which doesn't throw an UnknownPropertyError
 * if the user tries to access a property of `undefined` and `null`,
 * but instead returns `unknown` or `null`. This effectively turns
 * `a of b` into `b.?a`. You can use this function using the following
 * code:
 * ```
 * import {
 *   compileExpression,
 *   useOptionalChaining
 * } from 'filtrex'
 *
 * const expr = "foo of bar"
 *
 * const fn = compileExpression(expr, {
 *   customProp: useOptionalChaining
 * });
 *
 * fn({ bar: null }) // → null
 * ```
 */
export function useOptionalChaining(name, get, obj, type) {
    if (obj === null || obj === undefined)
        return obj

    return get(name)
}

/**
 * A custom prop function which treats dots inside a symbol
 * as property accessors. If you want to use the `foo.bar`
 * syntax to access properties instead of the default
 * `bar of foo`, you can use this function using the following
 * code:
 * ```
 * import {
 *   compileExpression,
 *   useDotAccessOperator
 * } from 'filtrex'
 *
 * const expr = "foo.bar"
 *
 * const fn = compileExpression(expr, {
 *   customProp: useDotAccessOperator
 * });
 *
 * fn({ foo: { bar: 42 } }) // → 42
 * ```
 */
export function useDotAccessOperator(name, get, obj, type) {
    // ignore dots inside escaped symbol
    if (type === 'single-quoted')
        return get(name)

    const parts = name.split('.')

    for (const propertyName of parts) {
        if (hasOwnProperty(obj, propertyName)) {
            obj = obj[propertyName]
        } else {
            throw new UnknownPropertyError(propertyName)
        }
    }

    return obj
}


/**
 * A custom prop function which combines `useOptionalChaining` and `useDotAccessOperator`.
 * The user can use both `foo of bar` and `bar.foo`, both have optional chaining.
 * You can use this function using the following code:
 * ```
 * import {
 *   compileExpression,
 *   useDotAccessOperatorAndOptionalChaining
 * } from 'filtrex'
 *
 * const expr = "foo.bar"
 *
 * const fn = compileExpression(expr, {
 *   customProp: useDotAccessOperatorAndOptionalChaining
 * });
 *
 * fn({ foo: null }) // → null
 * ```
 */
 export function useDotAccessOperatorAndOptionalChaining(name, get, obj, type) {
    if (obj === null || obj === undefined)
        return obj

    // ignore dots inside escaped symbol
    if (type === 'single-quoted')
        return get(name)

    const parts = name.split('.')

    for (const propertyName of parts) {
        if (obj === null || obj === undefined) {
            return obj
        } else {
            obj = obj[propertyName]
        }
    }

    return obj
}

// Functions available to the expression
const builtinFunctions = {
    exists: (v) => v !== undefined && v !== null,
    empty: (v) => v === undefined || v === null || v === '' || Array.isArray(v) && v.length === 0
}

/**
 * A simple, safe, JavaScript expression engine, allowing end-users to enter arbitrary expressions without p0wning you.
 *
 * @example
 * // Input from user (e.g. search filter)
 * let expression = 'transactions <= 5 and abs(profit) > 20.5';
 *
 * // Compile expression to executable function
 * let myfilter = compileExpression(expression);
 *
 * // Execute function
 * myfilter({transactions: 3, profit:-40.5}); // returns 1
 * myfilter({transactions: 3, profit:-14.5}); // returns 0
 *
 * @param expression
 * The expression to be parsed. Under the hood, the expression gets compiled to a clean and fast JavaScript function.
 * There are only 2 types: numbers and strings. Numbers may be floating point or integers. Boolean logic is applied
 * on the truthy value of values (e.g. any non-zero number is true, any non-empty string is true, otherwise false).
 * Examples of numbers: `43`, `-1.234`; example of a string: `"hello"`; example of external data variable: `foo`, `a.b.c`,
 * `'foo-bar'`.
 * You can use the following operations:
 *  * `x + y` Add
 *  * `x & y` String concat
 *  * `x - y` Subtract
 *  * `x * y` Multiply
 *  * `x / y` Divide
 *  * `x ^ y` Power
 *  * `x mod y` Modulo
 *  * `x == y` Equals
 *  * `x < y` Less than
 *  * `x <= y` Less than or equal to
 *  * `x > y` Greater than
 *  * `x >= y` Greater than or equal to
 *  * `x == y <= z` Chained relation, equivalent to `(x == y and y <= z)`
 *  * `x of y` Get property x of object y
 *  * `x in (a, b, c)` Equivalent to `(x == a or x == b or x == c)`
 *  * `x not in (a, b, c)` Equivalent to `(x != a and x != b and x != c)`
 *  * `x or y` Boolean or
 *  * `x and y` Boolean and
 *  * `not x` Boolean not
 *  * `if x then y else z` If boolean x, value y, else z
 *  * `( x )` Explicity operator precedence
 *  * `( x, y, z )` Array of elements x, y and z
 *  * `exists(x)` True if `x` is neither `undefined` nor `null`
 *  * `empty(x)` True if `x` doesn't exist, it is an empty string or empty array
 *  * `myFooBarFunction(x)` Custom function defined in `options.symbols`
 */
export function compileExpression(expression, options) {

    // Check and coerce arguments

    if (arguments.length > 2) throw new TypeError('Too many arguments.')

    options = typeof options === "object" ? options : {}

    const knownOptions = ['symbols', 'customProp', 'operators']
    let {symbols, customProp, operators} = options

    for (const key of Object.keys(options))
        if (!knownOptions.includes(key)) throw new UnknownOptionError(key)

    symbols = {
        ...builtinFunctions,
        ...(symbols ?? {})
    }


    let defaultOperators = {
        '|': (a, b) => ensureFunc(b)(a),
        '|?': (a, b) => builtinFunctions.exists(a) ? ensureFunc(b)(a) : a,

        '+': (a, b) => num(a) + num(b),
        '-': (a, b) => b === undefined ? -num(a) : num(a) - num(b),
        '*': (a, b) => num(a) * num(b),
        '/': (a, b) => num(a) / num(b),
        '^': (a, b) => Math.pow(num(a), num(b)),        
        'mod': (a, b) => mod(num(a), num(b)),

        '&': (a, b) => str(a) + str(b),

        '==': (a, b) => a === b,
        '!=': (a, b) => a !== b,

        '<': (a, b) => simple(a) < simple(b),
        '<=': (a, b) => simple(a) <= simple(b),
        '>=': (a, b) => simple(a) >= simple(b),
        '>': (a, b) => simple(a) > simple(b),

        '~=': (a, b) => RegExp(str(b)).test(str(a)),

        '??': (a, b) => symbols.empty(a) ? b : a
    }

    if (operators) {
        for (const name of Object.keys(operators)) {
            defaultOperators[name] = operators[name]
        }
    }

    operators = defaultOperators

    // Compile the expression

    let js = flatten( parser.parse(expression) )
    js.unshift('return ')
    js.push(';')

    // Metaprogramming functions

    function nakedProp(name, obj, type, isNested) {
        if (hasOwnProperty(obj, name))
            return obj[name]

        throw new UnknownPropertyError(name)
    }

    function safeGetter(obj) {
        return function get(name) {
            if (hasOwnProperty(obj, name))
                return obj[name]

            throw new UnknownPropertyError(name)
        }
    }

    if (typeof customProp === 'function') {
        nakedProp = (name, obj, type, isNested) =>
            customProp(name, safeGetter(obj), obj, type, isNested)
    }

    function createCall(fns) {
        return function call({ name }, ...args) {
            if (hasOwnProperty(fns, name) && typeof fns[name] === "function")
                return fns[name](...args)

            throw new UnknownFunctionError(name)
        }
    }

    function prop({ name, type }, obj, isNested) {
        const isUnescaped = type === 'unescaped'

        if (isNested === false && isUnescaped && hasOwnProperty(symbols, name))
            return symbols[name]

        return nakedProp(name, obj, type, isNested)
    }

    // Patch together and return

    const func = new Function('call', 'ops', 'std', 'prop', 'data', js.join(''))

    return function(data) {
        try {
            return func(createCall(symbols), operators, std, prop, data)
        }
        catch (e) {
            return e
        }
    };
}

const {
    compileExpression,
    useDotAccessOperator,
    useOptionalChaining,
    useDotAccessOperatorAndOptionalChaining,
} = require("../dist/cjs/filtrex");

const { describe, it } = require("mocha");

const chai = require("chai");
const assertArrays = require('chai-arrays');

chai.use(assertArrays);
const { expect } = chai;

const eval = (str, obj) => compileExpression(str)(obj);


describe('Various other things', () => {

    it('pipe operator', () => {
        let add = x => y => x + y;
        let mult = x => y => x * y;
        let toFixed = n => x => x.toFixed(n)
        let trim = s => s.trim()
        let isNull = v => v === null

        let options = { symbols: {add, mult, toFixed, trim, isNull, null: null} };
        
        expect( compileExpression('v | add(3)', options)({v:2}) ).equals(5);
        expect( compileExpression('v | add(3) | add(5) | toFixed(2)', options)({v:2}) ).equals('10.00');
        expect( compileExpression('null | isNull', options)() ).equals(true);
        expect( compileExpression('s | trim', options)({s:' foo  '}) ).equals('foo');

        expect( compileExpression('if 1 > 0 then 1 else 0 | add(2)', options)() ).equals(3);
        expect( compileExpression('1 + 3 | add(2)', options)() ).equals(6);
        expect( compileExpression('foo of obj1 | trim', options)({obj1: {foo: ' bar '}}) ).equals('bar');
        expect( compileExpression('(3 | mult(2)) + 4 | add(1)', options)() ).equals(11);
        
        expect( compileExpression('1 | 2')({}) )
            .instanceof(Error) // TODO UnexpectedTypeError
            .and.have.property('message', 'Expected a function, but got a number instead.');
    })

    it('optional pipe operator', () => {
        let add = x => y => x + y;
        let mult = x => y => x * y;
        let toFixed = n => x => x.toFixed(n)
        let trim = s => s.trim()
        let toNull = () => null
        let isNull = v => v === null

        let options = { symbols: {add, mult, toFixed, trim, toNull, isNull, null: null, undefined: undefined} };
        
        expect( compileExpression('null |? add(3)', options)() ).equals(null);
        expect( compileExpression('undefined |? add(3)', options)() ).equals(undefined);
        expect( compileExpression('0 |? add(3)', options)() ).equals(3);
        expect( compileExpression('"" |? trim', options)() ).equals("");

        expect( compileExpression('null |? isNull', options)() ).equals(null);
        expect( compileExpression('null |? add(3) | isNull', options)() ).equals(true);
        expect( compileExpression('1 | add(1) | toNull |? add(5)', options)() ).equals(null);

        expect( compileExpression('if 1 > 0 then 1 else 0 |? add(2)', options)() ).equals(3);
        expect( compileExpression('1 + 3 |? add(2)', options)() ).equals(6);
        expect( compileExpression('foo of obj1 |? trim', options)({obj1: {foo: ' bar '}}) ).equals('bar');
        expect( compileExpression('(3 | mult(2)) + 4 |? add(1)', options)() ).equals(11);
        
        expect( compileExpression('1 |? 2')({}) )
            .instanceof(Error) // TODO UnexpectedTypeError
            .and.have.property('message', 'Expected a function, but got a number instead.');
    })

    it('in / not in', () => {
        // value in array
        expect( eval('5 in (1, 2, 3, 4)') ).equals(false);
        expect( eval('5 in [1, 2, 3, 4]') ).equals(false);
        expect( eval('3 in (1, 2, 3, 4)') ).equals(true);
        expect( eval('5 not in (1, 2, 3, 4)') ).equals(true);
        expect( eval('5 not in [1, 2, 3, 4]') ).equals(true);
        expect( eval('3 not in (1, 2, 3, 4)') ).equals(false);

        // array in array
        expect( eval('(1, 2) in (1, 2, 3)') ).equals(true);
        expect( eval('(1, 2) in (2, 3, 1)') ).equals(true);
        expect( eval('(1, 2) in [2, 3, 1]') ).equals(true);
        expect( eval('[2] in [2, 3, 1]') ).equals(true);
        expect( eval('[1, 2] in [2, 3, 1]') ).equals(true);
        expect( eval('(3, 4) in (1, 2, 3)') ).equals(false);
        expect( eval('(1, 2) not in (1, 2, 3)') ).equals(false);
        expect( eval('(1, 2) not in (2, 3, 1)') ).equals(false);
        expect( eval('[1, 2] not in (2, 3, 1)') ).equals(false);
        expect( eval('(3, 4) not in (1, 2, 3)') ).equals(true);

        // other edge cases
        expect( eval('(1, 2) in 1'    ) ).equals(false);
        expect( eval('1 in 1'         ) ).equals(true);
        expect( eval('(1, 2) not in 1') ).equals(true);
        expect( eval('1 not in 1'     ) ).equals(false);
    });

    it('string support', () => {
        expect( eval('foo == "hello"', {foo:'hello'}) ).equals(true);
        expect( eval('foo == "hello"', {foo:'bye'  }) ).equals(false);
        expect( eval('foo != "hello"', {foo:'hello'}) ).equals(false);
        expect( eval('foo != "hello"', {foo:'bye'  }) ).equals(true);
        expect( eval('foo in ("aa", "bb")', {foo:'aa'}) ).equals(true);
        expect( eval('foo in ("aa", "bb")', {foo:'cc'}) ).equals(false);
        expect( eval('foo not in ("aa", "bb")', {foo:'aa'}) ).equals(false);
        expect( eval('foo not in ("aa", "bb")', {foo:'cc'}) ).equals(true);

        expect( eval(`"\n"`) ).equals("\n");
        // expect( eval(`"\\n"`) ).equals('\\n'); // FIXME Fails
        expect( eval(`"\\"foo\\""`) ).equals('"foo"');
        expect( eval(`"\u0000"`) ).equals("\u0000");
        expect( eval(`"\uD800"`) ).equals("\uD800");
    });

    it('comments support', () => {
        expect( eval('(* comment *) "hello" == "hello"') ).equals(true);
        expect( eval('"hello(* comment *)"') ).equals("hello(* comment *)");
        
        expect( eval(`
            (**
             * Some mutiline comment
             **) "foo " & "hello(* comment *)" & (** comment*) " bar" &

             (**) '=(* foo =*)42' (**** comment ***) & "-(* zoo **)" (**)
                & " end"
             (**)

             (* end *)
        `, {'=(* foo =*)42': 42}) ).equals("foo hello(* comment *) bar42-(* zoo **) end");

        expect( eval(`
            (**
             * Some calculation
             **)

             (* sum 1 + 2 *)
             (1 + 2) +

             (* mult 3 * 4 *)
             (3 * 4) +

             (* div 12 / 3 *)
             (12 / 3) + 
             
             (* prop *)
             '=(* foo =*)42'
        `, {'=(* foo =*)42': 42}) ).equals((1 + 2) + (3 * 4) + (12 / 3) + 42);
    })

    it('regexp support', () => {
        expect( eval('foo ~= "^[hH]ello"', {foo:'hello'}) ).equals(true);
        expect( eval('foo ~= "^[hH]ello"', {foo:'bye'  }) ).equals(false);
    });

    it('array support', () => {
        const arr0 = eval('[]', {});
        expect(arr0).is.empty.array();

        const arr1 = eval('[[], [ ] , [ []]]', {});
        expect(arr1).to.be.deep.equal([[], [], [[]]])

        const arr2 = eval('(42, "fifty", pi)', {pi: Math.PI});
        expect(arr2).is.array();
        expect(arr2).to.be.equalTo([42, "fifty", Math.PI]);

        const arr3 = eval('[42, "fifty", pi]', {pi: Math.PI});

        expect(arr3).is.array();
        expect(arr3).to.be.equalTo([42, "fifty", Math.PI]);
    });

    it('nullish coalescing operator', () => {
        const obj = {
            TRUE: true,
            FALSE: false,
            NULL: null,
            UNDEF: undefined,
            ZERO: 0,
            EMPTY_STR: '',
            EMPTY_ARR: [],
            NUM: 42,
            STR: 'foo',
            ARR: [1, 2 ,3]
        }

        expect( eval('42 ?? 43', obj) ).equals(42);
        expect( eval('NUM ?? "ok"', obj) ).equals(obj.NUM);
        expect( eval('"foo" ?? "bar"', obj) ).equals('foo');
        expect( eval('STR ?? "bar"', obj) ).equals(obj.STR);
        expect( eval('"" ?? "bar"', obj) ).equals('bar');
        expect( eval('EMPTY_STR ?? "bar"', obj) ).equals('bar');
        expect( eval('NULL ?? "ok"', obj) ).equals('ok');
        expect( eval('UNDEF ?? "ok"', obj) ).equals('ok');
        expect( eval('ZERO ?? "not"', obj) ).equals(obj.ZERO);
        expect( eval('EMPTY_ARR ?? "ok"', obj) ).equals('ok');
        expect( eval('ARR ?? "not"', obj) ).equals(obj.ARR);
        expect( eval('TRUE ?? FALSE', obj) ).equals(true);
        expect( eval('FALSE ?? TRUE', obj) ).equals(false);
        expect( eval('FALSE ?? FALSE', obj) ).equals(false);

        expect( eval('if "" ?? 1 then "ok" else "fail"') ).equals("ok");
        expect( eval('NULL ?? UNDEF ?? EMPTY_STR ?? "ok"', obj) ).equals("ok");
        
        expect( eval('FALSE or ""', obj) ).equals(false);
        expect( eval('FALSE or "" ?? TRUE', obj) ).equals(false);
        expect( eval('("" or FALSE) ?? TRUE', obj) ).equals(false);
    });

    it('ternary operator', () => {
        expect( eval('if 1 > 2 then 3 else 4') ).equals(4);
        expect( eval('if 1 < 2 then 3 else 4') ).equals(3);

        expect( eval('if 1 < 2 then if 3 < 4 then 42 else 420 else if 5 < 6 then 69 else -1/12') ).equals(42);
        expect( eval('if 1 < 2 then if 3 > 4 then 42 else 420 else if 5 < 6 then 69 else -1/12') ).equals(420);
        expect( eval('if 1 > 2 then if 3 < 4 then 42 else 420 else if 5 < 6 then 69 else -1/12') ).equals(69);
        expect( eval('if 1 > 2 then if 3 < 4 then 42 else 420 else if 5 > 6 then 69 else -1/12') ).equals(-1/12);
    });

    it('kitchensink', () => {
        var kitchenSink = compileExpression(
            'if 4 > lowNumber * 2 and (max(a, b) < 20 or foo:bar) then 1.1 else 9.4',
            {
                symbols: {
                    max: Math.max
                }
            }
        );
        expect( kitchenSink({lowNumber: 1.5, a: 10, b: 12, 'foo:bar': false}) ).equals(1.1);
        expect( kitchenSink({lowNumber: 3.5, a: 10, b: 12, 'foo:bar': false}) ).equals(9.4);
    });

    it('custom functions', () => {
        let triple = x => x * 3;
        let trim = str => str.trim();

        let options = { symbols: {triple, 'str:trim': trim} };
        
        expect( compileExpression('triple(v)', options)({v:7}) ).equals(21);
        expect( compileExpression('str:trim(gooStr)', options)({gooStr:"  goo "}) ).equals('goo');
    });

    it('custom property function basics', () => {
        expect(
            compileExpression('a', { customProp: name => name === 'a' })()
        ).equals(true);

        expect(
            compileExpression('a + bb + ccc', { customProp: name => name.length })()
        ).equals(6);

        expect(
            compileExpression('a + b * c', { customProp: (name, get) => get(name) })
            ({ a:1, b:2, c:3 })
        ).equals(7);

        expect(
            compileExpression('a', { customProp: (name, get) => get(name) })({ a: true })
        ).equals(true);

        let object = {a: 2};
        expect(
            compileExpression('a', { customProp: (_,__,obj) => obj === object })(object)
        ).equals(true);
    });

    it('custom property function text search', () => {
        let textToSearch = "able was i ere I saw elba\nthe Rain in spain falls MAINLY on the plain";
        let doesTextMatch = name =>  textToSearch.indexOf(name) !== -1;
        let evalProp = exp => compileExpression(exp, { customProp: doesTextMatch })();


        expect( evalProp('able and was and i') ).equals(true);
        expect( evalProp('able and was and dog') ).equals(false);
        expect( evalProp('able or dog') ).equals(true);
        expect( evalProp('able') ).equals(true);
        expect( evalProp('Rain and (missing or MAINLY)') ).equals(true);
        expect( evalProp('NotThere or missing or falls and plain') ).equals(true);
    });

    it('custom property function proxy', () => {
        let prefixedName = (str, sub) => str.substr(0, sub.length) === sub && str.substr(sub.length);
        let tripleName = str => prefixedName(str, 'triple_');

        let proxy = (name, get) => tripleName(name) ? 3 * get(tripleName(name)) : get(name);
        let evalProp = exp => compileExpression(exp, {customProp: proxy})({ a:1, b:2, c:3 });

        expect( evalProp('a') ).equals(1);
        expect( evalProp('triple_a') ).equals(3);
        expect( evalProp('a + triple_b * c') ).equals(19);
    });

    it('throws when using old API', () => {
        let symbols = { myCustomFunc: n => n*n };
        let customProp = () => 'foo';

        expect( () => compileExpression('', symbols) ).throws();
        expect( () => compileExpression('', {}, customProp) ).throws();
        expect( () => compileExpression('', symbols, customProp) ).throws();
    });

    it('doesn\'t recognise non-callable values as extra functions', () => {
        let options = { symbols: { sqrt: undefined, a: 42, b: {} } };
        let eval = str => compileExpression(str, options)();

        expect(eval('a()')).is.instanceOf(ReferenceError);
        expect(eval('b()')).is.instanceOf(ReferenceError);

        let err = eval('sqrt(4)');
        expect(err).is.instanceOf(ReferenceError);
        expect(err.message).equals("Unknown function: sqrt()");
    });

    it('gives the correct precedence to "in" and "not in"', () => {
        expect( eval('4 + 3 in (7, 8)') ).equals(true);
        expect( eval('4 + 3 in [7, 8]') ).equals(true);
        expect( eval('4 + 3 in (6, 8)') ).equals(false);
        expect( eval('4 + 3 not in (7, 8)') ).equals(false);
        expect( eval('4 + 3 not in [7, 8]') ).equals(false);
        expect( eval('4 + 3 not in (6, 8)') ).equals(true);
    })

    it('symbols basics', () => {
        const options = { symbols: { pi: Math.PI, true: true, false: false }}

        expect(
            compileExpression('2 * pi * radius', options)({ radius: 6 })
        ).equals(2 * Math.PI * 6)

        expect(
            compileExpression('not true == false and not false == true', options)()
        ).equals(true)

        expect(
            compileExpression('pi', options)({ pi: 3 })
        ).equals(Math.PI)

        expect(
            compileExpression(`'pi'`, options)({ pi: 3 })
        ).equals(3)


        const options2 = { symbols: { a: "a_const " } }
        const data = { a: "a_data ", b: "b_data " }
        const expr = `'a' & a & 'b' & b`

        expect( compileExpression(expr, options2)(data) ).equals("a_data a_const b_data b_data ")
    })

    it('useDotAccessOperator works', () => {
        const expr = "foo.bar"

        const fn = compileExpression(expr, {
            customProp: useDotAccessOperator
        });

        expect( fn({ foo: { bar: 42 } }) ).equals(42)
    })

    it('useOptionalChaining work', () => {
        const expr = "bar of foo"

        const fn = compileExpression(expr, {
            customProp: useOptionalChaining
        });

        expect( fn({ foo: null }) ).equals(null)
        expect( fn({ foo: { bar: 42 } }) ).equals(42)
    })

    it('useDotAccessOperatorAndOptionalChaining works', () => {
        const expr1 = "foo.bar"
        const expr2 = "bar of foo"
        const options = {
            customProp: useDotAccessOperatorAndOptionalChaining
        }

        const fn1 = compileExpression(expr1, options);
        const fn2 = compileExpression(expr2, options);

        expect( fn1({ foo: null }) ).equals(null)
        expect( fn1({ foo: { bar: 42 } }) ).equals(42)
        expect( fn2({ foo: null }) ).equals(null)
        expect( fn2({ foo: { bar: 42 } }) ).equals(42)
    })

});

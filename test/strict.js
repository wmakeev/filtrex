const { compileExpression } = require("../dist/cjs/filtrex");

const { describe, it } = require("mocha");
const { expect } = require("chai");

const eval = (str, obj) => compileExpression(str)(obj);

describe('Strict', () => {

    it('does lose typechecking for booleans', () => {
        expect( eval('1 == 1 and 1') ).equals(true)
        expect( eval('1 or 1 != 1')  ).equals(true)
        expect( eval('not "hello"')  ).equals(false)

        expect( eval('not foo', {foo: new Boolean(false)}) ).equals(true)
    })

    it('does typechecking on addition', () => {
        const data = {
            num: 42,
            str: 'hello',
            bool: true,
            date: new Date(Date.UTC(1997, 6, 18)),
            boxedNum: new Number(42),
            boxedStr: new String('hello')
        }

        expect( eval('num + num', data) ).equals(2 * 42)
        expect( eval('str + str', data) ).is.instanceOf(TypeError)
        expect( eval('str & str', data) ).equals('hellohello')
        expect( eval('num & str', data) ).equals('42hello')
        expect( eval('str & num', data) ).equals('hello42')
        expect( eval('num & "0"', data) ).equals('420')

        expect( eval('num + boxedNum', data) ).equals(2 *42)
        expect( eval('boxedNum + num', data) ).equals(2 *42)
        expect( eval('boxedNum + boxedNum', data) ).equals(2 *42)

        expect( eval('str & boxedStr', data) ).equals('hellohello')
        expect( eval('boxedStr & str', data) ).equals('hellohello')
        expect( eval('boxedStr & boxedStr', data) ).equals('hellohello')

        expect( eval('boxedNum & boxedStr', data) ).equals('42hello')
        expect( eval('str & boxedNum', data) ).equals('hello42')

        expect( eval('num + bool', data) ).equals(42 + 1)
        expect( eval('bool + num', data) ).equals(1 + 42)
        expect( eval('str + bool', data) ).is.instanceOf(TypeError)
        expect( eval('str & bool', data) ).equals('hellotrue')
        expect( eval('bool + str', data) ).is.instanceOf(TypeError)
        expect( eval('num + date', data) ).is.instanceOf(TypeError)
        expect( eval('num & date', data) ).is.instanceOf(TypeError)
        expect( eval('date + num', data) ).is.instanceOf(TypeError)
        expect( eval('date & num', data) ).is.instanceOf(TypeError)
        expect( eval('str + date', data) ).is.instanceOf(TypeError)
        expect( eval('str & date', data) ).is.instanceOf(TypeError)
        expect( eval('date + str', data) ).is.instanceOf(TypeError)
        expect( eval('bool + date', data) ).is.instanceOf(TypeError)
        expect( eval('bool & date', data) ).is.instanceOf(TypeError)
        expect( eval('date + bool', data) ).is.instanceOf(TypeError)
        expect( eval('date & bool', data) ).is.instanceOf(TypeError)
        expect( eval('bool + bool', data) ).equals(2)
        expect( eval('date + date', data) ).is.instanceOf(TypeError)
    })

    it('does typechecking on arithmetic operators', () => {
        const data = {
            TRUE: true,
            date: new Date(Date.UTC(1997, 6, 18)),
            boxedNum: new Number(2),
            boxedStr: new String('hello')
        }
        
        expect( eval('42 * 42', data) ).equals(42 * 42)
        expect( eval('42 * "42"', data) ).equals(42 * 42)
        expect( eval('"42" * 42', data) ).equals(42 * 42)
        expect( eval('42 * "hello"', data) ).is.instanceOf(TypeError)
        expect( eval('42 * date', data) ).is.instanceOf(TypeError)
        expect( eval('42 * boxedNum', data) ).equals(42 * 2)
        expect( eval('42 * boxedStr', data) ).is.instanceOf(TypeError)
        expect( eval('42 * TRUE', data) ).equals(42 * 1)

        expect( eval('42 - 42', data) ).equals(42 - 42)
        expect( eval('42 - "42"', data) ).equals(42 - 42)
        expect( eval('"42" - 42', data) ).equals(42 - 42)
        expect( eval('42 - "hello"', data) ).is.instanceOf(TypeError)
        expect( eval('42 - date', data) ).is.instanceOf(TypeError)
        expect( eval('42 - boxedNum', data) ).equals(42 - 2)
        expect( eval('42 - boxedStr', data) ).is.instanceOf(TypeError)
        expect( eval('42 - TRUE', data) ).equals(42 - 1)

        expect( eval('42 / 42', data) ).equals(42 / 42)
        expect( eval('42 / "42"', data) ).equals(42 / 42)
        expect( eval('"42" / 42', data) ).equals(42 / 42)
        expect( eval('42 / "hello"', data) ).is.instanceOf(TypeError)
        expect( eval('42 / date', data) ).is.instanceOf(TypeError)
        expect( eval('42 / boxedNum', data) ).equals(42 / 2)
        expect( eval('42 / boxedStr', data) ).is.instanceOf(TypeError)
        expect( eval('42 / TRUE', data) ).equals(42 / 1)

        expect( eval('42 ^ 2', data) ).equals(Math.pow(42, 2))
        expect( eval('42 ^ "2"', data) ).equals(Math.pow(42, 2))
        expect( eval('"42" ^ 2', data) ).equals(Math.pow(42, 2))
        expect( eval('42 ^ "hello"', data) ).is.instanceOf(TypeError)
        expect( eval('42 ^ date', data) ).is.instanceOf(TypeError)
        expect( eval('42 ^ boxedNum', data) ).equals(Math.pow(42, 2))
        expect( eval('42 ^ boxedStr', data) ).is.instanceOf(TypeError)
        expect( eval('42 ^ TRUE', data) ).equals(Math.pow(42, 1))
    })

    it('does strict equality', () => {
        expect( eval('(1 == 1) == 1') ).equals(false);
        expect( eval('(1 == 1) != 1') ).equals(true);
        expect( eval('(1 != 1) == 0') ).equals(false);
        expect( eval('(1 != 1) != 0') ).equals(true);

        expect( eval('(1 == 1) == T', {T: true, F: false}) ).equals(true);
        expect( eval('(1 == 1) != T', {T: true, F: false}) ).equals(false);
        expect( eval('(1 != 1) == F', {T: true, F: false}) ).equals(true);
        expect( eval('(1 != 1) != F', {T: true, F: false}) ).equals(false);

        expect( eval('1 == "1"') ).equals(false)
        expect( eval('"1" == 1') ).equals(false)
    })

})

const { compileExpression } = require("../dist/cjs/filtrex");

const { describe, it } = require("mocha");
const { expect } = require("chai");


describe('Object support', () => {

    it('can bind to data', () => {
        const something = compileExpression('1 + foo * bar');

        expect(something({foo:5, bar:2})).equals(11);
        expect(something({foo:2, bar:1})).equals(3);
    });

    it('includes symbols with dots', () => {
        expect( compileExpression('hello.world.foo'  )({'hello.world.foo':   123}) ).equals(123);
        expect( compileExpression('order.gooandstuff')({'order.gooandstuff': 123}) ).equals(123);
    });

    it('includes quoted symbols', () => {
        expect( compileExpression('\'hello-world-foo\''    )({'hello-world-foo':     123}) ).equals(123);
        expect( compileExpression('\'order+goo*and#stuff\'')({'order+goo*and#stuff': 123}) ).equals(123);
    });

    it('includes symbols with $ and _', () => {
        expect( compileExpression('$_.0$$')({'$_.0$$': 123}) ).equals(123);
    });

    it('includes object property accessors', () => {
        expect(compileExpression(`hat of 'the captain' of Danube.Steamboat.Shipping.Company`)(
            {'Danube.Steamboat.Shipping.Company': {'the captain': {hat: "epic"}}}
        )).equals("epic");

        expect(compileExpression(`'big bird' of 'the captain' of Danube.Steamboat.Shipping.Company`)(
            {'Danube.Steamboat.Shipping.Company': {'the captain': {hat: "epic", 'big bird': "also"}}}
        )).equals("also");

        expect(compileExpression(`exists of captain of Danube.Steamboat.Shipping.Company`)(
            {'Danube.Steamboat.Shipping.Company': {captain: {exists: "definitely"}}}
        )).equals("definitely");

        expect(compileExpression('something of nothing')({ nothing: undefined })).is.instanceOf(ReferenceError);
        expect(compileExpression('toString of something')({ something: {}})).is.instanceOf(ReferenceError);
    });

});

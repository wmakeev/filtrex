import { code, parenless, noopTag as noop } from "./utils.mjs"
import { Jison } from "./lib/jison.mjs"

const _ = String.raw

const bool = "std.coerceBoolean"
const operatorCode = code`ops['${2}'](${1}, ${3})`

const grammar = {
    // Lexical tokens
    lex: {
        rules: [
            [_`\*`, `return "*" ;`],
            [_`\/`, `return "/" ;`],
            [_`-` , `return "-" ;`],
            [_`\+`, `return "+" ;`],
            [_`\^`, `return "^" ;`],
            [_`\%`, `return "%" ;`],
            [_`\(`, `return "(" ;`],
            [_`\)`, `return ")" ;`],
            [_`\,`, `return "," ;`],
            [_`==`, `return "==";`],
            [_`\!=`,`return "!=";`],
            [_`\~=`,`return "~=";`],
            [_`>=`, `return ">=";`],
            [_`<=`, `return "<=";`],
            [_`<` , `return "<" ;`],
            [_`>` , `return ">" ;`],
            [_`and[^\w]` , `return "and" ;`],
            [_`or[^\w]`  , `return "or"  ;`],
            [_`not[^\w]` , `return "not" ;`],
            [_`in[^\w]`  , `return "in"  ;`],
            [_`of[^\w]`  , `return "of"  ;`],
            [_`if[^\w]`  , `return "if"  ;`],
            [_`then[^\w]`, `return "then";`],
            [_`else[^\w]`, `return "else";`],

            [_`\s+`,  ''], // skip whitespace
            [_`[0-9]+(?:\.[0-9]+)?(?![0-9\.])`, `return "Number";`], // 212.321

            [_`[a-zA-Z$_][\.a-zA-Z0-9$_]*`,
                `yytext = JSON.stringify(yytext);
                return "Symbol";`
            ], // some.Symbol22

            [_`'(?:\\'|\\\\|[^'\\])*'`,
                `yytext = yy.buildString("'", yytext);
                return "Symbol";`
            ], // 'any \'escaped\' symbol'

            [_`"(?:\\"|\\\\|[^"\\])*"`,
                `yytext = yy.buildString('"', yytext);
                return "String";`
            ], // "any \"escaped\" string"

            // End
            [_`$`, 'return "EOF";'],
        ]
    },
    // Operator precedence - lowest precedence first.
    // See http://www.gnu.org/software/bison/manual/html_node/Precedence.html
    // for a good explanation of how it works in Bison (and hence, Jison).
    // Different languages have different rules, but this seems a good starting
    // point: http://en.wikipedia.org/wiki/Order_of_operations#Programming_languages
    operators: [
        ['left', 'if', 'then', 'else'],
        ['left', 'or'],
        ['left', 'and'],
        ['left', 'in'],
        ['left', '==', '!=', '<', '<=', '>', '>=', '~='],
        ['left', 'CHAINED-REL'],
        ['left', '+', '-'],
        ['left', '*', '/', '%'],
        ['left', '^'],
        ['left', 'not'],
        ['left', 'UMINUS'],
        ['left', 'of'],
    ],
    // Grammar
    bnf: {
        expressions: [ // Entry point
            ['e EOF', 'return $1;']
        ],
        e: [
            ['- e'    , code`ops['-'](${2})`, {prec: 'UMINUS'}],
            ['e + e'  , operatorCode],
            ['e - e'  , operatorCode],
            ['e * e'  , operatorCode],
            ['e / e'  , operatorCode],
            ['e % e'  , operatorCode],
            ['e ^ e'  , operatorCode],

            ['e and e', code`${bool}(${1}) && ${bool}(${3})`],
            ['e or e' , code`${bool}(${1}) || ${bool}(${3})`],
            ['not e'  , code`! ${bool}(${2})`],

            ['if e then e else e', code`${bool}(${2}) ? ${4} : ${6}`],
            ['e in e', code`std.isSubset(${1}, ${3})`],
            ['e not in e', code`!std.isSubset(${1}, ${4})`],

            ['( e )'  , code`${2}`],
            ['( Arguments , e )', code`[ ${2}, ${4} ]`],

            ['Number' , parenless`${1}`],
            ['Symbol' , parenless`prop(${1}, data)`],
            ['String' , parenless`${1}`],
            ['Symbol of e', parenless`prop(${1}, ${3})`],

            ['Symbol ( )', parenless`call(${1})`],
            ['Symbol ( Arguments )', parenless`call(${1}, ${3})`],

            ['Relation' , `$$ = yy.reduceRelation($1);`, {prec: '=='}],
        ],
        RelationalOperator: [
            noop`==`, noop`!=`, noop`~=`, noop`<`,
            noop`<=`, noop`>=`, noop`>`,
        ],
        Relation: [
            ['Relation RelationalOperator e', `$$ = [...$1, $2, $3]`, {prec: 'CHAINED-REL'}],
            ['e RelationalOperator e', `$$ = [$1, $2, $3];`, {prec: '=='}],
        ],
        Arguments: [
            ['e', parenless`${1}`],
            ['Arguments , e', parenless`${1}, ${3}`],
        ],
    }
}

export const parser = new Jison.Parser(grammar)

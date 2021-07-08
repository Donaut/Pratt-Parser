import  Enumerator  from "./Enumerator";

type Token = {
    type: string;
    precedence: number;
    value: number;
};

type Expression = {
    lhs:number;
    enumerator:Enumerator<Token>;
}

const prefix = new Map<string, (a:Expression)=>number>()
prefix.set("NUMBER", (e) => e.lhs);
prefix.set("MINUS", (e) => {
    e.enumerator.moveNext();
    return -e.enumerator.item().value;
})

const infix = new Map<string, (e:Expression)=>number>()
infix.set("PLUS", (e) => {
    e.enumerator.moveNext();
    return e.lhs + parse_expression(enumerator);
});
infix.set("MULTIPLY", (e) => {
    e.enumerator.moveNext();
    return e.lhs * parse_expression(enumerator);
});


// Should output 1990 :D
const test = [
    { type:'MINUS', precedence: 1, value:null },
    { type:'NUMBER', precedence: 1, value:10 },
    { type:'PLUS', precedence: 2, value:null },
    { type:'NUMBER', precedence: 1, value:100 },
    { type:'MULTIPLY', precedence: 3, value:null },
    { type:'NUMBER', precedence: 1, value:20 },
]

const enumerator = new Enumerator<Token>(test);

const result = parse_expression(enumerator);
console.log(result);


function parse_expression(enumerator:Enumerator<Token>) {
    /*
    Token token = consume();
    PrefixParselet prefix = mPrefixParselets.get(token.getType());

    if (prefix == null) throw new ParseException(
        "Could not parse \"" + token.getText() + "\".");

    return prefix.parse(this, token);
    */
    let token = enumerator.item();
    const prefix_fn = prefix.get(token.type)

    let left = prefix_fn({ lhs:token.value, enumerator:enumerator });
    /*
    while (precedence < getPrecedence()) {
      token = consume();
      
      InfixParselet infix = mInfixParselets.get(token.getType());
      left = infix.parse(this, left, token);
    }
     */
    let lookAhead = enumerator.lookAhead();
    while (lookAhead != undefined && token.precedence <= lookAhead.precedence) {
        token = enumerator.getNext();

        const infix_fn = infix.get(token.type)
        left = infix_fn({ lhs:left, enumerator:enumerator })
        lookAhead = enumerator.lookAhead();
    }
   return left
}





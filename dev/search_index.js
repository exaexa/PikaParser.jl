var documenterSearchIndex = {"docs":
[{"location":"reference/#Reference","page":"Reference","title":"Reference","text":"","category":"section"},{"location":"reference/#Data-types","page":"Reference","title":"Data types","text":"","category":"section"},{"location":"reference/","page":"Reference","title":"Reference","text":"Modules = [PikaParser]\nPages = [\"structs.jl\"]","category":"page"},{"location":"reference/#PikaParser.MatchResult","page":"Reference","title":"PikaParser.MatchResult","text":"A shortcut for possibly failed match result index (that points into ParserState field matches.\n\n\n\n\n\n","category":"type"},{"location":"reference/#PikaParser.Clause","page":"Reference","title":"PikaParser.Clause","text":"abstract type Clause{G}\n\nAbstract type for all clauses that match a grammar with rule labels of type G.\n\nCurrently implemented clauses:\n\nSatisfy\nTakeN\nToken\nTokens\nEpsilon\nFail\nSeq\nFirst\nNotFollowedBy\nFollowedBy\nOneOrMore\nZeroOrMore\n\nOften it is better to use convenience functions for rule construction, such as seq or token; see flatten for details.\n\n\n\n\n\n","category":"type"},{"location":"reference/#PikaParser.Epsilon","page":"Reference","title":"PikaParser.Epsilon","text":"struct Epsilon{G} <: PikaParser.Clause{G}\n\nAn always-succeeding epsilon match.\n\n\n\n\n\n","category":"type"},{"location":"reference/#PikaParser.Fail","page":"Reference","title":"PikaParser.Fail","text":"struct Fail{G} <: PikaParser.Clause{G}\n\nAn always-failing match.\n\n\n\n\n\n","category":"type"},{"location":"reference/#PikaParser.First","page":"Reference","title":"PikaParser.First","text":"struct First{G} <: PikaParser.Clause{G}\n\nMatch the first possibility of several matches. Empty First is equivalent to unconditional failure.\n\nFields\n\nchildren::Vector\n\n\n\n\n\n","category":"type"},{"location":"reference/#PikaParser.FollowedBy","page":"Reference","title":"PikaParser.FollowedBy","text":"struct FollowedBy{G} <: PikaParser.Clause{G}\n\nZero-length match that succeeds if follow does match at the same position.\n\nFields\n\nfollow::Any\n\n\n\n\n\n","category":"type"},{"location":"reference/#PikaParser.Grammar","page":"Reference","title":"PikaParser.Grammar","text":"struct Grammar{G}\n\nA representation of the grammar prepared for parsing.\n\nFields\n\nnames::Vector\nTopologically sorted list of rule labels (non-terminals)\nidx::Dict{G, Int64} where G\nMapping of rule labels to their indexes in names\nclauses::Vector{PikaParser.Clause{Int64}}\nClauses of the grammar converted to integer labels (and again sorted topologically)\ncan_match_epsilon::Vector{Bool}\nFlags for the rules being able to match on empty string unconditionally\nseed_clauses::Vector{Vector{Int64}}\nWhich clauses get seeded upon matching of a clause\nterminals::Vector{Int64}\nA summarized list of grammar terminals that are checked against each input letter\n\n\n\n\n\n","category":"type"},{"location":"reference/#PikaParser.Match","page":"Reference","title":"PikaParser.Match","text":"struct Match\n\nInternal match representation.\n\nFields\n\nclause::Int64\nWhich clause has matched here?\npos::Int64\nWhere the match started?\nlen::Int64\nHow long is the match?\noption_idx::Int64\nWhich possibility (given by the clause) did we match?\nsubmatches::Vector{Int64}\nIndexes to the vector of matches. This forms the edges in the match tree.\n\n\n\n\n\n","category":"type"},{"location":"reference/#PikaParser.MemoKey","page":"Reference","title":"PikaParser.MemoKey","text":"struct MemoKey\n\nIndex into the memoization table.\n\nFields\n\nclause::Int64\npos::Int64\n\n\n\n\n\n","category":"type"},{"location":"reference/#PikaParser.MemoTable","page":"Reference","title":"PikaParser.MemoTable","text":"mutable struct SortedDict{PikaParser.MemoKey, Int64, Ord<:Base.Order.Ordering} <: AbstractDict{PikaParser.MemoKey, Int64}\n\nPikaparser memoization table.\n\n\n\n\n\n","category":"type"},{"location":"reference/#PikaParser.NotFollowedBy","page":"Reference","title":"PikaParser.NotFollowedBy","text":"struct NotFollowedBy{G} <: PikaParser.Clause{G}\n\nZero-length match that succeeds if reserved does not match at the same position.\n\nFields\n\nreserved::Any\n\n\n\n\n\n","category":"type"},{"location":"reference/#PikaParser.OneOrMore","page":"Reference","title":"PikaParser.OneOrMore","text":"struct OneOrMore{G} <: PikaParser.Clause{G}\n\nGreedily matches a sequence of matches, with at least 1 match.\n\nFields\n\nitem::Any\n\n\n\n\n\n","category":"type"},{"location":"reference/#PikaParser.ParserState","page":"Reference","title":"PikaParser.ParserState","text":"mutable struct ParserState{G, I}\n\nIntermediate parsing state. The match tree is built in a vector of matches that grows during the matching, all match indexes point into this vector.\n\nThis structure is also a \"result\" of the parsing, used to reconstruct the match tree.\n\nFields\n\ngrammar::PikaParser.Grammar\nCopy of the grammar used to parse the input.\nmemo::DataStructures.SortedDict{PikaParser.MemoKey, Int64}\nBest matches of grammar rules for each position of the input\nq::DataStructures.SortedSet{Int64}\nQueue for rules that should match, used only internally.\nmatches::Vector{PikaParser.Match}\nMatch tree (folded into a vector)\ninput::Any\nParser input, can be used to reconstruct match data.\n\n\n\n\n\n","category":"type"},{"location":"reference/#PikaParser.Satisfy","page":"Reference","title":"PikaParser.Satisfy","text":"struct Satisfy{G} <: PikaParser.Clause{G}\n\nA single terminal. Matches a token from the input stream where the match function returns true.\n\nFields\n\nmatch::Function\n\n\n\n\n\n","category":"type"},{"location":"reference/#PikaParser.Seq","page":"Reference","title":"PikaParser.Seq","text":"struct Seq{G} <: PikaParser.Clause{G}\n\nSequence of matches. Empty Seq is equivalent to an always-succeeding empty match, as in Epsilon.\n\nFields\n\nchildren::Vector\n\n\n\n\n\n","category":"type"},{"location":"reference/#PikaParser.TakeN","page":"Reference","title":"PikaParser.TakeN","text":"struct TakeN{G} <: PikaParser.Clause{G}\n\nA single terminal. Given the input stream and a position in it, the match function returns the length of the match, or nothing if there's no match.\n\nFields\n\nmatch::Function\n\n\n\n\n\n","category":"type"},{"location":"reference/#PikaParser.Token","page":"Reference","title":"PikaParser.Token","text":"struct Token{G} <: PikaParser.Clause{G}\n\nA single token equal to match.\n\nFields\n\ntoken::Any\n\n\n\n\n\n","category":"type"},{"location":"reference/#PikaParser.Tokens","page":"Reference","title":"PikaParser.Tokens","text":"struct Tokens{G} <: PikaParser.Clause{G}\n\nA series of tokens equal to match.\n\nFields\n\ntokens::Vector\n\n\n\n\n\n","category":"type"},{"location":"reference/#PikaParser.TraverseNode","page":"Reference","title":"PikaParser.TraverseNode","text":"mutable struct TraverseNode{G}\n\nPart of intermediate tree traversing state.\n\nFields\n\nparent_idx::Int64\nparent_sub_idx::Int64\nrule::Any\nmatch::PikaParser.UserMatch\nopen::Bool\nsubvals::Vector\n\n\n\n\n\n","category":"type"},{"location":"reference/#PikaParser.UserMatch","page":"Reference","title":"PikaParser.UserMatch","text":"struct UserMatch\n\nUser-facing representation of a Match.\n\nFields\n\npos::Int64\nWhere the match started?\nlen::Int64\nHow long is the match?\nsubmatches::Vector{Int64}\nIndexes and rule labels of the matched submatches. This forms the edges in the match tree.\n\n\n\n\n\n","category":"type"},{"location":"reference/#PikaParser.ZeroOrMore","page":"Reference","title":"PikaParser.ZeroOrMore","text":"struct ZeroOrMore{G} <: PikaParser.Clause{G}\n\nGreedily matches a sequence of matches that can be empty.\n\nFields\n\nitem::Any\n\n\n\n\n\n","category":"type"},{"location":"reference/#Preparing-the-grammar","page":"Reference","title":"Preparing the grammar","text":"","category":"section"},{"location":"reference/#Specifying-rules","page":"Reference","title":"Specifying rules","text":"","category":"section"},{"location":"reference/","page":"Reference","title":"Reference","text":"Modules = [PikaParser]\nPages = [\"frontend.jl\"]","category":"page"},{"location":"reference/#PikaParser.epsilon","page":"Reference","title":"PikaParser.epsilon","text":"epsilon :: Clause\n\nAn Epsilon clause. Translate to strongly typed grammar with flatten.\n\nExample\n\nmaybe_letter_a = first(token('a'), epsilon)\n\n\n\n\n\n","category":"constant"},{"location":"reference/#PikaParser.fail","page":"Reference","title":"PikaParser.fail","text":"fail :: Clause\n\nA Fail clause. Translate to strongly typed grammar with flatten.\n\nUseful for avoiding rule specification when matching terminals using the fast_match parameter of parse.\n\nExample\n\nseq(:this, :that, fail)  # this rule is effectively disabled\n\n\n\n\n\n","category":"constant"},{"location":"reference/#PikaParser.first-Tuple","page":"Reference","title":"PikaParser.first","text":"first(args...) -> PikaParser.First\n\n\nBuild a First clause. Translate to strongly typed grammar with flatten.\n\nExample\n\nfirst(:something, :fallback, :fallback2)\n\n\n\n\n\n","category":"method"},{"location":"reference/#PikaParser.flatten-Union{Tuple{Dict{G}}, Tuple{G}, Tuple{Dict{G}, Function}} where G","page":"Reference","title":"PikaParser.flatten","text":"flatten(rules::Dict{G}) -> Dict\nflatten(rules::Dict{G}, childlabel::Function) -> Dict\n\n\nConvert a possibly nested and weakly typed rules into a correctly typed and unnested ruleset, usable in make_grammar. This allows use of convenience rule building functions:\n\nsatisfy\ntake_n\ntoken\ntokens\nepsilon (not a function!)\nfail (not a function!)\nseq\nfirst\nnot_followed_by\nfollowed_by\none_or_more\nzero_or_more\nprecedence_cascade (not backed by an actual Clause!)\n\nAnonymous nested rules are assigned names that are constructed by childlabel function (gets the original G and and integer with position integer). By default, childlabel concatenats the parent rule name, hyphen, and the position number to form a Symbol (i.e., the default works only in cases when the rules are labeled by Symbols, and you need to provide your own implementation for other grammars labeled e.g. by integers or strings).\n\n\n\n\n\n","category":"method"},{"location":"reference/#PikaParser.followed_by-Tuple{Any}","page":"Reference","title":"PikaParser.followed_by","text":"followed_by(x) -> PikaParser.FollowedBy\n\n\nBuild a FollowedBy clause. Translate to strongly typed grammar with flatten.\n\nExample\n\nseq(:digits, followed_by(:whitespace))\n\n\n\n\n\n","category":"method"},{"location":"reference/#PikaParser.not_followed_by-Tuple{Any}","page":"Reference","title":"PikaParser.not_followed_by","text":"not_followed_by(x) -> PikaParser.NotFollowedBy\n\n\nBuild a NotFollowedBy clause. Translate to strongly typed grammar with flatten.\n\nExample\n\nseq(not_followed_by(tokens(collect(\"reservedWord\"))), :identifier)\n\n\n\n\n\n","category":"method"},{"location":"reference/#PikaParser.one_or_more-Tuple{Any}","page":"Reference","title":"PikaParser.one_or_more","text":"one_or_more(x) -> PikaParser.OneOrMore\n\n\nBuild a OneOrMore clause. Translate to strongly typed grammar with flatten.\n\nExample\n\none_or_more(satisfy(isspace))\n\n\n\n\n\n","category":"method"},{"location":"reference/#PikaParser.precedence_cascade-Tuple{Function, Vararg{Any}}","page":"Reference","title":"PikaParser.precedence_cascade","text":"precedence_cascade(label::Function, levels...) -> Vector\n\n\nConvert a list of rules of increasing associativity to a typical precedence-handling \"failthrough\" construction. The result must be post-processed by flatten.\n\nEach of the rules is abstracted by \"same-associativity\" and \"higher-associativity\" rules (i.e., it is a binary function), which is used to correctly link the rules within the precedence group. The first rule is of the lowest precedence. All rules except the last automatically fallback to the next rule. The higher-precedence parameter of the last rule is the label of the first rule.\n\nlabel is a function that generates the label for given n-th level of the grammar.\n\nUse @precedences for a less verbose construction.\n\nReturns a vector of labeled rules; that must usually be interpolated into the ruleset.\n\nExample\n\nDict(\n    precedence_cascade(\n        n -> Symbol(:exprlevel, n),\n        (same, next) -> :expr => first(\n            :plus => seq(same, token('+'), next),\n            :minus => seq(same, token('-'), next),\n        ),\n        (same, next) -> :times => seq(same, token('*'), next), # left associative\n        (same, next) -> :power => seq(next, token('^'), same), # right associative\n        (_, restart) -> first(\n            :parens => seq(token('('), restart, token(')')),\n            :digits => one_or_more(satisfy(isdigit)),\n        ),\n    )...,\n)\n\n\n\n\n\n","category":"method"},{"location":"reference/#PikaParser.satisfy-Tuple{Function}","page":"Reference","title":"PikaParser.satisfy","text":"satisfy(f::Function) -> PikaParser.Satisfy{Any}\n\n\nBuild a Satisfy clause. Translate to strongly typed grammar with flatten.\n\nExample\n\nsatisfy(isdigit)\n\n\n\n\n\n","category":"method"},{"location":"reference/#PikaParser.seq-Tuple","page":"Reference","title":"PikaParser.seq","text":"seq(args...) -> PikaParser.Seq\n\n\nBuild a Seq clause. Translate to strongly typed grammar with flatten.\n\nExample\n\ndigit_in_parents = seq(token('('), :digit, token(')'))\n\n\n\n\n\n","category":"method"},{"location":"reference/#PikaParser.take_n-Tuple{Function}","page":"Reference","title":"PikaParser.take_n","text":"take_n(f::Function) -> PikaParser.TakeN{Any}\n\n\nBuild a TakeN clause. Translate to strongly typed grammar with flatten.\n\nExample\n\n# rule to match a pair of equal tokens\ntake_n(m -> m[1] == m[2] ? 2 : nothing)\n\n\n\n\n\n","category":"method"},{"location":"reference/#PikaParser.token-Tuple{Any}","page":"Reference","title":"PikaParser.token","text":"token(x) -> PikaParser.Token{Any}\n\n\nBuild a Token clause. Translate to strongly typed grammar with flatten.\n\nExample\n\ntoken('a')\n\n\n\n\n\n","category":"method"},{"location":"reference/#PikaParser.tokens-Tuple{Vector}","page":"Reference","title":"PikaParser.tokens","text":"tokens(xs::Vector) -> PikaParser.Tokens{Any}\n\n\nBuild a Tokens clause. Translate to strongly typed grammar with flatten.\n\nExample\n\ntokens(collect(\"keyword\"))\n\n\n\n\n\n","category":"method"},{"location":"reference/#PikaParser.zero_or_more-Tuple{Any}","page":"Reference","title":"PikaParser.zero_or_more","text":"zero_or_more(x) -> PikaParser.ZeroOrMore\n\n\nBuild a ZeroOrMore clause. Translate to strongly typed grammar with flatten.\n\nExample\n\nseq(:quote, zero_or_more(:quote_contents), :quote)\n\n\n\n\n\n","category":"method"},{"location":"reference/#PikaParser.@precedences-Tuple{Any, Symbol, Symbol, Any}","page":"Reference","title":"PikaParser.@precedences","text":"@precedences labeller same::Symbol next::Symbol rules\n\nA shortcut macro for precedence_cascade. Automatically adds lambda heads with fixed argument names, and splats itself with ... into the surrounding environment.\n\nExample\n\nDict(\n    @precedences (n->Symbol(:exprlevel, n)) same next begin\n        :expr => seq(same, token('+'), next)\n        seq(same, token('*'), next)\n        first(\n            token('x'),\n            seq(token('('), next, token(')'))\n        )\n    end\n)\n\n\n\n\n\n","category":"macro"},{"location":"reference/#Converting-to-a-Grammar","page":"Reference","title":"Converting to a Grammar","text":"","category":"section"},{"location":"reference/","page":"Reference","title":"Reference","text":"Modules = [PikaParser]\nPages = [\"grammar.jl\"]","category":"page"},{"location":"reference/#PikaParser.make_grammar-Union{Tuple{G}, Tuple{AbstractVector{G}, Dict{G, PikaParser.Clause{G}}}} where G","page":"Reference","title":"PikaParser.make_grammar","text":"make_grammar(starts::AbstractArray{G, 1}, rules_dict::Dict{G, PikaParser.Clause{G}}) -> PikaParser.Grammar\n\n\nProduce a Grammar with rules of type G that can be used to parse inputs.\n\nstarts should collect top-level rules (these will be put at the top of the topological order of the parsing).\n\nrules_dict is a dictionary of grammar Clauses.\n\n\n\n\n\n","category":"method"},{"location":"reference/#Parsing","page":"Reference","title":"Parsing","text":"","category":"section"},{"location":"reference/","page":"Reference","title":"Reference","text":"Modules = [PikaParser]\nPages = [\"parse.jl\"]","category":"page"},{"location":"reference/#PikaParser.parse-Union{Tuple{I}, Tuple{G}, Tuple{PikaParser.Grammar{G}, I}, Tuple{PikaParser.Grammar{G}, I, Any}} where {G, I<:(AbstractVector)}","page":"Reference","title":"PikaParser.parse","text":"parse(grammar::PikaParser.Grammar{G}, input::AbstractVector) -> PikaParser.ParserState\nparse(grammar::PikaParser.Grammar{G}, input::AbstractVector, fast_match) -> PikaParser.ParserState\n\n\nTake a Grammar and an indexable input sequence, and return a final ParserState that contains all matched grammar productions.\n\nFast terminal matching\n\nIf fast_match is specified, the function does not match terminals using the associated grammar rules, but with a fast_match function that reports the matched terminals via a callback. The function is called exactly once for each position in input in reverse order (i.e., the indexes will follow reverse(1:length(input)), which can be utilized by the application for optimization).  The call parameters consist of the input vector, position in the input vector, and a \"report\" function used to send back a clause ID (of same type as G in typeof(grammar)) and the length of the terminal matches that can found at that position. Calls to the reporting function can be repeated if more terminal types match. Terminals not reported by the calls to fast_match will not be matched.\n\nFor complicated grammars, this may be much faster than having the parser to try matching all terminal types at each position.\n\nResults\n\nUse find_first_parse_at or find_match_at! to extract matches from ParserState.\n\nPika parsing never really fails. Instead, in case when the grammar rule is not matched in the input, the expected rule match match is either not going to be found at the starting position with find_match_at!, or it will not span the whole input.\n\nExample\n\nparse(\n    g,\n    collect(\"abcde123\"),\n    (input, i, match) -> isdigit(input[i]) ? match(:digit, 1) : match(:letter, 1),\n)\n\n\n\n\n\n","category":"method"},{"location":"reference/#Traversing-and-folding-the-parse-tree","page":"Reference","title":"Traversing and folding the parse tree","text":"","category":"section"},{"location":"reference/","page":"Reference","title":"Reference","text":"Modules = [PikaParser]\nPages = [\"traverse.jl\"]","category":"page"},{"location":"reference/#PikaParser.find_first_parse_at-Union{Tuple{G}, Tuple{PikaParser.ParserState{G}, Int64}} where G","page":"Reference","title":"PikaParser.find_first_parse_at","text":"Find any possible match of anything starting at input position pos. Preferentially returns the parses that are topologically higher.\n\nIf found, returns the Match index in ParserState, and the name of the corresponding grammar production rule.\n\n\n\n\n\n","category":"method"},{"location":"reference/#PikaParser.find_match_at!-Union{Tuple{G}, Tuple{PikaParser.ParserState{G}, G, Int64}} where G","page":"Reference","title":"PikaParser.find_match_at!","text":"find_match_at!(st::PikaParser.ParserState{G}, rule, pos::Int64) -> Union{Nothing, Int64}\n\n\nFind the Match index in ParserState that matched rule at position pos, or nothing if there is no such match.\n\nZero-length matches may not be matched at all positions by default; this function creates the necessary matches in the tables in st in case they are missing. (That is the reason for the ! label.)\n\n\n\n\n\n","category":"method"},{"location":"reference/#PikaParser.traverse_match-Union{Tuple{G}, Tuple{PikaParser.ParserState{G}, Int64}} where G","page":"Reference","title":"PikaParser.traverse_match","text":"traverse_match(st::PikaParser.ParserState{G}, mid::Int64; open, fold) -> Expr\n\n\nGiven a Match index in ParserState st, recusively depth-first traverse the match tree using functions open (called upon entering a submatch) and fold (called upon leaving the submatch).\n\nopen is given the current grammar rule and the UserMatch. It should return a vector of boolean values that tell the traversal which submatches from the UserMatch should be opened. That can be used to skip parsing of large uninteresting parts of the match tree, such as whitespace or comments. By default, it opens the whole subtree.\n\nfold is given the same current grammar rule and the UserMatch, and additionally a vector of folded values from the submatches. The values returned by fold invocations are collected and transferred to higher-level invocations of fold. In case open disabled the evaluation of a given submatch, nothing is used as the folded value for the submatch. By default, fold just collects all submatch values and produces a Julia Expr AST structure where rule expansions are represented as function calls.\n\n\n\n\n\n","category":"method"},{"location":"#PikaParser.jl","page":"README","title":"PikaParser.jl","text":"","category":"section"},{"location":"","page":"README","title":"README","text":"Modules = [PikaParser]\nPages = [\"PikaParser.jl\"]","category":"page"},{"location":"#PikaParser.PikaParser","page":"README","title":"PikaParser.PikaParser","text":"PikaParser.jl\n\nA simple straightforward implementation of PikaParser in pure Julia, following the specification by Luke A. D. Hutchison (see https://github.com/lukehutch/pikaparser).\n\nPika parsers are pretty fast, they are easy to specify, carry the ability to unambigously match all PEG grammars including the left-recursive ones, and provide great mechanisms for parsing error recovery.\n\nThe code is new, feedback is welcome.\n\nExample\n\nimport PikaParser as P\n\nBuilding a grammar\n\nAll grammar clauses are subtype of a Clause. The types are indexed by the labels for your grammar rules – Julia symbols are a natural choice, but you are free to use integers, strings, or anything else.\n\nrules = Dict(\n    # match a sequence of characters that satisfies `isdigit`\n    :digits => P.one_or_more(:digit => P.satisfy(isdigit)),\n\n    # expression in parentheses\n    :parens => P.seq(\n        P.token('('),\n        # you can name the rules in nested contexts\n        :expr => P.first(:plusexpr, :minusexpr, :digits, :parens),\n        P.token(')'),\n    ),\n\n    # some random operators\n    :plusexpr => P.seq(:expr, P.token('+'), :expr),\n    :minusexpr => P.seq(:expr, P.token('-'), :expr),\n)\n\ng = P.make_grammar(\n    [:expr], # the top-level rule\n    P.flatten(rules),\n)\n\nThe grammar is now prepared for parsing.\n\nParsing text\n\nPika parsers require frequent indexing of the input, Strings thus need to be converted to character vectors to be usable as parser input. (To improve performance, it is adviseable to lex your input into a vector of more complex tokens.)\n\ninput = collect(\"12-(34+567-8)\")\np = P.parse(g, input)\n\nYou can find if something matched:\n\nP.find_first_parse_at(p, 1)\n\n...which should return (1, :expr), telling that there's a match of :expr at the first position.\n\nYou can also get the match index of the match, to find more about what was matched:\n\nP.find_match_at!(p, :expr, 1)\n\n...which returns an index in the match table (if found), such as 45.\n\nYou can have a look at the match. p.matches[45] should return\n\nPikaParser.Match(10, 1, 13, 2, [44])\n\nwhere 10 is the renumbered rule ID for :expr, 1 is the starting position in the input, 13 is the length of the match (here, that is the whole input); 2 is the option index (in this case, it points to :expr option 2, which is :minusexpr), and 44 is the submatch of :minusexpr.\n\nRecovering parsed ASTs\n\nYou can use traverse_match to recursively walk the parse trees, to produce ASTs, and translate, interpret or evaluate the expressions:\n\nP.traverse_match(p, P.find_match_at!(p, :expr, 1))\n\nBy default, this runs through the whole match tree and transcodes the matches to Julia Expr AST. In this case, if you pipe the output through JuliaFormatter, you will get something like:\n\nexpr(\n    minusexpr(\n        expr(digits(digit(), digit())),\n        var\"minusexpr-2\"(),\n        expr(\n            parens(\n                var\"parens-1\"(),\n                expr(\n                    plusexpr(\n                        expr(digits(digit(), digit())),\n                        var\"plusexpr-2\"(),\n                        expr(\n                            minusexpr(\n                                expr(digits(digit(), digit(), digit())),\n                                var\"minusexpr-2\"(),\n                                expr(digits(digit())),\n                            ),\n                        ),\n                    ),\n                ),\n                var\"parens-3\"(),\n            ),\n        ),\n    ),\n)\n\nIt is straightforward to specify your own method of evaluating the parses by supplying the matchtree opening and folding functions. For example, you can evaluate the expression as follows:\n\nP.traverse_match(p, P.find_match_at!(p, :expr, 1),\n    fold = (rule, match, subvals) ->\n        rule == :digits ?\n        parse(Int, String(input[match.pos:match.pos+match.len-1])) :\n        rule == :expr ? subvals[1] :\n        rule == :parens ? subvals[2] :\n        rule == :plusexpr ? subvals[1] + subvals[3] :\n        rule == :minusexpr ? subvals[1] - subvals[3] :\n        nothing,\n)\n\nYou should get the expectable result (-581).\n\n\n\n\n\n","category":"module"}]
}

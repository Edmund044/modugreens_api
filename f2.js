var fuzzylogic = require("fuzzylogic")
var resGrade = fuzzylogic.grade(3,0,1);
assert.ok(resGrade == 1);
 
var resReverseGrade = fuzzylogic.reverseGrade(3,0,1);
assert.ok(resReverseGrade === 0);
 
var resTriangle = fuzzylogic.triangle(3,0,1,2);
assert.ok(resTriangle === 0);
assert.ok(rules.and(0.1, 0.2, cbA, cbB) == 0.1);
assert.ok(cbValue == 'a');
assert.ok(rules.or(0.1, 0.2, cbA, cbB)== 0.2);
assert.ok(cbValue == 'b');
assert.ok(rules.not(0.1) == 0.9);
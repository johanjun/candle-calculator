// node test_calc.js — checks the math against the FAQ examples and i18n key parity
const assert = require('node:assert');
const { calc, T } = require('./public/script.js');
const near = (a, b) => assert.ok(Math.abs(a - b) < 0.01, `${a} != ${b}`);

// 8 fl oz jar, 8% of wax weight (English FAQ: ~203 g total, 188 g wax, 15 g oil)
let r = calc({ count: 1, fill: 8, unit: 'floz', load: 8, method: 'wax' });
near(r.total, 203.4659); near(r.wax, 188.3943); near(r.fo, 15.0716);
near(r.fo, r.wax * 0.08);

// same jar, 8% of total weight: oil is 8% of the whole pour
r = calc({ count: 1, fill: 8, unit: 'floz', load: 8, method: 'total' });
near(r.fo, 203.4659 * 0.08); near(r.wax + r.fo, 203.4659);

// 200 ml (DE/FR/JA FAQ: ~172 g, 159 g wax, 13 g oil)
r = calc({ count: 1, fill: 200, unit: 'ml', load: 8, method: 'wax' });
near(r.total, 172); near(r.wax, 159.2593); near(r.fo, 12.7407);

// weight units skip the density; count multiplies everything
r = calc({ count: 6, fill: 100, unit: 'g', load: 0, method: 'wax' });
near(r.wax, 600); near(r.fo, 0); near(r.each.total, 100);
near(calc({ count: 1, fill: 1, unit: 'oz', load: 0, method: 'wax' }).total, 28.3495);

// every language has exactly the English keys
const keys = Object.keys(T.en).sort().join();
for (const l of Object.keys(T)) assert.strictEqual(Object.keys(T[l]).sort().join(), keys, `key mismatch in ${l}`);

console.log('ok');

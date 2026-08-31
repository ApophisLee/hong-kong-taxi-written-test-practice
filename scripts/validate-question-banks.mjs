import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';

const readJson = (path) => JSON.parse(readFileSync(new URL(`../${path}`, import.meta.url), 'utf8'));

const manifest = readJson('data/question-bank-manifest.json');
const banks = {
  operation: readJson('data/operation-questions.json'),
  location: readJson('data/location-questions.json'),
  route: readJson('data/route-questions.json'),
  'road-user': readJson('data/road-user-questions.json'),
};

assert.equal(manifest.bankVersion, 'combined-2026-08-03');
assert.equal(manifest.effectiveDate, '2026-08-03');
assert.deepEqual(manifest.exam.partA, {
  operationQuestions: 20,
  locationQuestions: 9,
  routeQuestions: 1,
  passMark: 25,
  totalQuestions: 30,
});
assert.deepEqual(manifest.exam.partB, {
  roadUserQuestions: 35,
  passMark: 30,
  totalQuestions: 35,
});
assert.equal(manifest.exam.durationMinutes, 45);
assert.equal(manifest.exam.bothPartsMustPass, true);

const expectedIds = {
  operation: [1001, 1030],
  location: [1, 255],
  route: [256, 273],
  'road-user': [2001, 2004],
};

const allIds = new Set();
for (const [category, questions] of Object.entries(banks)) {
  const spec = manifest.banks[category];
  assert.equal(questions.length, spec.records, `${category}: unexpected record count`);
  const canonicalContent = questions.map((question) => [
    question.id,
    question.category,
    question.question,
    question.options,
    question.correct,
    question.explanation,
    question.type,
  ]);
  assert.equal(
    createHash('sha256').update(JSON.stringify(canonicalContent)).digest('hex'),
    spec.contentSha256,
    `${category}: reviewed bank content changed; review it before updating the manifest`,
  );
  assert.deepEqual(
    questions.map((question) => question.id),
    Array.from(
      { length: expectedIds[category][1] - expectedIds[category][0] + 1 },
      (_, index) => expectedIds[category][0] + index,
    ),
    `${category}: IDs must be contiguous and ordered`,
  );

  for (const question of questions) {
    assert.equal(question.category, category, `${category}/${question.id}: category mismatch`);
    assert.equal(typeof question.question, 'string', `${category}/${question.id}: missing question`);
    assert.ok(question.question.trim(), `${category}/${question.id}: empty question`);
    assert.equal(question.options.length, spec.optionsPerQuestion, `${category}/${question.id}: wrong option count`);
    assert.equal(new Set(question.options).size, question.options.length, `${category}/${question.id}: duplicate option`);
    assert.ok(question.options.every((option) => typeof option === 'string' && option.trim()), `${category}/${question.id}: empty option`);
    assert.ok(Number.isInteger(question.correct), `${category}/${question.id}: correct must be an integer`);
    assert.ok(question.correct >= 0 && question.correct < question.options.length, `${category}/${question.id}: correct out of range`);
    assert.equal(typeof question.explanation, 'string', `${category}/${question.id}: missing explanation`);
    assert.ok(question.explanation.trim(), `${category}/${question.id}: empty explanation`);
    assert.equal(typeof question.type, 'string', `${category}/${question.id}: missing type`);
    assert.ok(question.type.trim(), `${category}/${question.id}: empty type`);
    assert.ok(!allIds.has(question.id), `${category}/${question.id}: duplicate global ID`);
    allIds.add(question.id);
  }
}

const expectedLocationTypes = {
  醫院: 52,
  旅遊景點: 37,
  酒店: 48,
  政府樓宇: 50,
  商業大廈: 17,
  購物商場: 17,
  住宅樓宇: 22,
  大專院校: 12,
};
const actualLocationTypes = Object.fromEntries(
  Object.keys(expectedLocationTypes).map((type) => [
    type,
    banks.location.filter((question) => question.type === type).length,
  ]),
);
assert.deepEqual(actualLocationTypes, expectedLocationTypes);

assert.deepEqual(
  [...new Set(banks.operation.map((question) => question.type))].sort(),
  Object.keys(manifest.operationTopicReferences).sort(),
  'operation topics must all have a source reference',
);

for (const category of ['location', 'route']) {
  assert.ok(
    new Set(banks[category].map((question) => question.correct)).size > 1,
    `${category}: canonical correct answers must not all use one index`,
  );
}

console.log(
  `Validated ${allIds.size} questions for ${manifest.bankVersion}: ` +
    Object.entries(banks).map(([name, questions]) => `${name}=${questions.length}`).join(', '),
);

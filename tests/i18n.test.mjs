import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { languages } from "../js/i18n/index.js";

const keys = (node, prefix = "") =>
  Object.entries(node).flatMap(([key, value]) =>
    typeof value === "object" ? keys(value, `${prefix}${key}.`) : [`${prefix}${key}`],
  );

const reference = keys(languages[0].dictionary).sort();

test("every language has exactly the same keys as english", () => {
  for (const { code, dictionary } of languages) {
    assert.deepEqual(keys(dictionary).sort(), reference, code);
  }
});

test("no translation is empty", () => {
  for (const { code, dictionary } of languages) {
    const values = keys(dictionary).map((key) => key.split(".").reduce((node, part) => node[part], dictionary));
    assert.ok(values.every((value) => value.trim().length > 0), code);
  }
});

test("english hero title is exact and no language uses banned words", () => {
  assert.equal(languages[0].dictionary.hero.title, "made to explore.");
  for (const { code, dictionary } of languages) {
    assert.doesNotMatch(JSON.stringify(dictionary), /internet|интернет/i, code);
  }
});

test("language codes are unique", () => {
  assert.equal(new Set(languages.map((language) => language.code)).size, languages.length);
});

test("about section keeps the m4thh identity untranslated and never says Matheo", () => {
  for (const { code, dictionary } of languages) {
    assert.match(dictionary.about.intro, /m4thh/, code);
    assert.doesNotMatch(JSON.stringify(dictionary), /matheo/i, code);
  }
  const html = readFileSync(new URL("../index.html", import.meta.url), "utf8").replace(/href="[^"]*"/g, "");
  assert.doesNotMatch(html, /matheo/i);
});

test("brand names are not translated", () => {
  for (const { code, dictionary } of languages) {
    assert.match(dictionary.meta.title, /^corem4thh/, code);
  }
});

import {
  getWordFrequenciesFromSourceText,
  getTitleFrequencies,
  getUrl,
  getCondensedUrl,
} from './urlBuilder';
import { parseParams } from './parseParams';

test('keeps straight and curly quoted titles together, including stopwords', () => {
  expect(getWordFrequenciesFromSourceText(
    '"The Hunger Games" “The Hunger Games” "Charlotte’s Web" and books books'
  )).toEqual([
    { text: 'the hunger games', weight: 2 },
    { text: 'charlotte’s web', weight: 1 },
    { text: 'books', weight: 2 },
  ]);
});

test('retains ordinary text filtering and handles unfinished quotes', () => {
  expect(getWordFrequenciesFromSourceText('The cat, cat and dog.')).toEqual([
    { text: 'cat', weight: 2 }, { text: 'dog', weight: 1 },
  ]);
  expect(getWordFrequenciesFromSourceText('"The Hunger Games')).toEqual([
    { text: 'hunger', weight: 1 }, { text: 'games', weight: 1 },
  ]);
  expect(getWordFrequenciesFromSourceText('"the"', { removeStopwords: false }))
    .toEqual([{ text: 'the', weight: 1 }]);
});

test('counts complete lines without dropping punctuation, numbers, or stopwords', () => {
  expect(getTitleFrequencies(
    '  The Hunger Games\r\n\r\n“the hunger games”\n"Charlotte’s Web"\nCatch 22\nThe Lion, the Witch; and the Wardrobe\n__proto__'
  )).toEqual([
    { text: 'the hunger games', weight: 2 },
    { text: 'charlotte’s web', weight: 1 },
    { text: 'catch 22', weight: 1 },
    { text: 'the lion, the witch; and the wardrobe', weight: 1 },
    { text: '__proto__', weight: 1 },
  ]);
  expect(getTitleFrequencies(' \n""\n“”')).toEqual([]);
});

test.each([getUrl, getCondensedUrl])('titles survive a shared URL round trip (%p)', (buildUrl) => {
  const words = getTitleFrequencies(
    'The Lion, the Witch; and the Wardrobe\nC++ & 100% magic\nThe Hunger Games\nThe Hunger Games'
  );
  const url = new URL(buildUrl(words));
  expect(parseParams(url.search).words).toEqual(words);
});

test('existing word URLs remain readable', () => {
  expect(parseParams('?w=apple,3;banana,2').words).toEqual([
    { text: 'apple', weight: 3 }, { text: 'banana', weight: 2 },
  ]);
});

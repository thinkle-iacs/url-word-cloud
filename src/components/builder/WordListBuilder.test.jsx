import React, { act, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Simulate } from 'react-dom/test-utils';
import WordListBuilder from './WordListBuilder';

global.IS_REACT_ACT_ENVIRONMENT = true;

test('opening a shared cloud preserves titles containing punctuation and numbers', () => {
  const container = document.createElement('div');
  const root = createRoot(container);
  const initialWords = [
    { text: 'Catch 22', weight: 2 },
    { text: 'The Lion, the Witch; and the Wardrobe', weight: 1 },
  ];
  const setWords = jest.fn();
  try {
    act(() => root.render(<WordListBuilder initialWords={initialWords} setWords={setWords} />));
    expect(setWords).toHaveBeenLastCalledWith(initialWords);
  } finally {
    act(() => root.unmount());
  }
});

test('switches input modes, restores their contents, and allows an empty cloud', () => {
  const container = document.createElement('div');
  const root = createRoot(container);
  function Harness() {
    const [words, setWords] = useState([]);
    return <>
      <WordListBuilder setWords={setWords} />
      <output>{JSON.stringify(words)}</output>
    </>;
  }
  const output = () => JSON.parse(container.querySelector('output').textContent);
  const selectMode = (mode) => act(() => container.querySelector(`input[value="${mode}"]`).click());
  const enter = (value) => act(() => Simulate.change(container.querySelector('textarea'), { target: { value } }));
  try {
    act(() => root.render(<Harness />));
    selectMode('titles');
    expect(output()).toEqual([]);
    enter('The Hunger Games\nThe Hunger Games\nCatch 22');
    expect(output()).toEqual([
      { text: 'the hunger games', weight: 2 }, { text: 'catch 22', weight: 1 },
    ]);
    selectMode('text');
    enter('"Charlotte’s Web" "Charlotte’s Web"');
    expect(output()).toEqual([{ text: 'charlotte’s web', weight: 2 }]);
    selectMode('titles');
    expect(output()[0]).toEqual({ text: 'the hunger games', weight: 2 });
    enter('');
    expect(output()).toEqual([]);
    selectMode('text');
    enter('');
    expect(output()).toEqual([]);
    selectMode('manual');
    enter('The Hunger Games 3 Charlotte’s Web 2');
    expect(output()).toEqual([
      { text: 'The Hunger Games', weight: 3 }, { text: 'Charlotte’s Web', weight: 2 },
    ]);
  } finally {
    act(() => root.unmount());
  }
});

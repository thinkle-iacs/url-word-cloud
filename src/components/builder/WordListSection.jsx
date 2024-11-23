// src/components/builder/WordListSection.jsx
import React, { useState } from 'react';
import { FiChevronUp, FiChevronDown } from 'react-icons/fi';
import WordListBuilder from './WordListBuilder';

const WordListSection = ({ words, setWords }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  return (
    <div className="mb-4">
      <div
        className="flex items-center justify-between cursor-pointer bg-gray-200 p-2 rounded"
        onClick={toggleCollapse}
      >
        <h2 className="text-xl font-bold">Word List</h2>
        {isCollapsed ? <FiChevronDown /> : <FiChevronUp />}
      </div>
      {!isCollapsed && (
        <div className="overflow-auto">
          <WordListBuilder words={words} setWords={setWords} />
        </div>
      )}
    </div>
  );
};

export default WordListSection;
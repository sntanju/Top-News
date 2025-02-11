import React from "react";

const NewsCard = ({ story }) => {
  return (
    <div className="p-4 border-b border-gray-300">
      <a href={story.url} target="_blank" rel="noopener noreferrer">
        <h2 className="text-xl font-semibold text-blue-600 hover:underline">{story.title}</h2>
      </a>
      <p className="text-gray-600">By {story.by} | {story.score} points</p>
    </div>
  );
};

export default NewsCard;

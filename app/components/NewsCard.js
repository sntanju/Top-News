"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function NewsCard() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const ids = await fetchNewsIds();
        const newsItems = await Promise.all(ids.map(fetchNewsItem));
        setNews(newsItems);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-4">
      {/* Main Card Container */}
      <div className="border rounded-lg shadow-lg bg-white p-4">
        {news.length > 0 ? (
          news.map((item, index) => (
            <div key={item.id} className="p-3">
              {/* Single News Item */}
              <div className="flex items-start">
                {/* Serial Number */}
                <div className=" my-3 mx-5 font-bold text-orange-600">{item.score}</div>

                {/* News Content */}
                <div className="flex-1 ml-3">
                  {/* Title + URL */}
                  <h2 className="text-lg ">
                    
                    {item.title}{" "}
                    {item.url && (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 text-sm"
                      >
                        ({new URL(item.url).hostname})
                      </a>
                    )}
                  </h2>

                  {/* Meta Information */}
                  <p className="text-sm text-gray-600">
                    By{" "}
                    <Link href={`/user/${item.by}`} className=" hover:underline">
                    {item.by}
                    </Link>{" "}
                    | {item.descendants || 0} comments | {timeAgo(item.time)}
                </p>

            

                </div>
              </div>

              {/* Horizontal Line Between Items */}
              {index !== news.length - 1 && <hr className="my-3 border-gray-300 border-t-2 mx-0" />}
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">Loading news...</p>
        )}
      </div>
    </div>
  );
}

// Function to fetch the list of Top Story IDs
async function fetchNewsIds() {
  const response = await fetch("https://hacker-news.firebaseio.com/v0/topstories.json");
  const ids = await response.json();
  return ids.slice(0, 10); // Get only the first 10 items
}

// Function to fetch individual news details using ID
async function fetchNewsItem(id) {
  const response = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
  const data = await response.json();
  return data;
}

// Function to format time ago
function timeAgo(timestamp) {
  const seconds = Math.floor((Date.now() - timestamp * 1000) / 1000);
  const hours = Math.floor(seconds / 3600);
  return `${hours} hours ago`;
}

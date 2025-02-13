"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

const AskNewsPage = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const ids = await fetchAskNewsIds();  // Fetch Ask HN story IDs
        const newsItems = await Promise.all(ids.map(fetchNewsItem));
        setNews(newsItems);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <>
      <Navbar />
      <div className="max-w-5xl mx-auto p-4">
        {/* Main Card Container */}
        <div className="border rounded-lg shadow-lg bg-white p-4">
          {loading ? (
            <p className="text-center text-gray-600">Loading news...</p>
          ) : news.length > 0 ? (
            news.map((item, index) => (
              <div key={item.id} className="p-3">
                {/* Single News Item */}
                <div className="flex items-start gap-4">
                  {/* Score Number */}
                  <div className="w-10 text-right font-bold text-orange-600">{item.score}</div>

                  {/* News Content */}
                  <div className="flex-1">
                    {/* Title + URL */}
                    <h2 className="text-lg">
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline hover:decoration-orange-500"
                      >
                        {item.title}
                      </a>{" "}
                      {item.url && (
                        <span className="text-gray-600 text-sm">({new URL(item.url).hostname})</span>
                      )}
                    </h2>

                    {/* Meta Information */}
                    <p className="text-sm text-gray-600 mt-1">
                      By{" "}
                      <Link
                        href={`/user/${item.by}`}
                        className="mx-1 hover:underline hover:decoration-orange-500"
                      >
                        {item.by}
                      </Link>
                      |  
                      <Link
                        href={`/newses/${item.id}`}
                        className="mx-1 hover:underline hover:decoration-orange-500"
                      >
                        {item.descendants || 0} comments
                      </Link>
                      |  
                      <span className="mx-1">{timeAgo(item.time)}</span>
                    </p>
                  </div>
                </div>

                {/* Horizontal Line Between Items */}
                {index !== news.length - 1 && <hr className="my-3 border-gray-300 border-t-2" />}
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600">No news found.</p>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

// Function to fetch the list of Ask HN Story IDs
async function fetchAskNewsIds() {
  const response = await fetch("https://hacker-news.firebaseio.com/v0/askstories.json");
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

export default AskNewsPage;

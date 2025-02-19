"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function BestNewsCard() {
  const [news, setNews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const ids = await fetchBestNewsIds();
        //const newsItems = await Promise.all(ids.map(fetchNewsItem));
        //const ids = await fetchAskNewsIds(); // Fetch Ask HN story IDs
        setTotalPages(Math.ceil(ids.length / itemsPerPage));
        const newsItems = await Promise.all(ids.slice(0, itemsPerPage).map(fetchNewsItem));
        setNews(newsItems);
      } catch (error) {
        console.error("Error fetching best news:", error);
      }
    };

    fetchNews();
  }, []);

  useEffect(() => {
    const fetchPageNews = async () => {
      const ids = await fetchBestNewsIds();
      const start = (currentPage - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      const newsItems = await Promise.all(ids.slice(start, end).map(fetchNewsItem));
      setNews(newsItems);
    };
    fetchPageNews();
  }, [currentPage]);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };


  return (
    <>
        <Navbar/>
        <div className="max-w-5xl mx-auto p-4">
        {/* Main Card Container */}
        <div className="border rounded-lg shadow-lg bg-white p-4">
            {news.length > 0 ? (
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
                        className="mx-1 underline decoration-orange-500"
                        >
                        {item.by}
                        </Link>
                        |  
                        <Link
                        href={`/newses/${item.id}`}
                        className="mx-1 underline decoration-orange-500"
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
            <p className="text-center text-gray-600">Loading...</p>
            )}
        </div>

         {/* Pagination Controls */}
         <div className="flex justify-center items-center mt-4 space-x-4">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
          >
            &lt;
          </button>
          <span>{currentPage}/{totalPages}</span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
          >
            &gt;
          </button>
        </div>

        </div>
        <Footer/>
    </>
  );
}

// Function to fetch the list of Best Story IDs
async function fetchBestNewsIds() {
  const response = await fetch("https://hacker-news.firebaseio.com/v0/beststories.json");
  const ids = await response.json();
  return ids;  
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

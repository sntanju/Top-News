"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

export default function NewsDetails() {
  const { id } = useParams();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
        const data = await res.json();
        setNews(data);
      } catch (error) {
        console.error("Error fetching news details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, [id]);

  if (loading) return <p className="text-center">Loading news...</p>;
  if (!news) return <p className="text-center">News not found.</p>;

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto p-4 bg-white shadow-md rounded-lg mt-5">
        {/* News Header */}
        <div className="mb-4">
          <p className="text-orange-600 font-bold text-lg">{news.score}</p>
          <h2 className="text-lg font-semibold">
            <a
              href={news.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline hover:decoration-orange-500"
            >
              {news.title}
            </a>{" "}
            {news.url && <span className="text-gray-600 text-sm">({new URL(news.url).hostname})</span>}
          </h2>

          <p className="text-sm text-gray-600 mt-2">
            By{" "}
            <Link href={`/user/${news.by}`} className="hover:underline hover:decoration-orange-500">
              {news.by}
            </Link>{" "}
            | {news.descendants || 0} Comments | {timeAgo(news.time)}
          </p>
        </div>

        {/* Comments Section */}
        <h3 className="font-semibold text-lg mb-2">Comments</h3>
        <div className="border-t border-gray-300 pt-2">
          {news.kids ? <CommentList commentIds={news.kids} /> : <p className="text-gray-500">No comments yet.</p>}
        </div>
      </div>
      <Footer />
    </>
  );
}

// Function to format time ago
function timeAgo(timestamp) {
  const seconds = Math.floor((Date.now() - timestamp * 1000) / 1000);
  const hours = Math.floor(seconds / 3600);
  return `${hours} hours ago`;
}

// Component to Fetch and Display Comments
const CommentList = ({ commentIds }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      const commentData = await Promise.all(commentIds.map(fetchComment));
      setComments(commentData.filter(comment => comment && !comment.deleted));
    };
    fetchComments();
  }, [commentIds]);

  return (
    <div>
      {comments.map(comment => (
        <div key={comment.id} className="p-3 border-b border-gray-300">
          <p className="text-sm text-gray-600">
            <Link href={`/user/${comment.by}`} className="hover:underline hover:decoration-orange-500">
              {comment.by}
            </Link>{" "}
            | {timeAgo(comment.time)} | {comment.kids ? `${comment.kids.length} Replies` : "No Replies"}
          </p>
          <div className="text-gray-800 mt-1 text-sm" dangerouslySetInnerHTML={{ __html: comment.text }}></div>
        </div>
      ))}
    </div>
  );
};

// Fetch individual comment
async function fetchComment(id) {
  const response = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
  const data = await response.json();
  return data;
}

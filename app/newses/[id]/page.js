"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // Using useParams
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

async function fetchNewsItem(id) {
  const response = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
  return response.json();
}

function timeAgo(timestamp) {
  const seconds = Math.floor((Date.now() - timestamp * 1000) / 1000);
  const hours = Math.floor(seconds / 3600);
  return `${hours} hours ago`;
}

export default function NewsDetails() {
  const { id } = useParams(); // Fix for Next.js param handling
  const [news, setNews] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const newsItem = await fetchNewsItem(id);
        if (!newsItem) return;

        setNews(newsItem);

        if (newsItem.kids && newsItem.kids.length > 0) {
          const mainComments = await Promise.all(newsItem.kids.map(fetchNewsItem));
          setComments(mainComments.filter((comment) => comment !== null));
        }
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  if (!news) return <p className="text-center">Loading...</p>;

  return (
    <>
    <Navbar/>
    <div className="max-w-5xl mx-auto p-4">
      {/* News Card */}
      <div className="border  shadow-lg bg-white p-4">
        <div className="flex items-start gap-4">
          {/* Score (Added back) */}
          <div className="w-10 text-right font-bold text-orange-600 mt-5">{news.score}</div>

          {/* News Content */}
          <div className="flex-1">
            <h2 className="text-lg">
              <a href={news.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                {news.title}
              </a>
            </h2>
            <p className="text-sm text-gray-600">
              By{" "}
              <Link href={`/user/${news.by}`} className="underline text-orange-500">
                {news.by}
              </Link>{" "}
              | {comments.length}
              {" Comments "}
              | {" Created "} {timeAgo(news.time)}
            </p>
          </div>
        </div>
      </div>

      {/* Comments Card */}
      <div className="mt-6 border rounded-lg shadow-lg bg-white p-4">
        {/* <h3 className="text-lg font-bold mb-3">{comments.length} Comments</h3> */}
        {comments.length > 0 ? (
          comments.map((comment) => <CommentItem key={comment.id} comment={comment} />)
        ) : (
          <p className="text-gray-600">No comments yet.</p>
        )}
      </div>
    </div>
    <Footer/>
    </>
  );
}

function CommentItem({ comment }) {
  const [replies, setReplies] = useState([]);
  const [showReplies, setShowReplies] = useState(false);

  useEffect(() => {
    const loadReplies = async () => {
      if (comment.kids && comment.kids.length > 0) {
        const replyData = await Promise.all(comment.kids.map(fetchNewsItem));
        setReplies(replyData.filter((reply) => reply !== null));
      }
    };

    if (showReplies && replies.length === 0) {
      loadReplies();
    }
  }, [showReplies]);

  return (
    <div className=" pl-4 mt-3">
     <p className="text-sm text-gray-600">
      <Link href={`/user/${comment.by}`} className="underline text-orange-500">
        {comment.by}
      </Link>{" "}
      | {timeAgo(comment.time)}
      {comment.kids && comment.kids.length > 0 && (
        <span> | {comment.kids.length} replies</span>
      )}
    </p>

      <div className="mt-1 text-gray-900" dangerouslySetInnerHTML={{ __html: comment.text }} />

      {comment.kids && comment.kids.length > 0 && (
        <button
          onClick={() => setShowReplies(!showReplies)}
          className="mt-2 text-sm text-orange-500 underline"
        >
          {showReplies ? "Hide Replies" : `Show Replies (${comment.kids.length})`}
        </button>
      )}

      {showReplies &&
        replies.map((reply) => <CommentItem key={reply.id} comment={reply} />)}
    </div>
  );
}

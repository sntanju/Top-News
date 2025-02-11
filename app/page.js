"use client"

import NewsCard from "./components/NewsCard";
import { useEffect, useState } from "react";
import { fetchStory, fetchTopStories, subscribeToTopStories } from "@/lib/hackernewsApi";


export default function Home() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch initial top stories
    fetchTopStories().then(async (storyIds) => {
      const storyPromises = storyIds.map(fetchStory);
      const stories = await Promise.all(storyPromises);
      setStories(stories);
      setLoading(false);
    });

    // Subscribe to real-time updates
    subscribeToTopStories(async (storyIds) => {
      const storyPromises = storyIds.map(fetchStory);
      const stories = await Promise.all(storyPromises);
      setStories(stories);
    });
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  console.log("Firebase API Key:", process.env.API_KEY);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-4">Hacker News</h1>
      {stories.map((story) => (
        <NewsCard key={story.id} story={story} />
      ))}
    </div>
  );
}



import { ref, get, child, onValue } from "firebase/database";
import { database } from "../firebase/firebaseConfig";

// Fetch Top Stories Once
export const fetchTopStories = async () => {
    const response = await fetch("https://hacker-news.firebaseio.com/v0/topstories.json");
    const storyIds = await response.json();
    return storyIds.slice(0, 20); // Get the first 20 stories
  };
  
  export const fetchStory = async (id) => {
    const response = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
    return response.json();
  };

// Real-Time Listener for Top Stories
export const subscribeToTopStories = (callback) => {
  const storiesRef = ref(database, "v0/topstories");
  onValue(storiesRef, (snapshot) => {
    if (snapshot.exists()) {
      callback(snapshot.val().slice(0, 20));
    }
  });
};

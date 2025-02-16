"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

const UserDetails = () => {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!username) return;
    const fetchUser = async () => {
      try {
        const res = await fetch(`https://hacker-news.firebaseio.com/v0/user/${username}.json`);
        const data = await res.json();
        setUser(data);
      } catch (error) {
        console.error("Error fetching user details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [username]);

  if (loading) return <p className="text-center">Loading user details...</p>;
  if (!user) return <p className="text-center">User not found.</p>;

  return (
    <>
      <Navbar />
      <div className="min-h-screen">
      {/* User Details Card */}
      <div className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-10 border border-gray-200">
        <p className="text-gray-900 font-semibold">Username: <span className="font-normal">{user.id}</span></p>
        <p className="text-gray-900 font-semibold">Karma: <span className="font-normal">{user.karma}</span></p>
        <p className="text-gray-900 font-semibold">Created: <span className="font-normal">{new Date(user.created * 1000).toLocaleDateString()}</span></p>
        <p className="text-gray-900 font-semibold">About:</p>    
            
        <div className="mt-2 p-6 bg-gray-100 border-l-4 border-orange-500 rounded-md text-gray-900 break-words overflow-hidden">
          <div dangerouslySetInnerHTML={{ __html: user.about }}></div>
        </div>  
        
      </div>
    </div>
      {/* Fixed Footer */}
      <div className=" bottom-0 left-0 w-full">
        <Footer />
      </div>
    </>
  );
};

export default UserDetails;

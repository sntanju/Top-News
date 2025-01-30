'use client'
import { fetchApiUsers } from '@/redux/Slices/newsSlice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const UsersFromApi = () => {
    const dispatch = useDispatch();
    const usersFromApi = useSelector((state) => state.usersData.usersFromApi);
    useEffect(() => {
        dispatch(fetchApiUsers());
    }, [dispatch]);
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
                <h2 className="text-2xl font-bold mb-4">Users from API</h2>
                {usersFromApi.length === 0 ? (<p className="text-gray-600">Loading...</p>) : (
                    <ul className="list-disc pl-4">
                        {usersFromApi.map((user) => (
                            <li key={user.id} className="text-lg mb-2">{user.email} and email = {user.name}</li>
                            
                        ))}
                    </ul>

                    
                )}
            </div>
        </div>
    );
};

export default UsersFromApi;
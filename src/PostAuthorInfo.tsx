import React, { useState, useEffect } from 'react';
import './PostAuthorInfo.css';

interface PostsAuthorInfoProps {
  userId: number;
  onClose: () => void;
}

interface UserInfo {
  name: string;
  email: string;
  phone: string;
  website: string;
  company: {
    name: string;
  };
  address: {
    street: string;
    suite: string;
    city: string;
  };
  // Add more user info fields as needed
}

const PostsAuthorInfo: React.FC<PostsAuthorInfoProps> = ({ userId, onClose }) => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch user info');
        }
        const data: UserInfo = await response.json();
        setUserInfo(data);
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    fetchUserInfo();
  }, [userId]);

  return (
    <div className="author-info-modal" onClick={onClose}>
      <div className="author-info" onClick={(e) => e.stopPropagation()}>
        {userInfo ? (
          <>
            <h2>{userInfo.name}</h2>
            <p>Email: {userInfo.email}</p>
            <p>Phone: {userInfo.phone}</p>
            <p>Website: {userInfo.website}</p>
            <p>Company: {userInfo.company.name}</p>
            <p>Address: {userInfo.address.street}, {userInfo.address.suite}, {userInfo.address.city}</p>
          </>
        ) : (
          <p>Loading user information...</p>
        )}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default PostsAuthorInfo;

import React, { useState, useEffect } from 'react';



const Message = (props) => {
  const userId = localStorage.getItem('userID');
  //const defaultPics = [default1, default2, default3, default4];
  const { message } = props;
  
  useEffect(() => {
    isFromUser();
  }, [userId]);

  const isFromUser = () => {
    return userId === message.userId;
  };
// const x = String(new Date(message.createdAt));

// console.log(x)
  return (
    <div
      className={`${
        isFromUser()
          ? 'place-self-end flex gap-2  flex-row-reverse items-center'
          : 'place-self-start gap-2  flex items-center'
      } space-y-1`}
    >
      <div className="grid">
        {isFromUser() ? (
          <img className="h-7 w-7 rounded-full" alt="" />
        ) : (
          <img
            className="h-7 w-7 rounded-full"
            // src={defaultPics[Math.floor(Math.random() * defaultPics.length)]}
            alt=""
          />
        )}
        <p className="text-xs">{message.username}</p>
      </div>

      <div
        className={`px-3 py-1 rounded-2xl flex ${
          isFromUser() ? ' bg-indigo-500 text-white' : ' bg-white shadow-lg'
        }`}
      >
        {message.content}
        
      </div>
      
    </div>
  );
};

export default Message;

import React, { useEffect } from 'react';


const Message = (props) => {
  const userId = localStorage.getItem('userID');

  const { message } = props;

  useEffect(() => {
    isFromUser();
  }, [userId]);

  const isFromUser = () => {
    return userId === message.userId;
  };
  return (
    <div
      className={`${
        isFromUser()
          ? 'place-self-end flex gap-2  flex-row-reverse items-center'
          : 'place-self-start gap-2  flex items-center'
      } space-y-1`}
    >
      <div>
        {isFromUser() ? (
          <img className="h-7 w-7 rounded-full" alt="" />
        ) : (
          <img className="h-7 w-7 rounded-full" alt="" />
        )}
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

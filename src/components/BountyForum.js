import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Message from './Message';
import { useQuery, useMutation } from '@apollo/client';
import {
  GET_CONVERSATION_MESSAGES,
  GET_BOUNTY_CONVERSATION,
  GET_SINGLE_USER,
} from '../graphql/queries';
import { CREATE_MESSAGE_MUTATION } from '../graphql/mutations';
import { Loading } from '.';
import { GET_SINGLE_BOUNTY } from '../graphql/queries';
import CountDown from './CountDown';
const jwtAuth = process.env.REACT_APP_JWT_SECRET;

const BountyForum = () => {
  const [conversationId, setConversationId] = useState('');
  const [dateTimeAfterThreeDays, setDateTimeAfterThreeDays] = useState('');
  const [content, setContent] = useState('');
  const [chatUsers, setChatUsers] = useState([])
  const messagesEndRef = useRef(null);
  const { id } = useParams();
  const userId = localStorage.getItem('userID');
    const authToken = localStorage.getItem(jwtAuth);
  const { data } = useQuery(GET_BOUNTY_CONVERSATION, {
    variables: {
      bountyId: id,
    },
  });
  const {
    data: messages,
    loading,
    refetch,
  } = useQuery(GET_CONVERSATION_MESSAGES, {
    variables: {
      conversationId: conversationId,
    },
  });
  const { data: singleBounty } = useQuery(GET_SINGLE_BOUNTY, {
    variables: {
      bountyId: id,
    },
  });
  const { data: userInfo,  } = useQuery(GET_SINGLE_USER, {
    variables: { token: authToken },
  });
  const [createMessage] = useMutation(CREATE_MESSAGE_MUTATION);

  useEffect(() => {
    getMessages();
    getExpiration();
    getAllUsersInChat();
    scrollToBottom()
  }, [data, singleBounty, messages]);

  const getMessages = async () => {
    try {
      if (data) {
        setConversationId(data.bountyConversation.id);
      }
    } catch (error) {
      console.error('didnt get them messages', error);
    }
  };

  const handleMessage = async () => {
    try {
      if (content) {
        await createMessage({
          variables: {
            input: {
              content: content,
              userId: userId,
              conversationId: conversationId,
              username: userInfo.user.username
            },
          },
        }).then((result) => {
          result.data ? console.log('success!') : console.log('errrrr');
          setContent('');
          refetch();
        });
      }
    } catch (error) {
      console.error('didnt not create message', error);
    }
  };
  

    const getExpiration = () => {
      if (singleBounty) {
        const threeDayExperation = 3 * 24 * 60 * 60 * 1000;
        const currentTime = singleBounty.bounty.createdAt;
        const time = currentTime + threeDayExperation;
        if (time) {
          setDateTimeAfterThreeDays(time);
        }
      }
    };

    const getAllUsersInChat = async () => {
      try {
        if(data) {
          const users = data.bountyConversation.users.split(' ')
          setChatUsers(users);
        }
      } catch (error) {
        console.error(error)
      }
    }

    //causes inner div to scroll to the bottom on new message
    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'start',
      });
    };



  return loading ? (
    <Loading />
  ) : (
    <div className="bg-white pt-10 flex  pb-20">
      <div className="p-5 ml-10 border-4 bg-primary-content rounded-3xl border-neutral-content  shadow-2xl shadow-black w-96 h-screen inset-y-0 left-0 bg-white">
        <div className="avatar">
          <div className="w-24 rounded-full ring ring-neutral-content ring-offset-base-100 ring-offset-2">
            <img src={singleBounty.bounty.image} alt="" />
          </div>
        </div>
        <div>
          <a className="link link-hover" href={singleBounty.bounty.link}>
            <p className="text-xl">{singleBounty.bounty.title}</p>
          </a>
        </div>
        <div>
          <p> Reward {singleBounty.bounty.reward}</p>
        </div>
        <div className="border text-xl border-neutral-content text-center rounded-xl p-3">
          <CountDown targetDate={dateTimeAfterThreeDays} />
        </div>
        <div>
          <p>{}</p>
        </div>
      </div>
      <div className="p-5 w-full border-4 bg-primary-content ml-10 mr-10 h-screen rounded-3xl border-neutral-content shadow-2xl shadow-black bg-white">
        <div className="bg-white w-full p:2 sm:p-6 h-96 justify-between rounded overflow-auto">
          <div className="justify-items-center pt-5">
            <ul className="space-y-12 grid grid-cols-1">
              {messages &&
                messages.conversationMessages?.map((message) => {
                  return (
                    <Message
                      key={message.id}
                      message={message}
                      chatUsers={chatUsers}
                    />
                  );
                })}
            </ul>
            <div ref={messagesEndRef} />
          </div>
        </div>
        <div className="ml-24 mr-24">
          <textarea
            id="message"
            rows="5"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Case..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
          <button
            type="button"
            className="btn glass"
            onClick={() => handleMessage()}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default BountyForum;

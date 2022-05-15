import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Message from './Message';
import { useQuery, useMutation, useSubscription } from '@apollo/client';
import {
  GET_CONVERSATION_MESSAGES,
  GET_BOUNTY_CONVERSATION,
} from '../graphql/queries';
import { CREATE_MESSAGE_MUTATION } from '../graphql/mutations';
import { Loading } from '.';






const BountyForum = () => {
  const [conversationId, setConversationId] = useState('');
  const [content, setContent] = useState('');
  const { id } = useParams();
  const userId = localStorage.getItem('userID');
  const { data } = useQuery(GET_BOUNTY_CONVERSATION, {
    variables: {
      bountyId: id,
    },
  });
  const { data: messages, loading } = useQuery(GET_CONVERSATION_MESSAGES, {
    variables: {
      conversationId: conversationId,
    },
  });
  const [createMessage] = useMutation(CREATE_MESSAGE_MUTATION);

  

  useEffect(() => {
    getMessages();
  }, [data]);

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
            },
          },
        }).then((result) => {
          result.data ? console.log('success!') : console.log('errrrr');
          setContent('');
        });
      }
    } catch (error) {
      console.error('didnt not create message', error);
    }
  };

  return loading ? (
    <Loading />
  ) : (
    <div className="bg-white pt-10 flex  pb-20">
      <div className="p-5 w-full border-4 bg-primary-content ml-10 mr-10  rounded-3xl border-neutral-content shadow-2xl shadow-black h-full bg-white">
        <div className="bg-white w-full p:2 sm:p-6 h-96 justify-between rounded overflow-auto">
          <div className="justify-items-center pt-5">
            <ul className="space-y-12 grid grid-cols-1">
              {messages &&
                messages.conversationMessages?.map((message) => {
                  return <Message key={message.id} message={message} />;
                })}
            </ul>
          </div>
        </div>
        <div className="ml-56 mr-56">
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

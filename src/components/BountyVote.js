import React, { useState, useEffect } from 'react';
import { GET_ALL_BOUNTIES, GET_SINGLE_USER } from '../graphql/queries';
import { useQuery, useMutation } from '@apollo/client';
import { Loading } from '.';
import { CREATE_BOUNTY_VOTE_MUTATION } from '../graphql/mutations';
import VotingBountyProgress from './VotingBountyProgress';
import { toast } from 'react-toastify';

const BountyVote = () => {
  const [activeBounties, setActiveBounties] = useState([]);
  const [userVoted, setUserVoted] = useState([]);
  const [bountyId, setBountyId] = useState('');
  const { data, loading, refetch } = useQuery(GET_ALL_BOUNTIES);
  const userId = localStorage.getItem('userID');

  const [createBountyVote] = useMutation(CREATE_BOUNTY_VOTE_MUTATION);

  useEffect(() => {
    getAllActive();
  }, [data]);

  const getAllActive = () => {
    let activeArr = [];
    try {
      if (data) {
        data.bounties.map((bounty) => {
          if (bounty.fakeorreal === 'pending') {
            activeArr.push(bounty);
          }
        });
        setActiveBounties(activeArr);
      }
    } catch (error) {
      console.error('error inbounty vote', error);
    }
  };

  const handleVote = async (voting) => {
    try {
      const { positive, negative } = voting;
      await createBountyVote({
        variables: {
          input: {
            bountyId: bountyId,
            positiveVote: positive,
            negativeVote: negative,
            userId: userId,
          },
        },
      });
      refetch();
    } catch (error) {
      toast.error('You Have Already Voted On This');
      console.error('already', error);
    }
  };

  return loading ? (
    <Loading />
  ) : (
    <div className="bg-white pt-20 pb-20">
      <div className="ml-20 mr-20">
        {activeBounties.map((bounty) => {
          return (
            <div
              key={bounty.id}
              className="flex gap-4 mb-7 bg-primary-content p-6 shadow rounded border-4 border-neutral-content"
            >
              <input type="checkbox" id="my-modal-3" className="modal-toggle" />
              <div className="modal">
                <div className="modal-box relative">
                  <label
                    htmlFor="my-modal-3"
                    className="btn btn-sm btn-circle absolute right-2 top-2"
                  >
                    ✕
                  </label>
                  <h3 className="text-lg font-bold text-center">
                    Popular Vote
                  </h3>
                  <p className="py-4">
                    Voting on this bounty will add to the overall popular vote
                    of the news source.
                  </p>
                  <div className="grid gap-4 grid-cols-1">
                    <label
                      htmlFor="my-modal-3"
                      className="btn btn-outline btn-accent w-full"
                      onClick={() => {
                        handleVote({
                          positive: 1,
                          negative: 0,
                        });
                        refetch();
                      }}
                    >
                      Real
                    </label>

                    <label
                      htmlFor="my-modal-3"
                      className="btn btn-outline btn-secondary w-full"
                      onClick={() => {
                        handleVote({
                          positive: 0,
                          negative: 1,
                        });
                        refetch();
                      }}
                    >
                      Fake
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex lg:w-4/12 lg:mr-7 lg:mb-0 items-center pb-6 ">
                <img
                  src={bounty.image}
                  alt=""
                  className="w-24 h-24 rounded-full"
                />
                <div className="grid  w-full">
                  <div className="pl-3 w-full">
                    <p className="text-lg font-medium leading-5 ">
                      <a className="link link-hover" href={bounty.link}>
                        {bounty.title}
                      </a>
                    </p>
                  </div>
                </div>
              </div>
              <div className="border-r border-gray-900" />
              <div className="grid grid-cols-2 gap-x-20 relative ml-5">
                <VotingBountyProgress id={bounty.id} refetch={refetch}/>
                <label
                  htmlFor="my-modal-3"
                  className="btn modal-button mt-5"
                  onClick={() => setBountyId(bounty.id)}
                >
                  Vote
                </label>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BountyVote;

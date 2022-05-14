import React, {useState, useEffect} from 'react';
import { GET_ALL_BOUNTIES, GET_SINGLE_BOUNTY_VOTES } from '../graphql/queries';
import {UPDATE_BOUNTY_MUTATION} from '../graphql/mutations'
import { useQuery, useMutation } from '@apollo/client';
import { Loading } from '.';
import { useNavigate } from 'react-router-dom';
import CountDown from './CountDown';
import ForumIcon from '@mui/icons-material/Forum';
import BallotIcon from '@mui/icons-material/Ballot';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { useOrderBounties } from '../hooks/useOrderBounties';
import VotingBountyProgress from './VotingBountyProgress';


const Bounties = () => {
  const { data, loading, refetch } = useQuery(GET_ALL_BOUNTIES);
  const [updateInfo, setUpdateInfo] = useState({
    id: 0,
    positive: 0,
    negative: 0,
    info: false
  })
  const navigate = useNavigate()
  const [updateBounty] = useMutation(UPDATE_BOUNTY_MUTATION);

// const [orderedBouinties] = useOrderBounties(data);

  useEffect(() => {
    handleUpandDownVote();
  }, [updateInfo]);

  const handleUpandDownVote = async () => {
    try {
      if(updateInfo.info) {
       const { data } = await updateBounty({
        variables: {
          input: {
            id: updateInfo.id,
            newpositiveVote: updateInfo.positive,
            newnegativeVote: updateInfo.negative,
          },
        },
      });
      refetch();
      if(data) {
        await reset()
      }
    }
    } catch (error) {
      console.error(error)
    } 
  }

  const reset = () => {
      setUpdateInfo({
        id: 0,
        positive: 0,
        negative: 0,
        info: false,
      });
  }

  return loading ? (
    <Loading />
  ) : (
    <div className="bg-white pt-10 pb-20">
      <div className="ml-10 mr-10 relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-neutral-focus  dark:text-gray-400">
            <tr>
              <th scope="col" className="p-4"></th>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                News Source
              </th>
              <th scope="col" className="px-6 py-3">
                Reward
              </th>

              <th scope="col" className="px-28 py-5">
                Expire
              </th>
              <th scope="col" className="px-10  py-3">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {data
              ? data.bounties.map((bounty) => {
                  const threeDayExperation = 3 * 24 * 60 * 60 * 1000;
                  const currentTime = bounty.createdAt;
                  const dateTimeAfterThreeDays =
                    currentTime + threeDayExperation;
                  return (
                    <tr
                      key={bounty.id}
                      className="bg-white border-b dark:bg-primary-content dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <td className="px-6 py-4 text-neutral-content flex justify-between">
                        <VotingBountyProgress id={bounty.id} />
                        {/* <div className="text-center">
                          <div
                            className="btn btn-outline font-medium text-neutral-content hover:underline"
                            onClick={() =>
                              setUpdateInfo({
                                id: bounty.id,
                                positive: 0,
                                negative: 1,
                                info: true,
                              })
                            }
                          >
                            <ThumbDownIcon />
                          </div>
                          <p className="text-sm ">Move Down</p>
                        </div>
                        <div className="text-center">
                          <div
                            className="btn btn-outline font-medium text-neutral-content hover:underline"
                            onClick={() =>
                              setUpdateInfo({
                                id: bounty.id,
                                positive: 1,
                                negative: 0,
                                info: true,
                              })
                            }
                          >
                            <ThumbUpIcon />
                          </div>
                          <p className="text-sm ">Move Up</p>
                        </div> */}
                      </td>
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-neutral-content  whitespace-nowrap"
                        onClick={() => navigate(`/bounties/${bounty.id}`)}
                      >
                        <div className="w-24">
                          <p className="text-ellipsis overflow-hidden">
                            {bounty.title}
                          </p>
                        </div>
                      </th>
                      <td
                        className="px-6 py-4"
                        onClick={() => navigate(`/bounties/${bounty.id}`)}
                      >
                        <div className="avatar">
                          <div className="w-16 rounded-full ring ring-neutral-content ring-offset-base-100 ring-offset-2">
                            <img src={bounty.image} alt="" />
                          </div>
                        </div>
                      </td>
                      <td
                        className="px-6 py-4 text-neutral-content"
                        onClick={() => navigate(`/bounties/${bounty.id}`)}
                      >
                        <p>{bounty.reward} ETH</p>
                      </td>
                      <td
                        className="px-6 py-4 text-neutral-content"
                        onClick={() => navigate(`/bounties/${bounty.id}`)}
                      >
                        <CountDown targetDate={dateTimeAfterThreeDays} />
                      </td>
                      <td className="px-6 py-4 text-neutral-content flex justify-between">
                        <div className="text-center">
                          <div
                            className="btn btn-outline font-medium text-neutral-content hover:underline"
                            onClick={() => navigate(`/forum/${bounty.id}`)}
                          >
                            <ForumIcon />
                          </div>
                          <p className="text-sm ">discuss</p>
                        </div>
                        <div className="text-center">
                          <div
                            className="btn btn-outline font-medium text-neutral-content hover:underline"
                            onClick={() => navigate('/votemain/bounty')}
                          >
                            <BallotIcon />
                          </div>
                          <p className="text-sm ">Vote</p>
                        </div>
                      </td>
                    </tr>
                  );
                })
              : 'nothing currently'}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Bounties;

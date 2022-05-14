import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { GET_SINGLE_BOUNTY } from '../graphql/queries';
import { useQuery } from '@apollo/client';
import { Loading } from '.';
import CountDown from './CountDown';
import VotingBountyProgress from './VotingBountyProgress';

const SingleBounty = () => {
  const [dateTimeAfterThreeDays, setDateTimeAfterThreeDays] = useState('')

  const { id } = useParams();
  const { data, loading, refetch } = useQuery(GET_SINGLE_BOUNTY, {
    variables: {
      bountyId: id,
    },
  });
  useEffect(() => {
    getExpiration()
 
  }, [data])

  const getExpiration = () => {
    if(data) {
    const threeDayExperation = 3 * 24 * 60 * 60 * 1000;
    const currentTime = data.bounty.createdAt;
    const time = currentTime + threeDayExperation;
    if(time) {
      setDateTimeAfterThreeDays(time)
    }
  }
  }


console.log(data)
  return loading ? (
    <Loading />
  ) : (
    <div className="bg-white pt-10 flex  pb-20">
      <div className="p-5 w-full border-4 bg-primary-content ml-10 mr-10  rounded-3xl border-neutral-content shadow-2xl shadow-black h-full bg-white">
        <div className="grid grid-cols-3 gap-x-20">
          <div>
            <label className=""> Reward </label>
            <p className="border text-xl border-neutral-content text-center rounded-xl p-3">
              {data.bounty.reward} ETH
            </p>
          </div>
          <div className="avatar">
            <div className="w-56 ml-10 rounded-full ring ring-neutral-content ring-offset-base-100 ring-offset-2">
              <img src={data.bounty.image} alt="" />
            </div>
          </div>
          <div>
            <label className=""> Expiration </label>
            <div className="border text-xl border-neutral-content text-center rounded-xl p-3">
              <CountDown targetDate={dateTimeAfterThreeDays} />
            </div>
          </div>
        </div>
        <div>
          <p>{data.bounty.title}</p>
        </div>

        <div>
          <VotingBountyProgress id={data.bounty.id} />
        </div>
        <textarea
          className="textarea textarea-success bg-neutral-focus p-5 w-full "
          rows="10"
          value={data.bounty.description}
          disabled
        ></textarea>
        <div className='flex'>

        </div>
      </div>
    </div>
  );
};

export default SingleBounty;

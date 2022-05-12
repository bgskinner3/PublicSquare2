import React, { useState, useEffect } from 'react';
import { GET_ALL_BOUNTIES } from '../graphql/queries';
import { useQuery } from '@apollo/client';
import { Loading } from '.';

const BountyVote = () => {
  const [activeBounties, setActiveBounties] = useState([]);
  const { data, loading } = useQuery(GET_ALL_BOUNTIES);

  useEffect(() => {
    getAllActive();
  }, [data]);

  const getAllActive = () => {
    let activeArr = [];
    try {
      if (data) {
        data.bounties.map((bounty) => {
          if (bounty.fakeorreal === 'pending') {
            activeArr.push(bounty)
          }
        });
        setActiveBounties(activeArr)
      }
    } catch (error) {
      console.error('error inbounty vote', error);
    }
  };
  
console.log(activeBounties);

  return loading ? (
    <Loading />
  ) : (
    <div className='bg-white'>
      
    </div>
  );
};

export default BountyVote;

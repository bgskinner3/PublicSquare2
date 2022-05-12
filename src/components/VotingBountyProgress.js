import React, { useState, useEffect } from 'react';
import { GET_SINGLE_BOUNTY_VOTES } from '../graphql/queries';
import { useQuery } from '@apollo/client';
import { Loading } from '.';

const VotingBountyProgress = (props) => {
  const { setBountyId, id } = props;
  const [realPercentage, setRealPercentage] = useState({
    '--value': 0
  })
  const [fakePercentage, setfakePercentage] = useState({
    '--value': 0,
  });
  const [totalVotes, setTotalVotes] = useState(0)
  const defaultValue = {
    '--value': 0,
  };

  const { data, loading, refetch } = useQuery(GET_SINGLE_BOUNTY_VOTES, {
    variables: {
      bountyId: id,
    },
  });
  
  useEffect(() => {
    addVotes()
    getFakePercentages()
    getRealPercentages()

  }, [data])

  const addVotes = async () => {
    let positive = 0
    let negative = 0
    try {
      if(data) {
        data.singlebountyvotes.map((vote) => {
          if(vote.negativeVote === 1) {
            negative++
          }
          if(vote.positiveVote === 1) {
            positive++
          }
        })
      }
     const fakeValue = getFakePercentages(positive, negative)
     const realValue = getRealPercentages(positive, negative);

     
     setRealPercentage({
       '--value': realValue,
     });
     setfakePercentage({
       '--value': fakeValue,
     });
     setTotalVotes(positive + negative);
    } catch (error) {
      console.error('didnt add up bounty votes', error)
    }
  }
  const getFakePercentages = (positive, negative) => {
    let percentage = negative / (negative + positive) * 100
    return percentage
  }
  const getRealPercentages = (positive, negative) => {
    let percentage = positive / (positive + negative) * 100
    return percentage;
  }
  


  return loading ? (
    <Loading />
  ) : (
    <div className="grid grid-cols-4 gap-x-20 relative ml-5">
      <div>
        <div
          className="radial-progress text-primary"
          style={
            (Math.round(fakePercentage['--value'] * 100) / 100).toFixed(2) ===
            'NaN'
              ? defaultValue
              : fakePercentage
          }
        >
          {(Math.round(fakePercentage['--value'] * 100) / 100).toFixed(2)}%
        </div>
        <p className="text-center">Fake</p>
      </div>
      <div>
        <div
          className="radial-progress text-primary"
          style={
            (Math.round(realPercentage['--value'] * 100) / 100).toFixed(2) ===
            'NaN'
              ? defaultValue
              : realPercentage
          }
        >
          {(Math.round(realPercentage['--value'] * 100) / 100).toFixed(2)}%
        </div>
        <p className="text-center bold">Real</p>
      </div>

      <div className="mt-5">
        <p>Total Votes</p>
        <p className="text-center">{totalVotes}</p>
      </div>
      <label
        htmlFor="my-modal-3"
        className="btn modal-button mt-5"
        onClick={(() => setBountyId(id))}
      >
        Vote
      </label>
    </div>
  );
};

export default VotingBountyProgress;

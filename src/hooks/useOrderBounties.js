import { useEffect, useState } from 'react';
import { GET_SINGLE_BOUNTY_VOTES } from '../graphql/queries';
import { useQuery } from '@apollo/client';

const useOrderBounties = (data) => {
  const [orderedBouinties, setOrderedBounties] = useState([]);

  useEffect(() => {
    getNumbers()
  }, [data]);

  const getNumbers = () => {
    let order = [];
    let bountyArr = [];
    if (data) {
      data.bounties.map((bounty) => {
        let num = bounty.positiveVote - bounty.negativeVote;
        bountyArr.push({ orderNum: num, ...bounty });
        order.push(num);
      });
    }
    order.sort((a, b) => {
      return b - a;
    });

    setOrderedBounties(organize(bountyArr, order))
  };

  return [orderedBouinties];
};

const organize = (bountyArr, orderArr) => {
  let result = [];
  let compare = [];

  for (let i = 0; i < orderArr.length; i++) {
    let order = orderArr[i];
    for (let j = 0; j < bountyArr.length; j++) {
      let bountyObj = bountyArr[j];
      if (order === bountyObj.orderNum) {
        if (!compare.includes(bountyObj.id)) {
          result.push(bountyObj);
          compare.push(bountyObj.id);
        }
      }
    }
  }
  return result
};

const GetAverage = (id) => {
  const { data, loading, refetch } = useQuery(GET_SINGLE_BOUNTY_VOTES, {
    variables: {
      bountyId: id,
    },
  });
  useEffect(() => {
    calculate()
  }, [data]);

  const calculate = async () => {
    let positive = 0;
    let negative = 0;
    let result = 0
    
    try {
      if (data) {
        data.singlebountyvotes.map((vote) => {
          if (vote.negativeVote === 1) {
            negative++;
          }
          if (vote.positiveVote === 1) {
            positive++;
          }
        });
       
      }



      
    } catch (error) {
      console.error(error)
    }
  }



}

export { useOrderBounties };

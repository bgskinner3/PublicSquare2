import React from 'react';
import { GET_ALL_BOUNTIES } from '../graphql/queries';
import { useQuery } from '@apollo/client';
import { Loading } from '.';
import { useNavigate } from 'react-router-dom';
import CountDown from './CountDown';
import ForumIcon from '@mui/icons-material/Forum';

const Bounties = () => {
  const { data, loading } = useQuery(GET_ALL_BOUNTIES);
  const navigate = useNavigate()
  console.log(data);
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
                Total Votes
              </th>
              <th scope="col" className="px-6 py-3">
                Admissions
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
                    <tr className="bg-white border-b dark:bg-primary-content dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                      <td className="w-4 p-4">
                        <div className="flex items-center">
                          <input
                            id="checkbox-table-1"
                            type="checkbox"
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          />
                          <label for="checkbox-table-1" className="sr-only">
                            checkbox
                          </label>
                        </div>
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
                        Votes
                      </td>
                      <td
                        className="px-6 py-4 text-neutral-content"
                        onClick={() => navigate(`/bounties/${bounty.id}`)}
                      >
                        Admissions
                      </td>
                      <td
                        className="px-6 py-4 text-neutral-content"
                        onClick={() => navigate(`/bounties/${bounty.id}`)}
                      >
                        <CountDown targetDate={dateTimeAfterThreeDays} />
                      </td>
                      <td className="px-6 py-4 text-neutral-content absolute">
                        <div className="text-center">
                          <div
                            className="btn btn-outline font-medium text-neutral-content hover:underline"
                            onClick={() => navigate('/chatmain')}
                          >
                            <ForumIcon />
                          </div>
                          <p className="text-sm ">discuss</p>
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

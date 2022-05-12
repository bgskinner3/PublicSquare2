import React from 'react';
import BallotIcon from '@mui/icons-material/Ballot';
import ArticleIcon from '@mui/icons-material/Article';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import NotInterestedIcon from '@mui/icons-material/NotInterested';
import { useNavigate } from 'react-router-dom';

const VoteMain = () => {
  const navigate = useNavigate()
  return (
    <div className="bg-white">
      <div className="flex justify-between ml-32 mr-32">
        <div
          className="flex items-center text-neutral-content overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-200 ease-in-out"
          data-mdb-ripple="true"
          data-mdb-ripple-color="dark"
          onClick={() => navigate('/votemain/bounty')}
        >
          <div>
            <BallotIcon sx={{ fontSize: 100 }} />
            <p>Bounties</p>
          </div>
        </div>
        <div>
          <div>
            {/* <NewspaperIcon sx={{ fontSize: 100 }} /> */}
            <NotInterestedIcon sx={{ fontSize: 100 }} />
            <p>News Organizations</p>
          </div>
        </div>
        <div>
          <div>
            {/* <ArticleIcon sx={{ fontSize: 100 }} /> */}
            <NotInterestedIcon sx={{ fontSize: 100 }} />
            <p>Evidence for Bounties</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoteMain;

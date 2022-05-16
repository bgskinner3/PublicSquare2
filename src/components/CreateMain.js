import React from "react";
import BallotIcon from '@mui/icons-material/Ballot';
import ArticleIcon from '@mui/icons-material/Article';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import NotInterestedIcon from '@mui/icons-material/NotInterested';
import { useNavigate } from 'react-router-dom';


const CreateMain = () => {
  const navigate = useNavigate();


  return (
    <div className="bg-white">
      <div className="flex justify-between ml-32 mr-32">
        <div
          className="flex items-center text-neutral-content overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-200 ease-in-out"
          data-mdb-ripple="true"
          data-mdb-ripple-color="dark"
          onClick={() => navigate('/createmain/create')}
        >
          <div>
            <BallotIcon sx={{ fontSize: 100 }} />
            <p>Create Bounty</p>
          </div>
        </div>
        <div
          className="flex items-center text-neutral-content overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-200 ease-in-out"
          data-mdb-ripple="true"
          data-mdb-ripple-color="dark"
          onClick={() => navigate('/createmain/addsource')}
        >
          <div>
            <NewspaperIcon sx={{ fontSize: 100 }} />
            <p>Add New News Source</p>
          </div>
        </div>
        <div>
          <div>
            {/* <ArticleIcon sx={{ fontSize: 100 }} /> */}
            <NotInterestedIcon sx={{ fontSize: 100 }} />
            <p>Create Evidence</p>
          </div>
        </div>
      </div>
    </div>
  );


}

export default CreateMain;
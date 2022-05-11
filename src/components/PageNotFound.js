import React from 'react';
import pagenotfound from '../images/pagenotfound.jpeg';
import { Link } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const PageNotFound = () => {
  return (
    <div className="flex flex-wrap md:grid md:grid-cols-2 md:gap-4 bg-white h-full ">
      <div className=" m-5 mt-10 md:mt-56 ">
        <div className="w-1/2 grid gap-4 pl-24 md:text-left md:w-full">
          <p className="text-indigo-600 font-bold md:ml-28 ">404 ERROR</p>
          <p className="text-5xl font-bold text-black ">Page not found</p>
        </div>
        <div className="grid gap-4">
          <p className="pt-5">
            Sorry, we couldn't find the page you're looking for.
          </p>
          <Link to="/" className="link link-hover text-indigo-600">
            Go Back Home <ArrowForwardIcon sx={{ fontSize: 20 }} />
          </Link>
        </div>
      </div>
      <div className="flex">
        <img src={pagenotfound} alt="" className="" />
      </div>
    </div>
  );
};

export default PageNotFound;

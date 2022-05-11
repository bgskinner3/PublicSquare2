import React from "react";
import { useNavigate } from 'react-router-dom';
import homepage from '../images/homepage.jpg'
import { Loading } from ".";

const Home = () => {
    const navigate = useNavigate();
    const style = {
      backgroundPosition: '50%',
      backgroundImage:
        "url('https://mdbcdn.b-cdn.net/img/new/slides/146.webp')",
    };

  return (
    <div className="w-full">
      
      <div
        className="relative overflow-hidden bg-no-repeat h-screen bg-cover opacity-20"
        style={style}
      />

      <div className="absolute top-16 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed">
        <div className="flex justify-start items-center h-full">
          <div className="pl-10 text-left text-white px-6 md:px-12">
            <div className="hidden md:grid">
              <p className="shadow-gray-50 text-2xl md:text-5xl font-bold mt-0 mb-6">
                The World's
              </p>
              <p className="shadow-gray-50 text-2xl md:text-5xl font-bold mt-0 mb-6">
                First Hybrid News
              </p>
              <p className="shadow-gray-50 text-2xl md:text-5xl font-bold mt-0 mb-6">
                Verification Platform
              </p>
            </div>

            <div className="grid pl-14  md:flex justify-end">
              <button
                type="button"
                className="btn btn-outline w-36 m-5"
                onClick={() => navigate('/bounties')}
              >
                Explore
              </button>
              <button
                type="button"
                className="btn glass w-36 m-5"
                onClick={() => navigate('/howwework')}
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-base-300">
        <div className="font-semibold rounded-md p-4 text-indigo-50 text-lg md:text-xl lg:text-2xl pt-10">
          <div className="text-left pl-10 text-neutral-content">
            <p className="shadow-gray-50	">Post Bounties On News</p>
            <p className="shadow-gray-50	">
              You Believe Needs Comminity Verification
            </p>
          </div>
          <div className="grid gap-y-32 md:flex mt-10 mb-10">
            <div className="text-neutral-content">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 ml-28"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
                />
              </svg>
              <p className="text-lg text-center">
                Vote on bounties, evidence and news channels to earn more
                reputation.
              </p>
            </div>
            <div className="text-neutral-content">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 ml-28"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <p className="text-lg text-center">
                Chat with the community. Discover what the members are
                discussing on particular news.
              </p>
            </div>
            <div className="text-neutral-content">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 ml-28"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <p className="text-lg text-center">
                Post news articles you think are fake for the community to vote
                on.
              </p>
            </div>
            <div className="text-neutral-content">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 ml-28"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-lg text-center">
                Earn crypto bi-weeklybased on your reputation, evidence provided
                and posted articles deemed fake.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div>next block</div>
    </div>
  );
}


export default Home
import React from "react";
import publicsquarelogo from '../images/publicsquarelogo.png';


const Loading = () => {


  return (
    <div className="flex h-screen justify-center items-center ">
      <div className="border border-neutral-content shadow rounded-md p-20 ">
        <div className="animate-pulse flex space-x-4">
          <div class="avatar">
            <div class="w-24 rounded-full ring ring-neutral-content ring-offset-base-100 ring-offset-2">
              <img src={publicsquarelogo} alt="" />
            </div>
          </div>
          <div className="flex-1 space-y-6 py-1">
            <div className="text-5xl font-semibold font-serif pt-4 ">
              LOADING
            </div>
          </div>
        </div>
      </div>
    </div>
  );

}

export default Loading
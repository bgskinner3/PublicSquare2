import React , {useState} from 'react';
import {
  GET_ALL_NEWS_SOURCES,
  GET_ALL_BOUNTIES,
  GET_SINGLE_USER,
} from '../graphql/queries';
import { CREATE_BOUNTY_MUTATION } from '../graphql/mutations';
import { useMutation, useQuery } from '@apollo/client';
import { Loading } from '.';
import { toast } from 'react-toastify';
import Modal from './Modal';
const jwtAuth = process.env.REACT_APP_JWT_SECRET;


const CreateBounty = () => {
  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const [reward, setReward] = useState(0);
  const { data, loading, refetch, error } = useQuery(GET_ALL_NEWS_SOURCES);
  const { data: bounties } = useQuery(GET_ALL_BOUNTIES);
  const [createBounty] = useMutation(CREATE_BOUNTY_MUTATION);


  const authToken = localStorage.getItem(jwtAuth);

  const { data: userId } = useQuery(GET_SINGLE_USER, {
    variables: { token: authToken },
  });


  const checkAvailability = () => {

  }




  return (
    <div className="bg-white pt-10 flex  pb-20">
      <Modal setLink={setLink} />
      <div className="p-5 ml-10 border-4 bg-primary-content rounded-3xl border-neutral-content  shadow-2xl shadow-black w-96 h-screen inset-y-0 left-0 bg-white">
        <div>
          <div className="relative">
            <input
              type="text"
              id="floating_filled"
              className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              for="floating_filled"
              className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
            >
              Link
            </label>
          </div>
          <div className="relative">
            <input
              type="text"
              id="floating_filled"
              className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              for="floating_filled"
              className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
            >
              Title
            </label>
          </div>
          <div className="relative">
            <input
              type="text"
              id="floating_filled"
              className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              for="floating_filled"
              className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
            >
              Reward
            </label>
          </div>
        </div>
      </div>

      <div className="p-5 w-full  border-4 bg-primary-content ml-10 mr-10  rounded-3xl border-neutral-content shadow-2xl shadow-black h-screen  bg-white">
        <label
          for="message"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
        >
          Your message
        </label>
        <textarea
          id="message"
          rows="10"
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Your message..."
        ></textarea>
      </div>
    </div>
  );
};

export default CreateBounty;

// {/* <div className="p-5 ml-10 border-4 bg-neutral-focus rounded-3xl border-neutral  shadow-2xl shadow-black w-96 h-screen inset-y-0 left-0 bg-white">
//         <div className="grid grid-cols-1 items-center justify-start mx-6 mt-10">
//           <div className="border-2 bg-neutral-focus rounded-3xl border-success">
//             <span className="text-gray-600 dark:text-gray-300 ml-4 text-2xl font-bold">
//               Building Tools
//             </span>
//             <div className="dropdown dropdown-right w-full">
//               <label tabIndex="0" className="btn w-full">
//                 Evidence Type
//               </label>
//               <ul
//                 tabIndex="0"
//                 className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
//               >
//                 <li>
//                   <div>Opinion</div>
//                 </li>
//                 <li>
//                   <div>Video</div>
//                 </li>
//                 <li>
//                   <div>Image</div>
//                 </li>
//                 <li>
//                   <div>Document</div>
//                 </li>
//               </ul>
//             </div>

//             <div>
//               <span className=" flex text-gray-600 dark:text-gray-300 ml-4 text-2xl font-bold">
//                 Supporting
//                 <input
//                   type="radio"
//                   name="radio-4"
//                   className="radio radio-accent"
//                   checked
//                   onChange={(e) => console.log(e)}
//                 />
//               </span>

//               {/* <input
//               type="radio"
//               name="radio-4"
//               class="radio radio-accent"
//               checked
//             /> */}
//               <span className=" flex text-gray-600 dark:text-gray-300 ml-4 text-2xl font-bold">
//                 Disproving
//                 <input
//                   type="radio"
//                   name="radio-4"
//                   className="radio radio-accent"
//                 />
//               </span>
//               {/* <input type="radio" name="radio-4" class="radio radio-accent" /> */}
//             </div>
//           </div>
//         </div>
//       </div> */}

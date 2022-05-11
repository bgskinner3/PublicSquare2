import React, { useState, useEffect } from 'react';
import {
  GET_ALL_NEWS_SOURCES,
  GET_ALL_BOUNTIES,
  GET_SINGLE_USER,
} from '../graphql/queries';
import { CREATE_BOUNTY_MUTATION } from '../graphql/mutations';
import { useMutation, useQuery } from '@apollo/client';
import { Loading } from '.';
import { toast } from 'react-toastify';
import CreateBountyModal from './CreateBountyModal';
import { useNavigate } from 'react-router-dom';

const jwtAuth = process.env.REACT_APP_JWT_SECRET;

const CreateBounty = () => {
  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const [image, setImage] = useState({
    image: '',
    id: ''
  });
  const [reward, setReward] = useState(0);
  const [category, setCategory] = useState('Category');
  const [vaildLinks, setValidLinks] = useState([]);
  const { data, loading } = useQuery(GET_ALL_NEWS_SOURCES);
 
  const [createBounty] = useMutation(CREATE_BOUNTY_MUTATION);
  const navigate = useNavigate()
  const authToken = localStorage.getItem(jwtAuth);

  const { data: userId } = useQuery(GET_SINGLE_USER, {
    variables: { token: authToken },
  });

  useEffect(() => {
    getSourceFromLink();
  }, [link, data]);

  const getSourceFromLink = () => {
    let linkArr = [];
    try {
      if (data) {
        let start;
        let end;
        data.newssources.forEach((source) => {
          start = source.pagelink.indexOf('.') + 1;
          const first = source.pagelink.slice(start);
          end = first.indexOf('.com');
          if (source.pagelink) {
            linkArr.push({ compare: first.slice(0, end), ...source });
          }
        });
      }
      setValidLinks(linkArr);
    } catch (error) {
      console.error(error);
    }
  };

  const vaildateInput = () => {

  }


  const handleSubmit = async () => {
    try {
      
      const { data } = await createBounty({
        variables: {
          input: {
            description: description,
            title: title,
            link: link,
            reward: Number(reward),
            userId: userId.user.id,
            newssourceId: image.id,
            image: image.image,
            category: category,
          },
        },
      });
      if(data) {
        toast.success('Your Bounty Has Been Made');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return loading ? (
    <Loading />
  ) : (
    <div className="bg-white pt-10 flex  pb-20">
      <CreateBountyModal
        setLink={setLink}
        link={link}
        vaildLinks={vaildLinks}
        setImage={setImage}
      />
      <div className="p-5 ml-10 border-4 bg-primary-content rounded-3xl border-neutral-content  shadow-2xl shadow-black w-96 h-screen inset-y-0 left-0 bg-white">
        <div className="grid gap-10 justify-center">
          <div className="relative z-0">
            <input
              type="text"
              id="floating_standard"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-neutral-content appearance-none dark:text-white  focus:outline-none focus:ring-0 focus:border-neutral-content peer"
              placeholder=" "
              onChange={(e) => setTitle(e.target.value)}
            />
            <label
              htmlFor="floating_standard"
              className="absolute text-sm text-neutral-content  duration-300 transform -translate-y-6 scale-75 top-3 left-2 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Title
            </label>
          </div>
          <div className="relative z-0">
            <input
              type="text"
              id="floating_standard"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-neutral-content appearance-none dark:text-white  focus:outline-none focus:ring-0 focus:border-neutral-content peer"
              placeholder=" "
              onChange={(e) => setReward(e.target.value)}
            />
            <label
              htmlFor="floating_standard"
              className="absolute text-sm text-neutral-content  duration-300 transform -translate-y-6 scale-75 top-3 left-2 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Reward
            </label>
          </div>
          <div className="dropdown dropdown-right">
            <label
              tabIndex="0"
              className="btn m-1 w-full "
              onChange={(e) => setCategory(e.target.value)}
            >
              {category}
            </label>
            <ul
              tabIndex="0"
              className="dropdown-content menu border-2 border-neutral-content p-2 shadow bg-base-100 rounded-box w-52"
              onClick={(e) => setCategory(e.target.innerHTML.toLowerCase())}
            >
              <li>
                <div>Health</div>
              </li>
              <li>
                <div>Politics</div>
              </li>
              <li>
                <div>Technology</div>
              </li>
              <li>
                <div>World</div>
              </li>
              <li>
                <div>Business</div>
              </li>
              <li>
                <div>Entertainment</div>
              </li>
              <li>
                <div>Fintech</div>
              </li>
            </ul>
          </div>

          <div>
            <div className="relative z-0">
              <input
                type="text"
                id="standard_success"
                aria-describedby="standard_success_help"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-green-600 appearance-none dark:text-white dark:border-green-500 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
                placeholder={link}
                disabled
              />
            </div>
            <p
              id="standard_success_help"
              className="mt-2 text-xs text-green-600 dark:text-green-400"
            >
              <span className="font-medium">Vaild Link!</span>
            </p>
          </div>
          <div className="avatar justify-center">
            <div className="w-24 rounded-full ring ring-neutral-content ring-offset-base-100 ring-offset-2">
              <img src={image.image} alt="" />
            </div>
          </div>
        </div>
      </div>

      <div className="p-5 w-full  border-4 bg-primary-content ml-10 mr-10  rounded-3xl border-neutral-content shadow-2xl shadow-black h-screen  bg-white">
        <form className="w-full" onSubmit={() => handleSubmit()}>
          <label
            htmlFor="message"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
          >
            Make Your Case
          </label>
          <textarea
            id="message"
            rows="10"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Case..."
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <button className="btn btn-outline" type="submit">
            Button
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateBounty;



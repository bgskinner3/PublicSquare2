import React from 'react';
import publicsquarelogo from '../images/publicsquarelogo.png';
import logogold from '../images/logogold.png'
import { Link } from 'react-router-dom';
import 'tw-elements';
import { useNavigate } from 'react-router-dom';
import { GET_SINGLE_USER } from '../graphql/queries';
import { useQuery } from '@apollo/client';
import { Loading } from '.';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import LogoutIcon from '@mui/icons-material/Logout';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import PollIcon from '@mui/icons-material/Poll';
import SearchIcon from '@mui/icons-material/Search';
import NewspaperIcon from '@mui/icons-material/Newspaper';
const token = process.env.REACT_APP_JWT_SECRET;

const NavBar = () => {
  const navigate = useNavigate();
  const user = localStorage.getItem(token);
  const { data, loading } = useQuery(GET_SINGLE_USER, {
    variables: {
      token: user,
    },
  });

  return loading ? (
    <Loading />
  ) : (
    <header>
      <nav className="navbar navbar-expand-lg shadow-md py-2 bg-white  relative flex items-center w-full justify-between">
        <Link to="/" className="h-16 pt-3 overflow-hidden">
          <div
            className="flex items-center text-base py-4 px-6 h-12 overflow-hidden text-ellipsis whitespace-nowrap rounded hover:text-white hover:bg-white transition duration-200 ease-in-out"
            data-mdb-ripple="true"
            data-mdb-ripple-color="dark"
          >
            <img src={logogold} alt="" className="" />
          </div>
        </Link>
        <Link to="/bounties">
          <div
            className="flex items-center text-base py-4 px-6 h-12 overflow-hidden text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-200 ease-in-out"
            data-mdb-ripple="true"
            data-mdb-ripple-color="dark"
          >
            <SearchIcon />
            <p>Explore</p>
          </div>
        </Link>

        {!user ? (
          <div className="px-6 w-full flex flex-wrap items-center justify-end">
            <div className="flex items-center">
              <button
                className="navbar-toggler border-0 py-3 lg:hidden leading-none text-xl bg-transparent text-gray-600 hover:text-gray-700 focus:text-gray-700 transition-shadow duration-150 ease-in-out mr-2"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContentY"
                aria-controls="navbarSupportedContentY"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  className="w-5"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                >
                  <path
                    fill="currentColor"
                    d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"
                  ></path>
                </svg>
              </button>
            </div>
            <div
              className="navbar-collapse collapse grow justify-end"
              id="navbarSupportedContentY"
            >
              <ul className="navbar-nav justify-end lg:flex lg:flex-row">
                <li className="nav-item">
                  <Link
                    to="/login"
                    className="nav-link block lg:px-2 py-2 hover:text-gray-900 hover:bg-gray-100 transition duration-200 ease-in-out"
                  >
                    Login
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="px-6 w-full flex flex-wrap items-center justify-end">
            <div className="flex items-center">
              <button
                className="navbar-toggler border-0 py-3 lg:hidden leading-none text-xl bg-transparent text-gray-600 hover:text-gray-700 focus:text-gray-700 transition-shadow duration-150 ease-in-out mr-2"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContentY"
                aria-controls="navbarSupportedContentY"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  className="w-5"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                >
                  <path
                    fill="currentColor"
                    d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"
                  ></path>
                </svg>
              </button>
            </div>
            <div
              className="navbar-collapse collapse grow justify-end"
              id="navbarSupportedContentY"
            >
              <ul className="navbar-nav justify-end lg:flex lg:flex-row">
                <li className="relative">
                  <div
                    className="flex items-center text-base py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-200 ease-in-out"
                    data-mdb-ripple="true"
                    data-mdb-ripple-color="dark"
                    onClick={() => {
                      navigate(`/account`);
                    }}
                  >
                    <div>
                      <AccountBalanceWalletIcon />
                      <p className="text-xs">account</p>
                    </div>
                  </div>
                </li>
                <li className="relative">
                  <div
                    className="flex items-center text-base py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-200 ease-in-out"
                    data-mdb-ripple="true"
                    data-mdb-ripple-color="dark"
                    onClick={() => {
                      navigate(`/create`);
                    }}
                  >
                    <div>
                      <NoteAddIcon />
                      <p className="text-xs"> Create</p>
                    </div>
                  </div>
                </li>
                <li className="relative">
                  <div
                    className="flex items-center text-base py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-200 ease-in-out"
                    data-mdb-ripple="true"
                    data-mdb-ripple-color="dark"
                    onClick={() => {
                      navigate(`/votemain`);
                    }}
                  >
                    <div>
                      <PollIcon />
                      <p className="text-xs">Vote</p>
                    </div>
                  </div>
                </li>
                <li className="relative">
                  <div
                    className="flex items-center text-base py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-200 ease-in-out"
                    data-mdb-ripple="true"
                    data-mdb-ripple-color="dark"
                    onClick={() => {
                      navigate(`/newsources`);
                    }}
                  >
                    <div>
                      <NewspaperIcon />
                      <p className="text-xs">News Organizations</p>
                    </div>
                  </div>
                </li>

                {/* {data.user.admin ? (
                  <li className="relative">
                    <div
                      className="flex items-center text-base py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-200 ease-in-out"
                      data-mdb-ripple="true"
                      data-mdb-ripple-color="dark"
                      onClick={() => {
                        navigate(`/addsource`);
                      }}
                    >
                      Add NewsSource
                    </div>
                  </li>
                ) : (
                  <></>
                )} */}
                <li className="relative">
                  <div
                    className="flex items-center text-base py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-200 ease-in-out"
                    data-mdb-ripple="true"
                    data-mdb-ripple-color="dark"
                    onClick={() => {
                      navigate(`/addsource`);
                    }}
                  >
                    Add NewsSource
                  </div>
                </li>
                <li className="relative">
                  <div
                    className="flex items-center text-base py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-200 ease-in-out"
                    data-mdb-ripple="true"
                    data-mdb-ripple-color="dark"
                    onClick={() => {
                      localStorage.clear();
                      navigate(`/`);
                    }}
                  >
                    <div>
                      <LogoutIcon />
                      <p className="text-xs"> Logout</p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        )}
        {/* {user ? <AccountBalanceWalletIcon /> : <></>} */}
      </nav>
    </header>
  );
};

export default NavBar;

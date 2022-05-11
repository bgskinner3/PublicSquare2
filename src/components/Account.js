import React, { useState, useEffect } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { GET_SINGLE_USER } from '../graphql/queries';
import { useQuery } from '@apollo/client';
import { Loading } from '.';
const jwtAuth = process.env.REACT_APP_JWT_SECRET;

const Account = () => {
  const [userInfo, setUserInfo] = useState({
    id: '',
    image: '',
    username: '',
    wallet: 0,
  });
  const authToken = localStorage.getItem(jwtAuth);
  const { data, loading } = useQuery(GET_SINGLE_USER, {
    variables: { token: authToken },
  });

  useEffect(() => {
    getUser();
  }, [data]);

  const getUser = () => {
    if (data) {
      setUserInfo({
        id: data.user.id,
        image: data.user.profileImg || false,
        username: data.user.username,
        wallet: data.user.wallet,
      });
    }
  };

  return loading ? (
    <Loading />
  ) : (
    <div className="bg-white pl-20 pr-20 pt-32 pb-32">
      <div className="w-full border-4 bg-primary-content rounded-3xl border-neutral-content  shadow-2xl shadow-black h-screen">
        <div className="relative px-4 -mt-24 ">
          {/* <AccountCircleIcon sx={{ fontSize: 150 }} /> */}
          <div className="avatar">
            <div className="w-36 rounded-full ring ring-neutral-content ring-offset-base-100 ring-offset-2 bg-white">
              {userInfo.image ? (
                <img
                  src="https://api.lorem.space/image/face?hash=3174"
                  alt=""
                />
              ) : (
                <AccountCircleIcon
                  sx={{ fontSize: 200 }}
                  className="pb-14 pr-14"
                />
              )}
            </div>
          </div>
        </div>
        <div>
          <div className="border text-xl border-neutral-content text-center rounded-xl p-3">
            <p>{userInfo.wallet}-PS</p>
          </div>
          <div className="flex">
            <div className="border text-xl border-neutral-content text-center rounded-xl p-3">
              Total Posts
            </div>
            <div className="border text-xl border-neutral-content text-center rounded-xl p-3">
              Active
            </div>
            <div className="border text-xl border-neutral-content text-center rounded-xl p-3">
              CLosed
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;

import React, { useState } from 'react';
import { SIGIN_UP_USER } from '../graphql/mutations';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import loginpic from '../images/login.png';
const jwtAuth = process.env.REACT_APP_JWT_SECRET;

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [signup] = useMutation(SIGIN_UP_USER);
  const navigate = useNavigate();

  const style = {
    background: 'linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)',
  };

  const handleSignup = async () => {
    try {
      const { data } = await signup({
        variables: {
          username: username,
          password: password,
        },
      });
      const {
        signup: { token },
      } = data;
      localStorage.setItem(jwtAuth, token);

      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="h-full gradient-form bg-gray-200 md:h-full">
      <div className="py-12 px-6 h-full">
        <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
          <div className="xl:w-10/12">
            <div className="block bg-white shadow-lg rounded-lg">
              <div className="lg:flex lg:flex-wrap g-0">
                <div className="lg:w-6/12 px-4 md:px-0">
                  <div className="md:p-12 md:mx-6">
                    <div className="text-center">
                      <img
                        className="mx-auto w-48 overflow-hidden"
                        src={loginpic}
                        alt="logo"
                      />
                      <h4 className="text-xl font-semibold mt-1 pb-1">
                        Welcome To Public Square
                      </h4>
                      <p className="mb-4 mb-12">Lets Get Started</p>
                    </div>

                    <p className="mb-4">Please login to your account</p>
                    <div className="mb-4">
                      <input
                        type="text"
                        className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        placeholder="Username"
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>
                    <div className="mb-4">
                      <input
                        type="password"
                        className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div className="text-center pt-1 mb-12 pb-1">
                      <button
                        className=" btn btn-outline w-full"
                        type="button"
                        data-mdb-ripple="true"
                        data-mdb-ripple-color="light"
                        onClick={() => handleSignup()}
                      >
                        Sign up
                      </button>
                    </div>
                  </div>
                </div>
                <div
                  className="lg:w-6/12 flex items-center lg:rounded-r-lg rounded-b-lg lg:rounded-bl-none"
                  style={style}
                >
                  <div className="text-white px-4 py-6 md:p-12 md:mx-6">
                    <h4 className="text-xl font-semibold mb-6">
                      We are more than just a company
                    </h4>
                    <p className="text-sm">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;

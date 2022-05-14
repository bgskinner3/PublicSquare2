import React, { useState } from 'react';
import { LOGIN_USER } from '../graphql/mutations';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import homepage from '../images/homepage.jpg';
import loginpic from '../images/login.png';
const jwtAuth = process.env.REACT_APP_JWT_SECRET;

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [login] = useMutation(LOGIN_USER);
  const style = {
    backgroundImage: `url(${homepage})`,
  };

  const handleLogin = async () => {
   
    try {
      const { data } = await login({
        variables: {
          username: username,
          password: password,
        },
      });
      const {
        login: { token, user },
      } = data;

      localStorage.setItem(jwtAuth, token);
      localStorage.setItem('userID', user.id);
      
      navigate('/');
    } catch (error) {
      console.error('login error', error);
    }
  };

  return (
    <section className="h-full gradient-form bg-gray-200 md:h-full">
      <div className=" py-12 px-6 h-full">
        <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
          <div className="xl:w-10/12">
            <div className="block bg-white shadow-lg rounded-lg">
              <div className="lg:flex lg:flex-wrap g-0">
                <div className="lg:w-6/12 px-4 md:px-0">
                  <div className=" md:mx-6">
                    <div className="text-center">
                      <img
                        className="mx-auto w-48 overflow-hidden"
                        src={loginpic}
                        alt="logo"
                      />
                    </div>

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
                        onClick={() => handleLogin()}
                      >
                        Log in
                      </button>
                    </div>
                    <div className="grid pb-20">
                      <p className="mb-0 mr-2 pb-5">Don't have an account?</p>
                      <button
                        type="button"
                        className="btn btn-outline w-full inline-block px-6 py-2 border-2 font-medium text-xs leading-tight uppercase rounded  focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                        data-mdb-ripple="true"
                        data-mdb-ripple-color="light"
                        onClick={() => navigate('/signup')}
                      >
                        Sign up
                      </button>
                    </div>
                  </div>
                </div>
                <div className="hidden lg:w-6/12 md:flex items-center lg:rounded-r-lg rounded-b-lg lg:rounded-bl-none bg-cover" style={style}>
                  
                  <div className="text-white px-4 py-6 md:mx-6">
                    <h4 className="text-xl font-semibold">
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

export default Login;

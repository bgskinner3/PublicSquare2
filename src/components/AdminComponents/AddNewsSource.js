import React, { useState } from 'react';
import {
  CREATE_NEWS_SOURCE_MUTATION,
  UPLOAD_FILE,
} from '../../graphql/mutations';
import { GET_SINGLE_USER } from '../../graphql/queries';
import { useMutation, useQuery } from '@apollo/client';
import PageNotFound from '../PageNotFound';
import { toast } from 'react-toastify';
import { Loading } from '..';
const token = process.env.REACT_APP_JWT_SECRET;

const AddNewsSource = () => {
  const authToken = localStorage.getItem(token);
  const [image, setImage] = useState({ preview: '', dataupload: {} });
  const [pageLink, setPageLink] = useState('');
  const [title, setTitle] = useState('');
  const [path, setPath] = useState('');
  const [createNewsSource] = useMutation(CREATE_NEWS_SOURCE_MUTATION);
  const [uploadFile] = useMutation(UPLOAD_FILE, {
    onCompleted: (data) => {
      if (data) {
        setPath(data.uploadFile.url.slice(21));
      }
    },
  });
  const { data: admin, loading } = useQuery(GET_SINGLE_USER, {
    variables: {
      token: authToken,
    },
  });

  const handleUpload = async (e) => {
    const blob = URL.createObjectURL(e.target.files[0]);
    setImage({
      preview: blob,
      dataupload: e.target.files[0],
    });
    const file = e.target.files[0];
    if (file) {
      await uploadFile({ variables: { file } });
    }
  };

  const handleSubmit = async () => {
    try {
      await createNewsSource({
        variables: {
          input: {
            title: title,
            pagelink: pageLink,
            image: path,
          },
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  return loading ? (
    <Loading />
  ) : (
    <div>
      {admin.user.admin ? (
        <div className="border-4 bg-neutral-focus rounded-lg border-violet-900 m-20 shadow-2xl shadow-black">
          {/* <div className="flex justify-center"> */}
          <form
            className="flex justify-center p-10"
            onSubmit={() => handleSubmit()}
          >
            <div className="rounded-lg shadow-xl bg-gray-50">
              <div className="m-4 p-5">
                <div className="flex items-center justify-center h-96 w-96 ">
                  <label className="flex w-96 h-96 border-4 border-blue-200 border-dashed hover:bg-gray-500 hover:border-gray-800">
                    <div className="flex items-center justify-center">
                      {image.preview ? (
                        image.preview && (
                          <img
                            src={image.preview}
                            className="w-96 h-96"
                            alt=""
                          />
                        )
                      ) : (
                        <div className="m-32">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-24 w-24"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                            />
                          </svg>
                        </div>
                      )}
                    </div>
                    <input
                      type="file"
                      className="opacity-0 hidden"
                      name="file"
                      required={true}
                      onChange={(e) => handleUpload(e)}
                    />
                  </label>
                </div>
              </div>
            </div>
            <div className="grid w-full justify-center pt-20">
              <input
                name="title"
                type="text"
                required={true}
                placeholder="Title here ....."
                className="input input-bordered input-primary w-full max-w-xs"
                onChange={async (e) => {
                  setTitle(e.target.value);
                }}
              />
              <input
                name="pageLink"
                type="text"
                required={true}
                placeholder="Add Link here ....."
                className="input input-bordered input-primary w-full max-w-xs"
                onChange={async (e) => {
                  setPageLink(e.target.value);
                }}
              />

              <button className="btn btn-primary w-72" type="submit">
                Submit
              </button>
            </div>
          </form>
          {/* </div> */}
        </div>
      ) : (
        <PageNotFound />
      )}
    </div>
  );
};

export default AddNewsSource;

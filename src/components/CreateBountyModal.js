import { Fragment, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { ExclamationIcon } from '@heroicons/react/outline';
import { useNavigate } from 'react-router-dom';
import { GET_ALL_BOUNTIES } from '../graphql/queries';
import { useQuery } from '@apollo/client';
import { Loading } from '.';
import { toast } from 'react-toastify';

const CreateBountyModal = (props) => {
  const [open, setOpen] = useState(true);
  const [free, setFree] = useState(true);
  const navigate = useNavigate();
  const cancelButtonRef = useRef(null);
  const { data, loading } = useQuery(GET_ALL_BOUNTIES);
  const { setLink, link, vaildLinks, setImage, currentSources } = props;

  //used to check if the entered link is an actual url link
  const isValidUrl = (_string) => {
    let url_string;
    try {
      url_string = new URL(_string);
    } catch (_) {
      return false;
    }
    return url_string.protocol === 'http:' || url_string.protocol === 'https:';
  };

  // checks if  the link is associated with a news organization the that we allow to post bounties on
  // and sets the image and name in the view
  const fillWIthCurrentSource = (link) => {
    let start;
    let end;
    let name;
    let pass = false;

    if (free) {
      start = link.indexOf('w');
      name = link.slice(start);
      end = name.indexOf('.com');
      name = name.slice(0, end) + '.com';
    }

    vaildLinks.map((org) => {
      if (name === org.compare) {
        setImage({
          image: org.image,
          id: org.id,
        });
        pass = true;
      }
    });
    return pass;
  };

  //on click checks the availabilty of the link, that is if it is already posted and in use
  const checkAvailability = async () => {
    let pass = true;
    try {
      if (isValidUrl(link)) {
        if (data) {
          data.bounties.map((bounty) => {
            if (bounty.link === link) {
              toast.warning('This Bounty Already exists');
              pass = false;
            }
          });
        }
        if (!fillWIthCurrentSource(link)) {
          toast.warning(
            'We are not currently making bounties on this news organization'
          );
          pass = false;
        }
        if (pass) {
          toast.success('Available!');
          setOpen(false);
        }
      } else {
        toast.warning('Please enter a vaild link');
      }
    } catch (error) {
      toast.warning('Please enter a vaild link');
      console.error('error occured while verifying link', error);
    }
  };

  return loading ? (
    <Loading />
  ) : (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={() => setOpen(true)}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-neutral-content bg-opacity-80 transition-opacity" />
        </Transition.Child>

        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-base-300 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex-shrink-0 mt-8 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                      <ExclamationIcon
                        className="h-6 w-6 text-red-600 "
                        aria-hidden="true"
                      />
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <button
                        className="btn m-2 btn-sm btn-circle absolute right-2 top-2"
                        onClick={() => navigate('/')}
                      >
                        ✕
                      </button>
                      <Dialog.Title
                        as="h3"
                        className="text-lg mt-10 leading-6 font-medium text-white"
                      >
                        Check Bounty Availability
                      </Dialog.Title>
                      <div className="mt-10">
                        <p className="text-sm text-gray">
                          There are many bounties current active or closed.
                          Check to see if your bounty is currently being voted
                          on. Supplying a vaild bounty will result in a reward.
                        </p>
                      </div>
                    </div>
                  </div>
                  <p className="text-center pt-10">
                    Current News Organizations
                  </p>
                  <div className="flex flex-no-wrap w-full gap-4 pt-5 overflow-x-scroll scrollbar-hide  scrolling-touch items-start mb-8">
                    {currentSources.newssources.map((source) => {
                      console.log(source);
                      return (
                        <div key={source.id}>
                          <div className="avatar">
                            <div className="w-24">
                              <img src={source.image} alt="" />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="bg-base-300 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <div className="w-full relative">
                    <input
                      type="text"
                      id="floating_filled"
                      className="block px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-primary-content  border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      required
                      onChange={(e) => setLink(e.target.value)}
                    />
                    <label
                      htmlFor="floating_filled"
                      className="absolute text-sm text-neutral-content duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                    >
                      Link
                    </label>
                    <button
                      className="btn btn-outline w-full mt-5 mb-5"
                      type="button"
                      onClick={() => checkAvailability()}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default CreateBountyModal;

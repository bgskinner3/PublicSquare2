import React from 'react';
import {
  Routes,
  Route,
  Navigate,
  BrowserRouter as Router,
} from 'react-router-dom';
import {
  Home,
  Login,
  Signup,
  Footer,
  Account,
  AddNewsSource,
  CreateBounty,
  Bounties,
  PageNotFound,
  SingleBounty,
  ForumMain,
  VoteMain,
  BountyVote
} from './components';

const Routing = () => {
  return (
    <div>
      <main>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/account" element={<Account />} />
          <Route exact path="/addsource" element={<AddNewsSource />} />
          <Route exact path="/create" element={<CreateBounty />} />
          <Route exact path="/forum" element={<ForumMain />} />
          <Route exact path="/bounties" element={<Bounties />} />
          <Route exact path="/votemain" element={<VoteMain />} />
          <Route exact path="/votemain/bounty" element={<BountyVote />} />
          <Route exact path="/bounties/:id" element={<SingleBounty />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default Routing;

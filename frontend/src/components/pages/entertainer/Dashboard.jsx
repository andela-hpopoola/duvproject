import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import TopMessage from 'components/common/layout/TopMessage';
import BackEndPage from 'components/common/layout/BackEndPage';
import DashboardCard from 'components/common/utils/DashboardCard';
import Onboarding from 'components/pages/entertainer/Onboarding';
import Events from 'components/pages/entertainer/UpcomingEvents';
import { BidsRow } from 'components/pages/entertainer/Bids';
import { UserContext } from 'context/UserContext';
import { getTokenFromStore } from 'utils/localStorage';
import LoadingScreen from 'components/common/layout/LoadingScreen';
import { twoDigitNumber, getItems } from 'utils/helpers';
import { InviteFriendsForm } from 'components/common/pages/InviteFriends';

const Dashboard = () => {
  const { userState } = React.useContext(UserContext);

  let currentDashboard;

  if (userState.entertainerProfile.approved == null) {
    currentDashboard = <LoadingScreen text="Loading your Dashboard" />;
  } else if (userState.entertainerProfile.approved === false) {
    currentDashboard = <Onboarding />;
  } else {
    currentDashboard = <DashboardItems />;
  }

  return (
    <BackEndPage title="Dashboard">
      <div className="main-app">{currentDashboard}</div>
    </BackEndPage>
  );
};

const DashboardItems = () => {
  const { userState } = React.useContext(UserContext);
  const [applications, setApplications] = React.useState({
    auctions: null,
    bids: null,
    requests: null,
    upcomingEvents: null,
  });
  React.useEffect(() => {
    axios
      .get(`/api/v1/applications/dashboard/entertainer`, {
        headers: {
          'x-access-token': getTokenFromStore(),
        },
      })
      .then(function (response) {
        const { status, data } = response;
        // handle success
        if (status === 200) {
          setApplications(data.results);
        }
      })
      .catch(function (error) {
        setApplications([]);
      });
  }, []);
  console.log('applications', applications);
  return (
    <>
      <TopMessage message={`Welcome back ${userState.firstName},`} />
      <section className="app-content">
        <div className="row">
          <DashboardCard
            color="green"
            icon="calendar"
            number={
              applications.upcomingEvents == null
                ? null
                : twoDigitNumber(applications.upcomingEvents.length)
            }
            summary="Upcoming Events"
            title="Events"
            to="/entertainer/events"
          />
          <DashboardCard
            color="yellow"
            icon="auction"
            number={
              applications.auctions == null
                ? null
                : twoDigitNumber(applications.auctions.length)
            }
            summary="Available Auctions"
            title="Auction"
            to="/entertainer/available-auctions"
          />
          <DashboardCard
            color="blue"
            icon="vcard"
            number={
              applications.requests == null
                ? null
                : twoDigitNumber(applications.requests.length)
            }
            summary="Pending Requests"
            title="Requests"
            to="/entertainer/payments"
          />
        </div>
        <div className="row">
          <div className="col-sm-8">
            {applications.upcomingEvents &&
              applications.upcomingEvents.length > 0 && (
                <Dashboard.UpcomingEvents
                  events={getItems(applications.upcomingEvents, 2) || []}
                />
              )}
            {applications.bids && applications.bids.length > 0 && (
              <Dashboard.RecentBids bids={getItems(applications.bids, 2)} />
            )}
          </div>
          <div className="col-sm-4">
            <Dashboard.InviteFriends />
            <Dashboard.RecentBadges />
          </div>
        </div>
      </section>
    </>
  );
};

Dashboard.InviteFriends = () => (
  <div className="card card-custom">
    <div className="card-body">
      <h5 className="card-title text-red header__with-border">
        Recommend a Friend
      </h5>
      <InviteFriendsForm widget />
    </div>
  </div>
);

Dashboard.UpcomingEvents = ({ events }) => (
  <div className="card card-custom">
    <div className="card-body">
      <h5 className="font-weight-normal text-white">Upcoming Events</h5>
      <div className="table-responsive">
        <table className="table table-dark table__no-border table__with-bg">
          <tbody>
            <Events.CardList events={events} />
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

Dashboard.UpcomingEvents.propTypes = {
  events: PropTypes.array.isRequired,
};

Dashboard.RecentBids = ({ bids }) => (
  <div className="card card-custom">
    <div className="card-body">
      <h5 className="font-weight-normal text-white">Recent Bids</h5>
      <div className="table-responsive">
        <table className="table table-dark table__no-border table__with-bg">
          <tbody>
            {bids.map((bid, index) => (
              <BidsRow
                askingPrice={bid.applications[0].askingPrice}
                auctionEndDate={bid.auctionEndDate}
                city={bid.event.city}
                eventType={bid.event.eventType}
                id={bid.applications[0].id}
                key={index}
                number={index + 1}
                state={bid.event.state}
                status={bid.applications[0].status}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

Dashboard.RecentBids.propTypes = {
  bids: PropTypes.array.isRequired,
};

Dashboard.PaymentHistory = () => (
  <div className="card card-custom">
    <div className="card-body">
      <h5 className="card-title text-red">Payment History</h5>
      <div className="table-responsive">
        <table className="table table-dark">
          <tbody>
            <tr>
              <td>17 Mar. 2019</td>
              <td className="text-white">N 50,000</td>
            </tr>
            <tr>
              <td>20 Jan. 2019</td>
              <td className="text-white">N 80,000</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

Dashboard.RecentBadges = () => (
  <div className="card card-custom">
    <div className="card-body">
      <h5 className="card-title text-blue">Recent Badges</h5>
      <div className="table-responsive">
        <table className="table table-dark">
          <tbody>
            <tr valign="middle">
              <td>
                <i className="icon icon-badge text-yellow icon-sm"></i>{' '}
              </td>
              <td className="text-white pt-4">Certified Duv Entertainer</td>
            </tr>
            <tr>
              <td>
                <i className="icon icon-badge text-red icon-sm d-inline-block"></i>{' '}
              </td>
              <td className="text-white pt-4">Completed 5 events</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

export default Dashboard;

import React from 'react';
import PropTypes from 'prop-types';
import TopMessage from 'components/common/layout/TopMessage';
import BackEndPage from 'components/common/layout/BackEndPage';
import axios from 'axios';
import ViewEvent from '../user/ViewEvent';
import { getTokenFromStore } from 'utils/localStorage';
import { remainingDays } from 'utils/date-helpers';
import { getNairaSymbol, commaNumber } from 'utils/helpers';
import PriceCalculator from 'components/common/utils/PriceCalculator';
import { DEFAULT_COMMISSION } from 'utils/constants';

const ViewBid = ({ applicationId }) => {
  const [application, setApplication] = React.useState(null);

  React.useEffect(() => {
    applicationId &&
      axios
        .get(`/api/v1/applications/${applicationId}`, {
          headers: {
            'x-access-token': getTokenFromStore(),
          },
        })
        .then(function (response) {
          const { status, data } = response;
          console.log('data', data);
          // handle success
          if (status === 200) {
            setApplication(data.application);
          }
        })
        .catch(function (error) {
          console.log(error.response.data.message);
          // TODO: navigate to all events
        });
  }, [applicationId]);

  if (!application) {
    return null;
  }

  const eventEntertainer = application.eventEntertainerInfo;

  return (
    <BackEndPage title="Placed Bid">
      <div className="main-app">
        <TopMessage />

        <section className="app-content row">
          <div className="col-sm-12 mb-5">
            <h3 className="main-app__title">
              Bid for {eventEntertainer.event.eventType} <br />{' '}
              <small className="main-app__small remaining-time">
                <i className="icon icon-hourglass"></i>
                {remainingDays(eventEntertainer.event.eventDate)}
              </small>
            </h3>
          </div>
          <div className="col-sm-6">
            <div className="card card-custom card-black card-form">
              <div className="card-body">
                <h5 className="text-muted mb-4 text-font">
                  Your Bid: {getNairaSymbol()}
                  {commaNumber(application.askingPrice)}
                </h5>
                <hr className="d-block mb-4" />
                <PriceCalculator
                  askingPrice={parseInt(application.askingPrice, 10)}
                  commission={application.commission || DEFAULT_COMMISSION}
                />
              </div>
            </div>
            <h6>Event Details</h6>
            <ViewEvent.EventDetailsCard
              event={eventEntertainer.event}
              transparent
            />
          </div>
          <div className="col-sm-6">
            <h6>Requirements</h6>
            <ViewEvent.EventEntertainerDetailsCard
              eventEntertainer={eventEntertainer}
            />
          </div>
        </section>
      </div>
    </BackEndPage>
  );
};

ViewBid.propTypes = {
  applicationId: PropTypes.string,
};

ViewBid.defaultProps = {
  applicationId: null,
};

export default ViewBid;
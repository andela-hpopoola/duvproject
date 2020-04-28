import React from 'react';
import PropTypes from 'prop-types';
import TopMessage from 'components/common/layout/TopMessage';
import BackEndPage from 'components/common/layout/BackEndPage';
import axios from 'axios';
import AlertMessage from 'components/common/utils/AlertMessage';
import ViewEvent from '../user/ViewEvent';
import { getTokenFromStore } from 'utils/localStorage';
import { remainingDays } from 'utils/date-helpers';
import {
  getNairaSymbol,
  commaNumber,
  getRequestStatusIcon,
  moneyFormat,
} from 'utils/helpers';
import LoadingScreen from 'components/common/layout/LoadingScreen';
import Image from 'components/common/utils/Image';
import { REQUEST_ACTION } from 'utils/constants';
import DuvLiveModal from 'components/custom/Modal';

const ViewRequest = ({ applicationId }) => {
  const [message, setMessage] = React.useState({ msg: null, type: 'error' });
  const [application, setApplication] = React.useState(null);
  const [loadingPage, setLoadingPage] = React.useState(true);

  const approveApplication = (amount) => {
    axios
      .post(
        `/api/v1/pay`,
        {
          amount,
          applicationId,
        },
        {
          headers: {
            'x-access-token': getTokenFromStore(),
          },
        }
      )
      .then(function (response) {
        const { status, data } = response;
        // handle success
        if (status === 200) {
          window.location.href = data.payment.authorization_url;
        }
      })
      .catch(function (error) {
        console.log(error.response.data.message);
        setMessage({ messagr: error.response.data.message });
        // TODO: ADD ERROR ALERT HERE
      });
  };

  const approveBidModalBody = () => (
    <>
      <div className="text-center">
        <Image
          className="avatar--large"
          name={application.user.profile.stageName || 'No name'}
          responsiveImage={false}
          src={application.user.profileImageURL || 'No src'}
        />
        <h4 className="font-weight-normal mt-3">
          {application.user.profile.stageName}
        </h4>
        <h5 className="text-yellow mt-3 mb-4">
          &#8358; {moneyFormat(application.askingPrice)}
        </h5>
      </div>
      <div className="small--2">
        <h6 className="text-white">Note</h6>
        Approving this bid will inform the entertainer that they have won the
        bid and should be prepared to perform in this event. However, their
        attendance can only be confirmed by paying the assigned bid at lease 2
        days (48 hours) before the event date, else the contract will be
        terminated.
      </div>
    </>
  );

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
            console.log('data', data);
            setApplication(data.application);
            setLoadingPage(false);
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
    <BackEndPage title="Request">
      <div className="main-app">
        <TopMessage />

        {loadingPage ? (
          <LoadingScreen text="Loading Request" />
        ) : (
          <section className="app-content row">
            <div className="col-sm-12 mb-5">
              <h3 className="main-app__title">
                Request for {eventEntertainer.event.eventType} <br />{' '}
                <small className="main-app__small remaining-time">
                  <i className="icon icon-hourglass"></i>
                  {remainingDays(eventEntertainer.event.eventDate)}
                </small>
              </h3>

              {application.eventEntertainerInfo.hiredEntertainer && (
                <div className="mt-3 text-left">
                  <AlertMessage
                    message="An entertainer has been hired for this details"
                    type="info"
                  />
                </div>
              )}
            </div>
            <div className="col-sm-6">
              <div className="card card-custom card-black card-form">
                <div className="card-body">
                  <h5 className="text-muted-light mb-4 text-font">
                    Your Offer: {getNairaSymbol()}
                    {commaNumber(application.askingPrice)}
                    <small className="float-right">
                      {getRequestStatusIcon(application.status)}
                    </small>
                  </h5>
                  <hr className="d-block mb-4" />
                  <AlertMessage message={message.msg} type={message.type} />
                  <section className="text-center">
                    <Image
                      bordered
                      className="avatar--large"
                      name={application.user.profile.stageName}
                      src={application.user.profileImageURL}
                    />

                    <h6 className="font-weight-normal text-yellow mt-3">
                      {application.user.profile.stageName}
                    </h6>
                    <small className="">
                      {application.user.profile.entertainerType}
                    </small>
                    <div className="mt-2 text-muted-light-2 px-5 line-height-2">
                      {application.status === REQUEST_ACTION.APPROVED && (
                        <>
                          Your offer of NGN {getNairaSymbol()}
                          {commaNumber(application.askingPrice)} was accepted.
                        </>
                      )}
                      {application.status === REQUEST_ACTION.INCREMENT && (
                        <>
                          {application.user.profile.stageName}} wants you to
                          increase your offer to {getNairaSymbol()}
                          {commaNumber(application.askingPrice)}.
                        </>
                      )}
                      {application.status === REQUEST_ACTION.REJECTED && (
                        <>
                          {application.user.profile.stageName}} has other
                          engagement and will not be available for your event.
                        </>
                      )}
                    </div>
                    <div className="mt-4">
                      <a
                        className="btn btn-info btn-transparent"
                        href={`/entertainers/${application.user.profile.slug}`}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        View Profile
                      </a>

                      {(application.status === REQUEST_ACTION.APPROVED ||
                        application.status === REQUEST_ACTION.INCREMENT) &&
                        !application.eventEntertainerInfo.hiredEntertainer && (
                          <>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <DuvLiveModal
                              actionFn={() =>
                                approveApplication(application.askingPrice)
                              }
                              actionText="Approve Bid"
                              body={approveBidModalBody()}
                              closeModalText="Cancel"
                              title="Approve Bid"
                            >
                              <button className="btn btn-danger btn-transparent">
                                Pay Now
                              </button>
                            </DuvLiveModal>
                          </>
                        )}
                    </div>
                  </section>
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
        )}
      </div>
    </BackEndPage>
  );
};

ViewRequest.propTypes = {
  applicationId: PropTypes.string,
};

ViewRequest.defaultProps = {
  applicationId: null,
};

export default ViewRequest;
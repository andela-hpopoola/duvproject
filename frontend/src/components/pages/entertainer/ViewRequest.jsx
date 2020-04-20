import React from 'react';
import PropTypes from 'prop-types';
import TopMessage from 'components/common/layout/TopMessage';
import BackEndPage from 'components/common/layout/BackEndPage';
import axios from 'axios';
import { Formik, Form } from 'formik';
import Button from 'components/forms/Button';
import AlertMessage from 'components/common/utils/AlertMessage';
import { createSchema } from 'components/forms/schema/schema-helpers';
import { requestSchema } from 'components/forms/schema/entertainerSchema';
import ViewEvent from '../user/ViewEvent';
import { getTokenFromStore } from 'utils/localStorage';
import { remainingDays } from 'utils/date-helpers';
import InputFormat from 'components/forms/InputFormat';
import PriceCalculator from 'components/common/utils/PriceCalculator';
import { getNairaSymbol, commaNumber } from 'utils/helpers';
import { DEFAULT_COMMISSION, REQUEST_ACTION } from 'utils/constants';
import { setInitialValues } from 'components/forms/form-helper';
import TextArea from 'components/forms/TextArea';
import LoadingScreen from 'components/common/layout/LoadingScreen';

const ViewRequest = ({ applicationId }) => {
  const [activeType, setActiveType] = React.useState(null);
  const [message, setMessage] = React.useState({ msg: null, type: 'error' });
  const [application, setApplication] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [loadingPage, setLoadingPage] = React.useState(true);

  const showRequestForm = (type) => () => {
    setActiveType(type);
  };

  const hideRequestForm = () => {
    setActiveType(null);
  };

  const processRequest = (
    requestType,
    rejectionReason = null,
    proposedPrice = null
  ) => {
    console.log('currently processing');
    const action = requestType;
    const payload = { action, proposedPrice, rejectionReason };

    setLoading(true);

    console.log('payload', payload);

    axios
      .post(`/api/v1/applications/process-request/${applicationId}`, payload, {
        headers: { 'x-access-token': getTokenFromStore() },
      })
      .then(function (response) {
        const { status, data } = response;
        if (status === 200) {
          setMessage({
            msg: 'Your response has been successfully submitted',
            type: 'success',
          });
          setApplication(data.application);
          setLoading(false);
        }
      })
      .catch(function (error) {
        setMessage({ msg: error.response.data.message });
        setLoading(false);
      });
  };

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
            </div>
            <div className="col-sm-6">
              <div className="card card-custom card-black card-form">
                <div className="card-body">
                  <h5 className="text-muted-light mb-4 text-font">
                    Proposed Offer: {getNairaSymbol()}
                    {commaNumber(application.askingPrice)}
                  </h5>
                  <hr className="d-block mb-4" />

                  <AlertMessage message={message.msg} type={message.type} />
                  {loading ? (
                    <LoadingScreen />
                  ) : (
                    <>
                      {activeType ? (
                        <section className="request-form">
                          <RequestsForm
                            activeType={activeType}
                            application={application}
                            hideRequestForm={hideRequestForm}
                            processRequest={processRequest}
                          />
                        </section>
                      ) : (
                        <section className="accept">
                          <PriceCalculator
                            askingPrice={parseInt(application.askingPrice, 10)}
                            commission={
                              application.commission || DEFAULT_COMMISSION
                            }
                          />
                          {application.status !== 'Pending' ? (
                            // Dont show this when another alert if active
                            <AlertMessage
                              message={
                                message.msg
                                  ? null
                                  : 'This request has been processed'
                              }
                              type="info"
                            />
                          ) : (
                            <div>
                              <Button
                                className="btn btn-success btn-transparent"
                                onClick={() =>
                                  processRequest(REQUEST_ACTION.APPROVED)
                                }
                              >
                                <i className="icon icon-ok-circled"></i> Approve
                              </Button>
                              &nbsp;&nbsp;&nbsp;
                              <Button
                                className="btn btn-danger btn-transparent"
                                onClick={showRequestForm(
                                  REQUEST_ACTION.REJECTED
                                )}
                              >
                                <i className="icon icon-cancel-circled"></i>{' '}
                                Reject
                              </Button>
                              &nbsp;&nbsp;
                              <Button
                                className="btn btn-info btn-transparent"
                                onClick={showRequestForm(
                                  REQUEST_ACTION.INCREMENT
                                )}
                              >
                                <i className="icon icon-up-big"></i>
                                Ask for an Increase
                              </Button>
                              &nbsp;&nbsp;
                            </div>
                          )}
                        </section>
                      )}
                    </>
                  )}
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

const RequestsForm = ({
  activeType,
  application,
  hideRequestForm,
  processRequest,
}) => {
  const [commission, setCommission] = React.useState(DEFAULT_COMMISSION);
  React.useEffect(() => {
    axios
      .get('/api/v1/currentCommission')
      .then(function (response) {
        const { status, data } = response;
        console.log('status,data', status, data);
        // handle success
        if (status === 200) {
          setCommission(data.commission);
        }
      })
      .catch(function (error) {
        console.log(error.response.data.message);
        setCommission(DEFAULT_COMMISSION);
      });
  }, []);
  return (
    <Formik
      enableReinitialize={true}
      initialValues={setInitialValues(
        requestSchema(activeType, application.askingPrice)
      )}
      onSubmit={(values, actions) => {
        const requestType = activeType;
        const rejectionReason = values.rejectionReason;
        const proposedPrice = values.proposedPrice;

        processRequest(requestType, rejectionReason, proposedPrice);
        hideRequestForm();
      }}
      render={({ isSubmitting, handleSubmit, ...props }) => {
        const proposedPrice = parseInt(props.values.proposedPrice, 10) || 0;
        const showCalculator =
          proposedPrice !== 0 &&
          proposedPrice >= parseInt(application.askingPrice, 10);

        return (
          <>
            <h6 className="mb-3 text-red">
              {activeType === REQUEST_ACTION.INCREMENT
                ? 'I want an Increment'
                : 'Reject Offer'}
            </h6>
            <Form>
              {activeType === REQUEST_ACTION.INCREMENT && (
                <InputFormat
                  label="Your Proposed Fee"
                  name="proposedPrice"
                  placeholder="Your Request"
                  type="number"
                />
              )}
              {showCalculator && (
                <PriceCalculator
                  askingPrice={proposedPrice}
                  commission={commission}
                />
              )}
              <TextArea
                label="Reason"
                name="rejectionReason"
                optional
                placeholder="Reason for your Decision (optional)"
                rows="2"
              />
              <Button
                className="btn-info btn-wide btn-transparent"
                onClick={handleSubmit}
              >
                {activeType === REQUEST_ACTION.INCREMENT
                  ? 'Submit'
                  : 'Reject Offer'}
              </Button>
              &nbsp;&nbsp;
              <Button
                className="btn-danger btn-wide btn-transparent"
                onClick={hideRequestForm}
              >
                Cancel
              </Button>
            </Form>
          </>
        );
      }}
      validationSchema={createSchema(
        requestSchema(activeType, application.askingPrice)
      )}
    />
  );
};

RequestsForm.propTypes = {
  activeType: PropTypes.string.isRequired,
  application: PropTypes.object.isRequired,
  hideRequestForm: PropTypes.func.isRequired,
  processRequest: PropTypes.func.isRequired,
  values: PropTypes.object,
};

RequestsForm.defaultProps = {
  values: {},
};

export default ViewRequest;

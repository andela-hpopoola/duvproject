import React from 'react';
import PropTypes from 'prop-types';
import Humanize from 'humanize-plus';
import { Formik } from 'formik';
import {
  setInitialValues,
  DisplayFormikState
} from 'components/forms/form-helper';
import Button from 'components/forms/Button';
import TopMessage from 'components/common/layout/TopMessage';
import EventDetails from 'components/common/events/EventDetails';
// import EventAddress from 'components/common/events/EventAddress';
// import AddEntertainer from 'components/common/entertainers/AddEntertainer';
import { HIRE_ENTERTAINERS } from 'utils/constants';
import { navigate } from '@reach/router';
import BackEndPage from 'components/common/layout/BackEndPage';
import { eventDetailsObject } from 'components/forms/schema/eventSchema';
import { createSchema } from 'components/forms/schema/schema-helpers';
// import { entertainerDetailsObject } from 'components/forms/schema/entertainerSchema';

const NewEvent = ({ hire_type }) => {
  const validHireType = Object.keys(HIRE_ENTERTAINERS).includes(
    hire_type.toLowerCase()
  );
  const currentHireType = Humanize.capitalize(hire_type);
  const message = validHireType
    ? `Hire an Entertainer (${currentHireType})`
    : 'Enter a New Event';
  const btnText = validHireType ? `Start ${currentHireType}` : 'Save Event';
  const onSubmit = () => {
    const urlToRedirect = validHireType
      ? '/user/events'
      : '/user/hire-entertainer/1';
    return navigate(urlToRedirect);
  };
  return (
    <BackEndPage title="New Events">
      <div className="main-app">
        <TopMessage message={message} />

        <section className="app-content">
          <NewEventForm />
          {/* {validHireType && <AddEntertainer />} */}
          <div className="mt-5">
            <button
              className="btn btn-transparent btn-primary text-right btn-lg"
              onClick={onSubmit}
              type="submit"
            >
              {btnText}
            </button>
          </div>
        </section>
      </div>
    </BackEndPage>
  );
};

NewEvent.propTypes = {
  hire_type: PropTypes.string
};

NewEvent.defaultProps = {
  hire_type: ''
};

const NewEventForm = () => {
  return (
    <Formik
      // initialValues={{
      //   event: setInitialValues({ ...eventDetailsObject })
      // }}
      initialValues={{
        event: setInitialValues({ ...eventDetailsObject })
      }}
      onSubmit={(values, actions) => {
        console.log(values);
        setTimeout(() => {
          actions.setSubmitting(false);
        }, 400);
      }}
      render={({ isSubmitting, handleSubmit, ...props }) => (
        <>
          <EventDetails />
          {/* <EventAddress /> */}
          <Button
            className="btn-danger btn-lg btn-wide btn-transparent"
            loading={isSubmitting}
            onClick={handleSubmit}
          >
            Register as an Entertainer
          </Button>

          <DisplayFormikState {...props} />
        </>
      )}
      validationSchema={createSchema({
        event: createSchema(eventDetailsObject)
      })}
    />
  );
};

export default NewEvent;

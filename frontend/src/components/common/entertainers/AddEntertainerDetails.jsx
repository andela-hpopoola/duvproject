import React from 'react';
import {
  SELECT_ENTERTAINERS_TYPE,
  EVENT_AGE_GROUP,
  GENRE,
  LANGUAGE,
  AUDIENCE_SIZE,
  BUDGET,
  PLACE_OF_EVENTS
} from 'utils/constants';
import Select from 'components/forms/Select';
import MultiSelect from 'components/forms/MultiSelect';
import TextArea from 'components/forms/TextArea';

const AddEntertainerDetails = () => (
  <div className="card card-custom card-black card-form">
    <div className="card-body col-md-10">
      <h4 className="card-title blue">Entertainer Details</h4>
      <div className="form-row">
        <Select
          blankOption="Choose your preferred Entertainer Type"
          formGroupClassName="col-md-6"
          isValidMessage="looks good"
          label="Entertainer Type"
          name="entertainer.type"
          options={SELECT_ENTERTAINERS_TYPE}
          placeholder="Entertainer Type"
        />
        <Select
          blankOption="Choose a place of event"
          formGroupClassName="col-md-6"
          isValidMessage="looks good"
          label="Place of Event"
          name="entertainer.place"
          options={PLACE_OF_EVENTS}
          placeholder="Place of Event"
        />
      </div>
      <div className="form-row">
        <MultiSelect
          formGroupClassName="col-md-6"
          isValidMessage="looks good"
          label="Genre"
          name="entertainer.genre"
          optional
          options={GENRE}
          placeholder="Genre"
        />
        <MultiSelect
          formGroupClassName="col-md-6"
          isValidMessage="looks good"
          label="Language"
          name="entertainer.language"
          optional
          options={LANGUAGE}
          placeholder="Preferred Language"
        />
      </div>
      <div className="form-row">
        <Select
          blankOption="Select an audience size"
          formGroupClassName="col-md-6"
          isValidMessage="looks good"
          label="Expected Audience Size"
          name="entertainer.audience"
          options={AUDIENCE_SIZE}
          placeholder="Expected Audience Size"
        />
        <MultiSelect
          formGroupClassName="col-md-6"
          isValidMessage="looks good"
          label="Age Group"
          name="entertainer.age_group"
          options={EVENT_AGE_GROUP}
          placeholder="Select the event's age group"
        />
      </div>
      <div className="form-row">
        <Select
          blankOption="Choose your base budget"
          formGroupClassName="col-md-6"
          isValidMessage="looks good"
          label="Lowest Budget (in Naira)"
          name="entertainer.base_budget"
          options={BUDGET}
          placeholder="Lowest Budget"
        />
        <Select
          blankOption="Choose your highest budget"
          formGroupClassName="col-md-6"
          isValidMessage="looks good"
          label="Highest Budget (in Naira)"
          name="entertainer.highest_budget"
          options={BUDGET}
          placeholder="Highest Budget"
        />
      </div>
      <div className="form-row">
        <div className="col-md-12">
          <TextArea
            label="Special Requests"
            name="entertainer.special_requests"
            optional
            placeholder="E.g 10 special songs, your favorite song e.t.c."
            rows="3"
          />
        </div>
      </div>
    </div>
  </div>
);

export default AddEntertainerDetails;
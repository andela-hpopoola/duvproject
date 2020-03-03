import React from 'react';
import { OCCASSION_TYPE } from 'utils/constants';
import Input from 'components/forms/Input';
import Select from 'components/forms/Select';
import TextArea from 'components/forms/TextArea';
import DatePicker from 'components/forms/DatePicker';

const EventDetails = () => {
  const [displayForm, setDisplayForm] = React.useState({ eventType: false });
  const toggleForm = value => {
    console.log('value', value);
    console.log('displayForm[value]: ', displayForm[value]);
    setDisplayForm({ [value]: !displayForm[value] });
  };
  return (
    <div className="card card-custom card-black card-form ">
      <div className="card-body col-md-10">
        <h4 className="card-title yellow">Event Details</h4>
        <form>
          <div className="form-row">
            {displayForm.eventType ? (
              <Input
                formGroupClassName="col-md-6"
                label="Event Type"
                labelLink={{
                  onClick: () => toggleForm('eventType'),
                  text: 'Select Event Type',
                  to: ''
                }}
                name="event.eventType"
                placeholder="Event Type"
              />
            ) : (
              <Select
                blankOption="Select Event Type"
                formGroupClassName="col-md-6"
                label="Event Type"
                labelLink={{
                  onClick: () => toggleForm('eventType'),
                  text: 'Type Manually',
                  to: ''
                }}
                name="event.eventType"
                options={OCCASSION_TYPE}
                placeholder="Event Type"
              />
            )}
            <DatePicker
              formGroupClassName="col-md-6"
              label="Event Date"
              name="event.eventDate"
              placeholderText="Event Date"
            />
          </div>
          <div className="form-row">
            <DatePicker
              dateFormat="h:mm aa"
              formGroupClassName="col-md-6"
              label="Start Time"
              name="event.startTime"
              placeholderText="Start Time"
              showTimeSelect
              showTimeSelectOnly
              timeCaption="Start Time"
              timeIntervals={30}
            />
            <DatePicker
              dateFormat="h:mm aa"
              formGroupClassName="col-md-6"
              label="End Time"
              name="event.endTime"
              placeholderText="End Time"
              showTimeSelect
              showTimeSelectOnly
              timeCaption="End Time"
              timeIntervals={30}
            />
          </div>
          <TextArea
            label="More Information"
            name="event.moreInformation"
            optional
            placeholder="More information about your event"
            rows="4"
          />
        </form>
      </div>
    </div>
  );
};

export default EventDetails;

import React, { useState } from 'react';
import TagsInput from 'react-tagsinput';
import 'react-tagsinput/react-tagsinput.css';
import AutoComplete from 'components/custom/AutoComplete';
import { RangeTooltip } from 'components/custom/SliderTooltip';

const AddEntertainer = () => {
  const [tags, setTags] = useState([]);
  return (
    <div className="card card-custom card-black card-form">
      <div className="card-body col-md-10">
        <h4 className="card-title green">Add Entertainer </h4>
        <form>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="inputEmail4">Entertainer</label>
              <select className="form-control" id="location" name="location">
                <option value="dj">DJ</option>
                <option value="live-band">Live Band</option>
                <option value="mc">MC</option>
              </select>
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="inputEmail4">Age Group</label>
              <select className="form-control" id="location" name="location">
                <option value="all">All</option>
                <option value="children">Children</option>
                <option value="adults">Adults</option>
                <option value="old">Old People</option>
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="inputEmail4">Genre</label>
              <TagsInput
                onChange={tags => setTags(tags)}
                renderInput={AutoComplete}
                test="testing"
                value={tags}
              />
              {/* <input className="form-control" placeholder="Genre" type="text" /> */}
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="inputEmail4">Preferred Language</label>
              <select className="form-control" id="location" name="location">
                <option value="dj">None</option>
                <option value="live-band">Yoruba</option>
                <option value="mc">Hausa</option>
                <option value="mc">Igbo</option>
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="inputEmail4">Expected Audience Size</label>
              <input
                className="form-control"
                placeholder="Expected Audience Size"
                type="text"
              />
            </div>
            <div className="form-group col-md-6 position-relative">
              <label htmlFor="inputPassword4">Budget</label>
              <RangeTooltip
                allowCross={false}
                className="mb-5"
                defaultValue={[800, 1200]}
                max={1500}
                min={500}
                pushable={100}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-12">
              <label htmlFor="message">Special Request</label>
              <textarea
                className="form-control"
                id="message"
                name="message"
                placeholder="E.g 10 special songs, your favorite song e.t.c."
                rows="8"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEntertainer;

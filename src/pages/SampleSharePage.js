
import React from 'react';
import { useParams } from 'react-router';
import { ReactDOM } from 'react';
import './SampleSharePage.css'

import Radio from '../components/Radio';
import RadioGroup from '../components/RadioGroup';
import Loading from '../components/Loading';

import SampleItemView from '../views/SampleItemView';

import { useSampleSharePage } from '../data';

import useTone from '../utils/tone';

/**
 * The view for the two buttons shared or bot shared on the location in the share page
 * @param {*} location, isLocationShared, onLocationItemShareChange
 * @returns the view of location ---- shared/not shared
 */
const LocationItemView = ({ location, isLocationShared, onLocationItemShareChange }) => {
  return (
    <div className='location-item-container'>
      <div className='location-item-left'>
        {location.location}
      </div>
      <div className='location-item-right'>
        <RadioGroup initialValue={isLocationShared}
          onChange={onLocationItemShareChange}
        >
          <Radio name={'Not Shared'} value={false} />
          <Radio name={'Shared'} value={true} />
        </RadioGroup>
      </div>
    </div>
  );
}

/**
 * The list of locations and if it is shared.
 * @param {*} locations, isLocationShared, onLocationListShareChange
 * @returns the list of locations and whether they are shared
 */
const LocationListView = ({ locations, isLocationShared, onLocationListShareChange }) => {
  return (
    <div className='sample-list-container'>
      {
        locations.map((item, index) => {
          return (
            <LocationItemView
              key={item + index}
              location={item}
              isLocationShared={isLocationShared(index)}
              onLocationItemShareChange={(value) => {
                onLocationListShareChange(index, value);
              }}
            />
          )
        })
      }
    </div>
  )
}


/**
 * The view for the sample share page
 * @returns the view of the share page + all the locations and whether they are shared or not and the other functionalities
 */
const SampleSharePage = () => {
  const { sampleId } = useParams();
  const { 
    isLoading, sample,
    locations, isLocationShared, 
    insertSampleToLocation, removeSampleToLocation 
  } = useSampleSharePage(sampleId);

  const { isPreviewing, startPreview, stopPreview } = useTone();

  return (
    <div className="page-container">
      {
        isLoading ?
        <>
          <Loading />
        </> : 
        <>
          <div className="page-title">
            Share This Sample:
          </div>
          <div className='page-content'>
            <SampleItemView 
              sample={sample}
              isPreviewing={isPreviewing(sample.id)}
              onPreviewClick={() => {
                if (isPreviewing(sample.id)) {
                  stopPreview(sample);
                } else {
                  startPreview(sample);
                }
              }}
            />
          </div>
          <LocationListView 
            locations={locations}
            isLocationShared={isLocationShared}
            onLocationListShareChange={(index, value) => {
              const location = locations[index];
              if (value) {
                insertSampleToLocation(location);
              } else {
                removeSampleToLocation(location);
              }
            }}
          />
        </>
      }
    </div>
  );
}

//Exports the page
export default SampleSharePage;
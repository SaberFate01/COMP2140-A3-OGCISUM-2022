
import React from 'react';
import { useNavigate } from 'react-router';
import { ReactDOM } from 'react';
import './SampleListPage.css'

import { useSampleListPage } from '../data';

import Loading from '../components/Loading';
import SampleItemView from '../views/SampleItemView';

import useTone from '../utils/tone';

/**
 * Creates the view for the list of samples and the preview functionality
 * @param {*} samples - the sample, isSampleShared - is it shared
 * @returns the view for the list of samples
 */
const SampleListView = ({ samples, isSampleShared }) => {

  const navigate = useNavigate();
  const { isPreviewing, startPreview, stopPreview } = useTone();

  return (
    <div className='sample-list-container'>
      {
        samples.map((item, index) => {
          return (
            <SampleItemView
              key={item + index}
              sample={item}
              isPreviewing={isPreviewing(item.id)}
              isShared={isSampleShared(index)}
              onShareClick={(sample) => {
                navigate(`share/${sample.id}`)
              }}
              onPreviewClick={(sample) => {
                if (isPreviewing(sample.id)) {
                  stopPreview(sample);
                } else {
                  startPreview(sample);
                }
              }}
              onEditClick={(sample) => {
                navigate(`edit/${sample.id}`)
              }}
            />
          );
        })
      }
    </div>
  )
}

/**
 * The view for the list of samples + functionalities
 * @returns the view, inclusive of edit, share, and create new sample
 */
const SampleListPage = () => {

  const navigate = useNavigate();
  const { isLoading, samples, isSampleShared } = useSampleListPage();

  return (
    <div className="page-container">
      {
        isLoading ?
        <>
          <div className='page-loading-container'>
            <Loading />
          </div>
        </> : 
        <>
          <div className="page-title">
            Samples You've Created
          </div>
          <SampleListView 
            samples={samples}
            isSampleShared={isSampleShared}
          />
          <div className='page-submit-container'>
            <button className='app-button-filled page-btn-create'
              onClick={() => {
                navigate(`edit/0`)
              }}
            >
              Create Sample
            </button>
          </div>
        </>
      }
    </div>
  )
}

export default SampleListPage;
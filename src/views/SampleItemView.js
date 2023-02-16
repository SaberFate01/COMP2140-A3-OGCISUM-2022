import React from 'react';
import { ReactDOM } from 'react';
import Radio from '../components/Radio';
import './SampleItemView.css';

/**
 * The element for the view of the list of samples
 * @param {*} sample, the sample on the list
  isPreviewing, previewing or not
  isShared,is shared or not
  onShareClick, when share button is clicked
  onPreviewClick, when the prewview button is clicked
  onEditClick, when the edit button is clicked
 * @returns the list of samples view
 */
const SampleItemView = ({ 
  sample,
  isPreviewing,
  isShared,
  onShareClick,
  onPreviewClick,
  onEditClick
}) => {

  return (
    <div className='sample-item-container'>
      <div className='sample-item-left'>
        <div className='sample-item-title'>
          {sample.name || 'Unknown'}
        </div>
        <div className='sample-item-subtitle'>
          {sample.datetime}
        </div>
      </div>
      <div style={{ flex: 1 }}></div>
      <div className='sample-item-right'>
        {
          onShareClick &&
          <button className={`app-button${isShared ? '-disabled' : ''} sample-item-btn-share`}
            onClick={() => {
              onShareClick(sample);
            }}
          >
            { isShared ? 'Shared' : 'Share' }
          </button>
        }
        {
          onPreviewClick &&
          <>
            <div style={{ minWidth: "8px" }}></div>
            <button className='app-button sample-item-btn-preview'
              onClick={() => {
                onPreviewClick(sample);
              }}
            >
              { isPreviewing ? 'Stop Preview' : 'Preview' }
            </button>
          </>
        }
        {
          onEditClick &&
          <>
            <div style={{ minWidth: "8px" }}></div>
            <button className='app-button-filled sample-item-btn-edit'
              onClick={() => {
                onEditClick(sample);
              }}
            >
              Edit
            </button>
          </>
        }
      </div>
    </div>
  )
}

//Export the view
export default SampleItemView;

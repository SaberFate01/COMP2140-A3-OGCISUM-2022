
import React from 'react';
import { ReactDOM } from 'react';
import { useParams } from 'react-router';
import './SampleEditPage.css'
import Radio from '../components/Radio';
import RadioGroup from '../components/RadioGroup';
import Loading from '../components/Loading';
import { InstrumentType, NOTES, useSampleEditPage } from '../data';
import useTone from '../utils/tone';

/**
 * The top bar that is being displayed in the edit page
 * @param {*} isPreviewing - the previewing statues, 
 * sampleName - the name, 
  onSampleNameChange - when name changed, 
  onPreviewClicked - when preview button is clicked, 
  onSaveClick - when save button clicked
 * @returns 
 */
const SampleNameEditView = ({ 
  isPreviewing, sampleName, 
  onSampleNameChange, onPreviewClicked, onSaveClick 
}) => {
  return (
    <div className='sample-name-edit-container'>
      <div className='sample-name-edit-left'>
        <input className='app-input sample-name-edit-input'
          value={sampleName}
          onChange={(e) => {
            onSampleNameChange(e.target.value);
          }}
        ></input>
      </div>
      <div style={{minWidth: "16px"}}></div>
      <div className='sample-name-edit-right'>
        <button className='app-button sample-name-edit-btn-preview'
          onClick={onPreviewClicked}
        >
          { isPreviewing ? 'Stop Preview' : 'Preview' }
        </button>
        <div style={{minWidth: "8px"}}></div>
        <button className='app-button-filled sample-name-edit-btn-edit'
          onClick={onSaveClick}>
          Save
        </button>
      </div>
    </div>
  );
}

const SampleTypeView = ({ type, onSampleTypeChange }) => {
  return (
    <div className='sample-type-container'>
      <div className='sample-type-left'>
        {'Type'}
      </div>
      <div className='sample-type-right'>
        <RadioGroup
          initialValue={type}
          onChange={onSampleTypeChange}
      >
          <Radio name={'Piano'} value={InstrumentType.PIANO} />
          <Radio name={'French Horn'} value={InstrumentType.FRENCH_HORN} />
          <Radio name={'Guitar'} value={InstrumentType.GUITAR} />
          <Radio name={'Drums'} value={InstrumentType.DRUMS} />
        </RadioGroup>
      </div>
    </div>
  );
}

/**
 * The view for the specific line of notes. 
 * @param {*} name, recordingDataItem, onNoteLineChange, onNoteItemChange
 * @returns A line of notes in the list container
 */
const NoteLineView = ({ name, recordingDataItem, onNoteLineChange, onNoteItemChange }) => {
  const initialValue = {};
  recordingDataItem.forEach((item, index) => {
    initialValue[index] = item;
  });
  return (
    <div className='note-item-container'>
      <div className='note-item-left'>
        {name}
      </div>
      <div className='note-item-right'>
        <RadioGroup multiple
          name={name}
          initialValue={initialValue}
          onChange={onNoteLineChange}
        >
          {
            recordingDataItem.map((item, index) => {
              return (
                <Radio
                  key={name + item + index}
                  value={index}
                  onChange={(value, isChecked) => {
                    onNoteItemChange(value, isChecked, name);
                  }}
                />
              );
            })
          }
        </RadioGroup>
      </div>
    </div>
  )
}

/**
 * This function produces the keyboard for the instrument
 * @param {*}  recordingData, onNoteListChange, onNoteItemChange 
 * @returns The interactive  keyboard
 */
const NoteListView = ({ recordingData, onNoteListChange, onNoteItemChange }) => {
  return (
    <div className='note-list-container'>
      {
        NOTES.map((item, index) => {
          return (
            <NoteLineView
              key={item + index}
              name={item}
              recordingDataItem={recordingData[index][item]}
              onNoteLineChange={(values) => {
                onNoteListChange({ index, item, values })
              }}
              onNoteItemChange={onNoteItemChange}
            />
          );
        })
      }
    </div>
  )
}

/**
 * The view for the edit page
 * @returns the edit page, with the buttons, the choice for instrument, the keyboard
 */
const SampleEditPage = () => {
  const { sampleId } = useParams();
  const { 
    isLoading, sample, isInsertOrUpdate,
    memoryUpdateSample,
    insertSample, updateSample
  } = useSampleEditPage(sampleId);
  const { isPreviewing, play, startPreview, stopPreview } = useTone();

  return (
    <div className="page-container">
      {
        isLoading ?
        <>
          <Loading />
        </> : 
        <>
          <div className="page-title">
            Editing This Sample:
          </div>
          <SampleNameEditView
            isPreviewing={isPreviewing(sample.id)}
            sampleName={sample.name}
            onSampleNameChange={(value) => {
              memoryUpdateSample({ name: value })
            }}
            onPreviewClicked={() => {
              if (!isPreviewing(sample.id)) {
                startPreview(sample);
              } else {
                stopPreview(sample);
              }
            }}
            onSaveClick={() => {
              if (isInsertOrUpdate()) {
                insertSample();
              } else {
                updateSample();
              }
            }}
          />
          <SampleTypeView
            type={sample.type}
            onSampleTypeChange={(value) => {
              memoryUpdateSample({ type: value })
            }}
          />
          <NoteListView 
            recordingData={sample.recordingData}
            onNoteListChange={({ index, item, values }) => {
              const valuesArray = [];
              Object.keys(values).forEach((key) => {
                valuesArray.push(values[key]);
              });
              const newRecordingData = [...sample.recordingData];
              newRecordingData[index][item] = valuesArray;
              memoryUpdateSample({ recordingData: newRecordingData });
            }}
            onNoteItemChange={(value, isChecked, name) => {
              if (isChecked) play(sample.type, name + value);
            }}
          />
        </>
      }
    </div>
  )
}

export default SampleEditPage;
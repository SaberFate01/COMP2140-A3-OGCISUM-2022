//This page is where most of backend process involving passing data from api to local or vice versa.
//Import necessary modules from react
import { useState, useEffect } from "react";
//import all the export functions from api.js
import { 
  remoteSamples,
  remoteLocations,
  remoteSamplesToLocations,
  remoteInsertSmaple,
  remoteUpdateSmaple,
  remoteInsertSamplesToLocations,
  remoteRemoveSamplesToLocations
} from './api';

//Declare a class containing all the static intrument types to be used for calling api later
export class InstrumentType {
  static PIANO = 'piano';
  static FRENCH_HORN = 'french_horn';
  static GUITAR = 'guitar';
  static DRUMS = 'drums';
}

//Declare an array of notes from B to C to be used in the instrument keyboard later
export const NOTES = ['B', 'A', 'G', 'F', 'E', 'D', 'C'];

/**
 * Creates an export function that fetches the data through the api and 
 * displays the list of already existing samples
 * @returns {isLoading, samples, isSampleShared}
 * isLoading: If the page is loading
 * samples: The music sample
 * samplesToLocations: The sample shared to locations in the share page
 */
export const useSampleListPage = () => {
  console.log('useSampleListPage');
  //Set the useState to be true, update later
  const [isLoading, setLoading] = useState(true);
  //Set the useState to be empty array, update later. 
  const [samples, setSamples] = useState([]);
  const [samplesToLocations, setSamplesToLocations] = useState([]);
  //An effect hook for loading, samples and locations
  useEffect(() => {
    const initSampleListPage = async () => {
      try {
        //Call the Samples from api.js
        const json = await remoteSamples();
        let newSamples = json.samples;
        //if ture 
        if (newSamples) {
          newSamples = newSamples.map((newSample) => {
            newSample.recordingData = JSON.parse(newSample.recording_data);
            delete newSample.recording_data;
            return newSample;
          });
          //Set localStorage
          localStorage.setItem('samples', JSON.stringify(newSamples));
          setSamples(newSamples);
          //for debugging in console 
          console.log('useSampleListPage remoteSamples', newSamples);
        }
      } catch (error) {
        console.log('useSampleListPage', error);
      }

      try {
        //Call the locations from api.js
        const json = await remoteLocations();
        const newLocations = json.locations;
        if (newLocations) {
          localStorage.setItem('locations', JSON.stringify(newLocations));
          //for debugging in console 
          console.log('useSampleListPage remoteLocations', newLocations);
        }
      } catch (error) {
        console.log('useSampleListPage', error);
      }
      //calls the samples to locations from api.js
      try {
        const json = await remoteSamplesToLocations();
        const newSamplesToLocations = json.samples_to_locations;
        if (newSamplesToLocations) {
          localStorage.setItem('samples_to_locations', JSON.stringify(newSamplesToLocations));
          setSamplesToLocations(newSamplesToLocations);
          //for debugging in console 
          console.log('useSampleListPage remoteSamplesToLocations', newSamplesToLocations);
        }
      } catch (error) {
        console.log('useSampleListPage', error);
      }
      //change setLoading userstate
      setLoading(false);
    }
    //Calls the function above
    initSampleListPage();
  }, []);
  /**
   * Checks if the the sample is shared to a location
   * @param {index} index the sample that is being checked 
   * @returns a boolean value whether there is a sampleToLocation id similar to the specific sample's id
   */
  const isSampleShared = (index) => {
    //The double exclamation mark here turns the object into a boolean 
    return !!samplesToLocations.find((sampleToLocation) => {
      return sampleToLocation.samples_id === samples[index].id
    });
  }

  return { isLoading, samples, isSampleShared };
}

/**
 * Creates an export function for the sample edit page. 
 * Processes whether the user is inserting a new sample
 * Or updating an existing sample 
 * @param {sampleID} sampleId The id of the editted sample
 * @returns isLoading, sample, isInsertOrUpdate, memoryUpdateSample, insertSample, updateSample
 */
export const useSampleEditPage = (sampleId) => {
  //Show sampleId for debugging
  console.log('useSampleEditPage', sampleId);
  const [isLoading, setLoading] = useState(true);
  const [sample, setSample] = useState({});

  useEffect(() => {
    const samplesJSON = localStorage.getItem('samples');
    const samples = JSON.parse(samplesJSON);
    const newSample = samples.find((item) => item.id === sampleId);
    if (newSample) setSample(newSample);
    else {
      //Create the new default keyboard
      setSample({
        name: '',
        type: InstrumentType.PIANO,
        recordingData: NOTES.map((note) => {
          const item = {};
          item[note] = Array.from(Array(16).keys()).map(() => {
            return false;
          });
          return item;
        })
      });
    }
    //For debugging 
    console.log('useSampleEditPage newSample', newSample);

    setLoading(false);
  }, [sampleId]);

  //Check if the user is adding a new sample or updating an existing example 
  const isInsertOrUpdate = () => {
    return !sample.id;
  }
  
  //Update local memories when called
  const memoryUpdateSample = ({ name, type, recordingData }) => {
    const newSample = Object.assign({}, sample);
    if (name) newSample.name = name;
    if (type) newSample.type = type;
    if (recordingData) newSample.recordingData = recordingData;
    setSample(newSample);
    console.log('useSampleEditPage updateSample', newSample,'memoryupdate');
  }

  /**
   * If the user is inserting a new Sample
   * This async function will be called 
   * And call the insert API to add the new sample 
   */
  const insertSample = async () => {
    console.log('useSampleEditPage insertSample', sample);
    setLoading(true);
    try {
      await remoteInsertSmaple(sample);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }

  /**
   * If the user is updating an existing new Sample
   * This async function will be called 
   * And call the update api to update the new sample 
   */
  const updateSample = async () => {
    console.log('useSampleEditPage updateSample', sample);
    setLoading(true);
    try {
      await remoteUpdateSmaple(sample);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }

  return { 
    isLoading, sample, isInsertOrUpdate,
    memoryUpdateSample, insertSample, updateSample
  };
}

/**
 * Creates an export function for the sample sharing page
 * @param {sampleId} sampleId the id of the sample that is currently being shared. 
 * @returns isLoading, sample, locations, 
    isLocationShared, insertSampleToLocation, removeSampleToLocation
 */
export const useSampleSharePage = (sampleId) => {
  console.log('useSampleSharePage', sampleId);
  const [isLoading, setLoading] = useState(true);
  const [sample, setSample] = useState({});
  const [locations, setLocations] = useState([]);
  const [samplesToLocations, setSamplesToLocations] = useState([]);

  useEffect(() => {
    let samples = localStorage.getItem('samples');
    samples = JSON.parse(samples);
    const newSample = samples.find((item) => item.id === sampleId);
    if (newSample) {
      setSample(newSample);
      //For console
      console.log('useSampleSharePage findSample', newSample);
    }

    let newLocations = localStorage.getItem('locations');
    if (newLocations) {
      newLocations = JSON.parse(newLocations);
      setLocations(newLocations);
      console.log('useSampleSharePage getLocations', newLocations);
    }

    let newSamplesToLocations = localStorage.getItem('samples_to_locations');
    if (newSamplesToLocations) {
      newSamplesToLocations = JSON.parse(newSamplesToLocations);
      setSamplesToLocations(newSamplesToLocations);
      console.log('useSampleSharePage getSamplesToLocations', newSamplesToLocations);
    }
    
    setLoading(false);
  }, [sampleId]);

  /**
   * Checksa if the location is shared. 
   * @param {*} index the location 
   * @returns whether the location is shared
   */
  const isLocationShared = (index) => {
    //!! turns object into boolean
    return !!samplesToLocations.find((sampleToLocation) => {
      //If there exist such an sample id and location id
      return sampleToLocation.samples_id === sample.id && 
        sampleToLocation.locations_id === locations[index].id;
    });
  }

  /**
   * Update the shared statues of a location to the sample 
   * @param {*} location as the name suggest, the location object that is being updated
   * CHanges the location of the sample to shared 
   */
  const insertSampleToLocation = async (location) => {
    console.log('useSampleSharePage saveSampleToLocation', sample, location);
    setLoading(true);
    try {
      const json = await remoteInsertSamplesToLocations(sample.id, location.id);
      const insertedID = json.insertedID;
      const newSamplesToLocations = samplesToLocations.concat({
        id: insertedID, api_key: '"MwyQVwvP"',
        datetime: '', samples_id: sample.id, locations_id: location.id
      });
      localStorage.setItem('samples_to_locations', JSON.stringify(newSamplesToLocations));
      setSamplesToLocations(newSamplesToLocations);

      console.log('useSampleSharePage saveSampleToLocation', newSamplesToLocations);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }

  /**
   * Unshares a location from the current sample 
   * Calls the remove sample to location api
   * @param {*} location the location that is going to be unshared
   */
  const removeSampleToLocation = async (location) => {
    console.log('useSampleSharePage removeSampleToLocation', location);
    setLoading(true);
    try {
      const sampleToLocationId = samplesToLocations.find((sampleToLocation) => {
        return sampleToLocation.samples_id === sample.id && 
          sampleToLocation.locations_id === location.id;
      }).id;
      await remoteRemoveSamplesToLocations(sampleToLocationId);
      const newSamplesToLocations = samplesToLocations.filter((sampleToLocation) => {
        return sampleToLocation.samples_id === sample.id && 
          sampleToLocation.locations_id !== location.id;
      });
      localStorage.setItem('samples_to_locations', JSON.stringify(newSamplesToLocations));
      setSamplesToLocations(newSamplesToLocations);
      //For debugging
      console.log('useSampleSharePage removeSampleToLocation', newSamplesToLocations);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }

  return { 
    isLoading, sample, locations, 
    isLocationShared, insertSampleToLocation, removeSampleToLocation 
  }
}
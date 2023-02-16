//This js file contins all the exported functions calling for APIs

/**
 * Declare an export async function that fetches all the samples from the API, 
 * calls the .json() method to parse it into a json file.
 * Logs the json data on the console
 * @returns the json data
 */
export const remoteSamples = async () => {
  const response = await fetch('http://wmp.interaction.courses/api/v1/?apiKey=MwyQVwvP&mode=read&endpoint=samples');
  const json = await response.json();
  console.log(json);
  return json;
}

/**
 * Declare an export async function that fetches all the locations from the API, 
 * calls the .json() method to parse it into a json file.
 * Logs the json data on the console
 * @returns the json data
 */
export const remoteLocations = async () => {
  const response = await fetch('http://wmp.interaction.courses/api/v1/?apiKey=MwyQVwvP&mode=read&endpoint=locations');
  const json = await response.json();
  console.log(json);
  return json;
}

/**
 * Declare an export async function that fetches all the samples to locations  from the API, 
 * calls the .json() method to parse it into a json file.
 * Logs the json data on the console
 * @returns the json data
 */
export const remoteSamplesToLocations = async () => {
  const response = await fetch('http://wmp.interaction.courses/api/v1/?apiKey=MwyQVwvP&mode=read&endpoint=samples_to_locations');
  const json = await response.json();
  console.log(json);
  return json;
}

/**
 * Declare an export async function that adds a new sample to the api. 
 * that matches the sample's type and name using the 'POST' method
 * then calls the .json() method to parse it into a json file.
 * @param {sample} The sample that the user wants to insert
 * @returns the updated json data
 */
export const remoteInsertSmaple = async (sample) => {
  const response = await fetch(`http://wmp.interaction.courses/api/v1/?apiKey=MwyQVwvP&mode=create&endpoint=samples&sampleType=${sample.type}&sampleName=${sample.name}`, {
    method: 'POST', body: JSON.stringify(sample.recordingData)
  });
  const json = await response.json();
  console.log(json);
  return json;
}

/**
 * Declare an export async function that updates a specific data in the api
 * that matches the sample's type, name and id using the 'POST' method
 * then calls the .json() method to parse it into a json file.
 * @param {sample} The sample that the user wants to update
 * @returns the updated json data
 */
export const remoteUpdateSmaple = async (sample) => {
  const response = await fetch(`http://wmp.interaction.courses/api/v1/?apiKey=MwyQVwvP&mode=update&endpoint=samples&sampleType=${sample.type}&sampleName=${sample.name}&id=${sample.id}`, {
    method: 'POST', body: JSON.stringify(sample.recordingData)
  });
  const json = await response.json();
  console.log(json);
  return json;
}

/**
 * Declare an export async function that adds a shared location to the sample. 
 * calls the .json() method to parse it into a json file.
 * Logs the json data on the console
 * Specifies the location according to ${locationID} with {sampleID}
 * @returns the json data
 */
export const remoteInsertSamplesToLocations = async (sampleId, locationId) => {
  const response = await fetch(`http://wmp.interaction.courses/api/v1/?apiKey=MwyQVwvP&mode=create&endpoint=samples_to_locations&sampleID=${sampleId}&locationID=${locationId}`);
  const json = await response.json();
  console.log(json);
  return json;
}

/**
 * Declare an export async function that removes the sharing of a location to the sample, 
 * calls the .json() method to parse it into a json file.
 * Logs the json data on the console
 * Specifies the location according to ${sampletolocationID}
 * @returns the json data
 */
export const remoteRemoveSamplesToLocations = async (sampleToLocationId) => {
  const response = await fetch(`http://wmp.interaction.courses/api/v1/?apiKey=MwyQVwvP&mode=delete&endpoint=samples_to_locations&id=${sampleToLocationId}`);
  const json = await response.json();
  console.log(json);
  return json;
}
import { useState } from 'react';
import * as Tone from 'tone';
import { InstrumentType, NOTES } from '../data';


/**
 * Get the urls of the instrument sample
 * @param {*} type The type of instrument selected
 * @returns the url of the tone sample
 */
const getInstrumentUrls = (type) => {
  switch (type) {
    case InstrumentType.PIANO: {
      return {
        'A7': 'A7.[mp3|ogg]',
        'A1': 'A1.[mp3|ogg]',
        'A2': 'A2.[mp3|ogg]',
        'A3': 'A3.[mp3|ogg]',
        'A4': 'A4.[mp3|ogg]',
        'A5': 'A5.[mp3|ogg]',
        'A6': 'A6.[mp3|ogg]',
        'A#7': 'As7.[mp3|ogg]',
        'A#1': 'As1.[mp3|ogg]',
        'A#2': 'As2.[mp3|ogg]',
        'A#3': 'As3.[mp3|ogg]',
        'A#4': 'As4.[mp3|ogg]',
        'A#5': 'As5.[mp3|ogg]',
        'A#6': 'As6.[mp3|ogg]',
        'B7': 'B7.[mp3|ogg]',
        'B1': 'B1.[mp3|ogg]',
        'B2': 'B2.[mp3|ogg]',
        'B3': 'B3.[mp3|ogg]',
        'B4': 'B4.[mp3|ogg]',
        'B5': 'B5.[mp3|ogg]',
        'B6': 'B6.[mp3|ogg]',
        'C7': 'C7.[mp3|ogg]',
        'C1': 'C1.[mp3|ogg]',
        'C2': 'C2.[mp3|ogg]',
        'C3': 'C3.[mp3|ogg]',
        'C4': 'C4.[mp3|ogg]',
        'C5': 'C5.[mp3|ogg]',
        'C6': 'C6.[mp3|ogg]',
        'C7': 'C7.[mp3|ogg]',
        'C#7': 'Cs7.[mp3|ogg]',
        'C#1': 'Cs1.[mp3|ogg]',
        'C#2': 'Cs2.[mp3|ogg]',
        'C#3': 'Cs3.[mp3|ogg]',
        'C#4': 'Cs4.[mp3|ogg]',
        'C#5': 'Cs5.[mp3|ogg]',
        'C#6': 'Cs6.[mp3|ogg]',
        'D7': 'D7.[mp3|ogg]',
        'D1': 'D1.[mp3|ogg]',
        'D2': 'D2.[mp3|ogg]',
        'D3': 'D3.[mp3|ogg]',
        'D4': 'D4.[mp3|ogg]',
        'D5': 'D5.[mp3|ogg]',
        'D6': 'D6.[mp3|ogg]',
        'D#7': 'Ds7.[mp3|ogg]',
        'D#1': 'Ds1.[mp3|ogg]',
        'D#2': 'Ds2.[mp3|ogg]',
        'D#3': 'Ds3.[mp3|ogg]',
        'D#4': 'Ds4.[mp3|ogg]',
        'D#5': 'Ds5.[mp3|ogg]',
        'D#6': 'Ds6.[mp3|ogg]',
        'E7': 'E7.[mp3|ogg]',
        'E1': 'E1.[mp3|ogg]',
        'E2': 'E2.[mp3|ogg]',
        'E3': 'E3.[mp3|ogg]',
        'E4': 'E4.[mp3|ogg]',
        'E5': 'E5.[mp3|ogg]',
        'E6': 'E6.[mp3|ogg]',
        'F7': 'F7.[mp3|ogg]',
        'F1': 'F1.[mp3|ogg]',
        'F2': 'F2.[mp3|ogg]',
        'F3': 'F3.[mp3|ogg]',
        'F4': 'F4.[mp3|ogg]',
        'F5': 'F5.[mp3|ogg]',
        'F6': 'F6.[mp3|ogg]',
        'F#7': 'Fs7.[mp3|ogg]',
        'F#1': 'Fs1.[mp3|ogg]',
        'F#2': 'Fs2.[mp3|ogg]',
        'F#3': 'Fs3.[mp3|ogg]',
        'F#4': 'Fs4.[mp3|ogg]',
        'F#5': 'Fs5.[mp3|ogg]',
        'F#6': 'Fs6.[mp3|ogg]',
        'G7': 'G7.[mp3|ogg]',
        'G1': 'G1.[mp3|ogg]',
        'G2': 'G2.[mp3|ogg]',
        'G3': 'G3.[mp3|ogg]',
        'G4': 'G4.[mp3|ogg]',
        'G5': 'G5.[mp3|ogg]',
        'G6': 'G6.[mp3|ogg]',
        'G#7': 'Gs7.[mp3|ogg]',
        'G#1': 'Gs1.[mp3|ogg]',
        'G#2': 'Gs2.[mp3|ogg]',
        'G#3': 'Gs3.[mp3|ogg]',
        'G#4': 'Gs4.[mp3|ogg]',
        'G#5': 'Gs5.[mp3|ogg]',
        'G#6': 'Gs6.[mp3|ogg]'
      }
    }
    case InstrumentType.FRENCH_HORN: {
      return {
        'D3': 'D3.[mp3|ogg]',
        'D5': 'D5.[mp3|ogg]',
        'D#2': 'Ds2.[mp3|ogg]',
        'F3': 'F3.[mp3|ogg]',
        'F5': 'F5.[mp3|ogg]',
        'G2': 'G2.[mp3|ogg]',
        'A1': 'A1.[mp3|ogg]',
        'A3': 'A3.[mp3|ogg]',
        'C2': 'C2.[mp3|ogg]',
        'C4': 'C4.[mp3|ogg]'
      }
    }
    case InstrumentType.GUITAR: {
      return {
        'F4': 'F4.[mp3|ogg]',
        'F#2': 'Fs2.[mp3|ogg]',
        'F#3': 'Fs3.[mp3|ogg]',
        'F#4': 'Fs4.[mp3|ogg]',
        'G2': 'G2.[mp3|ogg]',
        'G3': 'G3.[mp3|ogg]',
        'G4': 'G4.[mp3|ogg]',
        'G#2': 'Gs2.[mp3|ogg]',
        'G#3': 'Gs3.[mp3|ogg]',
        'G#4': 'Gs4.[mp3|ogg]',
        'A2': 'A2.[mp3|ogg]',
        'A3': 'A3.[mp3|ogg]',
        'A4': 'A4.[mp3|ogg]',
        'A#2': 'As2.[mp3|ogg]',
        'A#3': 'As3.[mp3|ogg]',
        'A#4': 'As4.[mp3|ogg]',
        'B2': 'B2.[mp3|ogg]',
        'B3': 'B3.[mp3|ogg]',
        'B4': 'B4.[mp3|ogg]',
        'C3': 'C3.[mp3|ogg]',
        'C4': 'C4.[mp3|ogg]',
        'C5': 'C5.[mp3|ogg]',
        'C#3': 'Cs3.[mp3|ogg]',
        'C#4': 'Cs4.[mp3|ogg]',
        'C#5': 'Cs5.[mp3|ogg]',
        'D2': 'D2.[mp3|ogg]',
        'D3': 'D3.[mp3|ogg]',
        'D4': 'D4.[mp3|ogg]',
        'D5': 'D5.[mp3|ogg]',
        'D#2': 'Ds2.[mp3|ogg]',
        'D#3': 'Ds3.[mp3|ogg]',
        'D#4': 'Ds3.[mp3|ogg]',
        'E2': 'E2.[mp3|ogg]',
        'E3': 'E3.[mp3|ogg]',
        'E4': 'E4.[mp3|ogg]',
        'F2': 'F2.[mp3|ogg]',
        'F3': 'F3.[mp3|ogg]'
      }
    }
    case InstrumentType.DRUMS: {
      return {
        'B2': 'drums1.[mp3|ogg]',
        'C3': 'drums2.[mp3|ogg]',
        'D2': 'drums3.[mp3|ogg]',
        'F3': 'drums4.[mp3|ogg]',
        'F5': 'drums5.[mp3|ogg]',
        'G2': 'drums6.[mp3|ogg]',
        'A1': 'drums7.[mp3|ogg]'
      }
    }
  }
}


const synths = {};
NOTES.forEach((item) => {
  synths[item] = new Tone.Synth().toDestination();
});

//The 4 instruments
const instruments = [
  InstrumentType.PIANO,
  InstrumentType.FRENCH_HORN,
  InstrumentType.GUITAR,
  InstrumentType.DRUMS
];

const samplers = {};
const toneParts = {};

instruments.forEach((item) => {
  samplers[item] = new Tone.Sampler({
    urls: getInstrumentUrls(item),
    release: 0.5,
    baseUrl: `/samples/${item}/`
  }).toDestination();
  toneParts[item] = new Tone.Part((time, note) => {
    try {
      console.log(time, note);
      samplers[item].triggerAttackRelease(note, '8n', time);
    } catch (error) {
      try {
        console.log(synths[note.substring(0, 1)])
        synths[note.substring(0, 1)].triggerAttackRelease(note, '8n', time);
      } catch (error) {}
    }
  }, []).start(0);
});


/**
 * For the preview functions when called
 * @returns isPreviewing, play, startPreview, stopPreview 
 */
const useTone = () => {

  const [sample, setSample] = useState(null);

  const play = async (type, note) => {
    try {
      samplers[type].triggerAttackRelease(note, '8n', Tone.now());
    } catch (error) {}
  }

  const isPreviewing = (sampleId) => {
    return sample && sample.id === sampleId;
  }

  const startPreview = async (sample) => {
    setSample(sample);

    Tone.Transport.stop();
    Tone.Transport.cancel();
    toneParts[sample.type].clear();

    Tone.start();

    let endBarID = 0;
    NOTES.forEach((note, index) => {
      for (let i = 0; i < 16; i++) {
        const bar = sample.recordingData[index][note][i];
        if (bar) {
          toneParts[sample.type].add(i / 2, note + i);
          if (i > endBarID) endBarID = i;
        }
      }
    });

    console.log(toneParts[sample.type])

    Tone.Transport.schedule(() => {
      setSample(null);
    }, endBarID / 2);

    Tone.Transport.start();
  }

  const stopPreview = (sample) => {
    setSample(null);
    Tone.Transport.stop();
    Tone.Transport.cancel();
    toneParts[sample.type].clear();
  }

  return { isPreviewing, play, startPreview, stopPreview };
}

export default useTone;

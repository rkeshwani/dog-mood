import React, {useEffect, useState} from 'react';

import './App.css';
// import * as mobilenet from '@tensorflow-models/mobilenet'
// import * as firebase from "firebase/app"
// import "firebase/performance"
// import "firebase/analytics"
import { CameraView } from './components/CameraView';
import { Predictions } from './components/Predictions';
import { Intro } from './components/Intro'
import * as tf from '@tensorflow/tfjs';

// import firebaseConfig from "./firebaseConfig"

function App() {
    
    const [imageData, setImageData] = useState(null); //Store image data stored here so that it can be extracted from the camera and sent to prediction component
    const [model, setModel] = useState(null); //Store model reference here so that it can be switched out
    const [isModelReady, setIsModelReady] = useState(false); //Store model initilization into memory state here
    const [seenIntro, setSeenIntro] = useState(false); //Introduction page state
    const [labels, setLabel] = useState(null); //Prediction values stored here

    useEffect(()=>{
      // Initialize Firebase analytics here
      // firebase.initializeApp(firebaseConfig.firebaseConfig);
      // const perf = firebase.performance();
      // const analytics = firebase.analytics();
      //Load model into memory
      async function loadTensorflow() {
        //Load Model
        await tf.ready();

      }
      loadTensorflow();

    },[]);

    const seenIntroCallback = (version) => {

      if(version===1) {
        loadModelBasic().then( ()=>{
          setSeenIntro(true);
        })
      }
      if(version===2) {
        loadModelAdvanced().then( ()=>{
          setSeenIntro(true);
        })
      }
      
    }
    //Load the basic model with fewer classes for moods
    async function loadModelBasic() {
      await setModel(await tf.loadGraphModel(window.location.origin+"/model/model.json"));
      //Load Labels
      let label = await fetch(window.location.origin+"/model/labels.json");
      setLabel(await label.json());
      setIsModelReady(true);
    }

    //Load the advanced model with more classes for moods
    async function loadModelAdvanced() {
      await setModel(await tf.loadGraphModel(window.location.origin+"/model2/model.json"));
      //Load Labels
      let label = await fetch(window.location.origin+"/model2/labels.json");
      setLabel(await label.json());
      setIsModelReady(true);
    }
    return (
      <div className="App">
        {!seenIntro && <Intro seenIntro={seenIntroCallback}/>}
        {(seenIntro && isModelReady) && <CameraView changeImageData={setImageData}/>}
        {(seenIntro && isModelReady) && <Predictions imageState={imageData} model={model} labels={labels}/>}
      </div>
    );
}

export default App;
 
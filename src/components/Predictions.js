import React, {useEffect, useState} from 'react';
import * as tf from '@tensorflow/tfjs';
export function Predictions(props) {
    const [predictions, setPredictions] = useState([]);

    useEffect(()=>{
        setTimeout(() => {
            tick();
        }, 100);
    },[props.imageState,props.model]);

    function tick() {
        let results;
        async function processModel() {
            if(props.imageState !== undefined && props.model!== null && props.imageState !== null) {
                tf.engine().startScope();
                //Run image data through model on every tick
                results = await props.model.execute(encode(props.imageState,props.model.inputs));
                setPredictions(decode(results));
                tf.engine().endScope();

            }
        }
        processModel();
    }

    function encode(imageData, inputNode) {
        
        let image = tf.browser.fromPixels(imageData)
        let float_caster = tf.cast(image, "float32");
        let dims_expander = tf.expandDims(float_caster, 0);
        let resized = tf.image.resizeBilinear(dims_expander, [inputNode[0].shape[1], inputNode[0].shape[2]]);
        let normalized = tf.div(tf.sub(resized, 0), 255);
        
        // let image_out = tf.squeeze(normalized,0);
        // image = null;
        // float_caster = null;
        // dims_expander = null;
        // resized = null;
        // return {"input_1": normalized}

        let node_key = inputNode[0].name;
        let return_obj = {};
        return_obj[node_key] = normalized;
        return return_obj;
      }
      function decode(outputTensor) {
        let data = outputTensor.dataSync();
        //Map data to labels
        let results = props.labels.map((label,index)=>{
            return {className: label, probability: data[index]};
        })
        return results;
      }


        return (<div className="status">{props.model==null && <div>Please wait while we load Tensorflow</div>}
            {(props.model!==null && predictions !== []) && <div>{predictions.map((prediction)=> {
              return <div>{Math.round(prediction.probability*100)}% {prediction.className}</div>
            })}</div>}
            </div>);
}
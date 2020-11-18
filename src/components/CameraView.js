import React, {useEffect, useState} from 'react';

export function CameraView(props) {
    let videoElement = React.useRef();
    let canvasElement = React.useRef();
    const [isVideoLoading, setIsVideoLoading] = useState(true);


    useEffect(()=>{
        //Connect Camera to video element and start playing video
        navigator.mediaDevices
        .getUserMedia({video:{facingMode: 'environment'}})
        .then(stream => {
            const video = videoElement.current;
            video.srcObject = stream;
            video.setAttribute('playsinline', true);
            video.play();
            requestAnimationFrame(tick);
        })
    },[]);

    function tick() {
        //On every requestAnimationFrame, request frame from video playing and send to canvas element
        const video = videoElement.current;
        const checkVideoState = setInterval(async () => {
            if(video.readyState === video.HAVE_ENOUGH_DATA) {
                clearInterval(checkVideoState);
                setIsVideoLoading(false);
                const canvasElementc = canvasElement.current;
                const canvas = canvasElementc.getContext("2d");

                canvasElementc.height = video.videoHeight;
                canvasElementc.width = video.videoWidth;

                canvas.drawImage(
                    video,
                    0,
                    0,
                    canvasElementc.width,
                    canvasElementc.height
                );
                let imageData = canvas.getImageData(0,0,canvasElementc.width,canvasElementc.height);
                props.changeImageData(imageData);
                requestAnimationFrame(tick);
            }
        },100);
    }

    return (<div>
                <video id="video" width="640" height="480" className="cameraFrame" autoPlay={true}
                ref={videoElement} style={{display:"none"}}></video>
                <div className="content">
                    {!isVideoLoading && <canvas id="canvas" width="640" height="480" className="photoCard" ref={canvasElement} />}
                </div>
            </div>
    );

}
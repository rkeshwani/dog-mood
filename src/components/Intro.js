import React from 'react';
import CollapsibleDiv from './CollapsibleDiv';

export function Intro(props) {

    return(<div className="intro">
        <h1>Welcome to Dog Mood, </h1>
        
        To get started, first allow your browser to access your external facing camera. 
        Then, point your phone at your furry friend and watch the top half of your screen.
        You should see a description of a mood followed by a percentage.<br/><br/>
        <CollapsibleDiv headerContent="Get Started" hidden={false}>
            <div style={{textAlign:'center', padding:'10px'}}>
                <button onClick={() => {props.seenIntro(1)}}>Basic</button>
                <button onClick={()=>{props.seenIntro(2)}}>Advanced</button>
            </div>
            Basic Version tells you if your dog is happy or sad.<br/>
            Advanced Version tells you other emotions (this is a work in progress). 
        </CollapsibleDiv>
        <CollapsibleDiv headerContent="How it Works">
            The application takes images from the camera and runs it through a model
            that returns the probability of the image representing a specific mood.
        </CollapsibleDiv>
        <CollapsibleDiv headerContent="Disclaimer">
            Your camera's video stream and images mentioned above are not saved anywhere
            and everything runs within your browser both on mobile and desktop.
        </CollapsibleDiv>
        <div style={{fontSize:'10px'}}>Created by <a target="_blank" href="http://www.rohitkeshwani.com">Rohit Keshwani</a></div>
    </div>);
}
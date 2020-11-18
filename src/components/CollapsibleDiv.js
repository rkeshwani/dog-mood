import React, {useState, useRef} from 'react';
export default function CollapsibleDiv(props) {
    let [hidden, setHidden] = useState(props.hidden===undefined?true:props.hidden);
    const toggleDiv = () => {
        setHidden(!hidden);
    }
    return (<div style={{borderWidth: '1px', borderColor:'white', borderStyle:'solid', borderRadius:10, padding:10, marginBottom:10}} {...props}><div onClick={()=>{toggleDiv()}} className="collapsible-div-header">{props.headerContent} >></div><div className={`collapsible-div-content ${hidden?'hidden':''}`} >{props.children}</div></div>)
}

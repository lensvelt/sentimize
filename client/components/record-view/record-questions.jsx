import React from 'react';
import ReactDom from 'react-dom';


export default (props) => (
	<div className="record-questions pure-u-1-1">
		<h1>Questions</h1>
      <ul>
	      <li>How do you like Sentimize?</li>
	      <li>I'm in another component now</li>
     </ul>
     <div className="button-bar">
        <button className="stop-button pure-button pure-button-error" onClick={(e) => props.clicked(e)}>Stop</button>
    </div>
	</div>
)
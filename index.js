import { createJWT } from "./tokenGenerator";
import axios from 'axios';
import isEmail from 'isemail';
import base64 from 'base-64';
import isBase64 from 'is-base64';


const token = new URLSearchParams(window.location.search).get("accessToken");
const spaceDestination = new URLSearchParams(window.location.search).get("spaceDestination");
const agent = new URLSearchParams(window.location.search).get("agent");
const displayTextBox = new URLSearchParams(window.location.search).get("displayTextBox");

const contentEl = document.getElementById('content');
const textBoxEl = document.getElementsByClassName("webex-message-composer-wrapper");
let spaceWidgetEl = document.getElementById("spaceWidgetDiv");
let agentButton = document.getElementById('connectButton');

let spaceWidgetProps = {
  accessToken: token,
  destinationId: spaceDestination,
  destinationType: 'spaceId',
  spaceActivities: { "files": false, "meet": false, "message": true, "people": false },
  initialActivity: 'message',
  secondaryActivitiesFullWidth: false,
  composerActions: { "attachFiles": false },
};

agentButton.addEventListener('click', (event) => {
  let urlParam;

  if (isEmail.validate(agent)) {
    urlParam = `email=${agent}`
  } else {
    if (isBase64(agent)) {
      const segs = base64.decode(agent).split('/');
      const spaceID = segs[segs.length - 1];
      urlParam = `space=${spaceID}`;
    } else {
      urlParam = `space=${agent}`;
    }
  }

  console.log(`webexteams://im?${urlParam}`);
  window.location.href = `webexteams://im?${urlParam}`;
});

if (!agent) {
  agentButton.remove();
}

webex.widget(spaceWidgetEl).spaceWidget(spaceWidgetProps);


var observer = new MutationObserver(function (mutations) {
  if (textBoxEl && document.contains(textBoxEl[0])) {
    if (!displayTextBox || displayTextBox === 'no') {
      textBoxEl[0].style.display = 'none';
    }
    observer.disconnect();
  }
});

observer.observe(document, { attributes: false, childList: true, characterData: false, subtree: true });

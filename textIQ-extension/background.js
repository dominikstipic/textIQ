function updateChart(data){
  chrome.runtime.sendMessage( '', {
		type: 'chart',
		message: data
	});
  console.log("sent");
}

function processResponseData(freq){
  // [[word, num]]
  let data = []
    for(let [w, f] of freq){
      data.push({y:f, label:w});
    }
  return data;
}

function sendText(text, url){
  const opt = {
    method: "post",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      text: text,
    })
  };

  fetch(url, opt)
    .then(response => response.json())
    .then(json_body => {
        let freq = json_body["freq"]; 
        let count = json_body["count"];
        let verbs = json_body["verbs"];
        let nouns = json_body["nouns"];
        let data = processResponseData(nouns);
        chrome.storage.sync.set({ "data":data });

        updateChart(data);
    });
    
};


///////////////////////////////////
const url = new URL("http://localhost:5000/text");

const analyzeTextContextMenu = {
  id: "analyze",
  title: "Analyze text", 
  contexts:[ "selection" ]
};

///////////////////////////////////

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ "data" : [] });
  chrome.contextMenus.create(analyzeTextContextMenu);
});

chrome.contextMenus.onClicked.addListener( ( info, _ ) => {
  chrome.tabs.create({url: "assets/pages/home.html"});
  let text = info.selectionText;

  setTimeout(() => sendText(text, url), 200);
});



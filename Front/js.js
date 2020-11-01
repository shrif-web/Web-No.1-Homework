const host = "http://" //enter centOS host here

function sendRequest(req , lang) {
	
	const firstNumber = Number(document.getElementById("num1").value);
    const secondNumber = Number(document.getElementById("num2").value);
	const line = Number(document.getElementById("line").value);
	
    var request = new XMLHttpRequest();
	request.setRequestHeader("Content-Type", "application/json");
	
	
	if (req == 'post'){
		
		if (lang == 'go'){
		var url = host + "/go/sha";
		}
	
		if (lang == 'node'){
		var url = host + "/nodejs/sha";
		}
		
		request.open("POST", url, true);
		request.onreadystatechange = function () {
	    if (request.readyState === 4 && request.status === 200) {
	        var json = JSON.parse(request.responseText);
			document.getElementById("answer1").value = json.result;
	    	}
		};
		var data = JSON.stringify({"num1": firstNumber, "num2": secondNumber});
		request.send(data);}
	
	if (req == 'get'){
		
		if (lang == 'go'){
		var url = host + "/go/write?lineNum=" + line;
		}
	
		if (lang == 'node'){
		var url = host + "/nodejs/write?lineNum=" + line;
		}
		
		request.open("GET", url, true);
		request.onreadystatechange = function () {
    	if (request.readyState === 4 && request.status === 200) {
        	var response = request.responseText;
        	document.getElementById("answer2").value = response;
    		}
		};
		request.send();
	}
}
var fs = require('fs');

const regIPs = new RegExp('(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(?:\\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}', 'g');
let IPGroup = {};

fs.readFile('access.log', {encoding: 'utf8'}, function (err, data) {
	if (err) throw err;
	let mask = [];
	let tmpIP;
	while(tmpIP = regIPs.exec(data)) {
		let IPList = tmpIP[0].split('.');
		IPList.pop();
		mask = IPList.join('.');
		
		if (!(mask in IPGroup)) 
			IPGroup[mask] = [];
		
		if (IPGroup[mask].indexOf(tmpIP[0]) == -1) 
			IPGroup[mask].push(tmpIP[0]);
	};
	
	for (mask in IPGroup) {
		console.log(mask + ' subnetwork have next ip addresses:');
		for (IP in IPGroup[mask]) {
			console.log(IPGroup[mask][IP]);
		}
		console.log('\n');
	}
});
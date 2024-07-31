const http = require('http');
const url = require('url');
const querystring = require('querystring');

http.createServer(function(request, response) {
    const parsedUrl = url.parse(request.url);

    if (parsedUrl.pathname === '/login' && request.method === 'POST') {
        console.log('URL ' + request.url + ' received.');

        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });

        request.on('end', () => {
            const qs = querystring.parse(body);
            console.log("QS IS:");
            console.log(qs);

            const name = qs["name"];
            const phone = qs["phone"];
            const email = qs["email"];
            const dob = qs["dob"];
            const language = qs["dropdown"];
            const gender = qs["gender"];
            const skills = [
                qs["C"] ? 'C' : '',
                qs["ca"] ? 'C++' : '',
                qs["ja"] ? 'Java' : ''
            ].filter(Boolean).join(', ');
            const address = qs["address"];
            const agree = qs["agree"] ? 'Yes' : 'No';

            response.writeHead(200, {'Content-Type': 'text/html'});
            response.write('<html><body>');
            response.write(`Hello ${name}, your details have been registered successfully.<br>`);
            response.write(`Phone: ${phone}<br>`);
            response.write(`Email: ${email}<br>`);
            response.write(`Date of Birth: ${dob}<br>`);
            response.write(`Language: ${language}<br>`);
            response.write(`Gender: ${gender}<br>`);
            response.write(`Skills: ${skills}<br>`);
            response.write(`Address: ${address}<br>`);
            response.write(`Agree to terms: ${agree}<br>`);
            response.write('</body></html>');
            response.end();
        });
    } else {
        response.writeHead(404, {'Content-Type': 'text/plain'});
        response.write('404 Not Found\n');
        response.end();
    }
}).listen(7777);
console.log('Server has started on port 7777.');

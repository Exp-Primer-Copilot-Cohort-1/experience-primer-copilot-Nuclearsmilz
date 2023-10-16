// Create a web server that can respond to requests for /comments.json
// with a JSON-encoded array of comments, much like your server did in the
// previous homework.

var http = require('http');
var fs = require('fs');
var url = require('url');

// Read the comments from the file and parse them into an array
var comments = JSON.parse(fs.readFileSync('comments.json'));

// Create the server
var server = http.createServer(function (request, response) {
  var urlParts = url.parse(request.url);

  // If this is a POST request, then process the form submission
  if (request.method == 'POST') {
    var body = '';

    // Concatenate all the POST data chunks together
    request.on('data', function (chunk) {
      body += chunk;
    });

    // When all data has been received, parse out the name and comment
    // and submit the form.
    request.on('end', function () {
      var data = qs.parse(body);
      comments.push(data);
      fs.writeFileSync('comments.json', JSON.stringify(comments));
    });
  }

  // Display the comments page
  if (urlParts.pathname == '/') {
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write('<html><body>');

    // Display the comments
    response.write('<h1>Comments</h1>');
    response.write('<ul>');
    for (var i in comments) {
      var comment = comments[i];
      response.write('<li><b>' + comment.name + '</b> said</li>');
      response.write('<blockquote>' + comment.comment + '</blockquote>');
    }
    response.write('</ul>');

    // Display the form
    response.write('<form method="POST" action="/"><h1>Post a comment</h1>');
    response.write('<p>Name: <input type="text" name="name"></p>');
    response.write('<p>Comment: <textarea name="comment"></textarea></p>');
    response.write('<p><input type="submit" value="Post"></p>');
    response.write('</form></body></html>');
    response.end();

  // Display the comments as JSON
  } else if (urlParts.pathname == '/comments.json') {
    response.writeHead(200, {'Content-Type': 'application/json'});
    response.write(JSON.stringify(comments));
    response.end();

  // Display a 404 error if the resource is not found.
  } else {
    response.writeHead(404, {'Content-Type': 'text/plain'});
    response.write('404 Not Found\n');
    response.end
  }
});
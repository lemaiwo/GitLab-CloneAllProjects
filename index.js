process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
var rp = require('request-promise');
var shell = require('shelljs');
var options = {
    uri: 'https://isoapp1199.belgrid.net/api/v4/projects',
    qs: {
        private_token: '8iAdR637sa_o6z8z8eRu', // -> uri + '?access_token=xxxxx%20xxxxx'
        per_page:100
    },
    headers: {
        
    },
    json: true // Automatically parses the JSON string in the response
};
 
rp(options)
    .then(function (repos) {
        console.log('User has %d repos', repos.length);
        shell.cd('projects');
        repos.forEach((repo)=>{
            console.log('Start clone %s', repo.http_url_to_repo)
            shell.exec(`git clone ${repo.http_url_to_repo}`);
        });
    })
    .catch(function (err) {
        // API call failed...
    });
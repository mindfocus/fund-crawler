'use strict';

const GithubDB = require('./githubdb');

exports.write = function (data, filepath) {
    const options = {
        owner: 'mindfocus',
        repo: 'fund-data',
        path: filepath
    };

    const githubDB = new GithubDB(options);
    githubDB.auth(getToken());
    githubDB.connectToRepo();
    githubDB.getCurrentFile(options).then(function (res) {
        return githubDB.createOrUpdateFile(data, res);
    }).catch(function (err) {
        return githubDB.createOrUpdateFile(data, err);
    });
}

exports.read = function (filepath) {
    const options = {
        owner: 'mindfocus',
        repo: 'fund-data',
        path: filepath
    };

    const githubDB = new GithubDB(options);
    githubDB.auth(getToken());
    githubDB.connectToRepo();
    return githubDB.find();
}

function getToken() {
    return process.env.TOKEN;
    //return process.env.TOKEN.split("").reverse().join("")
}

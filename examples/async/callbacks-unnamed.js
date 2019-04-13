console.log('Begin');

console.log('Async calls started...');

//This is a problem of callback hell
getUser(1, (err, res) => {
    if (err) return console.log('error: ', err);
    console.log('user:', res);

    getRepositories(res.username, (err, repos) => {
        if (err) return console.log('error: ', err);
        console.log('repos: ', repos);

        getCommits(repos[0], (err, commits) => {
            if (err) return console.log('error: ', err);

            console.log(`commits for ${repos[0]}: `, commits);
        });
    });
});
console.log('End');

function getUser(id, callback) {
    if (!callback) return;
    setTimeout(() => {
        console.log('Loading user...');
        callback(null, { id: id, username: 'Mosh' });
    }, 2000);
}

function getRepositories(username, callback) {
    if (!callback) return;
    setTimeout(() => {
        console.log('Calling Github API...');
        callback(null, ['repo1', 'repo2', 'repo 3']);
    }, 2000);
}

function getCommits(repo, callback) {
    if (!callback) return;
    setTimeout(() => {
        console.log('Calling Github API...');
        callback(null, ['commit1']);
    }, 2000);
}

console.log('Begin');

console.log('Async calls started...');

getUser(1, displayUsers);

console.log('End');

function displayCommits(err, commits) {
    if (err) return console.log('error: ', err);
    console.log('commits: ', commits);
}

function displayRepositories(err, repos) {
    if (err) return console.log('error: ', err);
    console.log('repos: ', repos);

    getCommits(repos[0], displayCommits);
}

function displayUsers(err, user) {
    if (err) return console.log('error: ', err);
    console.log('user:', user);

    getRepositories(user.username, displayRepositories);
}

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

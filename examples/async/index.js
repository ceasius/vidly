console.log('Begin');

console.log('Async calls started...');
getUser(1)
    .then(user => {
        console.log('user:', user);
        return getRepositories();
    })
    .then(repos => {
        console.log('repos: ', repos);
        return getCommits(repos[0]);
    })
    .then(commits => {
        console.log('commits: ', commits);
        return;
    })
    .catch(err => console.log('error: ', err.message));

console.log('End');

function getUser(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Loading user...');
            resolve({ id: id, username: 'Mosh' });
        }, 2000);
    });
}

function getRepositories(username) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Calling Github API...');
            resolve(['repo1', 'repo2', 'repo 3']);
        }, 2000);
    });
}

function getCommits(repo) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Calling Github API...');
            resolve(['commit1']);
        }, 2000);
    });
}

function Playground() {
    const p = new Promise((resolve, reject) => {
        setTimeout(() => {
            //resolve(1);
            reject(new Error('My gravy is frozen'));
            //throw new Error('My toast is soggy');
            //throwing errors in an anonymous function will not be caught by Promise.catch
        });
    });

    p.then(result => console.log('result:', result)).catch(err =>
        console.log('error:', err.message)
    );
}

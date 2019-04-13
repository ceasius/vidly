console.log('Begin');

console.log('Async calls started...');
retrieveData();
console.log('End');

async function retrieveData() {
    try {
        const user = await getUser(1);
        console.log('user:', user);
        const repos = await getRepositories(user.username);
        console.log('repos: ', repos);
        const commits = await getCommits(repos[0]);
        console.log('commits: ', commits);
    } catch (err) {
        console.log('error: ', err.message);
    }
}

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

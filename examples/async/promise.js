console.log('Begin');

console.log('Async calls started...');
//getUser(1)
//    .then(user => {
//        console.log('user:', user);
//        return getRepositories(user.username);
//    })
//    .then(repos => {
//        console.log('repos: ', repos);
//        return getCommits(repos[0]);
//    })
//    .then(commits => {
//        console.log('commits: ', commits);
//        return;
//    })
//    .catch(err => console.log('error: ', err.message));
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

function runParallelPromises() {
    const p1 = new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Async Operation 1...');
            //reject();
            resolve(1);
        }, 2001);
    });
    const p2 = new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Async Operation 2...');
            //reject(new Error('Something went wrong'));
            resolve(2);
        }, 2000);
    });

    //Promise.all([p1, p2])
    Promise.race([p1, p2])
        .then(result => console.log(result))
        .catch(err => {
            if (err) console.log(err.message);
            else console.log('No error given');
        });
}

runParallelPromises();

function Playground() {
    const p = new Promise((resolve, reject) => {
        setTimeout(() => {
            //resolve(1);
            reject(new Error('My gravy is frozen'));
            //throw new Error('My toast is soggy');
            //throwing errors in an anonymous function will not be caught by Promise.catch
        });
    });
    p.then(result => console.log('promise result: ', result)).catch(err =>
        console.log('error: ', err.message)
    );
}

function Playground2() {
    const p = Promise.resolve({ id: 1 });
    p.then(result => console.log(result));

    const r = Promise.reject(new Error('err message'));
    r.catch(err => console.log(err.message));
}

const mongoose = require('mongoose');

mongoose
    .connect('mongodb://localhost/playground', { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
    name: String,
    bio: String,
    website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model(
    'Course',
    new mongoose.Schema({
        name: String,
        authors: { type: [authorSchema], required: true }
    })
);

async function createCourse(name, authors) {
    const course = new Course({
        name,
        authors
    });

    const result = await course.save();
    console.log(result);
}

async function listCourses() {
    const courses = await Course.find();
    console.log(courses);
}

async function updateAuthor(id) {
    const course = await Course.update(
        { _id: id },
        {
            $set: {
                'author.name': 'John Smith'
            }
        }
    );
    //const course = await Course.findById(id);
    //course.author.name = 'Mosh Hamedani';
    console.log(course);
}

async function addAuthor(id, author) {
    const course = await Course.findById(id);
    course.authors.push(author);
    course.save();
    console.log(course);
}

async function removeAuthor(id, authorId) {
    const course = await Course.findById(id);
    const author = course.authors.id(authorId);
    author.remove();
    await course.save();
    console.log(course);
}

//updateAuthor('5cb3977610f53452e4c04a9d');
//createCourse('Node Course', [
//    new Author({ name: 'Mosh' }),
//    new Author({ name: 'John' })
//]);
//addAuthor('5cb39eaab91b9c1dd0f7c2b7', new Author({ name: 'Skeet' }));

removeAuthor('5cb39eaab91b9c1dd0f7c2b7', '5cb39fb8658a8b284066c934');

const mongoose = require('mongoose');
const data = require('./data/import');

mongoose
    .connect('mongodb://localhost/playground', { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.log('Could not connect to MongoDB: ', err.message));

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    price: Number
});

const Course = new mongoose.model('Course', courseSchema);

//  comparison operators
//  eq (equal)
//  ne (not equal)
//  gt (greater than)
//  gte (greater than or equal to)
//  lt (less than)
//  lte (less than or equal to)
//  in (in search)
//  nin (not in)

//  logical operators
//  or
//  and

//createCourse();
//getCoursesCount();
//importCourses();
//updateCourse('5a68fde3f09ad7646ddec17e');
deleteCourse('5cb26a7a93b1ab1634b5079a');

async function importCourses() {
    data.map(item => {
        const course = new Course(item);
        course
            .save()
            .then(result => console.log('saved:', result))
            .catch(err => console.log(err.message));
    });
}

async function createCourse() {
    const course = new Course({
        name: 'Node.js Course',
        author: 'Mosh',
        tags: ['node', 'backend'],
        isPublished: true,
        price: 15
    });

    const result = await course.save();
    console.log('create: ', result);
}

async function getCourses() {
    const courses = await Course.find({ author: 'Mosh', isPublished: true })
        .limit(10)
        .sort({ name: 1 })
        .select({ name: 1, author: 1, tags: 1 });
    console.log('Loading Courses...');
    console.log(courses);
}

async function updateCourse(id) {
    // Query first approach
    try {
        const course = await Course.findById(id);
        if (!course) throw new Error('Course does not exist');
        //course.isPublished = false; //both methods are valid
        course.set({ isPublished: true });
        const saved = await course.save();
        console.log('updated:', saved);
    } catch (err) {
        console.log(err);
    }
}

async function deleteCourse(id) {
    //Course.deleteMany({isPublished:false});
    //const result = await Course.deleteOne({ _id: id }); //returns result details
    const course = await Course.findByIdAndRemove(id);
    console.log('removed', course);
}

async function updateCourseByQuery(id) {
    // Updade first approach
    try {
        //  Search MongoDB update operators
        //const result = await Course.update(
        //    { _id: id },
        //    { $set: { isPublished: true } }
        //);
        //  this returns the updated details
        const result = await Course.findByIdAndUpdate(
            id,
            {
                $set: {
                    isPublished: true,
                    author: 'Mosh'
                }
            },
            { new: true }
        ); //new will return the updated document instead of the original
        console.log('updated:', result);
    } catch (err) {
        console.log(err.message);
    }
}

async function getCoursesPrice() {
    const courses = await Course.find({
        price: { $gte: 10, $lte: 20 },
        author: { $in: ['Mosh', 'Josh'] }
    })
        .limit(10)
        .sort({ name: 1 })
        .select({ name: 1, author: 1, tags: 1 });
    console.log('Loading Courses...');
    console.log(courses);
}

async function getOtherCourses() {
    const courses = await Course.find({ author: 'Mosh', isPublished: true })
        .or([{ author: 'Mosh' }, { isPublished: true }])
        .limit(10)
        .sort({ name: 1 })
        .select({ name: 1, author: 1, tags: 1 });
    console.log('Loading Courses...');
    console.log(courses);
}

async function getRegexCourses() {
    const courses = await Course.find({ author: /.*Mosh.*/i }) //contains {string}
        //.find({ author: /^Mosh/ }) //starts with {string}
        //.find({ author: /Hamedani$/i }) //ends with {string}, (i) case insensitive
        .limit(10)
        .sort({ name: 1 })
        .select({ name: 1, author: 1, tags: 1 });
    console.log('Loading Courses...');
    console.log(courses);
}

async function getCoursesCount() {
    const courses = await Course.find({ author: 'Mosh', isPublished: true })
        .limit(10)
        .sort({ name: 1 })
        .count();
    console.log('Loading Courses...');
    console.log(courses);
}

async function getCoursesPagination() {
    const pageNumber = 1;
    const pageSize = 10;

    const courses = await Course.find({ author: 'Mosh', isPublished: true })
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize)
        .sort({ name: 1 })
        .select({ name: 1, author: 1, tags: 1 });
    console.log('Loading Courses...');
    console.log(courses);
}

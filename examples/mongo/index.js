const mongoose = require('mongoose');
const data = require('./data/import');

mongoose
    .connect('mongodb://localhost/playground', { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.log('Could not connect to MongoDB: ', err.message));

const courseSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 5, maxlength: 255 },
    author: { type: String, required: true },
    category: {
        type: String,
        enum: ['web', 'mobile', 'network'],
        lowercase: true,
        trim: true
    },
    tags: {
        type: Array,
        validate: {
            validator: function(v) {
                return new Promise(resolve => {
                    setTimeout(() => {
                        resolve(v && v.length > 0);
                    }, 500);
                });
            },
            message: 'A course should have at least one `tag`.'
        }
    },
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    price: {
        type: Number,
        min: 0,
        max: 500,
        required: function() {
            return this.isPublished;
        },
        get: v => Math.round(v),
        set: v => Math.round(v)
    }
});

//tags: {
//    type: Array,
//    Deprecated Callbacks
//    validate: {
//        isAsync: true,
//        validator: function(v, callback) {
//            setTimeout(() => {
//                callback(null, v && v.length > 0);
//            }, 500);
//        },
//        message: 'A course should have at least one `tag`.'
//    }
//    Sync Validation
//    type: [String],
//    validate: {
//        validator: function(v) {
//            return v && v.length > 0;
//        },
//        message: 'A course should have at least one `tag`.'
//    }
//}

const Course = new mongoose.model('Course', courseSchema);

validateCourse();

async function validateCourse() {
    const course = new Course({
        //name: 'Node.js Course',
        author: 'Mosh',
        //tags: ['node', 'backend'],
        isPublished: true
        //price: 15
    });
    try {
        //await course.validate(err => {
        //    if (err) console.log('callback:', err.message);
        //});
        await course.validate();
    } catch (err) {
        console.log('err result', err.message);
        for (field in err.errors) console.log(field, err.errors[field].message);
        //err.errors.forEach(item => console.log(item));
    }
}

async function createCourse() {
    const course = new Course({
        author: 'Mosh',
        tags: [],
        isPublished: true
    });
    try {
        const result = await course.save();
        console.log('create: ', result);
    } catch (err) {
        console.log('error ', err.message);
    }
}

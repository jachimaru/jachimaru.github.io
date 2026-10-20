const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose')
const Blog = require('./models/blog');

// espress app
const app = express();

// connect to mongoDB
const dbURI = 'mongodb+srv://jachimaru_db_user:CTiR1ghJzVf2OhP7@cluster0.rdvuds1.mongodb.net/node-tuts?appName=Cluster0'
mongoose.connect(dbURI)
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));

// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true})); //for accepting form data
app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.render('index', { title: 'Home'});
})

app.get('/blog', (req, res) => {
    Blog.find().sort({ createdAt: -1 })
        .then((result) => {
            res.render('blog', { title: 'Blogs', blogs: result })
        })
        .catch((err) => {
            console.log(err);
        })
})

app.get('/new-blog', (req, res) => {
    res.render('new-blog', { title: 'New Blog'});
})

app.post('/new-blog', (req, res) => {
    const blog = new Blog(req.body);

    blog.save()
        .then((result) => {
            res.redirect('/new-blog');
        })
        .catch((err) => {
            console.log(err);
        });
})

app.get('/projects', (req, res) => {
    res.render('projects', { title: 'Projects'});
})

app.get('/:id', (req, res) => {
    const id = req.params.id;
    const title = req.params.title;
    Blog.findById(id)
        .then((result) => {
            res.render('post', { blog: result, title: `${title}` })
        })
        .catch((err) => {
            console.log(err);
        });
})

// app.get('/blogs', (req, res) => {
//     Blog.find().sort({ createdAt: -1 })
//         .then((result) => {
//             res.render('blogs', { title: 'All Blogs', blogs: result })
//         })
//         .catch((err) => {
//             console.log(err);
//         })
// })

// app.post('/blogs', (req, res) => {
//     const blog = new Blog(req.body);

//     blog.save()
//         .then((result) => {
//             res.redirect('/blogs');
//         })
//         .catch((err) => {
//             console.log(err);
//         });
// })

// app.get('/blogs/:id', (req, res) => {
//     const id = req.params.id;
//     Blog.findById(id)
//         .then((result) => {
//             res.render('details', { blog: result, title: 'Blog Details' })
//         })
//         .catch((err) => {
//             console.log(err);
//         });
// })

// app.delete('/blogs/:id', (req, res) => {
//     const id = req.params.id;

//     Blog.findByIdAndDelete(id)
//         .then(result => {
//             res.json({ redirect: '/blogs' })
//         })
//         .catch(err => console.log(err))
// })

// app.get('/blogs/create', (req, res) => {
//     res.render('create', { title: 'Create a new Blog' });
// })

// 404 page - Always below all other pages
app.use((req, res) => {
    res.status(404).render('404', { title: '404'});
})
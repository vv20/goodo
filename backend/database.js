var Sequelize = require("sequelize");
var fs = require("fs");
var db;
const dev = false;

var User;
var Project;
var Tag;
var Flashcard;
var Link;

function read_credentials() {
    return new Promise((resolve, reject) => {
        fs.readFile("db_credentials.json", (err, data) => {
            if (err) reject(err);
            resolve(data);
        });
    });
}

function set_up_db(db_credentials) {
    db_data = JSON.parse(db_credentials);
    username = db_data.username;
    password = db_data.password;
    host = db_data.host;
    db_name = db_data.db_name;
    return new Promise((resolve, reject) => {
        db = new Sequelize(db_name, username, password, {
            host: host,
            dialect: "mysql"
        });
        resolve(db);
    });
}

function test_connection(db) {
    return new Promise((resolve, reject) => {
        db.authenticate()
            .then(() => {
                console.log("Established database connection");
                resolve(db);
            }).catch((err) => {
                console.error("Error in database connection: ", err);
                reject(err);
            });
    });
}

function define_model(db) {
    // define user
    User = db.define("user", {
        username: {
            type: Sequelize.STRING, 
            primaryKey: true
        },
        password: Sequelize.STRING
    });

    // define project
    Project = db.define("project", {
        project_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        project_name: Sequelize.STRING,
        playlist_id: Sequelize.STRING,
        username: {
            type: Sequelize.STRING,
            references: {
                model: User,
                key: "username"
            }
        }
    });

    // define tag
    Tag = db.define("tag", {
        tag_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        tag_name: Sequelize.STRING,
        project_id: {
            type: Sequelize.INTEGER,
            references: {
                model: Project,
                key: "project_id"
            }
        }
    });

    // define flashcard
    Flashcard = db.define("flashcard", {
        flashcard_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        flashcard_title: Sequelize.TEXT,
        flashcard_content: Sequelize.TEXT,
        project_id: {
            type: Sequelize.INTEGER,
            references: {
                model: Project,
                key: "project_id"
            }
        }
    });

    // define link
    Link = db.define("link", {});
    Flashcard.belongsToMany(Tag, {through: Link});
    Tag.belongsToMany(Flashcard, {through: Link});
    return db.sync({force:dev})

}

read_credentials()
    .then(set_up_db, console.error)
    .then(test_connection, console.error)
    .then(define_model, console.error);

exports.getAll = function() {
    promises = [];
    promises.push(Project.findAll());
    promises.push(Tag.findAll());
    promises.push(Flashcard.findAll());
    return Promise.all(promises);
}

exports.getAllProjects = function(username) {
    return Project.findAll({
        where: {
            username: username
        }
    });
}

exports.getProject = function(pid) {
    return Project.find({
        where: {
            project_id: parseInt(pid)
        }
    });
}

exports.getAllTags = function(pid) {
    return Tag.findAll({
        where: {
            project_id: parseInt(pid)
        }
    });
}

exports.getTag = function(pid, tid) {
    return Tag.find({
        where: {
            project_id: parseInt(pid),
            tag_id: parseInt(tid)
        }
    });
}

exports.getFlashcardsByTag = function(tid) {
    return Link.findAll({
        where: {
            tagTagId: parseInt(tid)
        }
    }).then((links) => {
        promises = [];
        for (var i = 0; i < links.length; i++) {
            var link = links[i];
            promises.push(Flashcard.find({
                where: {
                    flashcard_id: link.dataValues.flashcardFlashcardId
                }
            }));
        }
        return Promise.all(promises);
    });
}

exports.getFlashcard = function(pid, fid) {
    return Flashcard.find({
        where: {
            project_id: parseInt(pid),
            flashcard_id: parseInt(fid)
        }
    });
}

exports.gatAllFlashcards = function(pid) {
    return Flashcard.findAll({
        where: {
            project_id: parseInt(pid)
        }
    });
}

exports.makeProject = function(username, name) {
    return Project.findOrCreate({
        where: {project_name: name},
        defaults: {
            project_name:name,
            username: username,
            playlist_id: null
        }
    });
}

exports.makeTag = function(pid, name) {
    return Tag.findOrCreate({
        where: {
            project_id: parseInt(pid),
            tag_name: name
        }
    });
}

exports.makeFlashcard = function(pid, title, content) {
    return Flashcard.findOrCreate({
        where: {
            project_id: parseInt(pid),
            flashcard_title: title,
            flashcard_content: content
        }
    });
}

exports.linkFlashcardToTag = function(tid, fid) {
    return Link.findOrCreate({
        where: {
            tagTagId: parseInt(tid),
            flashcardFlashcardId: parseInt(fid)
        }
    });
}

exports.linkProjectToPlaylist = function(pid, playlist_id) {
    return Project.find({
        where: {
            project_id: parseInt(pid)
        }
    }).then((project) => {
        project.update({
            playlist_id: playlist_id
        });
    });
}

exports.signup = function (username, password) {
    return User.create({
        username: username,
        password: password
    })
}

exports.getUser  = function (username) {
    return User.findById(username);
}

var Sequelize = require("sequelize");
var fs = require("fs");
var db;
const dev = true;

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
            type: Sequelize.STRING, 
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
            type: Sequelize.STRING, 
            primaryKey: true,
            autoIncrement: true
        },
        tag_name: Sequelize.STRING,
        project_id: {
            type: Sequelize.STRING,
            references: {
                model: Project,
                key: "project_id"
            }
        }
    });

    // define flashcard
    Flashcard = db.define("flashcard", {
        flashcard_id: {
            type: Sequelize.STRING, 
            primaryKey: true,
            autoIncrement: true
        },
        flashcard_title: Sequelize.TEXT,
        flashcard_content: Sequelize.TEXT,
        project_id: {
            type: Sequelize.STRING,
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
            project_id: pid
        }
    });
}

exports.getAllTags = function(pid) {
    return Tag.findAll({
        where: {
            project_id: pid
        }
    });
}

exports.getTag = function(pid, tid) {
    return Tag.find({
        where: {
            project_id: pid,
            tag_id: tid
        }
    });
}

exports.getFlashcardsByTag = function(tid) {
    Link.findAll({
        where: {
            tag_id: tid
        }
    }).then((links) => {
        promises = [];
        for (link in links) {
            promises.push(Flashcard.find({
                where: {
                    flashcard_id: link.flashcard_id
                }
            }));
        }
        return Promise.all(promises);
    });
}

exports.getFlashcard = function(pid, fid) {
    return Flashcard.find({
        where: {
            project_id: pid,
            flashcard_id: fid
        }
    });
}

exports.makeProject = function(name) {
    Project.findOrCreate({
        where: {project_name: name},
        defaults: {
            project_name:name,
            playlist_id: null
        }
    });
}

exports.makeTag = function(pid, name) {
    Tag.findOrCreate({
        where: {
            project_id: pid,
            tag_name: name
        }
    });
}

exports.makeFlashcard = function(pid, title, content) {
    Flashcard.findOrCreate({
        where: {
            project_id: pid,
            title: title,
            content: content
        }
    });
}

exports.linkFlashcardToTag = function(tid, fid) {
    Link.findOrCreate({
        where: {
            tag_id: tid,
            flashcard_id: fid
        }
    });
}

exports.linkProjectToPlaylist = function(pid, playlist_id) {
    Project.find({
        where: {
            project_id: pid
        }
    }).then((project) => {
        project.update({
            playlist_id: playlist_id
        });
    });
}

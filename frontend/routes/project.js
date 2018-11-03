var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/:id', function (req, res, next) {
    return Promise.all([
        getOptions(),
        getGraph(req.params.id)
    ]).then(value => {
        const options = value[0];
        const data = value[1];
        console.log(JSON.stringify(value));
        res.render('projectPage', {
            title: 'Project',
            id: req.params.id,
            options: JSON.stringify(options),
            data: JSON.stringify(data)
        });
    });
});

const getGraph = (pid) => {
    return Promise.all([
        getTagList(pid),
        getFlashCardList(pid)
    ]).then(Ids => {

        const tagIds = Ids[0];
        const flashcardIds = Ids[1];

        return Promise.all([
            getProjectInfo(pid),
            Promise.all(tagIds.map(getTagInfo)),
            Promise.all(flashcardIds.map(getFlashCardInfo))
        ]).then(projectTagsFlashcards => {
            const project = projectTagsFlashcards[0];
            const tagList = projectTagsFlashcards[1];
            const flashcardList = projectTagsFlashcards[2];

            const nodes = [];
            nodes.push({
                id: `project${project.id}`,
                label: project.name,
                color: '#7D8491',
                margin: 20,
                font: {size: 12, color: '#EAF0CE', face: 'arial'}
            });

            tagList
                .map(tag => {
                    return {
                        id: `tag${tag.id}`,
                        label: tag.name,
                        color: '#C0C5C1',
                        margin: 20,
                        font: {size: 12, color: '#574B60', face: 'arial'}
                    };
                })
                .forEach(e => nodes.push(e));
            flashcardList
                .map(flashcard => {
                    return {
                        id: `flashcard${flashcard.id}`,
                        label: `${flashcard.title}\n${flashcard.content}`,
                        color: '#3F334D',
                        margin: 20,
                        font: {size: 12, color: '#EAF0CE', face: 'arial'}
                    };
                })
                .forEach(e => nodes.push(e));
            return (nodes);
        });


    });
};

const getProjectInfo = (pid) => {
    return Promise.resolve({name: "test name", id: pid});
};

const getTagList = (pid) => {
    return Promise.resolve(["t1", "t2"]);
};

const getTagInfo = (tid) => {
    return Promise.resolve({name: `test tag ${tid}`, id: tid})
};

const getFlashCardList = (pid) => {
    return Promise.resolve(["f1", "f2"]);
};

const getFlashCardInfo = (fid) => {
    return Promise.resolve({id: fid, title: `title ${fid}`, content: `content ${fid}`});
};
const getOptions = () => {
    return Promise.resolve({
        autoResize: true,
        height: '100%',
        width: '100%',
        locale: 'en',
        clickToUse: false,
        nodes: {
            shape: 'box'
        }
    });
};
module.exports = router;

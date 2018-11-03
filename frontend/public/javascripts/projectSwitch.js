window.onload = () => {
    document.getElementById("switchbtn").onclick = () => {
        let path = window.location.pathname.split('/');
        if (path[path.length - 2] === "list") {
            window.location = "/project/visual/map/" + path[path.length - 1]
        } else {
            window.location = "/project/visual/list/" + path[path.length - 1]
        }
    }
};
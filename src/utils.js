function createList(content){
    const ul = createNode('ul');
    content.map(elm => {
        const li = createNode('li');
        let title = createElm('h4', elm.title);
        let info = createElm('p', elm.text);
        append(li, [title, info]);
        append(ul, li);
    })
    return ul
}

function createElm(nodeType, content) {
    let textNode = document.createTextNode(content);
    let node = createNode(nodeType);
    append(node, textNode);
    return node;
}

function createNode(node){
    return document.createElement(node)
}

function append(parent, children){
    if(Array.isArray(children)){
        return children.forEach(child => {
            parent.appendChild(child);
        }); 
    }
    return parent.appendChild(children);
}

function remove(parent, children){
    if(Array.isArray(children)){
        return children.forEach(child => {
            parent.removeChild(child);
        }); 
    }
    return parent.removeChild(children);
}

function firstUpperCase(string){
    return string.charAt(0).toUpperCase() + string.slice(1);
}

module.exports = {createNode, append, remove, firstUpperCase, createElm, createList};
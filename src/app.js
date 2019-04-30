import "./styles/style.scss"
import "regenerator-runtime"

//Utils
import utils from "./utils";

const url = 'https://randomuser.me/api/?results=100';

const main = document.querySelector('main');

let isloading = true;

let loading = utils.createElm('h2', 'loading...');
utils.append(main, loading);

async function getUsers(){
    fetch(url)
    .then(res => res.json())
    .then(json => {
        isloading = false;
        populateUsers(json.results);
    })
    .catch(() => {
        utils.remove(main, loading);
        let error = utils.createElm('h2', 'No users where found');
        utils.append(main, error);
    })
}

function populateUsers(users){
    if(!isloading){
        utils.remove(main, loading);
        users.map(user => {
            createUser(user);
        });
    }
}

function createUser(user){
    //User info
    let name = `${utils.firstUpperCase(user.name.first)} ${utils.firstUpperCase(user.name.last)}`;
    let thumbnailSrc = user.picture.thumbnail;
    let gender = user.gender;
    let contactInfo = [
        {
            title: 'Phone Nr.:',
            text: user.phone
        }, 
        {
            title: 'Email:',
            text: user.email
        }
    ];

    //DOM Elements
    const article = utils.createNode('article');
    article.setAttribute('class', 'user');
    const header = utils.createNode('header');
    const footer = utils.createNode('footer');

    //Name
    let nameNode = utils.createElm('h2', name);

    //Gender
    let genderNode = utils.createElm('i', gender);
    genderNode.setAttribute('class', 'desktop');

    //ContactInfo
    let contactList = utils.createList(contactInfo);
    contactList.setAttribute('class', 'desktop');

    //Thumbnail
    const img = utils.createNode('img');
    img.setAttribute('src', thumbnailSrc); 

    utils.append(main, article);
    utils.append(article, [header, footer]);
    utils.append(header, [img, nameNode, genderNode]);
    utils.append(footer, contactList);

    header.onclick = function(e){
        e.preventDefault();
        showMore(user);
    }
    
}

function showMore(user){
    //User info
    let name = `${utils.firstUpperCase(user.name.first)} ${utils.firstUpperCase(user.name.last)}`;
    let medImageSrc = user.picture.medium;
    let gender = user.gender;
    let username = `Username: ${user.login.username}`;
    let address = `${user.location.street}, ${user.location.postcode} ${user.location.city}`;
    let timezone = `UTC ${user.location.timezone.offset}, ${user.location.timezone.description}`;
    let contactInfo = [
        {
            title: 'Phone Nr.:',
            text: user.phone
        }, 
        {
            title: 'Email:',
            text: user.email
        }, 
        {
            title: 'Adress:',
            text: address
        }, 
        {
            title: 'Timezone',
            text: timezone
        }
    ];

    //DOM Elements
    const userDetails = utils.createNode('div');
    userDetails.setAttribute('class', 'show');
    const header = utils.createNode('header');
    const overlay = utils.createNode('div');
    overlay.setAttribute('id', 'overlay');
    const exit = utils.createElm('span', 'X');
    exit.setAttribute('id', 'exit');

    //Name 
    let nameNode = utils.createElm('h2', name);

    //Username
    let usernameNode = utils.createElm('h3', username)

    //Gender
    let genderNode = utils.createElm('i', gender);

    //Image
    const img = utils.createNode('img');
    img.setAttribute('src', medImageSrc);

    //Contact Info
    const contactInfoNode = utils.createList(contactInfo);

    utils.append(header, [img, nameNode, usernameNode, genderNode]);
    utils.append(userDetails, [header, exit, contactInfoNode]);
    utils.append(main, [userDetails, overlay]);

    //Remove extra content again
    overlay.onclick = remove;
    exit.onclick = remove;
    function remove(){
        utils.remove(main, [userDetails, overlay]);
    }
}

getUsers();

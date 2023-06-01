
let mainProfile = document.querySelector("#main-profile")

// getIdOnWindow on page

    const urlPrams = new URLSearchParams(window.location.search)
    const  idPost = urlPrams.get("userId")
// Dashboard user
function Dashboard(idPosts){
    // console.log(getIdOnWindow())
    // const idId =2
    axios.get(`https://tarmeezacademy.com/api/v1/users/${idPost}`)
    .then(response=>{
        // console.log(response.data.data)

    document.querySelector('#image-profile').src = response.data.data.profile_image
    document.querySelector('#name-email').innerHTML= response.data.data.email
    document.querySelector('#name').innerHTML= response.data.data.username
    document.querySelector('#name-user').innerHTML= response.data.data.name
    document.querySelector('.box-post #counter-post').innerHTML = response.data.data.posts_count
    document.querySelector('.box-comments #counter-commetns').innerHTML = response.data.data.comments_count
    document.querySelector('.name-user-profile').innerHTML= `${response.data.data.username}’s`
    })
}
Dashboard()








function postApii() {
    axios.get(`https://tarmeezacademy.com/api/v1/users/${idPost}/posts`)
    
    .then(function (response) {
        let data = response.data.data;
        console.log(data)
            mainProfile.innerHTML = ''
        for (start of data) {
        let profile_image = start.author.profile_image;
        let userName = start.author.username;
        let image = start.image;
        let time = start.created_at
        let title = start.title
        let post = start.body
        let comments_count = start.comments_count
        let id = start.id
        // console.log(id)
        // let tags = start.tags
        // for(tag of tags){
        //     console.log(tag)
        // }
            // show button edit or hidden and show button delate or hidden
            let user = getCurrentUser()
            let isMyPost = user !== null && user.id == start.author.id
            let editButton = ``
            let delateButton = ``
            // console.log(user)
            if(isMyPost){
                editButton =  `<button class="edit" onclick="popupEditPost('${encodeURIComponent(JSON.stringify(start))}')">edit</button>`
                delateButton = `<button id="delate-post" onclick="popupDelate('${id}')">Delate</button>`
            }else{
                editButton = ``
                delateButton = ``
            }

        let allPost = `
        <div class = "container">
        <div class="content-box" style="cursor: pointer;" >
        <div class="nav">
                    <div class="class_one" onclick="open_page_profile()">
                        <img  id="image-photo" src="${profile_image}" alt="">
                        <span id="userName"> ${userName}</span>
                    </div>
                    <div class="class_2">
                    <! --  1الكود عشان يحول الاوبجيطت من ال html 1 الي javeScrip 2 -->
                    <! --  عشان html مبتفهمش يعني Object-->
                    <! --   واوعي تنسي ال علامه دي ط '' ط- >
                    <!-- button Edit-->
                    ${editButton}
                    <!-- button delate-->
                    ${delateButton}
                    </div>
                </div>
        <div class="image" onclick="openPage_two(${id})">
            <img src="${image}" alt="">
            <div class="caption">
            <p> <span class="time">${time}</span></p>
                <h2>${title || ""}</h2>
                <p>${post}</p>
                <hr>
            </div>
            <div class="comments" >
                <i></i>
                <p><span>(${comments_count }) </span>Comments</p>
                <span id="post-tags">  <button style="color: white; border-radius: 50px;background-color: #607D8B;"> Police</button> </span>
            </div>
        </div>
    </div>
    </div>
        `
        // console.log(start)
        mainProfile.innerHTML += allPost
        // 

        }
    });
    }

    postApii();



//     //
    
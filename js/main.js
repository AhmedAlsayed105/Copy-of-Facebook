// // get all post on Api
let ProfilePhoto = document.querySelector("#image-photo");
let User = document.querySelector("#userName");
let mainPage = document.querySelector(".main-page_one");
let overly = document.querySelector('.overly')
let overlyTwo = document.querySelector('.overly-two')
let overlyThree = document.querySelector('.overly-three')
let overlyFour = document.querySelector('.overly-four')
let overlyFive = document.querySelector('.overly-five')
let showPhoto = document.querySelector('.show-photo')
let showPhoto_img = document.querySelector('.show-photo img')
let showPhoto_h3 = document.querySelector('.show-photo h4')
let Button_create_post = document.querySelector('#create-post')
let Button_edit_post = document.querySelector('#edit')

    // console.log(user_name_two_mainPage_two)
// When you reach the end of the page, show more posts
let currentPage = 1
let lastPage = 1 
window.addEventListener("scroll", ()=>{
            const endOfPage = Math.ceil(window.innerHeight ) + Math.ceil(window.pageYOffset) >= document.body.offsetHeight;
            // console.log(window.innerHeight, window.pageYOffset,document.body.offsetHeight)
            if(endOfPage && currentPage < lastPage){
            postApi(false,currentPage + 1)
            currentPage++
            console.log(endOfPage ,currentPage, lastPage)
        }
});



    function postApi(reload = true,page = 1  ) {
        toggleLoader(true)
    axios.get(`http://tarmeezacademy.com/api/v1/posts?limit=10&page=${page}`, {})
    .then(function (response) {
        toggleLoader(false)

        let data = response.data.data;
        lastPage = response.data.meta.last_page
        if(reload){
        mainPage.innerHTML = ''
        }
        for (start of data) {
        let profile_image = start.author.profile_image;
        let userName = start.author.username;
        let image = start.image;
        let time = start.created_at
        let title = start.title
        let post = start.body
        let comments_count = start.comments_count
        let id = start.id
        let idAuthor = start.author.id

        // console.log(idAuthor)
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
                    <div class="class_one" onclick="open_page_profile(${idAuthor})">
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
        mainPage.innerHTML += allPost
        // 

        }
    });
    }

    postApi();

    //Start popup login
    function popupLogin(){
    let close = document.querySelectorAll('#close') 

    let login = document.querySelector('#login')
    let overly = document.querySelector('.overly')
    //   
    // addEventListener click on login main
    login.addEventListener('click',(e)=>{
        // open overly
        overly.style.display = 'block'
        //loop all button close
        close.forEach(but =>{
        but.addEventListener('click',(d)=>{
        overly.style.display = 'none'
        })
        })
    });
    }
    popupLogin()
    //End popup login 
    //Start popup register
    function popupRegister(){
    let register = document.querySelector('#register')
    let overlyTwo = document.querySelector('.overly-two')
    let close = document.querySelectorAll('#close') 

    // addEventListener click on login main
    register.addEventListener('click',(e)=>{
        // open overly
        overlyTwo.style.display = 'block'
        //loop all button close
        close.forEach(but =>{
        but.addEventListener('click',(d)=>{
            overlyTwo.style.display = 'none'
        })
        })
    });
    }
    popupRegister()
    //End popup register 

    // start register Api add User to Page
    function registerAPi(){
    const userName = document.querySelector('.userName_Two').value
    const Name = document.querySelector('#Name').value
    const Password = document.querySelector('.password').value
    const Image = document.querySelector('.Image_user').files[0]

    const Form_data = new FormData()
    Form_data.append("username",userName)
    Form_data.append("name",Name)
    Form_data.append("password",Password)
    Form_data.append("image",Image)

    axios.post('https://tarmeezacademy.com/api/v1/register',Form_data)
    .then(response =>{
        console.log(response.data.user)
        localStorage.setItem('token',response.data.token)
        localStorage.setItem('User',JSON.stringify(response.data.user))
        overlyTwo.style.display = 'none'
        // turn on function
        navUi() 
        // turn on function Massage alert on login
    let alertH2 = document.querySelector('.alert-massage h2') 
        alertH2.style.display = 'block'
        alertMassage('New User Registered Successfully')
        setTimeout(()=>{
        alertH2.style.display = 'none'
        alertH2.innerHTML = ''
        },3000)
    //   
    }).catch(error =>{
        error.response.data.message
    // turn on function Massage alert on login
    let alertH2 = document.querySelector('.alert-massage h2') 
    alertH2.style = ' z-index:1000 ;display:block;'
    alertMassage(error.response.data.message)
    setTimeout(()=>{
    alertH2.style.display = 'none'
    alertH2.innerHTML = ''
    },3000)
    })
    }
    registerAPi()
    // End register Api add User to Page

    // on click button add user to page
    function clickButtonOpenLoginApi(){
    let userName = document.querySelector('.userName').value
    let password = document.querySelector('#password').value
    const params =  {
        "username" : userName,
        "password" : password
    }
    axios.post('https://tarmeezacademy.com/api/v1/login',params)
    .then(response =>{
        localStorage.setItem('token',response.data.token)
        localStorage.setItem('User',JSON.stringify(response.data.user))
        // localStorage.setItem('name',response.data.user.name)
        overly.style.display = 'none'
        // console.log(response.data.user.name)

        //  check nav bar is localStorage  is token Empty or no  
        navUi() 
        // turn on function Massage alert on login
    let alertH2 = document.querySelector('.alert-massage h2') 
        alertH2.style.display = 'block'
        alertMassage('Nice, You have been successfully logged in!')
        setTimeout(()=>{
        alertH2.style.display = 'none'
        alertH2.innerHTML = ''
        },3000)
    }).catch(error =>{
        alert(error)
    })
    }
    function alertMassage(massage){
    let alertH2 = document.querySelector('.alert-massage h2') 
    let massageAlert = document.createTextNode(massage) 
    alertH2.append(massageAlert)
    }
    alertMassage('')
    //check local storage is full 
    //  check nav bar is localStorage  is token Empty or no 
    function navUi(){
    const login = document.querySelector('#login')
    const Register = document.querySelector('#register')
    const logout = document.querySelector('#Logout')
    if(localStorage.getItem('token') == null){
    login.style.display = 'block'
    Register.style.display = 'block'
    logout.style.display = 'none'
    Button_create_post.style.display = 'none'
    showPhoto.style.display = 'none'

    }else{
        // for Logged in User
    login.style.display = "none"
    Register.style.display = "none"
    logout.style.display = 'block'
    Button_create_post.style.display = 'block'
    showPhoto.style.display = 'flex'
    //ToDo
    // show userName and photoUser
    const user = getCurrentUser()
        // console.log(user)
    showPhoto_h3.textContent = user.username
    showPhoto_img.src = user.profile_image 
    }
    }
    navUi()
    // click on logout Cancel login
    function logout(){
    localStorage.removeItem('token')
    localStorage.removeItem('User')
    localStorage.removeItem('name')
    localStorage.removeItem('Image_user')
        // turn on function Massage alert on logout
    let alertH2 = document.querySelector('.alert-massage h2') 
    alertH2.style = 'display:block; background-color:red !important;'
    alertMassage(' You have been successfully logged out!')
    setTimeout(()=>{
    alertH2.style.display = 'none'
    alertH2.innerHTML = ''
    },3000)
    //turn on function 
    navUi()
    }
    // function popupCreatePost
    function popupCreatePost(){
    let create_post = document.querySelector('#create-post')
    let overlyThree = document.querySelector('.overly-three')
    let close = document.querySelectorAll('#close') 

    // addEventListener click on login main
    create_post.addEventListener('click',(e)=>{
        // open overly
        overlyThree.style.display = 'block'
        //loop all button close
        close.forEach(but =>{
        but.addEventListener('click',(d)=>{
            overlyThree.style.display = 'none'
        })
        })
    });
    }
    // function Create A New Post
    function createPostApi(){
        // انا عملت متغير مشترك بين ال بوباب بتاع كريت بوست والايديت بوست تمام والايديت باعت في الاادي اما الكريت الفاليو بتاعو مخليه ترو 
    let postId = document.querySelector('#post-id-input').value
    let isCreate = postId == "true" || postId == true

    let title = document.querySelector('.post-title').value
    let body = document.querySelector('.post-body').value
    let image = document.querySelector('#post-image-createPost').files[0]
    let token = localStorage.getItem("token")

    let formData = new FormData()
    formData.append('title',title)
    formData.append('body',body)
    formData.append('image',image)

    let head = {
    "Authorization" : `Bearer ${token}`
    }
    if(isCreate){
        axios.post('https://tarmeezacademy.com/api/v1/posts',formData, {
            headers : head
            })
            //
            // return
            .then(response =>{
                console.log(response)
                let overlyThree = document.querySelector('.overly-three')
                overlyThree.style.display = 'none '
                        // turn on function Massage alert on anew Create Post
                        let alertH2 = document.querySelector('.alert-massage h2') 
                        alertH2.style = 'display:block; background-color:#23d349 !important;'
                        alertMassage(' You have been successfully Create Post!')
                        setTimeout(()=>{
                            alertH2.style.display = 'none'
                        alertH2.innerHTML = ''
                        },3000)
                // return function postApi 
                postApi()
                }).catch(error =>{
                console.log(error.response.data.message)
                overlyThree.style.display = 'none'
                let alertH2 = document.querySelector('.alert-massage h2') 
                alertH2.style = 'display:block; background-color:red !important;'
                alertMassage(error.response.data.message)
                setTimeout(()=>{
                alertH2.style.display = 'none'
                alertH2.innerHTML = ''
                },5000)
                })
    }else{
        
            let title_2 = document.querySelector('#post-title_2').value
            let body_2 = document.querySelector('#post-body_2').value
            let image_2 = document.querySelector('#post-image-createPost_2').files[0]
            let formData2 = new FormData()
            formData2.append('title',title_2)
            formData2.append('body',body_2)
            formData.append('image',image_2)
            formData2.append('_method',"put")

        axios.post(`https://tarmeezacademy.com/api/v1/posts/${postId}`,formData2, {
            headers : head
            })
            .then(response =>{
                console.log(response)
                let overlyFour = document.querySelector('.overly-four')
                overlyFour.style.display = 'none'
                        // turn on function Massage alert on anew Create Post
                        let alertH2 = document.querySelector('.alert-massage h2') 
                        alertH2.style = 'display:block; background-color:#23d349 !important;'
                        alertMassage(' You have been successfully Edit Post!')
                        setTimeout(()=>{
                            alertH2.style.display = 'none'
                        alertH2.innerHTML = ''
                        },3000)
                // return function postApi 
                postApi()
                }).catch(error =>{
                overlyFour.style.display = 'none'
                console.log(error.response.data.error_message)
                let alertH2 = document.querySelector('.alert-massage h2') 
                alertH2.style = 'display:block; background-color:red !important;'
                alertMassage(error.response.data.error_message)
                setTimeout(()=>{
                alertH2.style.display = 'none'
                alertH2.innerHTML = ''
                },5000)
                })
    }
    }
// get current User on localStorage 
  function getCurrentUser(){
    let user = null
    let storage = localStorage.getItem('User')
    if(storage !== null){
        user = JSON.parse(storage)
    }
    return user
}
//open page two
function openPage_two(postId){
    window.location = `postDetails.html?postId=${postId}`
    console.log(id)
}
// function popupCreatePost
    function popupEditPost(posts){
    const allPost = JSON.parse(decodeURIComponent(posts))
    console.log(allPost)
        document.querySelector("#post-id-input").value = allPost.id
        document.querySelector("#post-title_2").value = allPost.title
        document.querySelector("#post-body_2").value = allPost.body
    // EditPostApi(allPost.id)
        let Button_edit_post = document.querySelectorAll('.edit')
        let overlyFour = document.querySelector('.overly-four')
        let close = document.querySelectorAll('#close') 

        // loop all button edit 
        Button_edit_post.forEach(button =>{
           // addEventListener click on login main
        //    conaole.log(img)
        button.addEventListener('click',(e)=>{
            // open overly
            overlyFour.style.display = 'block'
            //loop all button close
            close.forEach(but =>{
            but.addEventListener('click',(d)=>{
                overlyFour.style.display = 'none'
            })
            })
        })
        })
        }
function popupDelate(id){

    document.querySelector('#id-delate').value = id
    let delateButton = document.querySelectorAll('#delate-post')
    let overlyFive = document.querySelector('.overly-five')
    let close = document.querySelectorAll('#close') 


    delateButton.forEach(but =>{
        but.addEventListener('click',(e)=>{
    //     // open overly
            overlyFive.style.display = 'block'
    //     //loop all button close
            close.forEach(but =>{
                but.addEventListener('click',(d)=>{
                    overlyFive.style.display = 'none'
                    })
                })
            })
        })
    }
                    
       //Function delatePost
    function delatePostApi(){
        // دي انا عامل انبوت مخفي وباعت في الايدي بتاع البوستات كلها وبستدعي هنا عشان اعرف اجب البوست الانا عيزو 
        let id = document.querySelector('#id-delate').value
        // console.log(id)
        let token = localStorage.getItem("token")
        let head = {
            "Authorization" : `Bearer ${token}`
        }
                axios.delete(`https://tarmeezacademy.com/api/v1/posts/${id}`,{
                    headers : head
                })
                .then(response =>{
                console.log(response)
                overlyFive.style.display = 'none'
                let alertH2 = document.querySelector('.alert-massage h2') 
                alertH2.style = 'display:block; background-color:red !important;'
                alertMassage('The post was deleted successfully')
                setTimeout(()=>{
                alertH2.style.display = 'none'
                alertH2.innerHTML = ''
                },5000)
                postApi()
        })
    }

    //function open_page_profile 
    function open_page_profile(id){
        //id author post
        window.location = `profile.html?userId=${id}`
        // alert(id)
    }
// click button Profile
function profileClicked(){
    // user on login
    const user = getCurrentUser()
    // alert(user.id)
    window.location = `profile.html?userId=${user.id}`

}
// function Loading toggleLoader

function toggleLoader(show = true){
    if(show){
        document.querySelector(".loading").style.visibility = 'visible'
    }else{
        document.querySelector(".loading").style.visibility = 'hidden'

    }
}
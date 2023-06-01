const user_name_two_mainPage_two = document.querySelector('#user_name_two')
let mainPage_two = document.querySelector('.main-page_two')

const urlPrams = new URLSearchParams(window.location.search)
const id = urlPrams.get("postId")

function showPostDetails(){
    // const urlPrams = new URLSearchParams(window.location.search)
    // const id = urlPrams.get("postId")
    // console.log(id)
    axios.get(`https://tarmeezacademy.com/api/v1/posts/${id}`)
    .then(response=>{
        let data = response.data.data;
        mainPage_two.innerHTML =""
            let profile_image = data.author.profile_image;
            let userName = data.author.username;
            let image = data.image;
            let time = data.created_at
            let title = data.title
            let post = data.body
            let comments_count = data.comments_count
            let comments= data.comments
            user_name_two_mainPage_two.innerHTML = userName
            // console.log(comments)
            // console.log(data)

        let getComment = ''
        for( comment of comments){
            getComment += `
            <div class="all-comments">
            <div class="user_comment">
                <img src="${comment.author.profile_image}" alt="">
                <h3> ${comment.author.username} </h3>
            </div>
            <p>${comment.body}</p>
            
        </div>
            `
        }

            let allPost = `
            
            <div class = "container">
            <div class="content-box" >
            <div class="nav">
                <img  id="image-photo" src="${profile_image}" alt="">
                <span id="userName"> ${userName}</span>
            </div>
            <div class="image">
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
            <div class="all-comments">
                ${getComment}
                <div class="creat-comment">
                <input type="text" id="addComment" placeholder="add your comment here..">
                <button type="submit" onclick="sendCommentApi()">send</button>
            </div>        
            </div>
        </div>
        </div>
        
            `
            mainPage_two.innerHTML += allPost
    })
}
showPostDetails()

// send comment
function sendCommentApi(){
    const inputComment = document.querySelector("#addComment").value
    console.log(inputComment)
    const params = {
        "body": inputComment
    }
    let token = localStorage.getItem("token")
    // let head = {
    //     "Authorization" : `Bearer ${token}`
    //     }
    axios.post(`https://tarmeezacademy.com/api/v1/posts/${id}/comments`,params,{
        headers :{
            "Authorization" : `Bearer ${token}`
        }
    })
    .then(response =>{
        console.log(response)
    inputComment.innerHTML =""
    let alertH2 = document.querySelector('.alert-massage h2') 
    alertH2.style = 'display:block;background-color:#22D249 !important;'
    alertMassage(`the comment has been created successfully`)
    setTimeout(()=>{
    alertH2.style.display = 'none'
    alertH2.innerHTML = ''
    },3000)
    showPostDetails()

    }).catch( error =>{
        // alert(error)
        // console.log(error.response.data.message)
        let alertH2 = document.querySelector('.alert-massage h2') 
        alertH2.style = 'display:block;background-color:red !important;'
        alertMassage(error.response.data.message)
        setTimeout(()=>{
        alertH2.style.display = 'none'
        alertH2.innerHTML = ''
        },3000)
    })
}

//alertMassage  
function alertMassage(massage){
    let alertH2 = document.querySelector('.alert-massage h2') 
    let massageAlert = document.createTextNode(massage)
    alertH2.append(massageAlert)
    }

    function toggleLoader(show = true){
        if(show){
            document.querySelector(".loading").style.visibility = 'visible'
        }else{
            document.querySelector(".loading").style.visibility = 'hidden'
    
        }
    }
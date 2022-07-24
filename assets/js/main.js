// pop box call
const popbtn        = document.querySelector('.postbtn');
const postPopBox    = document.querySelector('#postPopBox');
const eidtPopBox    = document.querySelector('#eidtPopBox');
const closeBtn      = document.querySelector('.closeBtn');
const closeBtnedit  = document.querySelector('.closeBtneidt');
popbtn.onclick = () => {
    postPopBox.style.display = "block"
}
closeBtn.onclick = () => {
     postPopBox.style.display = "none";
}
closeBtnedit.onclick = () => {
     eidtPopBox.style.display = "none";
}


// Get Id
const postForm = document.querySelector('#postForm');


// Submit form
postForm.onsubmit = (e) => {
    e.preventDefault();

    const form_val = new FormData(e.target);
    const formData = Object.fromEntries(form_val.entries());
    const {name, userPhoto, bgPhoto, userContent, jobtitle} = Object.fromEntries(form_val.entries());


    if (!name || !userPhoto ) {
        alertNotify('All Fields Are Required!');
    }else {

        const id = Math.floor(Math.random() * 1000) + '_' + Date.now();

        const dataObj = {...formData, id}

        createLSData('linkedin', dataObj);
        e.target.reset();
        showData();
        postPopBox.style.display = "none";

    }
}


// Show Data to Newsfeed
const push_post = document.querySelector('.push-post');
const showData = () => {
    const allData = getLSData('linkedin');
    let list = '';


    if (!allData || allData == 0) {
        list = '';
    }

    if (allData) {
        allData.reverse().map((item) => {
            list += `
            <div class="post">
          <div class="post__header">
            <img src="${item.userPhoto}" class="material-icons sidebar__topAvatar" alt="">
            <div class="post__info">
              <h2>${item.name}</h2>
              <p >${item.jobtitle}</p>
            </div>
          </div>

          <div class="post__body">
            <p>${item.userContent}</p>
            <img src="${item.bgPhoto}" alt="" class="feed-photo">
          </div>

          <div class="feed__inputOptions">
            <div class="inputOption">
              <i style="color: gray" class="material-icons"> thumb_up </i>
              <h4>Like</h4>
            </div>
            <div class="inputOption">
              <i style="color: gray" class="material-icons"> comment </i>
              <h4>Comment</h4>
            </div>
            <div editLsData="${item.id}" class="inputOption">
              <i style="color: gray" class="material-icons"> edit </i>
              <h4>Edit</h4>
            </div>
            <div deleteLsData="${item.id}" class="inputOption">
              <i style="color: gray" class="material-icons"> delete </i>
              <h4>Delete</h4>
            </div>
          </div>
        </div>
            `;
        });
    }
    
    push_post.innerHTML = list ;
}

showData();

// Edit Delete
push_post.onclick = (e) => {

    if (e.target.hasAttribute('editLsData')) {
        const id = e.target.getAttribute('editLsData');
        eidtPopBox.style.display = "block";
        const allData = getLSData('linkedin');
        const singleData = allData.find( item => item.id == id);
        editForm.innerHTML = `
        
        <div class="popbody">
            <div>
              <label for="">Name</label>
              <input name="name" value="${singleData.name}" type="text" />
              <input name="id" value="${singleData.id}" type="hidden" />
            </div>
            <div>
              <label for="">Job Title</label>
              <input name="jobtitle" value="${singleData.jobtitle}" type="text" />
            </div>
            <div>
              <label for="">UserPhoto</label>
              <input name="userPhoto" value="${singleData.userPhoto}" type="text" />
            </div>
            <div>
              <label for="">BG image</label>
              <input name="bgPhoto" value="${singleData.bgPhoto}" type="text" />
            </div>
            <div>
              <label for="">Content</label>
              <textarea name="userContent" id="" cols="30" rows="10">${singleData.userContent}</textarea>
            </div>
            <div>
              <input class="submitBtn" type="submit" value="Edit Post" />
            </div>

        </div>
        
        `;
        
        
    }



    if (e.target.hasAttribute('deleteLsDAta')) {
        const id = e.target.getAttribute('deleteLsDAta');
        if (confirm("Are Your Sure! You Want To Delete This Post?") == true) {
            
        const allData = getLSData('linkedin');
        const index = allData.findIndex( item => item.id == id);

        allData.splice(index, 1);
        updateLSData('linkedin', allData);
        showData();
        }
        
    }
}


// Edit Update 
editForm.onsubmit = (e) => {
    e.preventDefault();

    const form_val = new FormData(e.target);
    const formData = Object.fromEntries(form_val.entries());
    const {name, userPhoto, bgPhoto, userContent, id, jobtitle} = Object.fromEntries(form_val.entries());
    const allData = getLSData('linkedin');
    const index = allData.findIndex( item => item.id == id);

    allData[index] = {name, userPhoto, bgPhoto, userContent, id, jobtitle};
    updateLSData('linkedin', allData);
    showData();
    eidtPopBox.style.display = "none";
}
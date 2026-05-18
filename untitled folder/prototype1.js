const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAjvcD8COTR2pX-Od-5pyaHgvurchAtCsM",
    authDomain: "typewriter-4feb3.firebaseapp.com",
    databaseURL: "https://typewriter-4feb3-default-rtdb.firebaseio.com",
    projectId: "typewriter-4feb3",
    storageBucket: "typewriter-4feb3.firebasestorage.app",
    messagingSenderId: "434470578176",
    appId: "1:434470578176:web:91b10c2d1e19823b85d0e5",
    measurementId: "G-NMX5R5BB9M"
  });

  const db = firebaseApp.firestore();
  const auth = firebaseApp.auth();


//login
/*function logIn() {
  const email=document.getElementById("email").value;
  const password=document.getElementById("password").value;
  console.log(email,password)
  if (password=="") {alert("Please enter password") 
    return;}
  if (email=="") {
   var username=document.getElementById("username").value
   db.collection("username")
   .where("theusername","==",username)
   .get()
   .then((checking) => {
    if (checking.empty) {
      alert("Username not found")
      return;
    } else {
      const foundEmail = checking.docs[0].data().theemail
      auth.signInWithEmailAndPassword(foundEmail,password)
      .then(() => {
        console.log("log in success!!! :D")
        dashboard()
        return username;
      })
      .catch(() => {
        alert("log in error")
      })
    }
   })

    } else {
      auth.signInWithEmailAndPassword(email, password)
    .then(() => {
    console.log("LOG IN SUCCESSFUL")
    location.replace("prototype1(dashboard).html")
  })
  .catch((error) =>{
    alert("Error logging in")
  })

} }*/

//log in properly this time

async function logIn () {
  const email=document.getElementById("email").value;
  const password=document.getElementById("password").value;
  console.log(email,password)
  if (password=="") {alert("Please enter password") 
    return; }
  try { if (email=="") {
    const username = document.getElementById("username").value
    const userChecking = await db.collection("username")
    .where("theusername", "==", username)
    .get();
    if (userChecking.empty) {
      alert("Username not found")
      return;
    } else {
      const foundEmail = userChecking.docs[0].data().theemail
      await auth.signInWithEmailAndPassword(foundEmail,password)
      console.log("username checking sucessful")
      console.log(username, foundEmail)
      return username;

    }
  } else {
    try {await auth.signInWithEmailAndPassword(email, password)} catch (error) {alert("Log In error")
      return;
    } 
    return email;


  }


} catch (error) {
    alert("Error logging in")
  }

}




/*function logIn() {
  const email=document.getElementById("email").value;
  const password=document.getElementById("password").value;
  console.log(email,password)
 try { if (password=="") {alert("Please enter password") 
    return;}
  if (email=="") {
   var username=document.getElementById("username").value
   db.collection("username")
   .where("theusername","==",username)
   .get()
   .then((checking) => {
    if (checking.empty) {
      alert("Username not found")
      return;
    } else {
      const foundEmail = checking.docs[0].data().theemail
      auth.signInWithEmailAndPassword(foundEmail,password)

        console.log("log in success!!! :D")
        dashboard()dev
        return username;
      }} catch { alert("log in error")
      })

   } else {
      auth.signInWithEmailAndPassword(email, password)
    .then(() => {
    console.log("LOG IN SUCCESSFUL")
    location.replace("prototype1(dashboard).html")
  })
  .catch((error) =>{
    alert("Error logging in")
  })

} }*/












//sign up
async function signUp() {
  console.log("hi")
  const email=document.getElementById("email").value;
  const password=document.getElementById("password").value;
  const username=document.getElementById("username").value;
  console.log(email,password,username)
  try {
    const checking = await db.collection("username")
    .where("theusername","==",username)
    .get()

      if (checking.empty) {
        console.log("now checkin")
       await auth.createUserWithEmailAndPassword(email, password)
       await db.collection("username")
        .add ({
          theemail: email,
          theusername: username,
          totalworks: 0,
          shelvedworks: 0
        })
        dashboard();
        return username;
      } else {
        alert("Username taken")
      }
    
  
  } catch (error) {
    alert("Error signing up. Try: Password too weak. Email invalid. Email already in use.")
    console.log("error")}

  
  }



  ///displaying contents after loading dashboard
  function dashboard() {
    location.replace("prototype1(dashboard).html");
    display();
  }


  //story display!!!//

const display = () => {
  console.log("displaying")
  db.collection("docs")
  .orderBy("createdAt", "desc")
  .where("privacy","==","no")
  .get()
  .then((snapshot) => {
    const storiesContainer = document.getElementById("workContent")
    storiesContainer.innerHTML = " ";
    snapshot.forEach((doc) => {
      const p = document.createElement("p");

      p.innerHTML = `<a href="prototype1(contents).html?id=${doc.id}">
    ${doc.data().title}
  </a>
  <br>
  ${doc.data().description}`

      storiesContainer.appendChild(p)

    })

  })

}

const myDisplay = () => {
  console.log("displaying MY WORKS")
  db.collection("docs")
  .orderBy("createdAt", "desc")
  .where("author","==",username)
  .get()
  .then((snapshot) => {
    const storiesContainer = document.getElementById("myWorkContent")
    storiesContainer.innerHTML = "";
    snapshot.forEach((doc) => {
      const p = document.createElement("p");

      p.innerHTML = `
  <a href="prototype1(contents).html?id=${doc.id}">
    ${doc.data().title}
  </a>
  <br>
  ${doc.data().description}
`

      storiesContainer.appendChild(p)

    })

  })

}







/*const display = () => {
  console.log("displaying")
  db.collection("docs")
  .orderBy("createdAt", "desc")
  .where("author","==",username) 
  .get()
  .then((snapshot) => {
    const storiesContainer = document.getElementById("workContent")
    storiesContainer.innerHTML = "";
    snapshot.forEach((doc) => {
      const p = document.createElement("p");

      p.innerHTML = `<a href="prototype1(contents).html" target="_blank"> ${doc.data().title} </a> <br> ${doc.data().description} `

      storiesContainer.appendChild(p)

    })

  })

}
 */






//story creation!!



const createDocument = () => {
db.collection("docs")
    .add({
      author: username,
      description: document.getElementById("description").value,
      title: document.getElementById("title").value,
      privacy: document.getElementById("private").checked ? "yes":"no",
      matureContent: document.getElementById("matureContent").checked ? "yes":"no",
      completion: document.getElementById("incomplete").checked ? "yes":"no",
      genre: document.getElementById("genre").value,
      authorNote: document.getElementById("authorNote").value,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
        })
    .then((docRef)=> {
      console.log("wahoo added!!!")
      console.log("document created:", docRef.id);
return db.collection("docs")
.doc(docRef.id)
.collection("chapters")
.add({
chapterTitle: document.getElementById("chapterTitle").value,
chapterContent: document.getElementById("content").value,
createdAt: firebase.firestore.FieldValue.serverTimestamp()
});

})
.then(() => {
console.log("chapter added successfully");
location.replace("prototype1(dashboard).html");
    })
    .catch((error) => {
      alert("Upload error")
      console.log(error)
    })


}

const goToAddChapter = () => {
  const id = new URLSearchParams(window.location.search).get("id");

  location.replace(`prototype1(uploadChapter).html?id=${id}`);
}

const addChapter = async () => {
  db.collection("docs").collection
}


const loadingStoryinContents = async () => {
  console.log("now")
  const parameters = new URLSearchParams(window.location.search);
  const id = parameters.get("id");
  const docSnap = await db.collection("docs").doc(id).get();

    if (!docSnap.exists) return;

    const data = docSnap.data();

    localStorage.setItem("currentWorkId", id);
    localStorage.setItem("currentWorkTitle", data.title);
  
    console.log(localStorage.getItem("currentWorkId"));
    console.log(localStorage.getItem("currentWorkTitle"));


    const chapterSnap = await db.collection("docs")
    .doc(id)
    .collection("chapters")
    .orderBy("createdAt")
    .get();

  let chaptersHTML = "";

  chapterSnap.forEach((chapter) => {
    const chapterData = chapter.data();

    chaptersHTML += `
      <h2>${chapterData.chapterTitle}</h2>
      <p>${chapterData.chapterContent}</p>
    `;
  });
    

    document.getElementById("storyContainer").innerHTML = `
      <h1>${data.title}</h1>
      <p>${data.description}</p>
      ${chaptersHTML}
    `;
  ;
};

document.addEventListener("DOMContentLoaded", loadingStoryinContents);




//executed code//

if (window.location.pathname.endsWith("(dashboard).html")) {
  display();
}

if (window.location.pathname.endsWith("(profile).html")) {
  display();
}



async function signuporlogin(type) {
  console.log('async called')
  let result;
  if (type === 'Log In') {
    result = await logIn();
  } else {
    console.log("hihi")
    result = await signUp();
  } 
  if (result) {localStorage.setItem("username", result);
    console.log("THIS IS THE USERNAME")
  console.log(result);
  dashboard()
  return result;
}}

const username = localStorage.getItem("username");
console.log(username);


document.addEventListener("DOMContentLoaded", () => {
  const el = document.getElementById("usernameDisplay");
  if (el && username) {
    el.textContent = username;
  }
});


const profileDisplay = () => {
  console.log(username);
  myDisplay();
}
  

if (window.location.pathname.endsWith("(profile).html")) {
  profileDisplay();
}


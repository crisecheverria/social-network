const usersNodeWrapper = document.querySelector("#users");

async function getUsers(page) {
    const response = await fetch('https://reqres.in/api/users?page=' + page);
    const users = await response.json();
    return users
}

function printPaginationBtns(totalPages){
    const pagesNodeWrapper = document.querySelector("#pages");
    Array(totalPages).fill().map((page, index) => {
        let id = "button" + (index + 1)
        let buttonEl = document.createElement("button");
        buttonEl.innerHTML = index + 1
        buttonEl.classList.add("button");
        buttonEl.id = id
        pagesNodeWrapper.appendChild(buttonEl)
    })
}

function printUsersInfo(users) {
    users.data.forEach(user => {
        let name = `${user.first_name} ${user.last_name}`;
        let nameParagraph = document.createElement("p");
        nameParagraph.textContent = name;

        let picture = user.avatar;
        let pictureTag = document.createElement("img");
        pictureTag.src = picture;
        pictureTag.alt = name;

        let personWrapper = document.createElement("div")
        personWrapper.classList.add("person")
        personWrapper.appendChild(nameParagraph)
        personWrapper.appendChild(pictureTag)

        usersNodeWrapper.appendChild(personWrapper)
    })
}

function filter(e){
    search = e.value.toLowerCase();
    document.querySelectorAll('.person').forEach((row) => {
        text = row.innerText.toLowerCase();
        if(text.match(search)){
            row.style.display = ""
        } else {
            row.style.display = "none"
        }
    })
}

window.onload = async function() {
  const users = await getUsers(1)
  const totalPages = users.total_pages;
  printPaginationBtns(totalPages)
  printUsersInfo(users)

  Array(totalPages).fill().map((page, index) => {
        let button = "button" + (index + 1)
        document.getElementById(button).addEventListener('click', () => {
            let id = index + 1
            document.querySelector("#users").innerHTML = "";
            getUsers(id)
                .then(users => printUsersInfo(users))
        })
    })
};

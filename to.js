const todoForm = document.querySelector('#todo-form');
const todoNameInput = document.querySelector('#todo-name');
const todoDescriptionInput = document.querySelector('#todo-description');
const userList = document.querySelector('#list');


window.addEventListener('DOMContentLoaded', loadSavedUsers);
todoForm.addEventListener('submit', onSubmit);
userList.addEventListener('click', removeItem);

function loadSavedUsers(){
axios.get("https://crudcrud.com/api/7b7b9e407b2f421db36992a9095cd1a5/tododata")
.then((response)=>{
  console.log(response);
  for(var i=0;i<response.data.length;i++){
    createTodoItem(response.data[i])
  }
})
.catch((err)=>{
  console.log(err);
})
}

function onSubmit(e) {
  e.preventDefault();

  if (todoNameInput.value === '' || todoDescriptionInput.value === '') {
    const msg = document.createElement('p');
    msg.classList.add('error');
    msg.innerHTML = 'Please enter all fields';
    document.body.appendChild(msg);
    setTimeout(() => msg.remove(), 3000);
  } else {
    const user = {
      todoName: todoNameInput.value,
      todoDescription: todoDescriptionInput.value
    };

    let users = JSON.parse(localStorage.getItem('users')) || [];

    users.push(user);

   axios.post("https://crudcrud.com/api/7b7b9e407b2f421db36992a9095cd1a5/tododata", user)
    .then((response)=>{
      console.log(response);
    })
    .catch((err)=>{
      console.log(err);
    })

    createTodoItem(user);

    todoNameInput.value = '';
    todoDescriptionInput.value = '';
  }
  
}

function createTodoItem(user) {
  const li = document.createElement('li');

  


  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.classList.add('checkbox');
  li.appendChild(checkbox);

  li.appendChild(document.createTextNode(`${user.todoName}: ${user.todoDescription}`));
  userList.appendChild(li);
  li.dataset.userId = user._id;

  const delbtn = document.createElement('button');
  delbtn.className = 'deletebtn';
  delbtn.appendChild(document.createTextNode('X'));
  li.appendChild(delbtn);

 
  

  
  checkbox.addEventListener('change', () => {
    if (checkbox.checked) {
      li.dataset.status = 'workdone'; // Update data attribute to 'workdone'
      document.getElementById('work').appendChild(li); // Append to "To-Do Work Done" section
    } else {
      li.dataset.status = 'pending'; // Update data attribute to 'pending'
      document.getElementById('list').appendChild(li); // Append to "To-Do Work Pending" section
    }
  });

  document.getElementById('list').appendChild(li); 
}
  
function removeItem(e) {
    if (e.target.classList.contains('deletebtn')) {
      if (confirm('Are you sure you want to delete this user?')) {
        const li = e.target.parentElement;
        const userId = li.dataset.userId; // Fetch the user ID from the data attribute
  
        axios.delete(`https://crudcrud.com/api/7b7b9e407b2f421db36992a9095cd1a5/tododata/${userId}`)
          .then((response) => {
            console.log(response);
            // Remove the list item from the UI
            li.remove();
          })
          .catch((err) => {
            console.log(err);
          });
      }
  
        
      }
    }

    checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
          li.dataset.status = 'workdone'; // Update data attribute to 'workdone'
          document.getElementById('work').appendChild(li); // Append to "To-Do Work Done" section
        } else {
          li.dataset.status = 'pending'; // Update data attribute to 'pending'
          document.getElementById('list').appendChild(li); // Append to "To-Do Work Pending" section
        }
      });
    
      document.getElementById('list').appendChild(li); // Append to "To-Do Work Pending" section initially
    
    
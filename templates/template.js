// ##############BOARD TEMPLATES START################# //
function templateOfNewTaskToDo(taskTodo, i) {
	return /*html*/ `
    <div id="todo-task${i}" onclick="openCurrentTaskBigBox(${i}, ['to do'], '${taskTodo.categorycolor}'); showCurrentWorkersBigBox(${i}, 'todo');" ondragstart="startDragging(${taskTodo["id"]}); dragHighlight(['todo'], ${i}); showEmptyPlaces(['progress'], ['feedback'], ['done'])"; ondragend="hideEmptyPlaces(['progress'], ['feedback'], ['done'])"; class="main-task-container"; draggable="true">
        <div class="headline-category">
            <div id="headline-solo-task-todo${i}" class="headline-solo-task" style="background:${taskTodo.categorycolor}"><h3 id="headline-task-todo${i}">${taskTodo.category}</h3></div>
        </div>
        <div class="task-title">
            <span id="task-title">${taskTodo.title}</span>
        </div>
        <div class="task-description">
            <span title="${taskTodo.description}">${taskTodo.description}</span>
        </div>
        <div class="workers-prio">
            <div class="main-workers">
                <div id="solo-worker-todo${i}" class="solo-worker">
                </div>
            </div>
        <div id="prio-img-todo" class="prio-img">
            <img id="prio-img-todo${i}" src="./img/board/prio-${taskTodo.priority}.png">
        </div>
    </div>
</div>`;
}

function templateOfTaskInProgress(taskProgress, j) {
	return `
    <div id="progress-task${j}" onclick="openCurrentTaskBigBox(${j}, ['in progress'], '${taskProgress.categorycolor}'); showCurrentWorkersBigBox(${j}, 'progress');" ondragstart="startDragging(${taskProgress["id"]}); dragHighlight(['progress'], ${j}); showEmptyPlaces(['todo'], ['feedback'], ['done'])"; ondragend="hideEmptyPlaces(['todo'], ['feedback'], ['done'])"; class="main-task-container" draggable="true">
        <div class="headline-category">
            <div id="headline-solo-task-progress${j}" class="headline-solo-task" style="background:${taskProgress.categorycolor}"><h3 id="headline-task-progress${j}">${taskProgress.category}</h3></div>
        </div>
        <div class="task-title">
            <span id="task-title">${taskProgress.title}</span>
        </div>
        <div class="task-description">
            <span title="${taskProgress.description}">${taskProgress.description}</span>
        </div>
        <div class="workers-prio">
            <div class="main-workers">
                <div id="solo-worker-progress${j}" class="solo-worker">
                </div>
            </div>
        <div id="prio-img-progress" class="prio-img">
            <img id="prio-img-progress${j}" src="./img/board/prio-${taskProgress.priority}.png">
        </div>
    </div>
</div>`;
}

function templateOfTaskFeedback(taskFeedback, k) {
	return `
    <div id="feedback-task${k}" onclick="openCurrentTaskBigBox(${k}, ['awaiting feedback'], '${taskFeedback.categorycolor}'); showCurrentWorkersBigBox(${k}, 'feedback');" ondragstart="startDragging(${taskFeedback["id"]}); dragHighlight(['feedback'], ${k}); showEmptyPlaces(['todo'], ['progress'], ['done'])"; ondragend="hideEmptyPlaces(['todo'], ['progress'], ['done'])"; class="main-task-container" draggable="true">
        <div class="headline-category">
            <div id="headline-solo-task-feedback${k}" class="headline-solo-task" style="background:${taskFeedback.categorycolor}"><h3 id="headline-task-feedback${k}">${taskFeedback.category}</h3></div>
        </div>
        <div class="task-title">
            <span id="task-title">${taskFeedback.title}</span>
        </div>
        <div class="task-description">
            <span title="${taskFeedback.description}">${taskFeedback.description}</span>
        </div>
        <div class="workers-prio">
            <div class="main-workers">
                <div id="solo-worker-feedback${k}" class="solo-worker">
                </div>
            </div>
        <div id="prio-img-feedback" class="prio-img">
            <img id="prio-img-feedback${k}" src="./img/board/prio-${taskFeedback.priority}.png">
        </div>
    </div>
</div>`;
}

function templateOfTaskDone(taskDone, l) {
	return `
    <div id="done-task${l}" onclick="openCurrentTaskBigBox(${l}, ['done'], '${taskDone.categorycolor}'); showCurrentWorkersBigBox(${l}, 'done');" ondragstart="startDragging(${taskDone["id"]}); dragHighlight(['done'], ${l}); showEmptyPlaces(['todo'], ['progress'], ['feedback'])"; ondragend="hideEmptyPlaces(['todo'], ['progress'], ['feedback'])"; class="main-task-container" draggable="true">
        <div class="headline-category">
            <div id="headline-solo-task-done${l}" class="headline-solo-task" style="background:${taskDone.categorycolor}"><h3 id="headline-task-done${l}">${taskDone.category}</h3></div>
        </div>
        <div class="task-title">
            <span id="task-title">${taskDone.title}</span>
        </div>
        <div class="task-description">
            <span title="${taskDone.description}">${taskDone.description}</span>
        </div>
        <div class="workers-prio">
            <div class="main-workers">
                <div id="solo-worker-done${l}" class="solo-worker">
                </div>
            </div>
        <div id="prio-img-done" class="prio-img">
            <img id="prio-img-done${l}" src="./img/board/prio-${taskDone.priority}.png">
        </div>
    </div>
</div>`;
}

function templateBigBoxSoloTask(soloTasksArray, indexOfSoloTask) {
	// soloTasksFeedback // 3
	return /*html*/ `
    <div class="big-box-tasks-container-full-size2" onclick="closeSoloTaskBigBox(${indexOfSoloTask})">
    <div id="big-box-solo-task" class="main-big-box-task-container" onclick="doNotClose(event)">
        <div onclick="closeSoloTaskBigBox(${indexOfSoloTask})" class="close-big-box-task c-pointer"><img class="close-task" src="./img/board/close.png"><img class="close-task-phone" src="img/board/back_phone.png"></div>
        <div id="big-box-task-headline" class="big-box-task-headline">
            <div><h4 class="d-center" id="big-box-headline">${soloTasksArray[indexOfSoloTask].category}</h4></div>
        </div>
        <div class="big-box-task-title">
            <span><h2>${soloTasksArray[indexOfSoloTask].title}</h2></span>
        </div>
        <div class="big-box-task-description">
            <span>${soloTasksArray[indexOfSoloTask].description}</span>
        </div>
        <div class="big-box-task-date">
            <table>
                <tr>
                    <td>Due date:</td>
                    <td>${soloTasksArray[indexOfSoloTask].dueDate}</td>
                </tr>
            </table>
        </div>
        <div class="big-box-task-prio">
            <table>
                <tr>
                    <td>Priority:</td>
                    <td id="priority-big-box-color">${soloTasksArray[indexOfSoloTask].priority}</td>
                </tr>
            </table>
        </div>
        <div class="main-assigned-to">
            <div class="assigned-to-headline">
                <h4>Assigned To:</h4>
            </div>
            <div id="current-workers" class="assigned-to-workers">
            </div>
        </div>
        <div class="buttons-big-box">
            <div onclick="editCurrentTask(${soloTasksArray[indexOfSoloTask].id}); showAllPossibleWorkers();" id="edit-button${indexOfSoloTask}" onmouseover="changeEditContainerColors(${indexOfSoloTask})" onmouseleave="RemoveEditContainerColors(${indexOfSoloTask})" class="edit-button d-center c-pointer"><img id="edit-pencil${indexOfSoloTask}" src="./img/board/pencil.png"></div>
            <div onclick="deleteCurrentTask(${soloTasksArray[indexOfSoloTask].id})" id="delete-button${indexOfSoloTask}" onmouseover="changeDeleteContainerColors(${indexOfSoloTask})" onmouseleave="RemoveDeleteContainerColors(${indexOfSoloTask})" class="delete-button d-center c-pointer"><img id="delete-basket${indexOfSoloTask}" src="./img/board/basket.png"></div>
        </div>
    </div>`;
}

function templateOfSearchTask(taskSearch, index) {
	return `
    <div id="search-task${index}" onclick="openCurrentTaskBigBoxOnSearch(${index}, ['${taskSearch.status.toLowerCase()}'], '${
		taskSearch.categorycolor
	}')"; class="main-task-container">
        <div class="headline-category">
            <div id="headline-solo-task-search${index}" class="headline-solo-task" style="background:${
		taskSearch.categorycolor
	}"><h3 id="headline-task-search${index}">${taskSearch.category}</h3></div>
        </div>
        <div class="task-title">
            <span id="task-title">${taskSearch.title}</span>
        </div>
        <div class="task-description">
            <span title="${taskSearch.description}">${taskSearch.description}</span>
        </div>
        <div class="workers-prio">
            <div class="main-workers">
                <div id="solo-worker-search" class="solo-worker">
                </div>
            </div>
        <div id="prio-img-search" class="prio-img">
            <img id="prio-img-search${index}" src="./img/board/prio-${taskSearch.priority}.png">
        </div>
    </div>
</div>`;
}

function templateEditCurrentTask(currentTask, idOfCurrentTask) {
	return `
    <form onsubmit="submitChanges(${idOfCurrentTask}); return false; checkCheckboxes();">
        <div id="main-edit-container" class="main-edit-container">
            <div class="edit-headline">
                <h3>Title</h3>
                <input required type="text" id="edit-title" onclick="clearPlaceholder('title', 'Enter a title', '${
					currentTask.title
				}')" class="edit-container-inputstyle" placeholder="${currentTask.title}">
            </div>

            <div class="edit-description">
                <h3>Description</h3>
                <textarea required type="text" id="edit-description" onclick="clearPlaceholder('description', 'Enter a description', '${
					currentTask.description
				}')" placeholder="${currentTask.description}"></textarea>
            </div>

            <div class="edit-date">
                <h3>Due date</h3>
                <input required id="edit-date" type="date" class="edit-container-inputstyle" placeholder="${currentTask.dueDate.replaceAll(
					"-",
					"."
				)}">
            </div>

            <div class="edit-prio">
                <h3>Prio</h3>
                <div class="edit-prio-subcontainer">

                    <div onclick="changePrioTo(['Urgent'])" id="prio-urgent-container" class="edit-prioclass c-pointer">
                        <input required type="radio" id="change-prio-urgent" name="prioclass" value="Urgent">
                        <div class="d-cemter c-pointer" for="change-prio-urgent" id="urgent-prio" class="prio-label-urgent" for="urgent">Urgent<img id="urgent-img" src="./img/board/urgent-addtask.png"></div>
                    </diV>
    
                    <div onclick="changePrioTo(['Medium'])" id="prio-medium-container" class="edit-prioclass c-pointer">
                        <input required type="radio" id="change-prio-medium" name="prioclass" value="Medium">
                        <div class="d-cemter c-pointer" for="change-prio-medium" id="medium-prio" class="prio-label-medium" for="medium">Medium<img id="medium-img" src="./img/board/medium-addtask.png"></div>
                    </diV>
    
                    <div onclick="changePrioTo(['Low'])" id="prio-low-container" class="edit-prioclass c-pointer">
                        <input required type="radio" id="change-prio-low" name="prioclass" value="Low">
                        <div class="d-cemter c-pointer" for="change-prio-low" id="low-prio" class="prio-label-low" for="low">Low<img id="low-img" src="./img/board/low-addtask.png"></div>
                    </div>
                </div>
            </div>

            <div class="edit-assignedTo">
                <h3>Assigned to</h3>
                <div id="big-box-workers-output" class="big-box-workers-output">

                </div>
                <div id="edit-assignedTo-subcontainer" class="edit-assignedTo-subcontainer c-pointer">
                    <div id="wrkcont" onclick="showCompleteContainer()">Select contacts to assign<img id="dropdown-img" src="./img/board/dropdown.png"><input required class="checkCheckboxes" id="checkCheckboxes"></div>
                    <div id="edit-workers" class="edit-workers d-none">
                        <div id="scbx-1" onclick="submitCheckbox('-1')" class="solo-contact"><label>You</label><input onclick="submitCheckbox('-1')"; name="users" id="checkbox--1" type="checkbox"></div>
                    </div>
                </div>
                <div class="worker-name-start-letters-board" id="workerContainerLetterBoard">

                    </div>
            </div>   

            <div class="close-edit-container c-pointer"><img onclick="closeEditContainer()" src="./img/board/close.png">
        </div>
    </form>
    
    <div>
    <h3>Change Taskstatus to</h3>
        <div class="new-task-status">
            <div id="newStatus1" onclick="editStatusOfTask(${idOfCurrentTask}, 'To do'); highlightStatusContainer('1'); hideHiglightStatusContainer('2', '3', '4');" class="new-status">To do</div>
            <div id="newStatus2" onclick="editStatusOfTask(${idOfCurrentTask}, 'In progress'); highlightStatusContainer('2'); hideHiglightStatusContainer('1', '3', '4');" class="new-status">In progress</div>
            <div id="newStatus3" onclick="editStatusOfTask(${idOfCurrentTask}, 'Awaiting feedback'); highlightStatusContainer('3'); hideHiglightStatusContainer('1', '2', '4');" class="new-status">Awaiting feedback</div>
            <div id="newStatus4" onclick="editStatusOfTask(${idOfCurrentTask}, 'Done'); highlightStatusContainer('4'); hideHiglightStatusContainer('1', '2', '3');" class="new-status">Done</div>
        </div>
    </div>

    <div style="display:flex;justify-content:flex-end;">
    <div class="change-edit-button">
      <button class="c-pointer" type="submit"><div>Ok</div><img src="./img/check_white.png"></button>
    </div>
    </div>
    `;
}

function templateShowAllWorkers(indexOfUsers, userName) {
	return `
    <div id="scbx${indexOfUsers}" onclick="submitCheckbox(${indexOfUsers})" class="solo-contact"><label>${userName}</label><input onclick="submitCheckbox(${indexOfUsers})" name="users" id="checkbox-${indexOfUsers}" type="checkbox"></div>`;
}

function templateAssignedToOfSoloTask(firstName, lastName, userBackgroundColor) {
	return `
    <div class="worker-name-start-letters d-center" style="background:${userBackgroundColor}">${firstName}${lastName}</div>`;
}

function showPlusSign(amountWorker) {
	return `
    <div class="worker-name-start-letters d-center bg-black">+ ${amountWorker}</div>`;
}

function templateCurrentWorkersOfTasksBigBox(firstName, lastName, fullName, userBackgroundColor) {
	return `
    <div class="solo-worker-big-box"><div style="background:${userBackgroundColor}" class="worker-name-start-letters-edit d-center">${firstName.charAt(
		0
	)}${lastName.charAt(0)}</div><div class="edit-worker-fullname">${fullName}</div>`;
}
// ################################ BOARD TEMPLATE END ###################################################

// ################################ ADD TASK TEMPLATE START ###################################################
function userInAssignedHTML(userName, indexOfUsers) {
	return /*html*/ `
    <div onclick="assingCheckbox(${indexOfUsers})" class="solo-assigned"><label>${userName}</label><input onclick="assingCheckbox(${indexOfUsers})" name="users" id="userCheckbox-${indexOfUsers}" type="checkbox"></div>`;
}

function newCategoryInputHTML() {
	return /*html*/ `
            <div class="input-group">
              <input id="newCategoryInput" type="text" class="form-control" placeholder="New category name">
              <button onclick="loadCategory()" id="subtaskDelete" class="" type="button">
              <img src="./img/addtask/x-vector.png" alt=""></button>
              <div id="subtask-separator-line" class="subtask-separator-line"></div>
              <button onclick="pushNewCategory()" id="subtaskAdd" class="subtasks-right-butten" type="button">
              <img class="ok-vector" src="./img/addtask/ok-vector.png" alt=""></button>
             
            </div>
            <div id="category-color-picker" class="category-color-picker">
            </div>
            <div id="errorMessage">
            </div>
      `;
}

function errorMessageHTML() {
	return /*html*/ `
    <p> Add a category and a color! </p>
  `;
}

function categoryColorPickerHTML(i) {
	return /*html*/ `
                <input class="input-radio" type="radio" name="color" id="${addTaskCategoryColors[i]}" value="${addTaskCategoryColors[i]}" />
                <label for="${addTaskCategoryColors[i]}" class="add-task-color-picker"><span class="color-${i}"></span></label> 
    `;
}

function loadCategoryHTML() {
	return /*html*/ `
      <div onclick="openCategory()" id="dropbtnCategory" class="dropbtn-category">Select task category <img src="./img/addtask/dropdown-Vector.png" alt=""></div>
      <div id="categoryDropdown" class="dropdown-content">
        <p onclick="addNewCategory()">New category</p>
        <div id="allCategorys">
        </div>
      </div>`;
}

function currentCategoryHTML(i) {
	return /*html*/ ` 
      <div   class="active-category">
      <p> ${addTaskCategorys[i]}</p>
      <div style="background-color:#${usedColors[i]}" class="categoryColor">
      </div>
    </div>
      `;
}

function allCategoryHTML(i) {
	return /*html*/ `
    <div onclick="currentCategory(${i})"  class="current-category">
      <p> ${addTaskCategorys[i]}</p>
      <div style="background-color:#${usedColors[i]}" class="categoryColor">
      </div>
    </div>
      `;
}

function subtaskListHTML(indexOfSubtask) {
	let subtask = addTaskSubtasks[indexOfSubtask];
	return /*html*/ `
        <div onclick="subtasksCheckbox(${indexOfSubtask})" class="subtask-list-form-check">
          <input onclick="subtasksCheckbox(${indexOfSubtask})" class="subtask-list-input" type="checkbox" value="" id="${subtask}-${indexOfSubtask}">
            <label class="subtask-list-label" onclick="" for="flexCheckDefault" id="${subtask}${indexOfSubtask}">
              ${subtask}
            </label>
          </div>`;
}

function loadAssignedHTML() {
	return /*html*/ `
    <div onclick="openAssign()" id="dropbtnAssign" class="dropbtn-assign" type="button">Select contacts to assign<img src="./img/addtask/dropdown-Vector.png" alt=""><input required class="checkCheckboxes" id="assignedInput"></div>
    <div id="assignDropdown" class="dropdown-content">
    `;
}

function searchEmailInputHTML() {
	return /*html*/ `
    <div class="input-group">
    
      <input id="search-input" type="search" id="form1" class="form-control" placeholder="Contact eMail "/>
      <button onclick="backToSelectContacts()" id="subtaskDelete" class="" type="button">
      <img src="./img/addtask/x-vector.png" alt=""></button>
      <div id="subtask-separator-line" class="subtask-separator-line"></div>
      <button onclick="pushNewCategory()" id="subtaskAdd" class="subtasks-right-butten" type="button">
      <img class="ok-vector" src="./img/addtask/ok-vector.png" alt=""></button>
  
    
    
    </button>
  </div>
    `;
}
// ################################ ADD TASK TEMPLATE END ###################################################

// ################################ CONTACTS TEMPLATE START ###################################################
function firstLetterListHTML(firstSurnameLetter) {
	return /*html*/ `
    <div class="letter-list" >
        <div>
            <h4>${firstSurnameLetter}</h4>
        </div>
        <div class="list-separator-line"></div>
        <div  class="contacts-container" id="${firstSurnameLetter}">

        </div>
        
    </div>
    `;
}

function contactHTML(user) {
	let fullName = user["name"];
	let letter = fullName.match(/\b(\w)/g).join("");
	return /*html*/ `
    <div class="contact-container" id="contactContainer" onclick="contactInformation('${fullName}', '${user.color}', '${user.email}', '${user.phone}')">
        <div style="background-color: ${user.color}" class="contact-letter">
            <p>${letter}</p>
        </div>
        <div class="nameEmail">
            <p class="nameEmailP1">${fullName}</p>
            <p class="nameEmailP2">${user.email}</p>
        </div>
    </div>
    `;
}

function contactListHTML(user) {
	let fullName = user["name"];
	let letter = fullName.match(/\b(\w)/g).join("");
}

function contactInformationHTML(fullName, userColor, userEmail, userPhone) {
	let letter = fullName.match(/\b(\w)/g).join("");
	return /*html*/ `
    <div class="contactInformationBG animationFadeIn">
       
        <div class="contactInformationHealine">
            <div class="contactInformationLetter" style="background-color: ${userColor}">
                <p>${letter}</p>
            </div>
            <div class="contactInformationFullname">
                <h2>${fullName}</h2>
                <a href="addtask.html">+Add Task</a>
            </div>
        </div>
        <div class="contactInformationCenter">
            <div class="contactInformationInforHeadline">
                <p>Contact Information</p>

            </div>
            <div class="contactInformationEdit" onclick="openEditContact('${fullName}', '${userEmail}', '${userPhone}','${userColor}')">
                <img src="./img/contact/pencil.png" alt="">
                <p>Edit Contact</p>

            </div>
        </div>
        <div class="contactInformationEmailPhone">
            <div class="contactInformationEmail">
                <p>Email<br>
                    <a href= "${userEmail}">${userEmail}</a>
                </p>
            </div>
            <div class="contactInformationPhone">
                <p>Phone<br>
                    <a href="tel:+49${userPhone}">${userPhone}</a>
                </p>
                
            </div>
            <div class="contact-basket" onclick="deleteContactUser('${userEmail}')">
                <img src="img/board/basket.png" alt="" srcset="">
            </div>
        </div>
        
    </div>
    <div class="edit-icone" onclick="openEditContact('${fullName}', '${userEmail}', '${userPhone}','${userColor}')">
            <img src="img/contact/edit-contact.png" alt="" >
        </div>
    `;
}

function editContactHTML(fullName, email, phone, color) {
	let letter = fullName.match(/\b(\w)/g).join("");
	return /*html*/ `
    <div class="addContactEditBG " onclick="closeAddContact()">
        <div class="addContactEditContainer animationFadeIn" onclick="dontClose(event)">
        <img class="white-x" style="display:none;" src="img/contact/white-x.png" alt="" srcset="" onclick="closeAddContact()">
            <div class="addContactEditContainerLeft">
                <img src="./img/contact/joinIcon.png" alt="" >
                <h3>Edit contact</h3>
                <div class="addContactSepline"></div>
            </div>
            <div class="addContactEditContainerRight">
                <div class="closeAddContact">
                    <img onclick="closeAddContact()" class="closeAddContactIcon" src="./img/contact/x-icon.png">
                </div>
                <div class="addContactEditContainerSubmit">
                    <div class="circleIcone" style="background-color: ${color}">
                        <p>${letter} </p>
                    </div>
                    <form onsubmit="newEditContact('${email}'); return false;" class="inputAreaAddContact" >
                        <div>
                            <input id="editName" pattern="^(&#92w&#92w+)&#92s(&#92w+)$" required class="inputAddContact" type="text" value="${fullName}" placeholder="${fullName}"><img class="inputImg" src="./img/contact/user-line-mini.png" alt="">
                        </div>
                        <div>
                            <input id="editEmail" required class="inputAddContact" type="email" value="${email}" placeholder="${email}"><img class="inputImg" src="./img/contact/email.png" alt="">
                        </div>
                        <div>
                            <input id="editPhone"  required class="inputAddContact" type="phone" value="${phone}" placeholder="${phone}"><img class="inputImg" src="./img/contact/phone-line.png" alt="">
                        </div>
                        <div >
                            <button class="buttonCreateContact"> Save <img src="./img/contact/akar-icons_check.png" alt=""></button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
`;
}

function addNewContactHTML() {
	return /*html*/ `
    <div id="addContactEditBG" class="addContactEditBG" onclick="closeAddContact()">
        <div class="animationFadeIn" onclick="dontClose(event)">
            <div class="addContactEditContainer">
                <img class="white-x" style="display:none;" src="img/contact/white-x.png" alt="" srcset="" onclick="closeAddContact()">
                <div class="addContactEditContainerLeft">
                    <img src="./img/contact/joinIcon.png" alt="">
                    <h3>Add contact</h3>
                    <p>Tasks are better with a team!</p>
                <div class="addContactSepline"></div>
            </div>
            <div class="addContactEditContainerRight">
                <div class="closeAddContact">
                    <img onclick="closeAddContact()" class="closeAddContactIcon" src="./img/contact/x-icon.png">
                </div>
            <div class="addContactEditContainerSubmit">
                <div class="circleIcone">
                    <img src="./img/contact/user-line.png" alt="">
                </div>

                <form onsubmit="createNewContact(); return false;" class="inputAreaAddContact">
                    <div>
                        <input id="newName" pattern="^(&#92w&#92w+)&#92s(&#92w+)$" required class="inputAddContact" type="text" placeholder="Name Surname"><img class="inputImg" src="./img/contact/user-line-mini.png" alt=""
                        srcset="">
                    </div>
                    <div>
                        <input id="newEmail" required class="inputAddContact" type="email" placeholder="Email"><img class="inputImg" src="./img/contact/email.png" alt="" srcset="">
                    </div>
                    <div>
                        <input id="newPhone"  required class="inputAddContact" type="phone" placeholder="Phone"><img class="inputImg" src="./img/contact/phone-line.png" alt=""
                            srcset="">
                    </div>
                    <div class="d-flex"  >
                        <button onmouseover="changeColor('clear-x');" onmouseout="removeColor('clear-x');" class="buttonCancelContact"  type="reset">Cancel <img  id="clear-x" src="./img/contact/x-icon-mini.png" alt=""></button>
                        <button class="buttonCreateContact" type="submit"> Create contact <img src="./img/contact/akar-icons_check.png" alt=""
                            srcset=""></button>
                    </div>
                </form>
            </div>

        </div>
    </div>
    
        
    </div>
`;
}

function workerLetterContainerHTML(fL, lL, color) {
	return /*html*/ `
        <div style="background:${color}" class="selceted-worker-letter-addtask d-center">
            ${fL}${lL}
        </div>
    `;
}


function workerLetterContainerBoardHTML(fL, lL, color) {
	return /*html*/ `
        <div style="background:${color}" class="selceted-worker-letter-board d-center">
            ${fL}${lL}
        </div>
    `;
}


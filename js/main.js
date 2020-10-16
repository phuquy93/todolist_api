var taskService = new TaskService();

getTask();

function getElm(id) {
    return document.getElementById(id);
}

getElm("addItem").addEventListener("click", function () {
    var name = getElm("newTask").value;
    var status = false;
    var id = "";

    var task = new Task(id, name, status);
    if (name == '') {
        alert("Nhập giá trị!")
    } else {
        document.querySelector(".loader-wrap").style.display = "block";
        document.querySelector(".card__todo").style.display = "none";
        taskService.addtask(task)
            .then(function (res) {
                if (res.status == 201) {
                    getTask();
                    getElm("newTask").value = '';
                    document.querySelector(".loader-wrap").style.display = "none";
                    document.querySelector(".card__todo").style.display = "block";
                }
            })
            .catch(function (err) {
                alert(err);
            })
    }
});

function getTask() {
    taskService.getTask()
        .then(function (res) {
            taoBang(res.data);
        })
        .catch(function (err) {
            alert(err);
        })
}

function changeStatus(id) {

    taskService.getTaskupdate(id)
        .then(function (res) {
            updateStatus(res.data);
        })
        .catch(function (err) {
            alert(err);
        })
}

function updateStatus(task) {
    var id = task.id;
    var status = !task.status;
    var name = task.name;
    var task = new Task(id, name, status);

    document.querySelector(".loader-wrap").style.display = "block";
    document.querySelector(".card__todo").style.display = "none";
    taskService.updateTask(task)
        .then(function (res) {
            if (res.status == 200) {
                getTask();
                document.querySelector(".loader-wrap").style.display = "none";
                document.querySelector(".card__todo").style.display = "block";
            }
        })
        .catch(function (err) {
            alert(err);
        })
}


function deleteToDo(id) {
    document.querySelector(".loader-wrap").style.display = "block";
    document.querySelector(".card__todo").style.display = "none";
    taskService.deleteTask(id)
        .then(function (res) {
            if (res.status == 200) {
                getTask();
                document.querySelector(".loader-wrap").style.display = "none";
                document.querySelector(".card__todo").style.display = "block";
            }
        })
        .catch(function (err) {
            alert(err);
        })
}

function taoBang(listTask) {
    if (listTask) {
        var content = "";
        var content2 = "";
        listTask.forEach(function (item, index) {
            if (item.status == false) {
                content += `
                <li>
                    ${item.name}
                    <div class="buttons">
                        <button class="remove" onclick="deleteToDo(${item.id})">
                            <i class="fa fa-trash-alt"></i>
                        </button>
                        <button class="complete" onclick="changeStatus(${item.id})">
                            <i class="far fa-check-circle"></i>
                        </button>
                    </div>
                </li>
            `
            }
            if (item.status == true) {
                content2 += `
                    <li>
                        <span>${item.name}</span>
                        <div class="buttons">
                            <button class="remove" onclick="deleteToDo(${item.id})">
                                <i class="fa fa-trash-alt"></i>
                            </button>
                            <button class="complete" onclick="changeStatus(${item.id})">
                                <i class="fas fa-check-circle"></i>
                            </button>
                        </div>
                    </li >
                `
            }

        });
        getElm("completed").innerHTML = content2;
        getElm("todo").innerHTML = content;

    };
};


function TaskService() {
    this.getTask = function () {
        return axios({
            url: "https://5eaac75aa280ac0016656ce8.mockapi.io/api/tasks",
            method: "GET",
        })
    };

    this.getTaskupdate = function (id) {
        return axios({
            url: "https://5eaac75aa280ac0016656ce8.mockapi.io/api/tasks/" + id,
            method: "GET",
        })
    };

    this.deleteTask = function (id) {
        return axios({
            url: "https://5eaac75aa280ac0016656ce8.mockapi.io/api/tasks/" + id,
            method: "DELETE",
        })
    }

    this.addtask = function (task) {
        return axios({
            url: "https://5eaac75aa280ac0016656ce8.mockapi.io/api/tasks",
            method: "POST",
            data: task,
        })
    }

    this.updateTask = function (task) {
        return axios({
            url: "https://5eaac75aa280ac0016656ce8.mockapi.io/api/tasks/" + task.id,
            method: "PUT",
            data: task,
        })
    }
}
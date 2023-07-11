import React, { useState } from "react";
import "./Task.scss";
import { AiTwotoneDelete } from "react-icons/ai";
import { AiTwotoneEdit } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";

const Task = () => {
  const [tasks, setTasks] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [inputTask, setInputTask] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [editTaskId, setEditTaskId] = useState(null);

  const addTaskHandler = () => {
    if (inputTask.trim === "") {
      return;
    }

    const newTask = {
      id: new Date().getTime().toString(),
      text: inputTask,
      status: selectedStatus,
      time: new Date().toLocaleDateString(
        [],
        {
          hour: "numeric",
          minute: "2-digit",
        },
        []
      ),
    };

    setTasks([...tasks, newTask]);
    setInputTask("");
    setOpenModal(false);
  };

  const handleStatusChange = (taskId, newStatus) => {
    const updatedTask = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, status: newStatus };
      }
      return task;
    });
    setTasks(updatedTask);
  };

  const filteredTasks = tasks.filter((task) => {
    if (selectedStatus === "all") {
      return true;
    }
    return task.status === selectedStatus;
  });

  const deleteTask = (taskId) => {
    const updatedTask = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTask);
  };

  const editTask = (taskId) => {
    const editableTask = tasks.find((task) => task.id === taskId);
    if (editableTask) {
      setInputTask(editableTask.text);
      setEditTaskId(taskId);
      setOpenModal(true);
    }
  };

  const updateTask = () => {
    const updateTask = tasks.map((task) => {
      if (task.id === editTaskId) {
        return { ...task, text: inputTask };
      }
      return task;
    });
    setTasks(updateTask);
    setInputTask("");
    setOpenModal(false);
    setEditTaskId(null);
  };
  return (
    <div className="taskWrapper">
      <div className="taskHeader">
        <button onClick={() => setOpenModal(true)}>Add Task</button>

        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
        >
          <option value="all">All</option>
          <option
            value="incomplete"
            onClick={() => handleStatusChange(tasks.id, "incomplete")}
          >
            Incomplete
          </option>
          <option
            value="completed"
            onClick={() => handleStatusChange(tasks.id, "completed")}
          >
            Completed
          </option>
        </select>
      </div>

      {openModal && (
        <div className="modalWrapper">
          <div className="modalBox">
            <div className="closeBtn" onClick={() => setOpenModal(false)}>
              <AiOutlineClose />
            </div>

            <div className="form">
              <h1>Add Todo</h1>
              <label for="title">
                Title
                <input
                  type="text"
                  value={inputTask}
                  onChange={(e) => setInputTask(e.target.value)}
                  id="title"
                />
              </label>

              <label for="type">
                Status
                <select
                  id="type"
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                >
                  <option value="incomplete">Incomplete</option>
                  <option value="completed">Completed</option>
                </select>
              </label>

              <div className="modalBtns">
                {editTaskId ? (
                  <button className="addBtn" onClick={updateTask}>
                    Update
                  </button>
                ) : (
                  <button className="addBtn" onClick={addTaskHandler}>
                    Add Task
                  </button>
                )}
                <button
                  className="cancelBtn"
                  onClick={() => setOpenModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="taskBody">
        {tasks.length === 0 ? (
          <p className="noTodo">No Todos</p>
        ) : (
          filteredTasks.map((task) => (
            <div key={task.id} className="taskStyle">
              <div className="taskContent">
                <p>{task.text}</p>
                <p>{task.time}</p>
              </div>
              <div className="taskBtns">
                <div className="dltBtn" onClick={() => deleteTask(task.id)}>
                  <AiTwotoneDelete />
                </div>
                <div className="editBtn" onClick={() => editTask(task.id)}>
                  <AiTwotoneEdit />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Task;

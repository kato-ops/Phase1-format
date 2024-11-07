const addArea = document.getElementById("add-area");
const addBtn = document.getElementById("add-btn");
const todo = document.getElementById("todo");

const addTodo = () => {
    const li = document.createElement("li");

    const button = document.createElement("button");
    button.textContent = "完了";
    button.addEventListener("click", (event) => {
        event.currentTarget.parentNode.remove();
    });

    li.append(addArea.value, button);

    todo.appendChild(li);

    addArea.value = "";
};

addBtn.addEventListener("click", () => {
    if (addArea.value === "") {
        window.alert("空欄です！");
        return;
    }
    addTodo();
});
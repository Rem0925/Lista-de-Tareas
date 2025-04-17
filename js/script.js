document.addEventListener("DOMContentLoaded", function () {
    const Text = document.getElementById("LT");
    const Add_bt = document.getElementById("BT_Mas");
    const Sort_bt = document.getElementById("BT_Ord");
    const Contenedor = document.getElementById("List_Cont");
    var Lista = [];

    Add_bt.addEventListener("click", function () {
      if (Text.value != "") {
        const newItem = {
          text: Text.value,
          completed: false,
          date: new Date(),
        };
        Lista.push(newItem);
        Agregar(newItem);
        Text.value = "";
      }
    });
    Sort_bt.addEventListener("click", function () {
      Lista.sort((a, b) => {
        if (a.completed && !b.completed) return -1;
        if (!a.completed && b.completed) return 1;
        return a.date - b.date;
      });
      Render();
    });
    function Agregar(item) {
      const div = document.createElement("div");
      div.className = "List";
      div.innerHTML = ` 
      <input type="checkbox" class="Complete">
     <span>${item.text}</span>
      <button class="Quit">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="background-color"
          class="bi bi-trash-fill"
          viewBox="0 0 16 16"
        >
          <path
            d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"
          />
        </svg>
      </button>
      
`;
      Contenedor.appendChild(div);

      const checkbox = div.querySelector(".Complete");
      checkbox.checked = item.completed;
      checkbox.addEventListener("change", function () {
        item.completed = checkbox.checked;
        if (item.completed) {
          div.classList.add("completed");
        } else {
          div.classList.remove("completed");
        }
      });

      const quitButton = div.querySelector(".Quit");
      quitButton.addEventListener("click", function () {
        Contenedor.removeChild(div);
        Lista = Lista.filter((i) => i !== item);
      });
      if (item.completed) {
        div.classList.add("completed");
      }
    }

    function Render() {
      Contenedor.innerHTML = "";
      Lista.forEach((item) => Agregar(item));
    }
    Contenedor.addEventListener("click", function (e) {
      if (e.target && e.target.closest(".Quit")) {
        const listItem = e.target.closest(".List");
        Contenedor.removeChild(listItem);
      }
      if (e.target && e.target.classList.contains("Complete")) {
        const listItem = e.target.closest(".List");
        if (e.target.checked) {
          listItem.classList.add("completed");
        } else {
          listItem.classList.remove("completed");
        }
      }
    });
  });
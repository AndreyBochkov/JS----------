let inblocks = document.querySelectorAll("div.inblock");
let outblocks = document.querySelectorAll("div.outblock");

inblocks.forEach((el) => {
    let div_temp = document.createElement("div");
    div_temp.textContent = "Ввод:"
    el.prepend(div_temp);
});

outblocks.forEach((el) => {
    let div_temp = document.createElement("div");
    div_temp.textContent = "Вывод:"
    el.prepend(div_temp);
});

let obj1 = {
    name: "Object",
    "кириллица": "доступна",
    someAdress: {
        city: "CityName",
        street: "StreetName"
    },
};

let obj_workspace = document.getElementById("obj_workspace");

function updateObjWorkspace() {
    obj_workspace.innerHTML = "obj1 {<br>";
    for (let key in obj1) {
        if (typeof obj1[key] != "object") {
            obj_workspace.innerHTML += "  " + `${key}: ${obj1[key]},<br>`;
        } else {
            obj_workspace.innerHTML += `  ${key}: {<br>`;
            for (let key2 in obj1[key]) {
                obj_workspace.innerHTML += `    ${key2}: ${obj1[key][key2]},<br>`;
            }
            obj_workspace.innerHTML += `  }<br>`;
        }
    }
    obj_workspace.innerHTML += "}";
}

document.getElementById("obj_b_1").onclick = () => {
    let name_temp = prompt("Название значения без кавычек");
    let val_temp = prompt("Значение, которое будет записано");
    if (name_temp != null & name_temp != "" & val_temp != null & val_temp != "") {
        if (name_temp.split(".").length > 1) {
            let name_temp2 = name_temp.split(".");
            try {
                obj1[name_temp2[0]][name_temp2[1]] = JSON.parse(val_temp);
            } catch (SyntaxError) {
                obj1[name_temp2[0]][name_temp2[1]] = val_temp;
            }
        } else {
            try {
                obj1[name_temp] = JSON.parse(val_temp);
            } catch (SyntaxError) {
                obj1[name_temp] = val_temp;
            }
        }
        updateObjWorkspace();
    }
};

document.getElementById("obj_b_2").onclick = () => {
    let inp_temp = prompt("Название удаляемого значения");
    if (inp_temp.split(".").length > 1) {
        let inp_temp2 = inp_temp.split(".");
        if (inp_temp2[0] in obj1) {
            delete obj1[inp_temp2[0]][inp_temp2[1]];
        }
    } else {
        if (inp_temp in obj1) {
            delete obj1[inp_temp];
        }
    }
    updateObjWorkspace();
};

let getEls_workspace = document.querySelector("div.getEls_workspace");

document.getElementById("els_b_1").onclick = () => {
    onModal("Содержимое", "prompt", `
        if (modal_input != "") {
            let temp = document.createElement("div");
            temp.innerHTML = modal_input;
            getEls_workspace.prepend(temp);
        }`);
};

document.getElementById("els_b_2").onclick = () => {
    onModal("Содержимое", "prompt", `
        if (modal_input != "") {
            let temp = document.createElement("div");
            temp.innerHTML = modal_input;
            getEls_workspace.append(temp);
        }`);
};

document.getElementById("els_b_3").onclick = () => {
    onModal("Содержимое", "prompt", `
        if (modal_input != "") {
            let temp = document.createElement("div");
            temp.innerHTML = modal_input;
            getEls_workspace.before(temp);
        }`);
};

document.getElementById("els_b_4").onclick = () => {
    onModal("Содержимое", "prompt", `
        if (modal_input != "") {
            let temp = document.createElement("div");
            temp.innerHTML = modal_input;
            getEls_workspace.after(temp);
        }`);
};

document.getElementById("els_b_5").onclick = () => {
    onModal("Точно очистить?", "confirm", `
        document.querySelector("div.workspace_wrap").innerHTML = &#96;
        <div class="getEls_workspace output">
            Контейнер (редактируемый)
        </div>&#96;;
        getEls_workspace = document.querySelector("div.getEls_workspace");`);
};

let input_c_1 = document.querySelector("#input_c_1");
let input_a = document.querySelector(".input a");

input_c_1.addEventListener("input", () => {
    if (input_c_1.checked) {
        input_a.setAttribute("href", "app.js");
        input_a.textContent = "Ссылка на app.js";
    } else {
        input_a.setAttribute("href", "main.css");
        input_a.textContent = "Ссылка на main.css";
    }
});

document.querySelector(".input_c_1").onclick = () => {
    if(document.selection && document.selection.empty) {
        document.selection.empty();
    } else if(window.getSelection) {
        var sel = window.getSelection();
        sel.removeAllRanges();
    }
};

let mouseEvents_workspace = document.querySelector(".mouseEvents_workspace");
let today = new Date();
let mouseEvents_pos = document.querySelector(".mousePosition");

mouseEvents_workspace.onmouseover = () => {
    mouseEvents_log(`${getTime()}: Указатель мыши находится на поле.<br>`);
};

mouseEvents_workspace.onclick = (event) => {
    mouseEvents_log(`${getTime()}: Вы нажали на координаты: X ${event.clientX}, Y ${event.clientY}.<br>`);
};

mouseEvents_workspace.onmouseout = () => {
    mouseEvents_log(`${getTime()}: Указатель мыши более не находится на поле.<br>`);
};

mouseEvents_workspace.oncontextmenu = (event) => {
    event.preventDefault();
    onModal("Нет.");
};

document.onmousemove = (event) => {
    mouseEvents_pos.textContent = `X ${event.clientX}, Y ${event.clientY}`;
};

let canME_log = true;

function toggleCanME_log() {
    if (canME_log) {
        mouseEvents_log(`${getTime()}: Лог выключен.<br>`);
        canME_log = false;
        document.querySelector(".mouseEvents .output").classList.add("disabled");
    } else {
        canME_log = true;
        mouseEvents_log(`${getTime()}: Лог включен.<br>`);
        document.querySelector(".mouseEvents .output").classList.remove("disabled");
    }
}

function mouseEvents_log(str, truClear) {
    if (canME_log) {
        if (mouseEvents_workspace.querySelectorAll("br").length >= 20 | truClear) {
            mouseEvents_workspace.innerHTML = "";
        }
        mouseEvents_workspace.innerHTML += str;
    }
}

function getTime() {
    today = new Date();
    return today.toLocaleString().split(" ")[1];
}

let key_t_1 = document.getElementById("key_t_1");

/*key_t_1.onchange = () => {
    onModal("Что-то изменилось");
};*/

key_t_1.oncopy = (event) => {
    event.preventDefault();
    onModal("Нельзя!");
    key_t_1.value = "А теперь попробуй вырезать";
};

key_t_1.oncut = (event) => {
    event.preventDefault();
    onModal("И вырезать нельзя!");
    key_t_1.value = "А вставить текст, кстати, можно";
};

key_t_1.onkeydown = (event) => {
    if (!event.repeat) {
        key_t_1.style.backgroundColor = "lightblue";
        setTimeout(() => {
            key_t_1.style.backgroundColor = "white";
        }, 300);
    }
}

let storage_workspace = document.querySelector(".storage_workspace");
let temp = "";

document.getElementById("storage_b_1").onclick = () => {
    onModal("Ключ", "prompt", `
        temp = modal_input;
        onModal("Значение", "prompt", &#96;
            if (Boolean(temp) & Boolean(modal_input)) {
                localStorage.setItem(temp, modal_input);
                updateStorageWorkspace();
            }&#96;);`);
};

document.getElementById("storage_b_2").onclick = () => {
    onModal("Ключ", "prompt", `
        if (Boolean(modal_input)) {
            localStorage.removeItem(modal_input);
            updateStorageWorkspace()
        }`);
};

document.getElementById("storage_b_3").onclick = () => {
    localStorage.clear();
    updateStorageWorkspace();
};

function updateStorageWorkspace() {
    if (localStorage.length != 0) {
        storage_workspace.innerHTML = "";
        for (let i = 0;i < localStorage.length;i ++) {
            storage_workspace.innerHTML += `${localStorage.key(i)}: ${localStorage.getItem(localStorage.key(i))}<br>`;
        }
    } else {
        storage_workspace.innerHTML =
        "Пусто. Добавив значение, вы сохраните его в памяти устройства, и оно будет доступно даже после перезагрузки браузера";
    }
}

//Код добавлять сверху ▲--------------------------------------------------------------------▲

let upscroll = document.querySelector(".upscroll");

window.addEventListener("scroll", () => {
    if (scrollY > 10) {
        upscroll.classList.add("upscroll_visible");
    } else {
        upscroll.classList.remove("upscroll_visible");
    }
});

upscroll.onclick = () => {
    window.scrollTo(0, 0);
}

let modal = document.querySelector(".modal_background");
let modal_input = "";

document.onkeydown = (event) => {
    if (!event.repeat) {
        if (event.key == "Escape" & modal.style.display != "none") {
            offModal();
        } else if (event.key == "Enter" & modal.style.display != "none") {
            modal.querySelector("button").onclick();
        }
    }
};

function onModal(text, type, e) {
    modal.style.display = "block";
    
    if (type == "confirm") {
        text += "<br><button class='button' onclick='offModal();" + String(e) + "'>Да</button><button class='button' onclick='offModal()'>Нет</button>";
    } else if (type == "prompt") {
        text += "<br><input type='text' id='modal_input'><br><button class='button' onclick='modal_input = document.getElementById(&quot;modal_input&quot;).value;offModal();" + String(e) + "'>OK</button>"
    } else {
        text += "<br><button class='button' onclick='offModal();'>OK</button>";
    }
    modal.querySelector("p.modal_text").innerHTML = text;
}

function offModal() {
    modal.style.display = "none";
}

function updateDraggables() {
    let draggables = document.querySelectorAll(".draggable");
    let drag = new Array(draggables.length);

    for(let i = 0;i < draggables.length;i ++) {
        drag[i] = false;

        draggables[i].onmousedown = () => {
            drag[i] = true;
        }

        draggables[i].onmousemove = (e) => {
            if (drag[i]) {
                draggables[i].style.top = `${e.clientY+scrollY-25}px`;
                draggables[i].style.left = `${e.clientX-25}px`;
            }
        };
    }
    
    document.onmouseup = () => {
        for (let j = 0;j < drag.length;j ++) {
            drag[j] = false;
        }
    };

    document.ondragend = document.onmouseup;
}
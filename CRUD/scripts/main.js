const inputGet1Id = document.getElementById('inputGet1Id');
const btnGet1 = document.getElementById('btnGet1');

const inputPostNombre = document.getElementById('inputPostNombre');
const inputPostApellido = document.getElementById('inputPostApellido');
const btnPost = document.getElementById('btnPost');

const inputPutId = document.getElementById('inputPutId');
const btnPut = document.getElementById('btnPut');

const inputDelete = document.getElementById('inputDelete');
const btnDelete = document.getElementById('btnDelete');

const resultDiv = document.getElementById('results');

btnGet1.addEventListener('click', () => {
    const id = inputGet1Id.value;
    getUsers(id);
    inputGet1Id.value = '';
});

btnDelete.addEventListener('click', () => {
    const id = inputDelete.value;
    deleteRecord(id);
    inputDelete.value = '';
});

btnPost.addEventListener('click', () => {
    const name = inputPostNombre.value;
    const lastname = inputPostApellido.value;
    addRecord(name, lastname);
    inputPostNombre.value = '';
    inputPostApellido.value = '';
});

btnPut.addEventListener('click', () => {
    const id = inputPutId.value;
    updateRecord(id);
    inputPutId.value = '';
});

function getUsers(id) {
    if (id) {
        fetch(`https://6544f4db5a0b4b04436d5096.mockapi.io/users/${id}`)
            .then(response => response.json())
            .then(data => {
                resultDiv.textContent = JSON.stringify(data, null, 2);
            });
    } else {
        fetch('https://6544f4db5a0b4b04436d5096.mockapi.io/users')
            .then(response => response.json())
            .then(data => {
                resultDiv.textContent = JSON.stringify(data, null, 2);
            });
    }
}

function addRecord(name, lastname) {
    fetch('https://6544f4db5a0b4b04436d5096.mockapi.io/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, lastname })
    })
        .then(response => response.json())
        .then(data => {
            console.log('Registro creado:', data);
            getUsers();
        });
}

function updateRecord(id) {
    fetch(`https://6544f4db5a0b4b04436d5096.mockapi.io/users/${id}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('modalName').value = data.name;
            document.getElementById('modalLastname').value = data.lastname;
            var myModal = new bootstrap.Modal(document.getElementById('updateModal'));
            myModal.show();
        });

    window.updateUser = function() {
        const newName = document.getElementById('modalName').value;
        const newLastname = document.getElementById('modalLastname').value;
        fetch(`https://6544f4db5a0b4b04436d5096.mockapi.io/users/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: newName, lastname: newLastname })
        })
            .then(response => response.json())
            .then(data => {
                console.log('Registro modificado:', data);
            });
    };
}

function deleteRecord(id) {
    fetch(`https://6544f4db5a0b4b04436d5096.mockapi.io/users/${id}`, {
        method: 'DELETE',
    })
        .then(response => response.json())
        .then(data => {
            console.log('Registro eliminado:', data);
            getUsers();
        });
}
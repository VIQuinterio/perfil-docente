document.addEventListener('DOMContentLoaded', function() {
    // Carrega os dados do localStorage e exibe na tela
    loadProfileData();

    // Adiciona evento de submit ao formulário
    document.getElementById('profileForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Previne o envio padrão do formulário

        // Obtém os valores dos campos do formulário
        let name = document.getElementById('name').value;
        let user = document.getElementById('user').value;
        let bio = document.getElementById('bio').value;

        // Salva os dados no localStorage
        localStorage.setItem('profileName', name);
        localStorage.setItem('profileUser', user);
        localStorage.setItem('profileBio', bio);

        // Atualiza a exibição dos dados
        loadProfileData();
    });

    function loadProfileData() {
        // Obtém os dados do localStorage
        let name = localStorage.getItem('profileName');
        let user = localStorage.getItem('profileUser');
        let bio = localStorage.getItem('profileBio');

        // Atualiza a exibição dos dados se existirem
        if (name) document.getElementById('displayName').textContent = name;
        if (user) document.getElementById('displayUser').textContent = user;
        if (bio) document.getElementById('displayBio').textContent = bio;
    }
});
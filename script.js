document.addEventListener("DOMContentLoaded", function () {
    const followButtons = document.querySelectorAll(".follow-btn");
    const postForm = document.getElementById('postForm');
    const textInput = document.getElementById('description');
    const imageInput = document.getElementById('dropzone-file');
    const previewImage = document.getElementById('previewImage');
    const postsContainer = document.querySelector('.posts');
    const dragImage = document.getElementById('dragImage');
    const label = document.getElementById('labelImage');
    let editingPostId = null;

    const savePost = () => {
        const content = textInput.value;
        const imageData = previewImage.src || '';
        if (content) {
            const posts = JSON.parse(localStorage.getItem('posts')) || [];
            if (editingPostId) {
                const postIndex = posts.findIndex(post => post.id === editingPostId);
                posts[postIndex] = { id: editingPostId, content, imageData, date: new Date().toISOString(), edited: true };
            } else {
                const postId = Date.now().toString();
                posts.push({ id: postId, content, imageData, date: new Date().toISOString(), edited: false });
            }
            localStorage.setItem('posts', JSON.stringify(posts));
            resetForm();
            renderPosts();
        }
    };

    const resetForm = () => {
        textInput.value = '';
        imageInput.value = '';
        previewImage.style.display = 'none';
        editingPostId = null;
    };

    const renderPosts = () => {
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        postsContainer.innerHTML = '';
        posts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.className = 'post bg-white p-4 rounded-lg shadow mb-4';
            postElement.innerHTML = `
                <div class="post-header flex items-center justify-between mb-2">
                    <div class="flex items-center">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQt0jzNRAfoSXlceYMhXwqhZpXyrZqz45eOcw&s" alt="User Avatar" class="rounded-full w-10 h-10 object-cover">
                        <div class="post-user ml-2 flex-grow">
                            <h2 class="font-extrabold">Billie<span class="verified">✔</span></h2>
                            <p class="text-gray-400 text-sm">@bibi</p>
                            <p class="post-date text-gray-400 text-sm">${new Date(post.date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}</p>
                            ${post.edited ? '<p class="edited text-gray-600 text-sm">Edited</p>' : ''}
                        </div>
                    </div>
                    <div class="options">                            
                        <button class="btn-options dropbtn" type="button" onclick="myFunction('${post.id}')"></button>
                        <div class="dropdown-content" id="myDropdown-${post.id}">
                            <a href="#" onclick="editPost('${post.id}')">Edit</a>
                            <a href="#" onclick="deletePost('${post.id}')">Delete</a>
                        </div>
                    </div>
                </div>
                <div class="post-content">
                    <p>${post.content}</p>
                    ${post.imageData ? `<img src="${post.imageData}" alt="Post Image" class="w-full mt-2 rounded-lg">` : ''}
                </div>
                <div class="flex">
                    <button type="button" class="Like inline-flex items-center text-gray-500 font-medium text-sm px-5 py-2.5 text-center me-2 mb-2">
                        <svg class="me-1 -ms-1 w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="30" height="30" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M18 21H8V8l7-7l1.25 1.25q.175.175.288.475t.112.575v.35L15.55 8H21q.8 0 1.4.6T23 10v2q0 .175-.037.375t-.113.375l-3 7.05q-.225.5-.75.85T18 21M6 8v13H2V8z"  clip-rule="evenodd"/></svg>
                        Like
                    </button>
                    <button type="button" class="Comment inline-flex items-center text-gray-500 font-medium text-sm px-5 py-2.5 text-center me-2 mb-2">
                        <svg class="me-1 -ms-1 w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="30" height="30" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M12 3c5.5 0 10 3.58 10 8s-4.5 8-10 8c-1.24 0-2.43-.18-3.53-.5C5.55 21 2 21 2 21c2.33-2.33 2.7-3.9 2.75-4.5C3.05 15.07 2 13.13 2 11c0-4.42 4.5-8 10-8"  clip-rule="evenodd"/></svg>
                        Comment
                    </button>
                    <button type="button" class="Share inline-flex items-center text-gray-500 font-medium text-sm px-5 py-2.5 text-center me-2 mb-2">
                    <svg class="me-1 -ms-1 w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="30" height="30" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M11 9V5l7 7l-7 7v-4.1c-5 0-8.5 1.6-11 5.1c1-5 4-10 11-11m6-1V5l7 7l-7 7v-3l4-4z"  clip-rule="evenodd"/></svg>
                    Share</button>
                </div>
            `;
            postsContainer.appendChild(postElement);
        });

        // Adicionar os event listeners após os posts serem renderizados
        const likeButtons = document.querySelectorAll('.Like');
        likeButtons.forEach(button => {
            button.addEventListener("click", () => {
                if (button.classList.contains('text-blue-500')) {
                    button.classList.remove('text-blue-500');
                    button.classList.add('text-gray-500');
                } else {
                    button.classList.remove('text-gray-500');
                    button.classList.add('text-blue-500');
                }
            });
        });

        const commentButtons = document.querySelectorAll('.Comment');
        commentButtons.forEach(button => {
            button.addEventListener("click", () => {
                if (button.classList.contains('text-red-600')) {
                    button.classList.remove('text-red-600');
                    button.classList.add('text-gray-500');
                } else {
                    button.classList.remove('text-gray-500');
                    button.classList.add('text-red-600');
                }
            });
        });

        const shareButtons = document.querySelectorAll('.Share');
        shareButtons.forEach(button => {
            button.addEventListener("click", () => {
                if (button.classList.contains('text-green-600')) {
                    button.classList.remove('text-green-600');
                    button.classList.add('text-gray-500');
                } else {
                    button.classList.remove('text-gray-500');
                    button.classList.add('text-green-600');
                }
            });
        });
    };

    window.editPost = id => {
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        const post = posts.find(post => post.id === id);
        textInput.value = post.content;
        previewImage.src = post.imageData || '';
        previewImage.style.display = post.imageData ? 'block' : 'none';
        dragImage.style.display = 'none';
        label.className = 'flex flex-col items-center justify-center w-full cursor-pointer dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600'

        editingPostId = id;
    };

    window.deletePost = id => {
        let posts = JSON.parse(localStorage.getItem('posts')) || [];
        posts = posts.filter(post => post.id !== id);
        localStorage.setItem('posts', JSON.stringify(posts));
        renderPosts();
    };


    window.myFunction = function(postId) {
        document.getElementById(`myDropdown-${postId}`).classList.toggle("show");
    };

    postForm.addEventListener('submit', e => {
        e.preventDefault();
        savePost();
    });

    imageInput.addEventListener('change', () => {
        const file = imageInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = e => {
                previewImage.src = e.target.result;
                dragImage.style.display = 'none';
                label.className = 'flex flex-col items-center justify-center w-full h-64 cursor-pointer dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600'
                previewImage.style.display = 'block';
            };
            reader.readAsDataURL(file);
        }
    });

    followButtons.forEach(button => {
        button.addEventListener("click", () => {
            if (button.classList.contains("following")) {
                button.classList.remove("following");
                button.textContent = "Follow";
                button.style.backgroundColor = "#FF161F";
            } else {
                button.classList.add("following");
                button.textContent = "Following";
                button.style.backgroundColor = "#FBB900";
            }
        })
    });
    renderPosts();
});

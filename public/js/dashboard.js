const newFormhandler = async (event) => {
event.preventDefault(); {
    const title = document.querySelector("#blog-name").value.trim();

  const content = document.querySelector("#blog-desc").value.trim();

    if (title && content) {
        const response = await fetch("/api/blogs", {
            method: "POST",
            body: JSON.stringify({ title, content }),
            headers: { "Content-Type": "application/json" },
        });
        if (response.ok) {
            document.location.replace("/dashboard");
        } else {
            alert("Failed to create blog");
        }
    }
}
}

document.querySelector(".new-blog-form").addEventListener("submit", newFormhandler);
const deleteBlogHandler = async (event) => {
    if (event.target.hasAttribute("data-id")) {
        const id = event.target.getAttribute("data-id");
        const response = await fetch(`/api/blogs/${id}`, {
            method: "DELETE",
        });
        if (response.ok) {
            document.location.replace("/dashboard");
        } else {
            alert("Failed to delete blog");
        }
    }
};
document.querySelector(".new-blog-form").addEventListener("edit", newFormhandler);
const editBlogHandler = async (event) => {
    if (event.target.hasAttribute("data-id")) {
        const id = event.target.getAttribute("data-id");
        const response = await fetch(`/api/blogs/${id}`, {
            method: "PUT",
        });
        if (response.ok) {
            document.location.replace("/dashboard");
        } else {
            alert("Failed to edit blog");
        }
    }
};

document.getElementById('new-blog').addEventListener('click', function () {
    document.querySelector('.new-blog-form').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
    this.style.display = 'none'; // Hide the "+ New Blog" button
});

document.getElementById('overlay').addEventListener('click', function () {
    document.querySelector('.new-blog-form').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('new-blog').style.display = 'block'; // Show the "+ New Blog" button
});

document.getElementById('blog-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const title = document.getElementById('blog-name').value;
    const description = document.getElementById('blog-desc').value;

    if (title && description) {
        const blog = {
            title: title,
            description: description,
            id: Date.now()
        };

        saveBlog(blog);
        addBlogToDOM(blog);

        // Hide the form and overlay
        document.querySelector('.new-blog-form').style.display = 'none';
        document.getElementById('overlay').style.display = 'none';
        document.getElementById('new-blog').style.display = 'block'; // Show the "+ New Blog" button

        // Clear the form
        document.getElementById('blog-form').reset();
    }
});

function saveBlog(blog) {
    let blogs = JSON.parse(localStorage.getItem('blogs')) || [];
    blogs.push(blog);
    localStorage.setItem('blogs', JSON.stringify(blogs));
}

function loadBlogs() {
    const blogs = JSON.parse(localStorage.getItem('blogs')) || [];
    blogs.forEach(blog => addBlogToDOM(blog));
}

function addBlogToDOM(blog) {
    const blogContainer = document.getElementById('blog-container');
    const newPost = document.createElement('div');
    newPost.classList.add('blog-post');
    newPost.setAttribute('data-id', blog.id);
    newPost.innerHTML = `
        <h5>${blog.title}</h5>
        <p>${blog.description}</p>
        <button class="btn btn-secondary btn-update">Update</button>
        <button class="btn btn-danger btn-delete">Delete</button>
    `;

    blogContainer.insertBefore(newPost, blogContainer.firstChild);

    // Add event listeners for the new buttons
    newPost.querySelector('.btn-update').addEventListener('click', function () {
        updateBlog(newPost);
    });
    newPost.querySelector('.btn-delete').addEventListener('click', function () {
        deleteBlog(newPost);
    });
}

function updateBlog(postElement) {
    const blogId = postElement.getAttribute('data-id');
    const title = postElement.querySelector('h5').innerText;
    const description = postElement.querySelector('p').innerText;

    // Populate the form with the existing data
    document.getElementById('blog-name').value = title;
    document.getElementById('blog-desc').value = description;

    // Show the form and overlay
    document.querySelector('.new-blog-form').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
    document.getElementById('new-blog').style.display = 'none';

    // On form submission, update the blog post
    document.getElementById('blog-form').addEventListener('submit', function handler(event) {
        event.preventDefault();

        const updatedTitle = document.getElementById('blog-name').value;
        const updatedDescription = document.getElementById('blog-desc').value;

        postElement.querySelector('h5').innerText = updatedTitle;
        postElement.querySelector('p').innerText = updatedDescription;

        // Update localStorage
        let blogs = JSON.parse(localStorage.getItem('blogs'));
        const blogIndex = blogs.findIndex(blog => blog.id == blogId);
        blogs[blogIndex].title = updatedTitle;
        blogs[blogIndex].description = updatedDescription;
        localStorage.setItem('blogs', JSON.stringify(blogs));

        // Hide the form and overlay
        document.querySelector('.new-blog-form').style.display = 'none';
        document.getElementById('overlay').style.display = 'none';
        document.getElementById('new-blog').style.display = 'block'; // Show the "+ New Blog" button

        // Clear the form
        document.getElementById('blog-form').reset();

        // Remove this handler after update
        document.getElementById('blog-form').removeEventListener('submit', handler);
    });
}

function deleteBlog(postElement) {
    const blogId = postElement.getAttribute('data-id');
    postElement.remove();

    // Remove from localStorage
    let blogs = JSON.parse(localStorage.getItem('blogs'));
    blogs = blogs.filter(blog => blog.id != blogId);
    localStorage.setItem('blogs', JSON.stringify(blogs));
}

// Load blogs on page load
document.addEventListener('DOMContentLoaded', loadBlogs);


document.querySelector(".blog-list").addEventListener("click", deleteBlogHandler);
document.querySelector(".new-blog-form").addEventListener("submit", newFormhandler);
document.querySelector(".blog-list").addEventListener("click", editBlogHandler);


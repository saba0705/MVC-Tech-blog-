const commentFormhandler = async (event) => {
    event.preventDefault();
    const comment = document.querySelector('#comment').value.trim();
    const blog_id = document.querySelector('#blog_id').value.trim();
    if (comment && blog_id) {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({ comment, blog_id }),
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
            document.location.reload();
        }
        else {
            alert('Failed to create comment');
        }
    }
}

document.querySelector('.comment-form').addEventListener('submit', commentFormhandler);
const deleteCommentHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');
        const response = await fetch(`/api/comments/${id}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            document.location.reload();
        }
        else {
            alert('Failed to delete comment');
        }
    }
}

document.querySelector('.comment-list').addEventListener('click', deleteCommentHandler);
const deleteBlogHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');
        const response = await fetch(`/api/blogs/${id}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            document.location.replace('/dashboard');
        }
        else {
            alert('Failed to delete blog');
        }
    }
}

document.querySelector('.blog-list').addEventListener('click', deleteBlogHandler);
const updateBlogHandler = async (event) => {
    event.preventDefault();
    const title = document.querySelector('#title').value.trim();
    const content = document.querySelector('#content').value.trim();
    const id = document.querySelector('#blog_id').value.trim();
    if (title && content && id) {
        const response = await fetch(`/api/blogs/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ title, content }),
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
            document.location.replace('/dashboard');
        }
        else {
            alert('Failed to update blog');
        }
    }
}


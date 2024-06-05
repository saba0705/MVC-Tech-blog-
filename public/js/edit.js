const editBlogHandler = async (event) => {
       const title = document.getElementById('blog-name').value;
         const content = document.getElementById('blog-desc').value;
            const id = document.getElementById('blog-id').value;
        const response = await fetch(`/api/blogs/${id}`, {
            method: "PUT",
            body: JSON.stringify({ title, content }),
            headers: { "Content-Type": "application/json" },
        });
        if (response.ok) {
            document.location.replace("/dashboard");
        } else {
            alert("Failed to edit blog");
        }
    }

document.querySelector("#blog-form").addEventListener("submit", editBlogHandler);
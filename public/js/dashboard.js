const newFormhandler = async (event) => {
    event.preventDefault();
    {
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
  };
  
  document
    .querySelector(".new-blog-form")
    .addEventListener("submit", newFormhandler);
  
  document.getElementById("new-blog").addEventListener("click", function () {
    document.querySelector(".new-blog-form").style.display = "block";
    document.getElementById("overlay").style.display = "block";
    this.style.display = "none"; // Hide the "+ New Blog" button
  });
  
  document.getElementById("overlay").addEventListener("click", function () {
    document.querySelector(".new-blog-form").style.display = "none";
    document.getElementById("overlay").style.display = "none";
    document.getElementById("new-blog").style.display = "block"; // Show the "+ New Blog" button
  });
  
  document
    .querySelector(".blog-container")
    .addEventListener("click", async (e) => {
      if (e.target.matches(".delete")) {
        const blogid = e.target.dataset.id;
  
        const response = await fetch(`/api/blogs/${blogid}`, {
          method: "DELETE",
        });
        if (response.ok) {
          document.location.replace("/dashboard");
        } else {
          alert("Failed to delete blog");
        }
      }
    });
  
  document
    .querySelector(".new-blog-form")
    .addEventListener("submit", newFormhandler);
import consumer from "./consumer"

document.addEventListener("turbo:load", () => {
  const commentsContainer = document.querySelector("#comments")
  if (!commentsContainer) {
    console.log("⚠️ No #comments div found")
    return
  }

  consumer.subscriptions.create(
    { channel: "CommentChannel", blog_slug: commentsContainer.dataset.blogSlug },
    {
      connected() {
        console.log("✅ Connected to CommentChannel")
      },

      disconnected() {
        console.log("❌ Disconnected from CommentChannel")
      },

      received(data) {
        console.log("📩 Got data:", data)
        this.appendLine(data)
      },

      appendLine(data) {
        const html = this.createLine(data)
        commentsContainer.insertAdjacentHTML("beforeend", html)
          document.querySelectorAll(".comment-card").forEach(card => {
    // If card is new (e.g., just inserted), add animation class
    const commentID= card.dataset.commentId;
   const  UserID=card.dataset.currentUserId;
   console.log("📩 commentID:", commentID)
    console.log("📩 userID:", UserID)
   if (commentID==UserID) {
    card.classList.add("own-comment");
   }else{
    card.classList.add("other-comment");
   }
    if (!card.classList.contains("animate-in")) {
      setTimeout(() => {
        card.classList.add("animate-in");
      }, 50); // small delay so the browser registers the transition
    }
  });
      },

     createLine(data) {
  return `
    <div class="comments">
      <div class="comment-card" 
           data-comment-id="${data.user_id}" 
           data-current-user-id="${data.current_user_id}">
        <div class="row">
          <div class="col-md-1">
            <div class="profile-pic">
              <img src="${data.profile_picture_url}" alt="${data.sent_by}" class="profile-pic" />
            </div>
          </div>
          <div class="col-md-11">
          <div class="texts">
            <h3>${data.sent_by}</h3>
            <p>${data.body}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
}

    }
  )
})

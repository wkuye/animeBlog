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
       
      },

 createLine(data) {
   const currentUserId = commentsContainer.dataset.currentUserId
  const isOwn = String(data.comment_user_id) === String(currentUserId)

  console.log("user_id", data.comment_user_id)
console.log("current_user_id", currentUserId)
  return `
    <div class="comments">
      <div class="comment-card ${isOwn ? 'own-comment' : 'other-comment'}"
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

class CommentsController < ApplicationController

  def create
     blog =  Blog.find_by!(slug: params[:blog_slug])
    @comment = blog.comments.build(comment_params)
    @comment.user = current_user
  if @comment.save
    CommentChannel.broadcast_to(
      blog,
      {
      comment_user_id: @comment.user_id,
    profile_picture_url: url_for( current_user.profile_picture),
    sent_by: current_user.name,
    body: @comment.content
  }
    )
head :no_content
  else
    render json: { errors: @comment.errors.full_messages }, status: :unprocessable_entity
  end

  end

  def comment_params
    params.require(:comment).permit(:content)
  end
end

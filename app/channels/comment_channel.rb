class CommentChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "some_channel"
    comment= Blog.find_by(slug: params[:blog_slug])
    stream_for comment
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end

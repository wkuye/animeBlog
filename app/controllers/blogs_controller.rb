class BlogsController < ApplicationController
  before_action :set_blog, only: %i[ show edit destroy update]
  layout "blog"
  access all: [:show, :index], user: {except: [:destroy, :create, :edit, :new]}, site_admin: :all
  # GET /blogs or /blogs.json
  def index
    @blogs = Blog.all
  end

  # GET /blogs/1 or /blogs/1.json
  def show
    @title_default= @blog.title
  end

  

  # GET /blogs/new
  def new
    @blog = Blog.new
  end



  # GET /blogs/1/edit
  def edit
    @blog_image=@blog.image
    @blog_author=@blog.author
  end

  # POST /blogs or /blogs.json
  def create

    @blog = Blog.new(blog_params)
    respond_to do |format|
      if @blog.save
        format.html { redirect_to blogs_path, notice: "Blog was successfully created." }
      else
        format.html { render :new, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /blogs/1 or /blogs/1.json
  def update
    respond_to do |format|
      if @blog.update(blog_params)
        format.html { redirect_to blog_url(@blog), notice: "Blog was successfully updated." }

      else
        format.html { render :edit, status: :unprocessable_entity }

      end
    end
  end

  # DELETE /blogs/1 or /blogs/1.json
  def destroy
    @blog.destroy!

    respond_to do |format|
      format.html { redirect_to blogs_url, notice: "Blog was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  def toggle_status
    if @blog.draft?
      @blog.published!
    elsif @blog.published?
      @blog.draft!
    end
    redirect_to blogs_url
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_blog
      @blog = Blog.friendly.find(params[:slug])
    end

    # Only allow a list of trusted parameters through.
    def blog_params
      params.require(:blog).permit(:body, :title, :description, :image, :author, :read, :blog_image)
    end
end

module SetSource
  extend ActiveSupport::Concern
  
included do
  before_action :sessions_function
end

  def sessions_function
    session[:source]= params[:q] if params[:q]
  end
end
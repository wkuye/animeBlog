module DefaultPageContent extend ActiveSupport::Concern
  included do
before_action :default_title
  end 
  
def default_title
 @title_default= 'Anime Blog'
end

end
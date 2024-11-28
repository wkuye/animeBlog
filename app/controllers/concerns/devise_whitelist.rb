module DeviseWhitelist
  extend ActiveSupport::Concern
  included do
    before_action :configure_permitted_parameters, if: :devise_controller?
  end
  ## By default, Devise only permits a few parameters like email and password. If you have custom fields in your users table (e.g., name or username), you need to explicitly permit them. Otherwise, they will be ignored and not saved to the database.
  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:signup , keys: [:name, :username])
    devise_parameter_sanitizer.permit(:account_update , keys: [:name, :username])
  end
end
class ContactMailer < ApplicationMailer
  default to: "wkuye7@gmail.com"

  def contact_email(name, email, message)
    @name = name
    @message = message
    mail(from: email, subject: "New message from #{name}")
  end
end

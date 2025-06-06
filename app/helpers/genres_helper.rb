module GenresHelper
def first_image(id)


  genre = Genre.find_by_id(id)
  genre_anime_sample = genre&.animes&.first

  genre_anime_image = if genre_anime_sample&.thumb_image.present?
                        genre_anime_sample.thumb_image
  else
                        "empty_folder.jpg"
  end

  genre_anime_image
end

def second_image(id)
  genre = Genre.find_by_id(id)
  genre_anime_sample = genre&.animes&.second

  genre_anime_image = if genre_anime_sample&.thumb_image.present?
                        genre_anime_sample.thumb_image
  else
                        "empty_folder.jpg"
  end

  genre_anime_image
end

def third_image(id)

  genre = Genre.find_by_id(id)
  genre_anime_sample = genre&.animes&.third

  genre_anime_image = if genre_anime_sample&.thumb_image.present?
                        genre_anime_sample.thumb_image
  else
                        "empty_folder.jpg"
  end

  genre_anime_image
end

 def genre_anime_count(id)
     genre=Genre.find_by_id(id)
   genre_anime=genre.animes
   genre_count=genre_anime.count
   genre_count
 end

 def random_image(id)
  genre = Genre.find_by_id(id)
  genre_anime_sample = genre&.animes&.sample

  genre_anime_image = if genre_anime_sample&.thumb_image.present?
                        genre_anime_sample.thumb_image
  else
                        "default_avatar.jpg"
  end

  genre_anime_image
 end
end

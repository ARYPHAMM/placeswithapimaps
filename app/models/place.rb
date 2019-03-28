class Place < ApplicationRecord

extend Geocoder::Model::ActiveRecord

  geocoded_by :name
  reverse_geocoded_by :latitude, :longitude
end

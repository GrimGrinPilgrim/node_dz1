###
# HAML
###

set :haml, {
  :attr_wrapper =>  "\"",
}

###
# Compass
###

# Change Compass configuration
# compass_config do |config|
#   config.output_style = :compact
# end

###
# Page options, layouts, aliases and proxies
###

page "-i.html", :layout => false
# page "/path/to/file.html", :layout => :otherlayout

# A path which all have the same layout
# with_layout :admin do
#   page "/admin/*"
# end

# Proxy (fake) files
# page "/this-page-has-no-template.html", :proxy => "/template-file.html" do
#   @which_fake_page = "Rendering a fake page with a variable"
# end

###
# Helpers
###

# Automatic image dimensions on image_tag helper
# activate :automatic_image_sizes

# Methods defined in the helpers block are available in templates
# helpers do
#   def some_helper
#     "Helping"
#   end
# end

set :js_dir, 'assets/javascripts'
set :css_dir, 'assets/stylesheets'
set :fonts_dir, 'assets/fonts'
set :images_dir, 'assets/images'
set :partials_dir, 'shared'

activate :livereload
activate :autoprefixer
# activate :directory_indexes

# Build-specific configuration
configure :build do
  # activate :minify_css
  # activate :minify_javascript
  # activate :cache_buster
  # activate :relative_assets
  # require "middleman-smusher"
  # activate :smusher
  # set :http_path, "/Content/images/"
end

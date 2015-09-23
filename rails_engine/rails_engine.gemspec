$:.push File.expand_path("../lib", __FILE__)

# Maintain your gem's version:
require "rails_engine/version"

# Describe your gem and declare its dependencies:
Gem::Specification.new do |s|
  s.name        = "rails_engine"
  s.version     = RailsEngine::VERSION
  s.authors     = ["Michael Antonelli"]
  s.email       = ["michael.antonelli@cerner.com"]
  s.homepage    = "TODO"
  s.summary     = "TODO: Summary of RailsEngine."
  s.description = "TODO: Description of RailsEngine."
  s.license     = "MIT"

  s.files = Dir["{app,config,db,lib}/**/*", "MIT-LICENSE", "Rakefile", "README.rdoc"]
  s.test_files = Dir["test/**/*"]

  s.add_dependency "rails", "~> 4.2.3"

  s.add_development_dependency "sqlite3"
end

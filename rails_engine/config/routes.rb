RailsEngine::Engine.routes.draw do
  match 'health', to: 'health#index', via: [:head, :get]
end

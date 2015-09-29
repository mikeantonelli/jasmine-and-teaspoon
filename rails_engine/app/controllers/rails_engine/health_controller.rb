module RailsEngine
  class HealthController < ApplicationController

    def index
      render status: :ok, text: 'Server is up!'
    end

  end
end
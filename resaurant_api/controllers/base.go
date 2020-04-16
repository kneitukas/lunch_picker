package controllers

import (
	"fmt"
	"log"
	"net/http"

	"restaurant_api/storage"

	"restaurant_api/models"

	"github.com/gorilla/mux"
	"github.com/jinzhu/gorm"
	"github.com/rs/cors"
)

type Base struct {
	Db     *gorm.DB
	router *mux.Router
}

func (b *Base) Initialize(port string) {
	b.router = mux.NewRouter()
	handler := cors.AllowAll().Handler(b.router)
	b.InitializeRoutes()
	b.Db = storage.Initialize()
	b.PerformMigrations()
	b.run(port, handler)

}

func (b *Base) run(port string, handler http.Handler) {
	defer b.Db.Close()
	fmt.Printf("Listening to port %v", port)
	log.Fatal(http.ListenAndServe(port, handler))
}

func (b *Base) PerformMigrations() {
	b.Db.Debug().AutoMigrate(&models.User{}, &models.Restaurant{})
	b.Db.Debug().Model(&models.Restaurant{}).AddForeignKey("author_id", "users(id)", "CASCADE", "CASCADE")
}

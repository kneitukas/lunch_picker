package controllers

func (b *Base) InitializeRoutes() {

	b.router.HandleFunc("/register", b.NewUser).Methods("POST")
	b.router.HandleFunc("/login", b.Login).Methods("POST")
	b.router.HandleFunc("/restaurant", b.CreateRestaurant).Methods("POST")
	b.router.HandleFunc("/restaurant", b.GetUserRestaurants).Methods("GET")
	b.router.HandleFunc("/restaurant/{id}", b.GetRestaurantByID).Methods("GET")
}

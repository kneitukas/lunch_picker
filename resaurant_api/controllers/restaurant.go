package controllers

import (
	"encoding/json"
	"errors"
	"fmt"
	"io/ioutil"
	"net/http"
	"restaurant_api/auth"
	"restaurant_api/models"
	"restaurant_api/responses"
	"strconv"

	"github.com/gorilla/mux"
)

func (b *Base) CreateRestaurant(w http.ResponseWriter, r *http.Request) {

	uid, err := auth.ExtractTokenID(r)
	if err != nil {
		responses.ERROR(w, 401, errors.New("Unauthorized"))
		return
	}

	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		responses.ERROR(w, 422, err)
		return
	}
	restaurant := models.Restaurant{AuthorID: uid}

	err = json.Unmarshal(body, &restaurant)
	if err != nil {
		responses.ERROR(w, 422, err)
		return
	}

	restaurant.Prepare()
	err = restaurant.Validate()
	if err != nil {
		responses.ERROR(w, 422, err)
		return
	}

	if uid != restaurant.AuthorID {
		responses.ERROR(w, 401, errors.New(http.StatusText(401)))
	}

	restaurantCreated, err := restaurant.SaveRestaurant(b.Db)
	if err != nil {
		responses.ERROR(w, 500, err)
		return
	}
	w.Header().Set("Lacation", fmt.Sprintf("%s%s/%d", r.Host, r.URL.Path, restaurantCreated.ID))
	responses.JSON(w, 201, restaurantCreated)
}

func (b *Base) GetUserRestaurants(w http.ResponseWriter, r *http.Request) {

	uid, err := auth.ExtractTokenID(r)
	if err != nil {
		responses.ERROR(w, 401, err)
	}

	rest := models.Restaurant{}
	restsGotten, err := rest.GetUserRestaurants(b.Db, uid)
	if err != nil {
		responses.ERROR(w, 422, err)
	}
	responses.JSON(w, 200, restsGotten)
}

func (b *Base) GetRestaurantByID(w http.ResponseWriter, r *http.Request) {
	// uid, err := auth.ExtractTokenID(r)
	// if err != nil {
	// 	responses.ERROR(w, 401, err)
	// }

	vars := mux.Vars(r)
	rid, err := strconv.ParseUint(vars["id"], 10, 64)
	if err != nil {
		responses.ERROR(w, 400, err)
		return
	}

	rest := models.Restaurant{}
	restGotten, err := rest.FindRestaurantByID(b.Db, rid)
	if err != nil {
		responses.ERROR(w, 422, err)
		return
	}
	responses.JSON(w, 200, restGotten)

}

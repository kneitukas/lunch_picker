package controllers

import (
	"encoding/json"
	"io/ioutil"
	"net/http"
	"restaurant_api/models"
	"restaurant_api/responses"
)

func (b *Base) NewUser(w http.ResponseWriter, r *http.Request) {
	bod, err := ioutil.ReadAll(r.Body)
	if err != nil {
		responses.ERROR(w, 422, err)
		return
	}
	user := models.User{}
	err = json.Unmarshal(bod, &user)
	if err != nil {
		responses.ERROR(w, 422, err)
		return
	}
	user.Prepare()
	err = user.Validate()
	if err != nil {
		responses.ERROR(w, 422, err)
		return
	}
	userCreated, err := user.SaveUser(b.Db)
	if err != nil {
		responses.ERROR(w, 422, err)
		return
	}

	resp := models.User{
		ID:    userCreated.ID,
		Email: userCreated.Email,
	}

	responses.JSON(w, 200, resp)
}

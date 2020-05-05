package controllers

import (
	"encoding/json"
	// "fmt"
	"io/ioutil"
	"net/http"
	"restaurant_api/auth"
	"restaurant_api/models"
	"restaurant_api/responses"
)

type LoginResp struct {
	Id    uint32 `json:"id"`
	Token string `json:"token"`
	Email string `json:"email"`
}

func (b *Base) Login(w http.ResponseWriter, r *http.Request) {
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		responses.ERROR(w, 422, err)
		return
	}
	user := models.User{}
	if err := json.Unmarshal(body, &user); err != nil {
		responses.ERROR(w, 422, err)
		return
	}

	user.Prepare()
	if err := user.Validate(); err != nil {
		responses.ERROR(w, 422, err)
		return
	}

	err, resp := b.signIn(user.Email, user.Password)
	if err != nil {
		responses.ERROR(w, 422, err)
		return
	}

	responses.JSON(w, 200, resp)
}

func (b *Base) signIn(email string, password string) (error, LoginResp) {

	user := models.User{}
	if err := b.Db.Debug().Find(&user, "email = ?", email).Error; err != nil {
		return err, LoginResp{}
	}

	if err := models.VerifyPassword(user.Password, password); err != nil {
		return err, LoginResp{}
	}

	token, err := auth.CreateToken(user.ID)
	if err != nil {
		return err, LoginResp{}
	}

	resp := LoginResp{
		Id:    user.ID,
		Email: user.Email,
		Token: token,
	}
	return nil, resp
}

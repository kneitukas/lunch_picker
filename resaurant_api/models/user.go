package models

import (
	"errors"
	"html"
	"strings"
	"time"

	"github.com/badoux/checkmail"
	"github.com/jinzhu/gorm"
)

type User struct {
	ID        uint32    `gorm:"primary_key;auto_increment";json:"id"`
	Email     string    `gorm:"size:100;not null;unique";json:"email"`
	Password  string    `gorm:"size:100;not null;"json:",omitempty"`
	CreatedAt time.Time `gorm:"default:CURRENT_TIMESTAMP;"json:",omitempty"`
	UpdatedAt time.Time `gorm:"default:CURRENT_TIMESTAMP;"json:",omitempty"`
}

func (u *User) BeforeSave() error {
	hashedPassword, err := Hash(u.Password)
	if err != nil {
		return err
	}
	u.Password = string(hashedPassword)
	return nil
}

func (u *User) Prepare() {
	u.ID = 0
	u.Email = html.EscapeString(strings.TrimSpace(u.Email))
	u.CreatedAt = time.Now()
	u.UpdatedAt = time.Now()
}

func (u *User) Validate() error {
	if u.Email == "" {
		return errors.New("Email is required")
	}
	if u.Password == "" {
		return errors.New("Password is required")
	}
	if err := checkmail.ValidateFormat(u.Email); err != nil {
		return errors.New("Invalid Email")
	}
	return nil
}

func (u *User) SaveUser(db *gorm.DB) (*User, error) {

	if err := db.Debug().Create(&u).Error; err != nil {
		return &User{}, err
	}
	return u, nil
}

func (u *User) FindUserByEmail(db *gorm.DB, email string) (*User, error) {
	var err error
	if err = db.Find(&u, "email = ?", email).Error; err != nil {
		return &User{}, errors.New("User not found")
	}
	return u, nil
}

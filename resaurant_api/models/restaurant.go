package models

import (
	"errors"
	"html"
	"strings"
	"time"

	"github.com/jinzhu/gorm"
)

type Restaurant struct {
	ID        uint32    `gorm:"primary_key;auto_increment" json:"id"`
	Author    User      `gorm:"foreignKey:AuthorID" json:"-"`
	AuthorID  uint32    `gorm:"not null" json:"author_id"`
	Menus     []Menu    `json:"menus"`
	Name      string    `gorm:"size:100;not null" json:"name"`
	Type      string    `gorm:"size:100;not null" json:"type"`
	CreatedAt time.Time `gorm:"default:CURRENT_TIMESTAMP" json:",omitempty"`
	UpdatedAt time.Time `gorm:"default:CURRENT_TIMESTAMP" json:",omitempty"`
}

func (r *Restaurant) Prepare() {
	r.ID = 0
	r.Author = User{}
	r.Name = html.EscapeString(strings.TrimSpace(r.Name))
	r.Type = html.EscapeString(strings.TrimSpace(r.Type))
	r.CreatedAt = time.Now()
	r.UpdatedAt = time.Now()
}

func (r *Restaurant) Validate() error {
	if r.AuthorID < 1 {
		return errors.New("Required Author")
	}
	if r.Name == "" {
		return errors.New("Required Name")
	}
	if r.Type == "" {
		return errors.New("Required Type")
	}
	return nil
}

func (r *Restaurant) SaveRestaurant(db *gorm.DB) (*Restaurant, error) {
	var err error
	err = db.Debug().Model(&Restaurant{}).Create(&r).Error
	if err != nil {
		return &Restaurant{}, err
	}

	// if r.ID != 0 {
	// 	err = db.Debug().Model(&User{}).Where("id = ?", r.AuthorID).Take(&r.Author).Error
	// 	if err != nil {
	// 		return &Restaurant{}, err
	// 	}
	// }
	return r, nil
}

func (r *Restaurant) GetUserRestaurants(db *gorm.DB, uid uint32) (*[]Restaurant, error) {
	restaurants := []Restaurant{}
	err := db.Debug().Model(Restaurant{}).Find(&restaurants, "author_id = ?", uid).Error
	if err != nil {
		return &[]Restaurant{}, err
	}
	return &restaurants, nil
}

func (r *Restaurant) FindRestaurantByID(db *gorm.DB, rid uint64) (*Restaurant, error) {
	rest := Restaurant{}
	if err := db.Debug().Model(Restaurant{}).First(&rest, rid).Error; err != nil {
		return &Restaurant{}, err
	}
	return &rest, nil
}

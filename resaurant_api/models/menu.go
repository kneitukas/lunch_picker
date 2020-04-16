package models

import (
	"time"
)

type Menu struct {
	ID           uint32     `gorm:"primary_key;auto_increment";json:"id"`
	Author       User       `json:"author"`
	AuthorID     uint32     `gorm:"not null";json:"author_id"`
	Restaurant   Restaurant `json:"restaurant"`
	RestaurantID uint32     `gorm:"not null";json:"restaurant_id"`
	// Likes        uint16     `gorm:"not null";json:"likes"`
	WeekDay   time.Time `json:"weekday"`
	CreatedAt time.Time `gorm:"default:CURRENT_TIMESTAMP;"json:",omitempty"`
	UpdatedAt time.Time `gorm:"default:CURRENT_TIMESTAMP;"json:",omitempty"`
}

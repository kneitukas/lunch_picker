package main

import (
	"restaurant_api/controllers"
)

var base = controllers.Base{}

func main() {
	base.Initialize(":8080")

}

package entity

type Shelf struct {
	ShelfId string  `json:"shelf_id"`
	Name    string  `json:"name"`
	BookSet BooksId `json:"book_set"`
}

type BooksId struct {
	Books []string `json:"books"`
}

type UserShelf struct {
	UserShelfId string `json:"user_shelf_id"`
	UserId      string `json:"user_id"`
	ShelfId     string `json:"shelf_id"`
}

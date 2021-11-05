package entity

type ResponseSuccess struct {
	Data interface{} `json:"data"`
}

type ResponseError struct {
	Error struct {
		Code    int    `json:"code"`
		Message string `json:"message"`
	} `json:"error"`
}

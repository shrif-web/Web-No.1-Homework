package main

import (
	"bufio"
	"crypto/sha256"
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"net/http"
	"os"
	"strconv"
)

var text []string

type response1 struct {
	Result string
}

func sum(num1, num2 int) string {
	var result int
	result = num1 + num2
	numberResult := strconv.Itoa(result)
	sha := sha256.New()
	sha.Write([]byte(numberResult))
	return string(sha.Sum(nil))
}

func showSum(w http.ResponseWriter, r *http.Request) {
	r.ParseForm()
	num1 := r.Form.Get("num1")
	num2 := r.Form.Get("num2")
	num1Int, err := strconv.ParseInt(num1, 10, 64)
	check(err)
	num2Int, err := strconv.ParseInt(num2, 10, 64)
	check(err)
	result := sum(int(num1Int), int(num2Int))
	hexResult := fmt.Sprintf("%x", result)

	w.Header().Set("Content-Type", "application/json")

	response := &response1{
		Result: hexResult}
	jsonResponse, _ := json.Marshal(response)
	fmt.Fprintf(w, string(jsonResponse))
}

func write(index int) (string, error) {
	if index > 100 || index <= 0 {
		return "-1", errors.New("index out of range")
	}
	return text[index-1], nil
}

func writeText(w http.ResponseWriter, r *http.Request) {

	indexes, ok := r.URL.Query()["lineNum"]
	if !ok || len(indexes[0]) < 1 {
		log.Println("Url Param 'key' is missing")
		return
	}
	index := indexes[0]
	indexInt, err := strconv.ParseInt(index, 10, 64)
	check(err)

	result, err := write(int(indexInt))
	if err != nil {
		fmt.Fprintln(w, err)
	} else {
		w.Header().Set("Content-Type", "application/json")

		response := &response1{Result: result}
		jsonResponse, _ := json.Marshal(response)
		fmt.Fprintf(w, string(jsonResponse))
	}
}

func check(e error) {
	if e != nil {
		panic(e)
	}
}

func main() {

	file, err := os.Open("sample.txt")
	check(err)

	scanner := bufio.NewScanner(file)

	scanner.Split(bufio.ScanLines)

	for scanner.Scan() {
		text = append(text, scanner.Text())
	}

	file.Close()

	fmt.Println("listening on port 8080...")

	http.HandleFunc("/write", writeText)

	http.HandleFunc("/sha256", showSum)
	http.ListenAndServe(":8080", nil)

}

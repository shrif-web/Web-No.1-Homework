here is a sample for API request

testing http://localhost/go/sha256 :
curl 'http://localhost/go/sha256' -X POST -H "Content-Type: application/json" --data $'{"Num1":12,"Num2":25}'

you can use different numbers

testing http://localhost/go/write :
curl 'http://localhost/go/write?line=42'

you can test this command for line numbers 0<line<100

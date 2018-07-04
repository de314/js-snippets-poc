#!/bin/bash

curl -XPOST https://us-central1-over-the-top-183206.cloudfunctions.net/delegate-test \
  -H 'Content-Type: application/json' \
  -d '{
  "func": "/**\n * TODO: provide some awesome documentation\n */\nfunction process(input, callback) {\n  // v v v v your code here v v v v\n  callback({\n    greeting11: `Hello, ${input.name}!`\n  })\n  // ^ ^ ^ ^ your code here ^ ^ ^ ^\n}",
  "input": "{\n  \"id\": 1,\n  \"name\": \"David E\",\n  \"username\": \"Bret\",\n  \"email\": \"Sincere@april.biz\",\n  \"address\": {\n    \"street\": \"Kulas Light\",\n    \"suite\": \"Apt. 556\",\n    \"city\": \"Gwenborough\",\n    \"zipcode\": \"92998-3874\",\n    \"geo\": {\n      \"lat\": \"-37.3159\",\n      \"lng\": \"81.1496\"\n    }\n  },\n  \"phone\": \"1-770-736-8031 x56442\",\n  \"website\": \"hildegard.org\",\n  \"company\": {\n    \"name\": \"Romaguera-Crona\",\n    \"catchPhrase\": \"Multi-layered client-server neural-net\",\n    \"bs\": \"harness real-time e-markets\"\n  }\n}"
}'

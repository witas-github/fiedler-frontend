# Need to obtain .crt and .key certificate file before running application
# Set API server url
/src/app/config.json
# Run application in https mode
ng serve --host 0.0.0.0 --ssl true --ssl-cert "example.crt" --ssl-key "example.key"


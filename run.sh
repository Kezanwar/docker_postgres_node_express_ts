. ./.env

if [ "$APP_ENV" = "development" ]; then 
    yarn dev;
else 
    yarn run:migrate;
    yarn start;
fi

    





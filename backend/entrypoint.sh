#!/bin/bash entrypoint.sh

npm run migrate
npm run seed
npm run start
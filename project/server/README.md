# Server Instructions

This server hosts and API that can be used for managing contact information. The current APIs are:

1. GET `http://localhost:3001/contacts` - to retrieve the full list of contacts with their contact information.
2. POST `http://localhost:3001/contacts` - to add a new contact to the collection.

A `Contact` is an object with `name` and `email` properties.

## Getting Started

Navigate to this `/server` directory and run `yarn` to make sure dependencies are installed.

Then run `yarn start` to run the app server which is hard-coded to run on port 3001.

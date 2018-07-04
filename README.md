# JS Snippet POC

GCP tends to favor Server Less Architecture patterns for their FaaS. They have
invested a lot into their deployment tools. Essentially each Google Cloud Function
is just a zipped Node.js application.

This means that deployments are simple, but not light weight, and can be
cumbersome. I am working towards a more light weight contract. I aim to solve:

* Better support for local and browser based development and testing
* Upload snippets via API, not zipped application
* Define patterns for TDD
* Solve the following use cases
  * Lightweight snippet execution
  * Serverless architecture development
* An awesome name, something like "FuncY G"

Ideally this will be similar to Webtask.io except hosted on GCP. But I am looking
solve some of the development complexities, and security concerns.

## Content

### /gcp

The function to be deployed to GCP + a curl example

### /src

Browser based POC for pre-deployment testing. This will likely be pulled out into
an npm module that can be used in a deployed server and a cli utility.

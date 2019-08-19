# Common Sense Help Center

Supporting templates, content, css, and js for the Common Sense SalesForce help center.

## Overview
The resources in this repo augment/support our SalesForce community help center 
template and are served via [Github Pages](https://pages.github.com/) from this 
repository. Content is served from the `/docs/` directory in the master branch
from the domain name `https://commonsense-org.github.io/desk-support-center/`.

## Setup/Building
There is some local tooling for SASS and some directory manipulation provided
by Node.js so run `npm install` after cloning the repo.

### Scripts

- `build`: _runs `node index.js` to handle SASS conversion
and move files into the `docs` directory_

## @TODO
- Delete the old support files that served the Desk.com site

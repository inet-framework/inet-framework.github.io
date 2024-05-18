```
inet-framework.github.io
========================

To install a local GitHub Pages development environment:

$ docker pull madduci/docker-github-pages

Then run the Jekyll server with:

$ docker run --rm -it -p 4000:4000 -v /MY/LOCAL/SITEDIR/:/site madduci/docker-github-pages serve --watch --force_polling --host 0.0.0.0

Open your browser on http://localhost:4000

rem Only works from Windows
rem First build and commit result into the main branche
git push origin :gh-pages
git subtree push --prefix dist origin gh-pages

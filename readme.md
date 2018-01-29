This is a silly setup. Because there’s not repo for desk (and there were way too many styles for doing on the Desk html files), you have to upload an external stylesheet to github, and that stylesheet is loaded via AJAX request to the Desk page.

All things considered, this system works pretty.

# Sass watch:
- command to run sass (from root of project)
`sass --watch sass/all.scss:css/styles.css`

# JS:
- add any JS in the bottom of Layout page in Desk. THE JS IN THIS REPO WILL *NOT* BE LOADED

# Other:

You will need to git add, commit, and push before you will see the changes. I recommend adding this `lazygit` command to your bash profile so you don't lose your damn mind:
```
function lazygit() {
    git add .
    git commit -a -m "$1"
    git push
}
```

To use:
`lazygit “[message]"`

To change html, go to admin page on Desk: https://commonsensesupport.desk.com/admin/dashboard
-> Channels -> Customize -> Web themes -> CSM Portal (edit pencil) -> advanced themes
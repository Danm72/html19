# Setup

`npm install -g gulp` or `yarn global add gulp` (You can skip this step if you already have gulp installed)

`npm install` or `yarn`

`gulp`

# Available gulp tasks

`gulp js` - compile JS with inline source maps  
`gulp sass` - compile SCSS with inline source maps  
`gulp build` - compile production ready JS & CSS (minified & autoprefixer)  
`gulp watch` - watch for files changes  
`gulp php` - (default task) run the server and watch for files changes  
`gulp proxy` - run BrowserSync without a server, you need to modify `browserSyncProxy` setting  

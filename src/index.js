import "@styles/index.css";
import "jquery/dist/jquery.slim"

import(/* webpackExports: ["default"] */"./app").then(({default:App})=>{
    import(/* webpackExports: ["default"] */"./app2").then(({default:render})=>{
        render(App)
    })
})
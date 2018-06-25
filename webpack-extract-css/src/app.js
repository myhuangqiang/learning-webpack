import './css/base.css'

import(/* webpackChunkName:'a' */'./components/base').then(function (a) {
    console.log(a);
})


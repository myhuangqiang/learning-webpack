// require.include('./moduleA')
import _ from 'lodash'

var page = 'subPageA'

if (page === 'subPageA') {
    // require.ensure(['./subPageA'], function () {
    //     var subpageA = require('./subPageA')
    // }, 'subPageA')

    import(/* webpackChunkName:'subPageA' */'./subPageA').then(function (subPageA) {
        console.log(subPageA)
    })

} else if (page === 'subpageA') {

    // require.ensure(['./subPageB'], function () {
    //     var subPageA = require('./subPageB')
    // }, 'subPageB')

    import(/* webpackChunkName:'subPageB' */'./subPageB').then(function (subPageB) {
        console.log(subPageB)
    })
}
export default 'pageA'
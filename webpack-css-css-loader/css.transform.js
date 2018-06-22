module.exports = function (css) {
    console.log(css);
    if (window.innerWidth >= 768) {
        return css.replace('#f00', 'blue')
    } else {

        return css.replace('#f00', '#fc1')
    }
}
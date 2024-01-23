const setUp =  (visibility, auth) => {
    if (visibility === 'true' || visibility === 'false') {
        value = visibility === 'true' ? 'showMenuButton' : 'hideMenuButton'
    }
    if (visibility === 'onAuth') {
        return auth ? 'showMenuButton' : 'hideMenuButton'
    }
    if (visibility === '!onAuth') {
        return auth ? 'hideMenuButton' : 'showMenuButton'
    }
}
const isSelected = (selected, route) => {
    // console.log(`navBar isSelected 'selected : '${selected} 'route :'${route}`)
    return selected === route? "isSelected" : ""
}
module.exports = {
    setUp,
    isSelected
}
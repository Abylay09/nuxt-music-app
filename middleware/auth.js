export default defineNuxtRouteMiddleware((to, from) => {
    const token = useCookie('token')
    if (to.path == '/' && !token.value) {
        return navigateTo('/signin')
    }

    else if(to.path == '/artist' && !token.value){
        return navigateTo('/signin')
    }
    // if(token.value.length){
    //     return navigateTo(to.fullPath)
    // }else{
    //     navigateTo('/signin')
    // }
    // return navigateTo('/signin')
})
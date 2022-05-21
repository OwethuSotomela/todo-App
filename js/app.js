document.addEventListener('alpine:init', ()=>{
    Alpine.data('', ()=>{
        return {
            init(){
                console.log('From scratch')
            },
            open: false,
        }
    })
})
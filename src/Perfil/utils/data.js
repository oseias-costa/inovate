
// export const parcial = tasks !== '' && tasks.reduce((acc, item) =>{
//     if(item.realizado == 'Parcial'){
//       acc += 1
//     }
//     return acc
//   }, 0)


export const parcialTask = (array) => 
    array !== '' && 
    array.reduce((acc, item) =>{
        if(item.realizado === 'Parcial'){
        acc += 1
        }
        return acc
    }, 0)

export const finishedTask = (array) => 
    array !== '' && 
    array.reduce((acc, item) =>{
        if(item.realizado === 'Realizado'){
        acc += 1
        }
        return acc
    }, 0)


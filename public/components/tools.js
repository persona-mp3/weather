`
    Update dom takes two paramenters, exclusively a DOM 
    element that has an innerText proprty,
    and a value, that will be parsed into a sting
`
export const updateDom = function(domElement, content) {
    domElement.classList.add('animated-text')
    domElement.innerText = `${content}`
}


export const toFarenheit = (k) => {
    return (((k - 273.15) * 9/5) + 32 ).toFixed(2)
}

export const toCelcius = (k) => { return  (k - 273.15).toFixed(0)}

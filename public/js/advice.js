export function adviceHandler(temp) {
    if (isNaN(temp)) {
        return
    } 


    if (temp >= 12 && temp <= 20) {
        // console.log('Kinda chilly outside')
        return 'Kinda Chilly outside'
    }

    if (temp >= 21 && temp <= 25) {
        // console.log('its warm outside')
        return 'Warm ouside innit?'
    }


    if (temp >=25 && temp<=30) {
        // console.log('its hot, might get sweaty')
        return 'Might get sweaty today'
    }

    if (temp > 30) {
        // console.log('be careful outside, stay hydrated')
        return 'Be careful outside, keep a water bottle nearby'
    }


    if (temp >= 0 && temp <= 5) {
        // console.log('it is extemely cold outside')
        return 'Extremely cold asfff'
    }

    if (temp < 5) {
        // console.warn('XXXXtemeley COLDDDDDDDDDDD')
        return 'Just layer up if you dont want to die'
    }

}

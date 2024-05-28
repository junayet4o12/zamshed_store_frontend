
import kgLogo from '../../assets/measurementLogo/weight.svg'
import litreLogo from '../../assets/measurementLogo/beaker.svg'
import quantityLogo from '../../assets/measurementLogo/product.svg'

export const measurements = [
    {
        icon: <img className="w-6" src={kgLogo} />,
        value: 'Kilogram'
    },
    {
        icon: <img className="w-6" src={litreLogo} />,
        value: 'Litre'
    },
    {
        icon: <img className="w-6" src={quantityLogo} />,
        value: 'Quantity'
    },
]
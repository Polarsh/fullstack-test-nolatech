import { Link } from 'react-router-dom'
import { COMPANY_LOGO, COMPANY_NAME } from '../../utils/constant'

export default function LogoComponent({ size = 'h-8', clickable = false }) {
  const logoElement = (
    <div>
      <span className='sr-only'>{COMPANY_NAME}</span>
      <img
        className={`w-auto mx-auto ${size}`}
        src={COMPANY_LOGO}
        alt={COMPANY_NAME}
      />
    </div>
  )

  return clickable ? <Link to='/'>{logoElement}</Link> : logoElement
}

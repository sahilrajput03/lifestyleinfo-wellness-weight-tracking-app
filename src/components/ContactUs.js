import {AiFillMessage, AiFillMail, AiFillPhone} from 'react-icons/ai'
import {BsWhatsapp} from 'react-icons/bs'

const MOBILE = 8360267243
const EMAIL = 'my_email'

const text = encodeURI('Hi, New Life Style Wellness Centre. I want to know more about it.')
const whatsAppMessageLink = `https://api.whatsapp.com/send?phone=+91${MOBILE}&text=${text}`

const mailLink = `mailto:${EMAIL}@gmail.com?subject=${encodeURI('Hello, New Life Style Wellness Centre')}`

const callLink = `tel:${MOBILE}`

const messageLink = `sms:+91${MOBILE}?body=${text}`

const iconStyle = {
	size: 20,
	color: 'white',
	className: 'inline-block ml-1 mb-1',
}

const ContactUs = () => {
	return (
		<div className='flex flex-wrap justify-center'>
			<a href={whatsAppMessageLink} className='btn-contact'>
				Chat on Whatsapp <BsWhatsapp {...iconStyle} />
			</a>
			<a href={callLink} className='btn-contact'>
				Call our Coach
				<AiFillPhone {...iconStyle} />
			</a>
			<a href={messageLink} className='btn-contact'>
				Send a text message
				<AiFillMessage {...iconStyle} />
			</a>
			<a href={mailLink} className='btn-contact'>
				Email Us <AiFillMail {...iconStyle} />
			</a>
		</div>
	)
}

export default ContactUs

import {useState, useEffect} from 'react'

const Contact = () => {
    const [fromName, setFromName] = useState('')
    const [fromEmail, setFromEmail] = useState('')
    const [fromSubject, setFromSubject] = useState('')
    const [fromBody, setFromBody] = useState('')
    const [isFilled, setIsFilled] = useState(false)

    const [alert, setAlert] = useState<string | null>(null)
    useEffect(()=> {
        setIsFilled((fromName && fromEmail && fromBody ) ? true : false)
    })

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const f = event.target.name
        const edit = event.target.value
        switch(f) {
            case 'fromName': setFromName(edit);
                break;
            case 'fromEmail': setFromEmail(edit);
                break;
            case 'fromSubject': setFromSubject(edit);
                break;
            case'fromBody': setFromBody(edit);
                break;
        } 
    }
    const handleSubmit = async ( event: React.FormEvent<HTMLFormElement> ) => {
        event.preventDefault()
        setAlert(null)
        const validateEmail = (email:string)=> {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        }
        if (validateEmail(fromEmail)) {
            handleSend()
        } else {
            setAlert('Enter a valid email address')
        }
    }
    const handleSend = async () => {
        const body = {
            fromName,
            fromEmail,
            fromSubject,
            fromBody
        }
        return fetch('/api/contact', {
            method: 'POST',
            headers: {
                'content-type':'application/json'
            },
            body: JSON.stringify(body)
        })
        .then(res =>{ if (res.ok) {
            setFromName('');
            setFromEmail('');
            setFromSubject('');
            setFromBody('');
            setAlert('Your message has been sent!')
        }})
    }
    
    return (
    <div id="contactPage">
        <h4>Get in touch!</h4>
        <p>If you have any questions <br/> feel free to send me an email at</p>
        <a href="mailto:contact@asleepiesceramics.com" className='routeLink rl'>
            <b>Contact@AsleepiesCeramics.com </b></a>
        <p>or fill out the form below</p>  

        {alert ? <p><b>{alert}</b></p> : null}

        <form name="contact" onSubmit={handleSubmit} id='contactForm'>
                <div id='contactDetails'>
                    <label htmlFor="fromName"> Name:{`  `} 
                    <input name="fromName" required id="fromName" type="text"
                        value={fromName} onChange={handleChange}/></label>
                    
                    <label htmlFor="fromEmail"> Email:{`  `}
                    <input name="fromEmail" required id="fromEmail" type="email" 
                        value={fromEmail} onChange={handleChange}/></label>

                    <label htmlFor="fromSubject"> Subject:{`  `}
                    <input name="fromSubject" id="fromSubject" type="text"
                        value={fromSubject} onChange={handleChange}/></label>
                </div>

                <div id='contactMessage'>
                    <label htmlFor="fromBody"> Message: </label>
                    <textarea  name="fromBody" required id="fromBody" rows={5} cols={36}
                        value={fromBody} onChange={handleChange}/>
                </div>
            <button type="submit" className="contactSubmit" disabled={!isFilled}>Send</button>
        </form>
    </div>
    )
}

export default Contact;
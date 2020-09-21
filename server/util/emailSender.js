const nodemailer = require('nodemailer');
const emailOptions = require('../enums/emailOptions');
const credentials = require('./credentials');

const transporter = nodemailer.createTransport({
    host: 'mail42.mydevil.net',
    secure: false,
    tls: {
        rejectUnauthorized: false
    },
    auth: {
           user: credentials.EMAIL.user,
           pass: credentials.EMAIL.pass
    }
});

module.exports =  (receiver, subject, confirmToken) => {
    const mailOptions = {
        from: 'kontakt@fit-up.com.pl', // sender address
        to: receiver, // list of receivers
        subject, // Subject line
        html: emailHtmlFactory(subject, confirmToken, receiver)// plain text body
    };
    return transporter.sendMail(mailOptions)
}

const environment = 'https://api.fit-up.com.pl';

// const environment = 'localhost:4200';


const emailHtmlFactory = (subject, confirmToken, receiver) => {
    switch(subject) {
        case emailOptions.emailConfirmation: {
            return `
            <table width="100%" border="0" cellpadding="20" cellspacing="0" style="color:#5d5d5d; font-family:'Montserrat', sans-serif; font-size:20px; line-height:1.3em; overflow: hidden;">
                 <thead style="color:#fff; text-align:left;">
                    <tr>
                        <th width="150" style="padding-right: 0px"><img src="https://fvpa.pl/wp-content/uploads/2018/07/fvpa_logo200.png" width="150" alt="FVPA Logo" title="FVPA Logo" border="0" align="left" style="margin-right: 0 !important;"/></th>
                        <th colspan="2" style=" color: #13986b; font-weight: 600; line-height: 1.3em; font-size: 36px; padding-left: 0;" colspan="3">Fit<font color="#fb7d4e">up</font></th>
                    </tr>
                </thead>
                <tbody style="text-align: left;">
                    <tr>
                        <td colspan="3" style="padding: 20px 50px">
                            <p>Witaj, nazwa maila lub imie z apki</p>
                            <p>Otrzymailiśmy prośbę o zmianę hasła. Skorzystaj z poniższego linku żeby je zresetować.</p>
                            <br>
                            <p style="text-align: center;"><a href="${environment}/#/confirm/${confirmToken}" target="_blank" style="text-decoration: none; cursor: pointer; padding: 20px 60px; color:#fff; background: #fb7d4e; border-radius: 10px; border: none; text-transform: uppercase; font-size: 18px; font-weight: 600;">Zresetuj hasło</a></p>
                            <br>
                            <p>Pamiętaj że link wygasa po x czasie. 
							<br>
							Jeśli prośba nie została wysłana przez Ciebie, zignoruj tego maila lub <a href="#" style="color: #fb7d4e; text-decoration:none;">skontaktuj się z nami.</a></p>

							
                            <br>
                        </td>
                    </tr>
                </tbody>
                <tfoot style="background-color: #13986b; color: #fff;">
                    <tr>

                   
						<td colspan="2" align="left" style="padding: 0 30px;" >
							<a style=" color: #fff; margin-right: 10px; text-decoration: none;" href="#">Prywatność</a>
							 <f style="color:#fb7d4e; ">&#8226</f>

							

							
							<a style="margin-left: 10px; text-decoration: none; color: #fff;"  href="#">Kontakt</a>
						</td> 
						 <td align="left" style="text-align: right; padding: 25px 30px; margin-right: 0px;" width="200"> 

							
							<a href="https://www.facebook.com/fvpapoland" target="_blank"><img src="https://fvpa.pl/wp-content/uploads/2019/08/fb-icon.png" alt="FVPA Facebook" title="FVPA Facebook" border="0" style="margin: 0 0.3rem;"/></a>
							<a href="https://www.youtube.com/c/fvpapolska" target="_blank"><img src="https://fvpa.pl/wp-content/uploads/2019/08/yt-icon.png" alt="FVPA YouTube" title="FVPA YouTube" border="0"  style="margin: 0 0.3rem;"/></a> 

							
							<a href="https://fvpa.pl" target="_blank"><img src="https://fvpa.pl/wp-content/uploads/2019/08/website-icon.png" alt="FVPA Website" title="FVPA Website" border="0"  style="margin: 0 0.3rem;"
							/></a>

                        </td>	
                    </tr>
                </tfoot>
            </table>
            `
        }
        case emailOptions.passwordReset: {
            return `
                <h1>Link resetujacy: </h1>
                <a href="${environment}/#/reset-password/${confirmToken}">Reset</a>
            `;
        }
    }
}


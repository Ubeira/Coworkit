import "../../css/Home/footer.css";
import mailgo from "mailgo";
import appleLogo from "../../assets/footer/apple.png";
import googleLogo from "../../assets/footer/google.png";
// "AIzaSyCyDMSxQdbpQ4vOcQ27i8QY7UK8di6gRus"
const srcMap="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2954.0493817824736!2d-8.731434684203643!3d42.23475797919554!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd2f62145c0e2567%3A0x2539d9e20da65a75!2sR%C3%BAa%20de%20Pi%20y%20Margall%2C%2025%2C%2036202%20Vigo%2C%20Pontevedra!5e0!3m2!1ses!2ses!4v1613854779754!5m2!1ses!2ses" ;
export default function Footer() {
    mailgo({showFooter:false});

    return (
        <div className="footerBackground">

        <div className="footerContainer">
            <div className="contacts">
                <div className="info">
                <a className="footerLink" href="https://goo.gl/maps/Ku2Jz7wqXonUrTpv8"> <i className="fas fa-map-marker-alt icon"></i></a>
                    <div className="address">
                    <a className="footerLink" href="https://goo.gl/maps/Ku2Jz7wqXonUrTpv8"> <p>Coworkit SL</p>
                        <p>Rua Pi y Margal 25</p>
                        <p>36202 Vigo, España</p></a>
                    </div>
                </div>

                <div className="info">
                <a className="footerLink" href="mailto:coworkitcompany@gmail.com"><i className="fas fa-envelope icon"></i></a> 
                     <a href="mailto:coworkitcompany@gmail.com">coworkitcompany@gmail</a>
                </div>
                <div className="info">
                <a className="footerLink" href="tel:+34.651.037.782" data-telegram="telegram"><i className="fas fa-phone-alt icon"></i></a>
                    <a href="tel:+34.651.037.782" data-telegram="telegram">+34 651 037 782</a>
                </div>

                
            </div>
            <div className="iconList">
            <div className="socialIcons">
               <a className="footerLink twiter" href="https://twitter.com/?lang=es"> <i className="fab fa-twitter socialIcon"></i></a>
               <a className="footerLink instagram" href="https://www.instagram.com/"> <i className="fab fa-instagram-square socialIcon"></i></a>
               <a className="footerLink  facebook" href="https://www.facebook.com"><i className="fab fa-facebook-square socialIcon"></i></a>
               <a className="footerLink  linkedin" href="https://www.facebook.com"><i className="fab fa-linkedin socialIcon"></i></a>
            </div>

            <div className="appStoreIcons">
                <img src={googleLogo} alt="google play"/>
                <img src={appleLogo} alt="apple play"/>
            </div>
            </div>
            <div  className="map">
                <iframe className="map" src={srcMap} style={{border:"1px black solid"}} loading="lazy" title="Coworkit location"></iframe>
            </div>
        </div>
        </div>
    )
}
// https://goo.gl/maps/Ku2Jz7wqXonUrTpv8
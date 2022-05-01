import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { FirebaseContext } from "../Firebase";
import { useNavigate } from "react-router-dom"; //pour pouvoir utiliser la navigation entre les pages

const ForgetPassword = () => {

    const firebase = useContext(FirebaseContext);

//initialisation de la variable pour la redirection 
  const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);


    const handleSubmit = e => {
        e.preventDefault();
        firebase.passwordReset(email)
        .then(() => {
            setError(null);
            setSuccess(`Consultez votre email ${email} pour changer le mot de passe`);
            setEmail("");

            setTimeout(() => {
                navigate("/login"); //redirection vers la page souhaité
            }, 5000)
        })
        .catch(error => {
            setError(error);
            setEmail("");
        })

    }

    const disabled = email === "";

    return (
        <div className="signUpLoginBox">
            <div className="slContainer">
                <div className="formBoxLeftForget">
                </div>
                <div className="formBoxRight">
                    <div className="formContent">

                        { 
                            success && <span 
                                style={{ 
                                border: "1px solid green",
                                background: "green",
                                color: "#ffffff"
                            }}
                            >
                                {success}
                            </span>
                        }

                        {error && <span>{error.message}</span>}

                        <h2>Mot de passe oublié?</h2>
                        <form onSubmit={handleSubmit}>

                            <div className="inputBox">
                                <input onChange={e => setEmail(e.target.value)} value={email} type="email" autoComplete="off" required />
                                <label htmlFor="email">Email</label>
                            </div>

                            <button disabled={disabled}>Récupérer</button>

                        </form>

                        <div className="linkContainer">
                            <Link className="simpleLink" to="/login">Déjà inscrit? Connectez-vous.</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForgetPassword





// const ForgetPassword = () => {
//   const firebase = useContext(FirebaseContext);

//   const [email, setEmail] = useState("");
//   //console.log(email);
//   const [success, setSuccess] = useState(null);
//   const [error, setError] = useState(null);

//   //initialisation de la variable pour la redirection lorsque le formulaire
//   const navigate = useNavigate();

//   // gestion et verifications lors de la demande de reinitialisation de mot de passe
//   const handleSubmit = e => {
//     e.prevendDefault();
//     firebase.passwordReset(email)
//       .then(() => {
//         setError(null);
//         setSuccess(`Email envoyé dans votre boite mail à l'adresse ${email}`);
//         setEmail(""); // reinitialisation du champs email

//         //redirection de l'utilisateur vers la page de connexion après l'envoi du mail de réinitialisation et 5sec
//         setTimeout(() => {
//           navigate("/login"); //redirection vers la page souhaité
//         }, 5000);
//       })
//       .catch((error) => {
//         setError(error); // message d'erreur renvoyé par firebase
//         setEmail(""); // reinitialisation du champs email
//       });
//   };

//   const disabled = email === "";

//   return (
//     <div className="signUpLoginBox">
//       <div className="slContainer">
//         <div className="formBoxLeftForget"></div>
//         <div className="formBoxRight">
//           <div className="formContent">
//             {
//               //message de succes lors de la demande de reinitialisation de mot de passe
//               success && (
//                 <span
//                   style={{
//                     border: "1px solid green",
//                     background: "green",
//                     color: "white",
//                   }}
//                 >
//                   {success}
//                 </span>
//               )
//             }

//             {
//               //message d'erreur lors de la demande de reinitialisation de mot de passe
//               error && <span>{error.message}</span>
//             }

//             <h2>Mot de passe oublié?</h2>
//             <form onSubmit={handleSubmit}>
//               <div className="inputBox">
//                 <input
//                   onChange={(e) => setEmail(e.target.value)}
//                   value={email}
//                   type="email"
//                   autoComplete="off"
//                   required
//                 />
//                 <label htmlFor="email">Email</label>
//               </div>

//               <button disabled={disabled}>Récupérer</button>
//             </form>
//             <div className="linkContainer">
//               <Link to="/login" className="simpleLink">
//                 <pre>Déjà inscrit? Connectez-vous </pre>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

//export default ForgetPassword;

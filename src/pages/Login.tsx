import React, { useContext, useEffect } from "react";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FcGoogle } from "react-icons/fc";
import AdminService from "../services/AdminService";
import { FirebaseManager } from "../utils/Firebase";
import { onMessage } from "firebase/messaging";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

interface FormState {
  email: string;
  password: string;
}

interface Data {
  email: string;
  password: string;
  notifiable_token: string;
}

export default function Login() {
  const [error, setError] = React.useState("");
  const [form, setForm] = React.useState<FormState>({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const { setUser, setIsAuthenticated } = useContext(UserContext);

  const [notifiable_token, setNotifiableToken] = React.useState("");

  const firebaseManager = new FirebaseManager();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const { email, password } = form;

    if (form.email.length > 0 && form.password.length > 0) {
      const data: Data = {
        email: email,
        password: password,
        notifiable_token: notifiable_token || "",
      };

      AdminService.login(data)
        .then((res) => {
          console.log("res", res);

          localStorage.setItem("admin", JSON.stringify(res.data));
          setIsAuthenticated(true);
          setUser(res.data);
          navigate("/dashboard");
        })
        .catch((err) => {
          console.log("err", err.response.data);
          setError("Email ou mot de passe incorrect");
        });
    } else {
      setError("Veuillez remplir tous les champs");
    }
  };

  useEffect(() => {
    firebaseManager.getToken(setNotifiableToken);

    onMessage(firebaseManager.messaging, (payload) => {
      console.log("payload", payload);
    });

    if ("Notification" in window) {
      // Vérifier si les autorisations de notification ont déjà été accordées
      if (Notification.permission === "granted") {
        // Les autorisations ont déjà été accordées
        // Vous pouvez continuer à utiliser les notifications ici
      } else if (Notification.permission !== "denied") {
        // Les autorisations n'ont pas encore été accordées ou ont été bloquées
        // Afficher une alerte pour inciter l'utilisateur à accepter les notifications
        window.alert(
          "Pour recevoir des notifications, veuillez autoriser les notifications dans les paramètres de votre navigateur."
        );

        // Demander les autorisations de notification
        Notification.requestPermission().then((permission) => {
          // Vérifier si les autorisations ont été accordées
          if (permission === "granted") {
            // Les autorisations ont été accordées
            // Vous pouvez continuer à utiliser les notifications ici
          } else {
            // Les autorisations ont été refusées
            // Gérer le cas où l'utilisateur a refusé les notifications
          }
        });
      }
    }
  }, [notifiable_token]);

  return (
    <div className="bg-default flex justify-center items-center h-screen flex flex-col">
      {error && (
        <div className="w-[35%] mx-auto bg-[#8f1f1f] flex flex-col items-center py-[10px] rounded-md shadow-md mb-[10px]">
          <p className="text-[80%] font-[400] mx-auto text-[white]">{error}</p>
        </div>
      )}
      <div className=" w-[35%] mx-auto bg-[white] flex flex-col items-center py-[40px] rounded-md shadow-md">
        <div>
          <button className="flex items-center  border border-[#bebebe36] rounded-md shadow-sm lg:shadow-md px-[20px] py-[10px]">
            <FcGoogle size={20} color="#adb5bd" className="ml-[10px] mr-[10px]" />
            Sign in with Google
          </button>
        </div>
        <hr className="w-[70%] mx-auto my-[20px] border-[#bebebe36]" />
        <p className="text-[80%] font-[400] mx-auto text-[#8898aa]">
          Sign in with credentials
        </p>
        <form className="flex flex-col items-center w-[70%]">
          <div className="mx-auto mt-[20px] flex items-center w-[70%] border border-[#bebebe36] rounded-md shadow-sm lg:shadow-md">
            <MdEmail size={20} color="#adb5bd" className="ml-[10px] " />
            <input
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="email"
              autoComplete="new-email"
              type="text"
              // class="form-control"
              className="px-4 py-2 w-full outline-none"
            />
          </div>

          <div className="mx-auto mt-[20px] flex items-center w-[70%] border border-[#bebebe36] rounded-md shadow-sm lg:shadow-md">
            <RiLockPasswordFill size={20} color="#adb5bd" className="ml-[10px]" />
            <input
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="password"
              autoComplete="new-password"
              type="password"
              // class="form-control"
              className="px-4 py-2 w-full outline-none"
            />
          </div>
          {/* color: #fff;
    background-color: #5e72e4;
    border-color: #5e72e4; */}

          <button
            onClick={handleSubmit}
            className="mx-auto mt-[20px] mb-[20px] w-[70%] bg-[#5e72e4] text-[white] py-[10px] rounded-md shadow-sm lg:shadow-md"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}

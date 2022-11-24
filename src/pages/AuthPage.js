import AuthForm from "../components/auth-form/AuthForm";
import classes from "./AuthPage.module.css";

import useDocumentTitle from "../hooks/use-documentTitle";

const AuthPage = () => {
  useDocumentTitle("Welcome to React Social");

  return (
    <div className={classes.container}>
      <AuthForm />
    </div>
  );
};

export default AuthPage;

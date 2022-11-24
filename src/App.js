import { lazy, Suspense, useContext } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

import LoadingSpinner from "./components/UI/LoadingSpinner";

import { AuthContext } from "./store/auth-context";

const Layout = lazy(() => import("./components/layout/Layout"));
const AuthPage = lazy(() => import("./pages/AuthPage"));
const HomePage = lazy(() => import("./pages/HomePage"));
const PostPage = lazy(() => import("./pages/PostPage"));
const SearchResultsPage = lazy(() => import("./pages/SearchResultsPage"));
const EditProfilePage = lazy(() => import("./pages/EditProfilePage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));

const App = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingSpinner />}>
        <Layout>
          <Switch>
            <Redirect exact from="/" to="/signup" />
            <Route path={["/signup", "/signin", "/forgotpassword", "/resetpassword/:resetToken"]}>
              {isAuthenticated ? <Redirect to="/home" /> : <AuthPage />}
            </Route>
            {!isAuthenticated && <Redirect to="/signin" />}
            <Route path="/home">
              <HomePage />
            </Route>
            <Route path="/users/:userId/posts/:postId">
              <PostPage />
            </Route>
            <Redirect exact from="/users" to="/users/me" />
            <Route path="/users/search">
              <SearchResultsPage />
            </Route>
            <Route path="/users/edit">
              <EditProfilePage />
            </Route>
            <Route path={["/users/me", "/users/:userId"]}>
              <ProfilePage />
            </Route>
            <Route path="/*">
              <Redirect to="/" />
            </Route>
          </Switch>
        </Layout>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;

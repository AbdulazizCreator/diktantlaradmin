import React, { useEffect, useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AdminBookCategories from "./components/AdminPage/AdminBookCategories/AdminBookCategories";
import AdminDashboard from "./components/AdminPage/AdminDashboard/AdminDashboard";
import AdminDictantCategories from "./components/AdminPage/AdminDictantCategories/AdminDictantCategories";
import AdminDictants from "./components/AdminPage/AdminDictants/AdminDictants";
import AdminGuide from "./components/AdminPage/AdminGuide/AdminGuide";
import AdminGuideCategories from "./components/AdminPage/AdminGuideCategories/AdminGuideCategories";
import AdminLibrary from "./components/AdminPage/AdminLibrary/AdminLibrary";
import BookComments from "./components/AdminPage/AdminLibrary/BookComments";
import BookCategoryProducts from "./components/AdminPage/BookCategoryProducts/BookCategoryProducts";
import DictantCategoryProducts from "./components/AdminPage/DictantCategoryProducts/DictantCategoryProducts";
import GuideCategoryProducts from "./components/AdminPage/GuideCategoryProducts/GuideCategoryProducts";
import Login from "./components/AdminPage/Login/Login";
import Notfound from "./components/Notfound";
import { TOKEN_PATH } from "./tools/constants";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem(TOKEN_PATH));
  useEffect(() => {
    setToken(localStorage.getItem(TOKEN_PATH));
  }, []);
  return (
    <div className="App">
      <ToastContainer />
      <BrowserRouter>
        {token ? (
          <Switch>
            <Route exact path="/admin" component={AdminDashboard} />
            <Route exact path="/admin/dictants" component={AdminDictants} />
            <Route
              exact
              path="/admin/dictantcategory"
              component={AdminDictantCategories}
            />
            <Route
              exact
              path="/admin/dictantcategory/:id"
              component={DictantCategoryProducts}
            />
            <Route exact path="/admin/library" component={AdminLibrary} />
            <Route exact path="/admin/library/:id" component={BookComments} />
            <Route
              exact
              path="/admin/bookcategory"
              component={AdminBookCategories}
            />
            <Route
              exact
              path="/admin/bookcategory/:id"
              component={BookCategoryProducts}
            />
            <Route exact path="/admin/guide" component={AdminGuide} />
            <Route
              exact
              path="/admin/guidecategory"
              component={AdminGuideCategories}
            />
            <Route
              exact
              path="/admin/guidecategory/:id"
              component={GuideCategoryProducts}
            />
            <Route exact path="/admin-login" component={Login} />
            <Route exact component={Notfound} />
          </Switch>
        ) : (
          <Switch>
            <Route exact path="/admin-login" component={Login} />
            <Route exact component={Notfound} />
          </Switch>
        )}
      </BrowserRouter>
    </div>
  );
};

export default App;

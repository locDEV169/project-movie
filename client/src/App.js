import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header/Header";
import Content from "./Components/Home/Content";
import WatchTv from "./Components/Watch/Watch";
import WatchMovie from "./Components/Watch/WatchMovie";
import DetailsMovie from "./page/Details/Details";
import LoginPage from "./page/login/login";
import RegisterPage from "./page/Register/register";
import Search from "./page/Search/Search";
import SearchResults from "./page/Search/SearchResults";
import ViewMorePage from "./page/ViewMore/ViewMorePage";
import "./Responsive.css";


function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Content />} />
          <Route path="/search" element={<Search />} />
          <Route path="/results/:keyword" element={<SearchResults />} />
          <Route path="/:media_type/:type" element={<ViewMorePage />} />
          <Route path="/details/:media_type/:id" element={<DetailsMovie />} />
          <Route
            path="/watch/tv/:id/season/:season/esp/:esp"
            element={<WatchTv />}
          />
          <Route path="/watch/movie/:id" element={<WatchMovie />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

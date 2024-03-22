import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import CategoryTile from "./components/CategoryTile";
import WishDisplay from "./components/WishDisplay";
import "./App.css";
import wishes from "./wishes";

const categories = [
  { key: "birthday", label: "Születésnap" },
  { key: "anniversary", label: "Évforduló" },
  { key: "nameDay", label: "Névnap" },
  { key: "illness", label: "Betegség" },
  { key: "breakup", label: "Szakítás" },
  { key: "congratulations", label: "Gratuláció" },
  { key: "christmas", label: "Karácsony" },
];
function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route
            path="/"
            element={
              <div className="category-container">
                {categories.map((category) => (
                  <Link
                    to={`/category/${category.key}`}
                    key={category.key}
                    style={{ textDecoration: "none" }}
                  >
                    <CategoryTile
                      category={category.key}
                      label={category.label}
                      wishCount={wishes[category.key].length}
                    />
                  </Link>
                ))}
              </div>
            }
          />
          <Route path="/category/:category" element={<WishDisplay />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { ApolloProvider, InMemoryCache } from "@apollo/client";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Course from "./pages/Course";
import Lesson from "./pages/Lesson";
import ParticleRing from "./components/ParticleRing";
import "./index.css";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import client from "./apolloClient";
import { AuthProvider } from "./context/authContext";
import CoursesPage from "./pages/CoursesPage";

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clients: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        projects: {
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});

function App() {
  return (
    <>
      <ToastContainer />
      <AuthProvider>
        <ApolloProvider client={client}>
          <Router>
            <Navbar />
            <ParticleRing />
            <div className="container">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/coursesPage" element={<CoursesPage />} />
                <Route path="/courses/:id" element={<Course />}>
                  <Route path="lessons/:lessonId" element={<Lesson />} />
                </Route>
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </Router>
        </ApolloProvider>
      </AuthProvider>
    </>
  );
}

export default App;

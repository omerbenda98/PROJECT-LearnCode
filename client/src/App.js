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
import ProtectedRoute from "./components/ProtectedRoute";
import UnauthorizedComponent from "./components/UnauthorizedComponent";
import EditCourse from "./pages/EditCourse";

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
                <Route
                  path="/unauthorized"
                  element={<UnauthorizedComponent />}
                />
                <Route
                  path="/coursesPage"
                  element={
                    <ProtectedRoute allowedRoles={["ADMIN", "SUBSCRIBED"]}>
                      <CoursesPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/editCourse/:id"
                  element={
                    <ProtectedRoute allowedRoles={["ADMIN"]}>
                      <EditCourse />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/courses/:id"
                  element={
                    <ProtectedRoute allowedRoles={["ADMIN", "SUBSCRIBED"]}>
                      <Course />
                    </ProtectedRoute>
                  }
                >
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

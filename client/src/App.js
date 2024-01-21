import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/ParticleRing";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Course from "./pages/Course";
import Lesson from "./pages/Lesson";
// import IconSideNav from "./components/IconSideNav";
import ParticleRing from "./components/ParticleRing";
import "./index.css";
import Navbar from "./components/Navbar";
import About from "./pages/About";
// import Quiz from "./pages/Quiz";
// import Quiz from "./pages/Quiz";

// const cache = new InMemoryCache({
//   typePolicies: {
//     Query: {
//       fields: {
//         clients: {
//           merge(existing, incoming) {
//             return incoming;
//           },
//         },
//         projects: {
//           merge(existing, incoming) {
//             return incoming;
//           },
//         },
//       },
//     },
//   },
// });

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

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
  cache,
});

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <Router>
          <Navbar />
          <ParticleRing />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/courses/:id" element={<Course />}>
                <Route path="lessons/:lessonId" element={<Lesson />}>
                  {/* <Route path="quiz/:quizId" element={<Quiz />} /> */}
                </Route>
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </Router>
      </ApolloProvider>
    </>
  );
}

export default App;

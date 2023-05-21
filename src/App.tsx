import Layout from "./components/ui/layout";
import { AuthProvider } from "./contexts/authContext";
import Dashboard from "./pages/dashboard";

function App() {
  return (
    <AuthProvider>
      <Layout>
        <Dashboard />
      </Layout>
    </AuthProvider>
  );
}

export default App;

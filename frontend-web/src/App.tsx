import { BrowserRouter } from 'react-router-dom';
import { Content } from './components/Content/Content';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { Router } from './components/Router';
import { AuthContextProvider } from './context/AuthContext';
import { Toaster } from 'react-hot-toast';
import './styles/global.css';
import { Menu } from './components/menu/Menu';

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <div className="app">
          <Header />
          <Menu />
          <Content>
            <Router></Router>
            <Toaster />
          </Content>
          <Footer />
        </div>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;

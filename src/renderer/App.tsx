import { AnimatePresence } from 'framer-motion';
import {
  MemoryRouter as Router,
  Switch,
  Route,
  // useLocation,
} from 'react-router-dom';

// import { AnimatePresence } from 'framer-motion';

import CenterView from './components/CenterView';
import Sidebar from './components/Sidebar';

import './assets/styles/global.scss';

export default function App() {
  // const location = useLocation();

  return (
    <Router>
      <div id="appWrapper">
        <Sidebar />
        <main>
          <AnimatePresence exitBeforeEnter>
            <Switch /* location={location} key={location.key} */>
              <Route exact path="/" component={CenterView} />
            </Switch>
          </AnimatePresence>
        </main>
      </div>
    </Router>
  );
}

import { useState } from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';

import { AnimatePresence } from 'framer-motion';

import AmbientView from './views/AmbientView';
import CreateAmbientView from './views/CreateAmbientView';
import EditAmbientSettingsView from './views/EditAmbientSettingsView';
import Sidebar from './components/Sidebar';

import './assets/styles/global.scss';
import './assets/styles/utilities.scss';
import AmbientListContext from './contexts/AmbientListContext';
import NotificationItem from './components/NotificationItem';

export default function App() {
  const location = useLocation();
  const [ambients, setAmbients] = useState([]);

  return (
    <AmbientListContext.Provider value={[ambients, setAmbients]}>
      <div id="appWrapper">
        <Sidebar />
        <main id="mainWindow">
          <AnimatePresence exitBeforeEnter>
            {/*
              The key prop must be configured as below
                otherwise, the exit animation will not work
            */}
            <Switch location={location} key={location.pathname}>
              <Route exact path="/" component={AmbientView} />
              <Route
                path="/settings/ambients/new"
                component={CreateAmbientView}
              />
              <Route
                exact
                path="/ambient/:ambientUUID"
                component={AmbientView}
              />
              <Route
                path="/ambient/:ambientUUID/edit"
                component={EditAmbientSettingsView}
              />
            </Switch>
          </AnimatePresence>
        </main>

        <NotificationItem type="warning" />
      </div>
    </AmbientListContext.Provider>
  );
}

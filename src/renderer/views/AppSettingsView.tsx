import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiChevronRight, FiInfo, FiLayers, FiSettings } from 'react-icons/fi';
import { Route, Routes } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import globalContainerVariants from '../utils/globalContainerVariants';

import ThemeSettings from '../components/SettingsView/ThemeSettings';
import LanguageSettings from '../components/SettingsView/LanguageSettings';
import AboutSection from '../components/SettingsView/AboutSection';
import ReportABugSection from '../components/SettingsView/ReportABugSection';
import SystemTraySettings from '../components/SettingsView/SystemTraySettings';
import UpdatesSettings from '../components/SettingsView/UpdatesSettings';

import '../assets/styles/views/AppSettings.view.scss';

interface SettingsMenuBuilder {
  title: {
    name: string;
    icon: JSX.Element;
  };
  key: string;
  children: {
    target: string;
    name: string;
    component: JSX.Element;
  }[];
}

export default function AppSettingsView() {
  const { t } = useTranslation();
  const [selectedRoute, setSelectedRoute] = useState('');

  const menuBuilder = [
    {
      title: {
        name: t('views.AppSettingsView.settingsMenu.categories.general'),
        icon: <FiSettings />,
      },
      key: 'GENERAL_SETTINGS',
      children: [
        {
          target: `theme`,
          name: t('views.AppSettingsView.settingsMenu.pages.theme'),
          component: <ThemeSettings />,
        },
        {
          target: `language`,
          name: t('views.AppSettingsView.settingsMenu.pages.language'),
          component: <LanguageSettings />,
        },
        {
          target: `updates`,
          name: t('views.AppSettingsView.settingsMenu.pages.update'),
          component: <UpdatesSettings />,
        },
      ],
    },
    {
      key: 'BEHAVIOR',
      title: {
        name: t('views.AppSettingsView.settingsMenu.categories.behavior'),
        icon: <FiLayers />,
      },
      children: [
        {
          target: `systemTray`,
          name: t('views.AppSettingsView.settingsMenu.pages.systemTray'),
          component: <SystemTraySettings />,
        },
      ],
    },
    {
      title: {
        name: t('views.AppSettingsView.settingsMenu.categories.about'),
        icon: <FiInfo />,
      },
      key: 'ABOUT',
      children: [
        {
          target: `about`,
          name: t('views.AppSettingsView.settingsMenu.pages.about'),
          component: <AboutSection />,
        },
        {
          target: `reportABug`,
          name: t('views.AppSettingsView.settingsMenu.pages.reportABug'),
          component: <ReportABugSection />,
        },
      ],
    },
  ] as SettingsMenuBuilder[];

  // TODO: Update settings view to a single page.
  return (
    <motion.div
      variants={globalContainerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      id="appSettingsContainer"
      className="app-settings-container"
    >
      <h2>{t('views.AppSettingsView.title')}</h2>
      <div className="settings-block-container">
        <aside className="settings-menu">
          {menuBuilder.map(({ key, title, children }) => {
            return (
              <div className="menu-category" key={key}>
                <h5 className="category-title">
                  {title.icon} {title.name}
                </h5>
                <div className="category-items">
                  {children.map(({ target, name }) => {
                    return (
                      <Link
                        key={target}
                        to={target}
                        className={`item ${
                          selectedRoute === target ? 'active' : ''
                        }`}
                        onClick={() => setSelectedRoute(target)}
                      >
                        <FiChevronRight /> {name}
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </aside>
        <div className="settings-item-container">
          <Routes>
            {menuBuilder.map((cat /** 😺 */) => {
              return cat.children.map(({ target, component }) => {
                return <Route path={target} key={target} element={component} />;
              });
            })}

            <Route
              path="/"
              element={
                <>
                  <h3 className="icon-title">
                    <span className="icon-dot">
                      <FiSettings />
                    </span>
                    {t('views.AppSettingsView.emptyRoute.title')}
                  </h3>
                  <p>{t('views.AppSettingsView.emptyRoute.helper')}</p>
                </>
              }
            />
          </Routes>
        </div>
      </div>
    </motion.div>
  );
}

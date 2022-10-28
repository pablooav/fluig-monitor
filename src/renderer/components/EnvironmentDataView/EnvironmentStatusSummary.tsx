import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getLastHttpResponseById } from '../../ipc/environmentsIpcHandler';
import { HTTPResponse } from '../../../main/generated/client';
import EnvironmentStatusCard from './EnvironmentStatusCard';
import SpinnerLoader from '../Loaders/Spinner';

import '../../assets/styles/components/EnvironmentDataView/EnvironmentStatusSummary.scss';

import Disk from './SystemResources/Disk';
import Database from './SystemResources/Database';
import Memory from './SystemResources/Memory';

interface Props {
  environmentName: string;
  environmentId: number;
}

export default function EnvironmentStatusSummary({
  environmentName,
  environmentId,
}: Props) {
  const [lastHttpResponse, setLastHttpResponse] = useState({} as HTTPResponse);
  const { t } = useTranslation();

  useEffect(() => {
    async function getData() {
      setLastHttpResponse(await getLastHttpResponseById(environmentId));
    }

    getData();
  }, [environmentId]);

  if (typeof lastHttpResponse.timestamp === 'undefined') {
    return <SpinnerLoader />;
  }

  return (
    <div className="environment-status-summary-container">
      <h2 className="title">
        {environmentName}
        {lastHttpResponse.timestamp.toDateString() ===
        new Date().toDateString() ? (
          <span>
            {t('components.EnvironmentStatusSummary.updatedAt')}{' '}
            {lastHttpResponse.timestamp.toLocaleTimeString()}
          </span>
        ) : (
          <span>
            {t('components.EnvironmentStatusSummary.updatedAtAlt')}{' '}
            {lastHttpResponse.timestamp.toLocaleString()}
          </span>
        )}
      </h2>
      <div className="components-container">
        <EnvironmentStatusCard environmentId={environmentId} />
        <div className="system-resources">
          <Disk environmentId={environmentId} />
          <Memory environmentId={environmentId} />
          <Database environmentId={environmentId} />
        </div>
      </div>
    </div>
  );
}

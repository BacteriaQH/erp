import {Layout, Page} from '@shopify/polaris';
import React from 'react';
import useFetchApi from '@assets/hooks/api/useFetchApi';

export default function User() {
  const {data, loading, setData} = useFetchApi('/api/users');
  return (
    <Page title="User">
      <Layout>
        <Layout.Section>
          <Page title="User"></Page>
        </Layout.Section>
      </Layout>
    </Page>
  );
}

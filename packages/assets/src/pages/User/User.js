import {Card, Layout, Page} from '@shopify/polaris';
import React, {useRef} from 'react';

import useConfirmModal from '@assets/hooks/popup/useConfirmModal';
import ListUser from './ListUser';
import UserDataModal from './UserDataModal';
import useCreateApi from '@assets/hooks/api/useCreateApi';
import useFetchApi from '@assets/hooks/api/useFetchApi';

export default function User() {
  const initialInput = {
    email: '',
    role: 'user',
    fullName: '',
    active: false
  };
  const inputRef = useRef(initialInput);
  const {data, loading, setData} = useFetchApi({
    url: '/users',
    initLoad: true
  });
  const {handleCreate, creating} = useCreateApi({
    url: '/user',
    fullResp: true
  });
  const modalContent = () => <UserDataModal inputRef={inputRef} />;
  const {modal, openModal, closeModal} = useConfirmModal({
    confirmAction: async () => {
      const resp = await handleCreate(inputRef.current);
      setData(prev => [...prev, resp.data]);
      inputRef.current = initialInput;
      closeModal();
    },
    title: 'Create User',
    buttonTitle: 'Create',
    HtmlContent: modalContent,
    defaultCurrentInput: inputRef.current,
    loading: creating
  });

  return (
    <Page title="User" primaryAction={{content: 'Create', onClick: openModal}}>
      <Layout>
        <Layout.Section>
          <Card>
            <ListUser data={data} setData={setData} loading={loading} />
          </Card>
        </Layout.Section>
      </Layout>
      {modal}
    </Page>
  );
}

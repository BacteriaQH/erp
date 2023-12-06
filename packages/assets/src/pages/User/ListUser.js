import {
  ActionList,
  Avatar,
  Button,
  DisplayText,
  Icon,
  IndexTable,
  Popover,
  Stack,
  useIndexResourceState
} from '@shopify/polaris';
import React, {useCallback, useState} from 'react';
import {MobileVerticalDotsMajor} from '@shopify/polaris-icons';

export default function ListUser({data, loading}) {
  const [popoverActive, setPopoverActive] = useState(false);

  const togglePopoverActive = useCallback(
    () => setPopoverActive(popoverActive => !popoverActive),
    []
  );

  const {selectedResources, allResourcesSelected, handleSelectionChange} = useIndexResourceState(
    data
  );
  const rowMarkup = data.map((user, index) => (
    <IndexTable.Row
      id={user.id}
      key={user.id}
      selected={selectedResources.includes(user.id)}
      position={index}
    >
      <IndexTable.Cell>{index + 1}</IndexTable.Cell>
      <IndexTable.Cell>
        <Stack alignment="center">
          <Avatar source={user.avatar} alt={user.fullName} />
          <DisplayText size="small">{user.fullName}</DisplayText>
        </Stack>
      </IndexTable.Cell>
      <IndexTable.Cell>{user.email}</IndexTable.Cell>
      <IndexTable.Cell>{user.role.toString()}</IndexTable.Cell>
      <IndexTable.Cell>
        {new Date(user.createdAt._seconds * 1000).toLocaleDateString('vi-VN').toString()}
      </IndexTable.Cell>
      <IndexTable.Cell>
        <Popover
          activator={
            <Button onClick={togglePopoverActive}>
              <Icon source={MobileVerticalDotsMajor} />
            </Button>
          }
          active={popoverActive}
          onClose={togglePopoverActive}
        >
          <ActionList
            actionRole="menuitem"
            items={[
              {
                content: 'Delete',
                onAction() {}
              },
              {
                content: 'Update',
                onAction() {}
              }
            ]}
          />
        </Popover>
      </IndexTable.Cell>
    </IndexTable.Row>
  ));
  const promotedBulkActions = [
    {
      content: 'Delete users',
      onAction: () => console.log('Todo: implement bulk edit')
    }
  ];
  return (
    <IndexTable
      selectedItemsCount={allResourcesSelected ? 'All' : selectedResources.length}
      headings={[
        {title: 'ID'},
        {title: 'Name'},
        {title: 'Email'},
        {title: 'Role'},
        {title: 'Created At'},
        {title: 'Action'}
      ]}
      onSelectionChange={handleSelectionChange}
      itemCount={data.length}
      loading={loading}
      resourceName={{
        singular: 'user',
        plural: 'users'
      }}
      promotedBulkActions={promotedBulkActions}
    >
      {rowMarkup}
    </IndexTable>
  );
}

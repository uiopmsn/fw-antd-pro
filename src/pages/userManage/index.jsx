import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Dropdown, Menu, message } from 'antd';
import React, { useState, useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import CreateForm from './components/CreateForm';
import UpdateForm from './components/UpdateForm';
import { queryUsers, updateUser, addUser, stopUsers, resetUsers } from '../../services/user';

/**
 * 添加节点
 * @param fields
 */
const handleAdd = async fields => {
  const hide = message.loading('正在添加');

  try {
    const res = await addUser({
      userName: fields.userName,
      userDesc: fields.userDesc,
    });
    hide();
    if (res.code === 1) {
      message.success('添加成功');
      return true;
    }
  } catch (error) {
    hide();
    message.error('添加失败请重试！');
    return false;
  }
};

/**
 * 更新节点
 * @param fields
 */
const handleUpdate = async fields => {
  const hide = message.loading('正在配置');

  try {
    const res = await updateUser({
      name: fields.name,
      desc: fields.desc,
      key: fields.key,
    });
    hide();
    if (res.code === 1) {
      message.success('配置成功');
      return true;
    }
  } catch (error) {
    hide();
    message.error('配置失败请重试！');
    return false;
  }
};

/**
 *  停用节点
 * @param selectedRows
 */
const handleStop = async selectedRows => {
  const hide = message.loading('正在停用');
  if (!selectedRows) return true;

  try {
    const res = await stopUsers({
      ids: selectedRows.map(row => row.userName),
    });
    hide();
    if (res.code === 1){
      message.success('停用成功，即将刷新');
      return true;
    }
  } catch (error) {
    hide();
    message.error('停用失败，请重试');
    return false;
  }
};

/**
 * 启用节点
 * @param selectedRows
 * @returns {Promise<boolean>}
 */
const handleReset = async selectedRows => {
  const hide = message.loading('正在启用');
  if (!selectedRows) return true;

  try {
    const res = await resetUsers({
      ids: selectedRows.map(row => row.userName),
    });
    hide();
    if (res.code === 1){
      message.success('启用成功，即将刷新');
      return true;
    }
  } catch (error) {
    hide();
    message.error('启用失败，请重试');
    return false;
  }
};

const TableList = () => {
  const [sorter, setSorter] = useState({});
  const [createModalVisible, handleModalVisible] = useState(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState(false);
  const [stepFormValues, setStepFormValues] = useState({});
  const actionRef = useRef();
  const columns = [
    {
      title: '用户名',
      dataIndex: 'userName',
      sorter: true,
    },
    {
      title: '描述',
      dataIndex: 'userDesc',
      sorter: true,
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueEnum: {
        0: {
          text: '停用',
          status: 'Default',
        },
        1: {
          text: '启用',
          status: 'Processing',
        },
      },
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <a
            onClick={() => {
              handleUpdateModalVisible(true);
              setStepFormValues(record);
            }}
          >
            配置
          </a>
          <Divider type="vertical" />
          <a href="">重置密码</a>
        </>
      ),
    },
  ];
  return (
    <PageHeaderWrapper>
      <ProTable
        headerTitle="用户列表"
        actionRef={actionRef}
        rowKey="userName"
        onChange={(_, _filter, _sorter) => {
          setSorter(`${_sorter.field}_${_sorter.order}`);
        }}
        params={{
          sorter,
        }}
        toolBarRender={(action, { selectedRows }) => [
          <Button type="primary" onClick={() => handleModalVisible(true)}>
            <PlusOutlined /> 新建
          </Button>,
          selectedRows && selectedRows.length > 0 && (
            <Dropdown
              overlay={
                <Menu
                  onClick={async e => {
                    if (e.key === 'stop') {
                      await handleStop(selectedRows);
                      action.reload();
                    }
                    if (e.key === 'reset') {
                      await handleReset(selectedRows);
                      action.reload();
                    }
                  }}
                  selectedKeys={[]}
                >
                  <Menu.Item key="stop">批量停用</Menu.Item>
                  <Menu.Item key="reset">批量启用</Menu.Item>
                </Menu>
              }
            >
              <Button>
                批量操作 <DownOutlined />
              </Button>
            </Dropdown>
          ),
        ]}
        request={params => queryUsers(params)}
        columns={columns}
        rowSelection={{}}
      />
      <CreateForm
        onSubmit={async value => {
          const success = await handleAdd(value);

          if (success) {
            handleModalVisible(false);

            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => handleModalVisible(false)}
        modalVisible={createModalVisible}
      />
      {stepFormValues && Object.keys(stepFormValues).length ? (
        <UpdateForm
          onSubmit={async value => {
            const success = await handleUpdate(value);

            if (success) {
              handleModalVisible(false);
              setStepFormValues({});

              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          onCancel={() => {
            handleUpdateModalVisible(false);
            setStepFormValues({});
          }}
          updateModalVisible={updateModalVisible}
          values={stepFormValues}
        />
      ) : null}
    </PageHeaderWrapper>
  );
};

export default TableList;

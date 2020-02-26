import { PlusOutlined, StopOutlined } from '@ant-design/icons';
import { Button, message } from 'antd';
import React, { useState, useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import CreateForm from './components/CreateForm';
import UpdateForm from './components/UpdateForm';
import { queryRoleList, updateRole, addRole, stopRole, getPermByRole } from '../../services/role';

/**
 * 添加节点
 * @param fields
 */
const handleAdd = async fields => {
  const hide = message.loading('正在添加');

  try {
    await addRole({
      roleCode: fields.roleCode,
      roleName: fields.roleName,
    });
    hide();
    message.success('添加成功');
    return true;
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
    await updateRole({
      key: fields.key,
      roleCode: fields.roleCode,
      roleName: fields.roleName,
    });
    hide();
    message.success('配置成功');
    return true;
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
const handleRemove = async selectedRows => {
  const hide = message.loading('正在停用');
  if (!selectedRows) return true;

  try {
    await stopRole({
      id: selectedRows.map(row => row.id),
    });
    hide();
    message.success('停用成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('停用失败，请重试');
    return false;
  }
};

const roleManage = () => {
  const [sorter, setSorter] = useState({});
  const [createModalVisible, handleModalVisible] = useState(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState(false);
  const [stepFormValues, setStepFormValues] = useState({});
  const [treeSelectValues, setTreeSelectValues] = useState([]);
  const actionRef = useRef();

  const getRolePerm = async fields => {
    const hide = message.loading('正在加载角色权限');
    try {
      const res = await getPermByRole({
        roleId: fields.id,
      });
      hide();
      if (res && res.code === 1){
        return res.data;
      }else {
        return [];
      }

    } catch (error) {
      hide();
      return [];
      message.error('加载角色权限失败！');
    }
  };

  const columns = [
    {
      title: '角色编码',
      dataIndex: 'roleCode',
    },
    {
      title: '角色描述',
      dataIndex: 'roleName',
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueEnum: {
        0: {
          text: '已停用',
          status: 'Default',
        },
        1: {
          text: '使用中',
          status: 'Success',
        },
      },
    },
    {
      title: '最后修改时间',
      dataIndex: 'updatedAt',
      sorter: true,
      valueType: 'dateTime',
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
              getRolePerm(record).then(t => setTreeSelectValues(t));
            }}
          >
            权限配置
          </a>
        </>
      ),
    },
  ];

  return (
    <PageHeaderWrapper>
      <ProTable
        headerTitle="角色列表"
        actionRef={actionRef}
        rowKey="id"
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
            <Button type="danger"
                    onClick={async e => {
                      if (e.key === 'remove') {
                        await handleRemove(selectedRows);
                        action.reload();
                      }
                    }}
                    selectedKeys={[]}
            >
              <StopOutlined /> 批量停用
            </Button>
          ),
        ]}

        request={params => queryRoleList(params)}
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
          perms={treeSelectValues}
        />
      ) : null}
    </PageHeaderWrapper>
  );
};

export default roleManage;

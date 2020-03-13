import React, {useState} from 'react';
import { Form, Button, Input, Modal, Select } from 'antd';


const FormItem = Form.Item;

const formLayout = {
  labelCol: {
    span: 7,
  },
  wrapperCol: {
    span: 13,
  },
};

const UpdateForm = props => {
  const [formVals, setFormVals] = useState({
    userName: props.values.userName,
    userDesc: props.values.userDesc,
    userRole: props.values.userRole,
  });

  const [form] = Form.useForm();
  const {
    onSubmit: handleUpdate,
    onCancel: handleUpdateModalVisible,
    updateModalVisible,
    values,
    allRole,
  } = props;

  const selectChild = allRole.map(item => {
    return <Option key={item.key}>{item.value}</Option>;
  });

  const handleFinish = async () => {
    const fieldsValue = await form.validateFields();
    setFormVals({ ...formVals, ...fieldsValue});
    handleUpdate(formVals);
  };

  const renderContent = () => {
    return (
      <>
        <FormItem
          name="userDesc"
          label="用户描述"
          rules={[
            {
              required: true,
              message: '请输入至少两个字符的描述！',
              min: 2,
            },
          ]}
        >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem
          name="userRole"
          label="用户角色"
        >
          <Select
            mode="multiple"
            style={{ width: '100%' }}
            placeholder="请选择"
            onChange={handleChange}
          >
            {selectChild}
          </Select>
        </FormItem>
      </>
    );
  };

  const handleChange = (values) => {
    setFormVals({ ...formVals, userRole:values});
  };

  const renderFooter = () => {
    return (
      <>
        <Button onClick={() => handleUpdateModalVisible(false, values)}>取消</Button>
        <Button type="primary" onClick={() => handleFinish()}>
          完成
        </Button>
      </>
    );
  };

  return (
    <Modal
      width={640}
      bodyStyle={{
        padding: '32px 40px 48px',
      }}
      destroyOnClose
      title="用户配置"
      visible={updateModalVisible}
      footer={renderFooter()}
      onCancel={() => handleUpdateModalVisible(false, values)}
      afterClose={() => handleUpdateModalVisible()}
    >
      <Form
        {...formLayout}
        form={form}
        initialValues={{
          userDesc: formVals.userDesc,
          userRole: formVals.userRole,
        }}
      >
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default UpdateForm;

import React from 'react';
import { Form, Input, Modal, Alert } from 'antd';
const FormItem = Form.Item;

const CreateForm = props => {
  const [form] = Form.useForm();
  const { modalVisible, onSubmit: handleAdd, onCancel } = props;

  const okHandle = async () => {
    const fieldsValue = await form.validateFields();
    form.resetFields();
    handleAdd(fieldsValue);
  };

  return (
    <Modal
      destroyOnClose
      title="新建用户"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => onCancel()}
    >
      <Alert message="新建用户密码默认为123456" type="info" showIcon />
      <br/>
      <Form form={form}>
        <FormItem
          labelCol={{
            span: 5,
          }}
          wrapperCol={{
            span: 15,
          }}
          label="用户名"
          name="userName"
          rules={[
            {
              required: true,
              message: '请输入用户名！',
            },
          ]}
        >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem
          labelCol={{
            span: 5,
          }}
          wrapperCol={{
            span: 15,
          }}
          label="描述"
          name="userDesc"
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
      </Form>
    </Modal>
  );
};

export default CreateForm;

import React from 'react';
import { Form, Input, Modal } from 'antd';
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
      title="新建角色"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => onCancel()}
    >
      <Form form={form}>
        <FormItem
          labelCol={{
            span: 5,
          }}
          wrapperCol={{
            span: 15,
          }}
          label="角色编码"
          name="roleCode"
          rules={[
            {
              required: true,
              message: '请输入角色编码！',
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
          label="角色描述"
          name="roleName"
          rules={[
            {
              required: true,
              message: '请输入至少两个字符的规则描述！',
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

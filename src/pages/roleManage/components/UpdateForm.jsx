import React, { useState } from 'react';
import { Form, Button, Input, Modal, Steps, message } from 'antd';
import PermTree from './PermTree';

const FormItem = Form.Item;
const { Step } = Steps;
const { TextArea } = Input;
const formLayout = {
  labelCol: {
    span: 7,
  },
  wrapperCol: {
    span: 16,
  },
};

const UpdateForm = props => {
  const [formVals, setFormVals] = useState({
    id: props.values.id,
    roleCode: props.values.roleCode,
    roleName: props.values.roleName,
    perms: [],
  });
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();
  const {
    onSubmit: handleUpdate,
    onCancel: handleUpdateModalVisible,
    updateModalVisible,
    values,
  } = props;

  const forward = () => setCurrentStep(currentStep + 1);

  const backward = () => setCurrentStep(currentStep - 1);

  const saveTreeData = (value) => {
    formVals.perms = value.checkedKeys;
  };

  const handleNext = async () => {
    const fieldsValue = await form.validateFields();
    setFormVals({ ...formVals, ...fieldsValue });
    if (currentStep === 1){
      //formVals.perms = [1,2,3];
      //message.success(JSON.stringify(formVals) );
    }

    if (currentStep < 1) {
      forward();
    } else {
      message.success(JSON.stringify(formVals) );
      handleUpdate(formVals);
    }
  };

  const renderContent = () => {
    if (currentStep === 1) {
      return (
        <>
          <PermTree
            onChecked = {saveTreeData}
          />
        </>
      );
    }

    return (
      <>
        <FormItem
          name="roleCode"
          label="角色编码"
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
          name="roleName"
          label="角色描述"
          rules={[
            {
              required: true,
              message: '请输入至少两个字符的规则描述！',
              min: 2,
            },
          ]}
        >
          <TextArea rows={4} placeholder="请输入至少两个字符" />
        </FormItem>
      </>
    );
  };

  const renderFooter = () => {

    if (currentStep === 1) {
      return (
        <>
          <Button
            style={{
              float: 'left',
            }}
            onClick={backward}
          >
            上一步
          </Button>
          <Button onClick={() => handleUpdateModalVisible(false, values)}>取消</Button>
          <Button type="primary" onClick={() => handleNext()}>
            完成
          </Button>
        </>
      );
    }

    return (
      <>
        <Button onClick={() => handleUpdateModalVisible(false, values)}>取消</Button>
        <Button type="primary" onClick={() => handleNext()}>
          下一步
        </Button>
      </>
    );
  };

  return (
    <Modal
      width={400}
      bodyStyle={{
        padding: '32px 40px 48px',
      }}
      destroyOnClose
      title="权限配置"
      visible={updateModalVisible}
      footer={renderFooter()}
      onCancel={() => handleUpdateModalVisible(false, values)}
      afterClose={() => handleUpdateModalVisible()}
    >
      <Steps
        style={{
          marginBottom: 28,
        }}
        size="small"
        current={currentStep}
      >
        <Step title="角色信息" />
        <Step title="权限配置" />
      </Steps>
      <Form
        {...formLayout}
        form={form}
        initialValues={{
          id: formVals.id,
          roleCode: formVals.roleCode,
          roleName: formVals.roleName,
        }}
      >
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default UpdateForm;

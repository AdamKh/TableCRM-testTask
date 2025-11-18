import { Button, Form, Input, Select } from "antd";
import "./App.scss";

const bankOptions = [
  { value: 123, label: "Сбер" },
  { value: 321, label: "Т-банк" },
  { value: 456, label: "Альфа" },
];

const orgTypeOptions = [
  { value: 908, label: "ООО" },
  { value: 35, label: "ИП" },
  { value: 56, label: "Физ. лицо" },
];

const warehouseOptions = [
  { value: 111, label: "Склад 1" },
  { value: 222, label: "Склад 2" },
  { value: 333, label: "Склад 3" },
];

const currencyOptions = [
  { value: 432, label: "Рубль" },
  { value: 654, label: "Доллар" },
  { value: 765, label: "Евро" },
];

const buildPayload = (values) => [
  {
    dated: Math.floor(Date.now() / 1000),
    operation: "Заказ",
    tax_included: true,
    tax_active: true,
    goods: [
      {
        price: 500,
        quantity: 1,
        unit: 116,
        discount: 0,
        sum_discounted: 0,
        nomenclature: 45690,
      },
    ],
    settings: {
      date_next_created: null,
    },
    loyality_card_id: null,
    warehouse: values.warehouse,
    contragent: values.number,
    paybox: 759,
    organization: values.orgType,
    status: false,
    paid_rubles: 476.2,
    paid_lt: 23.799999999999997,
  },
];

function App() {
  const [form] = Form.useForm();

  const onCreate = async () => {
    const values = await form.validateFields();
    const { token } = values;
    const path = `https://app.tablecrm.com/api/v1/docs_sales/?token=${token}`;
    console.log(values);

    const payload = buildPayload(values);

    fetch(path, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(payload),
    });
  };

  const onCreateAndPost = async () => {
    const values = await form.validateFields();
    const { token } = values;
    const path = `https://app.tablecrm.com/api/v1/docs_sales/?token=${token}&post=true`;

    const payload = buildPayload(values);

    fetch(path, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(payload),
    });
  };

  return (
    <div className="container">
      <div className="menu">
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            orgType: 908,
            warehouse: 111,
            currency: 432,
          }}
        >
          <Form.Item
            label="Токен для авторизации"
            name="token"
            rules={[{ required: true, message: "Введите токен" }]}
          >
            <Input.Password placeholder="Токен для авторизации" />
          </Form.Item>

          <Form.Item
            label="Номер телефона"
            name="number"
            rules={[
              {
                required: true,
                message: "Введите номер телефона",
              },
              {
                pattern: /^(?:\+7\d{3}\d{3}\d{2}\d{2}|8\d{3}\d{3}\d{2}\d{2})$/,
                message:
                  "Введите номер в формате +7 xxx xxx xx xx или 8 xxx xxx xx xx",
              },
            ]}
          >
            <Input placeholder="+7 ххх ххх хх хх / 8 ххх ххх хх хх" />
          </Form.Item>

          <Form.Item
            label="Счет поступления"
            name="incomingAccount"
            rules={[{ required: true, message: "Выберите счет поступления" }]}
          >
            <Select suffixIcon={null} showSearch options={bankOptions} />
          </Form.Item>

          <Form.Item
            label="Организация"
            name="orgType"
            rules={[{ required: true, message: "Введите организацию" }]}
          >
            <Select options={orgTypeOptions} />
          </Form.Item>

          <Form.Item
            label="Склад отгрузки"
            name="warehouse"
            rules={[{ required: true, message: "Введите склад отгрузки" }]}
          >
            <Select options={warehouseOptions} />
          </Form.Item>

          <Form.Item
            label="Тип цены"
            name="currency"
            rules={[{ required: true, message: "Введите тип цены" }]}
          >
            <Select options={currencyOptions} />
          </Form.Item>

          <Button block style={{ marginBottom: "8px" }} onClick={onCreate}>
            Создать продажи
          </Button>
          <Button block onClick={onCreateAndPost}>
            Создать и провести
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default App;

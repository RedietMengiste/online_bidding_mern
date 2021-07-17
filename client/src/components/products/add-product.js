import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { Modal, Form, Input, Button, Upload, Typography, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import {
  createProductSuccessAsync,
  clearCreateProductSuccess,
  fetchProductsByShopSuccessAsync,
} from "../../store/product/action";

const AddProduct = ({ isOpen, onClose }) => {
  const { shopId } = useParams();
  const dispatch = useDispatch();
  const { products, page, limit, total, fetchProductsLoading } = useSelector(
    (state) => state.product
  );

  const { createProductLoading, createProductError, createProductSuccess } =
    useSelector((state) => state.product);
  const [form, setForm] = useState({
    file: null,
    fileList: [],
  });
  const [preview, setPreview] = useState({
    previewVisible: false,
    previewImage: "",
    previewTitle: "",
  });

  useEffect(() => {
    if (createProductSuccess) {
      message.success("Product created successfuly");
      onClose();
      dispatch(clearCreateProductSuccess());
      dispatch(fetchProductsByShopSuccessAsync(page, limit, shopId));
    }
  }, [createProductSuccess]);

  const handleChange = ({ fileList, file }) =>
    setForm({ ...form, file, fileList });

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreview({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle:
        file.name || file.url.substring(file.url.lastIndexOf("/") + 1),
    });
  };
  const isJpgOrPng = (file) => {
    return (
      file.type === "image/jpeg" ||
      file.type === "image/jpg" ||
      file.type === "image/png"
    );
  };
  const handleSubmit = (values) => {
    const { name, description, category, quantity, price } = values;
    if (!form.file) {
      message.error("Product photo is required");
    } else if (!isJpgOrPng(form.file)) {
      message.error("Product photo can only be JPG/PNG file!");
    } else {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("image", form.file);
      formData.append("category", category);
      formData.append("quantity", quantity);
      formData.append("price", price);
      dispatch(createProductSuccessAsync(formData, shopId));
    }
  };

  const beforeUpload = (file) => {
    if (!isJpgOrPng(file)) {
      message.error("Product photo can only be JPG/PNG file!");
    }
    return false;
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  return (
    <>
      <Modal
        title="Create Product"
        visible={isOpen}
        onOk={handleSubmit}
        onCancel={onClose}
        footer={[]}
      >
        <Form initialValues={{}} onFinish={handleSubmit}>
          <Form.Item
            name="name"
            rules={[{ required: true, message: "Please input product name!" }]}
          >
            <Input size="large" placeholder="Product Name" />
          </Form.Item>
          <Form.Item
            name="description"
            rules={[
              { required: true, message: "Please input product description!" },
            ]}
          >
            <Input.TextArea rows={5} placeholder="Description" />
          </Form.Item>
          <Form.Item
            name="category"
            rules={[
              { required: true, message: "Please input product Category!" },
            ]}
          >
            <Input placeholder="Category" />
          </Form.Item>
          <Form.Item
            name="price"
            rules={[{ required: true, message: "Please input product Price!" }]}
          >
            <Input placeholder="Price" />
          </Form.Item>
          <Form.Item
            name="quantity"
            rules={[
              { required: true, message: "Please input product Quantity!" },
            ]}
          >
            <Input placeholder="Quantity" />
          </Form.Item>
          <Form.Item>
            <Typography.Text>Product Photo</Typography.Text>
            <Upload
              listType="picture-card"
              fileList={form.fileList}
              onPreview={handlePreview}
              onChange={handleChange}
              beforeUpload={beforeUpload}
            >
              {form.fileList.length === 1 ? null : uploadButton}
            </Upload>
          </Form.Item>
          <Form.Item>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: "150px" }}
                disabled={createProductLoading}
                loading={createProductLoading}
              >
                Submit
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        visible={preview.previewVisible}
        title={preview.previewTitle}
        footer={null}
        onCancel={() => setPreview({ previewVisible: false })}
      >
        <img
          alt="example"
          style={{ width: "100%" }}
          src={preview.previewImage}
        />
      </Modal>
    </>
  );
};

export default AddProduct;

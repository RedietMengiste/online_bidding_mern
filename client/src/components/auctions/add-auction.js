import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Modal,
  Form,
  Input,
  Button,
  Upload,
  Typography,
  message,
  DatePicker,
  Space,
} from "antd";
import moment from "moment";
import { PlusOutlined } from "@ant-design/icons";

import {
  createAuctionSuccessAsync,
  clearCreateAuctionSuccess,
  fetchAllAuctionsSuccessAsync,
} from "../../store/auction/action";

let bidStart, bidEnd;

const AddAuction = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const {
    auction,
    createAuctionLoading,
    createAuctionError,
    createAuctionSuccess,
    page,
    limit,
    total,
  } = useSelector((state) => state.auction);
  const { user } = useSelector((state) => state.user);

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
    if (createAuctionSuccess) {
      message.success("Auction created successfully");
      onClose();
      dispatch(clearCreateAuctionSuccess());
      dispatch(fetchAllAuctionsSuccessAsync(page, limit));
    }
  }, [createAuctionSuccess]);

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

  function onStartChange(date, dateString) {
    console.log(date, dateString);
    bidStart = date;
  }
  function onEndChange(date, dateString) {
    bidEnd = date;
  }

  const handleSubmit = (values) => {
    const { name, description, startingBid } = values;
    if (!form.file) {
      message.error("Auction Item photo is required");
    } else if (!isJpgOrPng(form.file)) {
      message.error("Auction photo can only be JPG/PNG file!");
    } else {
      const formData = new FormData();
      formData.append("itemName", name);
      formData.append("description", description);
      formData.append("image", form.file);
      formData.append("startingBid", startingBid);
      formData.append("bidStart", bidStart);
      formData.append("bidEnd", bidEnd);
      dispatch(createAuctionSuccessAsync(formData, user._id));
    }
  };

  const beforeUpload = (file) => {
    if (!isJpgOrPng(file)) {
      message.error("Auction photo can only be JPG/PNG file!");
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
        title="Create Auction"
        visible={isOpen}
        onOk={handleSubmit}
        onCancel={onClose}
        footer={[]}
      >
        <Form initialValues={{}} onFinish={handleSubmit}>
          <Form.Item>
            <Typography.Text>Auction Photo</Typography.Text>
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
          <Form.Item
            name="name"
            rules={[{ required: true, message: "Please input auction name!" }]}
          >
            <Input size="large" placeholder="Auction Name" />
          </Form.Item>
          <Form.Item
            name="description"
            rules={[
              { required: true, message: "Please input auction description!" },
            ]}
          >
            <Input.TextArea rows={5} placeholder="Description" />
          </Form.Item>

          <Form.Item
            name="startingBid"
            rules={[
              {
                required: true,
                message: "Please input auction starting bid amount!",
              },
            ]}
          >
            <Input placeholder="Starting Bid(Birr) : 0" />
          </Form.Item>
          <Form.Item
            name="bidStart"
            // rules={[
            //   { required: true, message: "Please input auction start time!" },
            // ]}
          >
            <Typography.Text>Bid Start Time </Typography.Text>
            <Space>
              <DatePicker onChange={onStartChange} />
            </Space>
          </Form.Item>
          <Form.Item
            name="bidEnd"
            // rules={[
            //   { required: true, message: "Please input auction end time!" },
            // ]}
          >
            <Typography.Text>Bid End Time </Typography.Text>

            <Space>
              <DatePicker onChange={onEndChange} />
            </Space>
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
                disabled={createAuctionLoading}
                loading={createAuctionLoading}
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

export default AddAuction;

import { UpdateUserSkillAction } from "@/app/lib/actions/skills";
import { useAuth } from "@/app/lib/hooks/useAuth";
import { I_skills_user } from "@/app/lib/types/categories";
import { Button, Modal, Form, Input, Upload } from "antd";
import { ExternalLink, Upload as UploadIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";

type UpdateSkillProps = {
  isUpdateSkillModalOpen: boolean;
  setIsUpdateSkillModalOpen: (open: boolean) => void;
  skill: I_skills_user;
};

export const UpdateSkill = ({
  isUpdateSkillModalOpen,
  setIsUpdateSkillModalOpen,
  skill,
}: UpdateSkillProps) => {
  const [updatingSkill, setUpdatingSkill] = useState(false);
  const { token } = useAuth();
  const [form] = Form.useForm();

  console.log("DEBUG SKILL DATA:", skill);
  // Đổ dữ liệu cũ vào form khi mở modal
  useEffect(() => {
    if (isUpdateSkillModalOpen && skill) {
      form.setFieldsValue({
        proof_link: skill.proof_link,
        // Avatar không thể set strict value cho Upload component của Antd dễ dàng nếu là URL từ server,
        // nên ta để trống để người dùng upload mới.
        avatar: [],
      });
    }
  }, [isUpdateSkillModalOpen, skill, form]);

  // Hàm xử lý file upload của Ant Design
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const handleUpdateSkill = async () => {
    try {
      // Validate các trường trong form
      const values = await form.validateFields();
      setUpdatingSkill(true);

      const formData = new FormData();

      // Proof Link không bắt buộc, có thì gửi
      if (values.proof_link) {
        formData.append("proof_link", values.proof_link);
      }

      // Avatar: Lấy file thực tế từ object của Antd
      const avatarFile = values.avatar?.[0]?.originFileObj;
      if (avatarFile) {
        formData.append("avatar", avatarFile);
      }
      formData.forEach((value, key) => {
        console.log(key, value);
      });
      // Gọi Server Action để cập nhật
      const res = await UpdateUserSkillAction(formData, token || "", skill.id);
      console.log("res", res);

      if (res.success) {
        toast.success("Cập nhật kỹ năng thành công!");
        setIsUpdateSkillModalOpen(false);
        form.resetFields();
      } else {
        toast.error(String(res.error) || "Có lỗi xảy ra");
      }
    } catch (error) {
      console.error("Submit Failed:", error);
    } finally {
      setUpdatingSkill(false);
    }
  };

  return (
    <Modal
      title="Cập nhật kỹ năng"
      open={isUpdateSkillModalOpen}
      onCancel={() => {
        setIsUpdateSkillModalOpen(false);
        form.resetFields();
      }}
      onOk={handleUpdateSkill}
      confirmLoading={updatingSkill}
      centered
      okText="Cập nhật"
      cancelText="Hủy bỏ"
    >
      <Form form={form} layout="vertical" className="mt-4">
        {/* Trường Link Minh Chứng: Không bắt buộc */}
        <Form.Item
          label="Link minh chứng (Ảnh/Chứng chỉ)"
          name="proof_link"
          tooltip="Đường dẫn đến ảnh chứng chỉ hoặc sản phẩm của bạn (Tùy chọn)"
          rules={[{ type: "url", message: "Vui lòng nhập đúng định dạng URL" }]}
        >
          <Input
            prefix={<ExternalLink size={14} className="text-gray-400" />}
            placeholder="https://example.com/chung-chi.jpg"
          />
        </Form.Item>

        {/* Trường Avatar Input: Bắt buộc upload ảnh mới theo yêu cầu */}
        <Form.Item
          label="Ảnh minh chứng (Upload)"
          name="avatar"
          tooltip="Upload ảnh minh chứng (Bắt buộc)"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          rules={[
            { required: true, message: "Vui lòng upload ảnh minh chứng!" },
          ]}
        >
          <Upload
            maxCount={1}
            listType="picture"
            beforeUpload={() => false}
            accept="image/*"
          >
            <Button icon={<UploadIcon size={16} />}>Click to Upload</Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};
